import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Processes manually-sourced photos (e.g. exported from Instagram/Facebook).
//
// Usage:
//   1. Drop image files into  incoming/<slug>/
//   2. Add a sources.json next to them describing where each photo came from:
//        { "default": "https://instagram.com/handle", "files": { "img1.jpg": "https://instagram.com/p/xyz" } }
//   3. Run: npm run assets:import
//
// Processed photos are converted to webp and appended to public/leads/<slug>/
// and src/data/media-manifest.json (existing entries are kept, never overwritten).
// Originals are moved to incoming/<slug>/.processed/ so nothing is lost.

const root = process.cwd();
const incomingRoot = path.join(root, "incoming");
const publicRoot = path.join(root, "public", "leads");
const manifestPath = path.join(root, "src", "data", "media-manifest.json");
const IMAGE_EXT = /\.(jpe?g|png|webp|heic|heif)$/i;

async function loadManifest() {
  try {
    return JSON.parse(await fs.readFile(manifestPath, "utf8"));
  } catch {
    return {};
  }
}

async function processSlug(slug) {
  const slugDir = path.join(incomingRoot, slug);
  const entries = await fs.readdir(slugDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && IMAGE_EXT.test(e.name)).map((e) => e.name);
  if (!files.length) return null;

  let sources = {};
  try {
    sources = JSON.parse(await fs.readFile(path.join(slugDir, "sources.json"), "utf8"));
  } catch {
    console.log(`  [${slug}] no sources.json found — add one with at least a "default" source URL`);
    return { processed: 0, skipped: files.length };
  }

  const manifest = await loadManifest();
  const existing = manifest[slug] ?? [];
  const seenHashes = new Set();
  const targetDir = path.join(publicRoot, slug);
  await fs.mkdir(targetDir, { recursive: true });
  const processedDir = path.join(slugDir, ".processed");
  await fs.mkdir(processedDir, { recursive: true });

  let nextIndex = existing.length;
  const added = [];
  for (const filename of files) {
    const sourceUrl = sources.files?.[filename] ?? sources.default;
    if (!sourceUrl) {
      console.log(`  [${slug}] skipped ${filename}: no source URL (add to "files" or set "default" in sources.json)`);
      continue;
    }
    const fullPath = path.join(slugDir, filename);
    try {
      const input = await fs.readFile(fullPath);
      const hash = crypto.createHash("sha256").update(input).digest("hex").slice(0, 16);
      if (seenHashes.has(hash)) continue;
      seenHashes.add(hash);
      const outFilename = `${String(nextIndex + 1).padStart(2, "0")}-${hash}.webp`;
      await sharp(input, { failOn: "none" })
        .rotate()
        .resize({ width: 1800, height: 1400, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(targetDir, outFilename));
      added.push({
        src: `/leads/${slug}/${outFilename}`,
        alt: `${slug} – Unternehmensfoto`,
        sourceUrl,
        rightsStatus: "pending-client-approval",
      });
      nextIndex += 1;
      await fs.rename(fullPath, path.join(processedDir, filename));
    } catch (error) {
      console.log(`  [${slug}] failed on ${filename}: ${error.message}`);
    }
  }

  if (added.length) {
    manifest[slug] = [...existing, ...added];
    await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  return { processed: added.length, skipped: files.length - added.length };
}

async function main() {
  let slugDirs;
  try {
    slugDirs = (await fs.readdir(incomingRoot, { withFileTypes: true })).filter((e) => e.isDirectory());
  } catch {
    console.log(`No "incoming/" folder found. Create incoming/<slug>/ and drop photos in it first.`);
    return;
  }
  if (!slugDirs.length) {
    console.log(`"incoming/" is empty. Drop photos into incoming/<slug>/ first.`);
    return;
  }
  for (const dir of slugDirs) {
    console.log(`\n[${dir.name}]`);
    const result = await processSlug(dir.name);
    if (!result) {
      console.log("  no image files found");
      continue;
    }
    console.log(`  ${result.processed} imported, ${result.skipped} skipped`);
  }
}

await main();
