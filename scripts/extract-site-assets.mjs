import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sources = JSON.parse(await fs.readFile(path.join(root, "scripts", "asset-sources.json"), "utf8"));
const publicRoot = path.join(root, "public", "leads");
const manifest = {};
const userAgent = "AdspireConceptResearch/1.0 (+https://adspire.rs)";

function absoluteUrl(value, pageUrl) {
  if (!value || value.startsWith("data:") || value.startsWith("blob:")) return null;
  try {
    return new URL(value.replaceAll("&amp;", "&"), pageUrl).href;
  } catch {
    return null;
  }
}

function extractCandidates(html, pageUrl) {
  const values = [];
  for (const pattern of [
    /<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/gi,
    /<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["']/gi,
    /<img[^>]+(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi,
    /(?:background-image|background)\s*:[^;]*url\(["']?([^"')]+)["']?\)/gi,
  ]) {
    for (const match of html.matchAll(pattern)) values.push(match[1]);
  }
  for (const match of html.matchAll(/<img[^>]+srcset=["']([^"']+)["']/gi)) {
    const largest = match[1].split(",").map((entry) => entry.trim().split(/\s+/)[0]).at(-1);
    if (largest) values.push(largest);
  }
  return [...new Set(values.map((value) => absoluteUrl(value, pageUrl)).filter(Boolean))];
}

function looksLikeContentPhoto(url) {
  const lower = decodeURIComponent(url).toLowerCase();
  if (/logo|icon|favicon|sprite|loader|spinner|avatar|flag|cookie|pixel|tracking|placeholder|payment/.test(lower)) return false;
  return !/\.svg(?:\?|$)/.test(lower);
}

// Internal subpages worth crawling for more imagery (services, gallery, team, menu...).
const SUBPAGE_HINTS = /leistung|galerie|gallery|referenz|projekt|ueber-uns|ueber_uns|about|team|angebot|speisekarte|karte|menu|produkt|portfolio|impression|bilder|kueche|zimmer/i;

function extractInternalLinks(html, pageUrl, limit = 5) {
  const origin = new URL(pageUrl).origin;
  const found = new Map();
  for (const match of html.matchAll(/<a[^>]+href=["']([^"'#]+)["']/gi)) {
    const href = absoluteUrl(match[1], pageUrl);
    if (!href) continue;
    if (!href.startsWith(origin)) continue;
    if (!SUBPAGE_HINTS.test(href)) continue;
    if (/\.(pdf|jpg|jpeg|png|webp|zip|docx?)(?:\?|$)/i.test(href)) continue;
    const clean = href.split("#")[0];
    if (clean === pageUrl) continue;
    if (!found.has(clean)) found.set(clean, true);
    if (found.size >= limit) break;
  }
  return [...found.keys()];
}

async function collectCandidates(pageUrl) {
  const response = await fetch(pageUrl, { headers: { "User-Agent": userAgent }, redirect: "follow", signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const resolved = response.url;
  const html = await response.text();
  return { html, resolved, candidates: extractCandidates(html, resolved) };
}

async function robotsAllows(pageUrl) {
  const url = new URL(pageUrl);
  try {
    const response = await fetch(`${url.origin}/robots.txt`, { headers: { "User-Agent": userAgent }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return true;
    const text = await response.text();
    const generic = text.split(/user-agent:/i).slice(1).find((block) => block.trimStart().startsWith("*"));
    return !generic || !/^\s*disallow:\s*\/\s*$/im.test(generic);
  } catch {
    return true;
  }
}

async function downloadAsset(url, targetDir, label, index, seenHashes) {
  try {
    const response = await fetch(url, { headers: { "User-Agent": userAgent, Referer: new URL(url).origin }, redirect: "follow", signal: AbortSignal.timeout(18000) });
    if (!response.ok) return null;
    const type = response.headers.get("content-type") ?? "";
    if (!type.startsWith("image/")) return null;
    const input = Buffer.from(await response.arrayBuffer());
    if (input.length < 30_000 || input.length > 12_000_000) return null;
    const image = sharp(input, { failOn: "none" });
    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height || metadata.width < 700 || metadata.height < 400) return null;
    const hash = crypto.createHash("sha256").update(input).digest("hex").slice(0, 16);
    if (seenHashes.has(hash)) return null;
    seenHashes.add(hash);
    const filename = `${String(index + 1).padStart(2, "0")}-${hash}.webp`;
    await image.rotate().resize({ width: 1800, height: 1400, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(targetDir, filename));
    return { filename, alt: `${label} – Unternehmensfoto`, sourceUrl: url };
  } catch {
    return null;
  }
}

for (const source of sources) {
  console.log(`\n[${source.slug}] ${source.page}`);
  if (!(await robotsAllows(source.page))) {
    console.log("  skipped: robots.txt disallows crawling");
    manifest[source.slug] = [];
    continue;
  }
  try {
    const main = await collectCandidates(source.page);
    const pagesToCrawl = [...new Set([...(source.extraPages ?? []), ...extractInternalLinks(main.html, main.resolved, 5)])];
    let candidates = [...main.candidates];
    for (const subPage of pagesToCrawl.slice(0, 6)) {
      try {
        const sub = await collectCandidates(subPage);
        candidates.push(...sub.candidates);
        console.log(`  crawled subpage: ${subPage}`);
      } catch (subError) {
        console.log(`  subpage skipped (${subError.message}): ${subPage}`);
      }
    }
    candidates = [...new Set(candidates)].filter(looksLikeContentPhoto);
    const targetDir = path.join(publicRoot, source.slug);
    await fs.rm(targetDir, { recursive: true, force: true });
    await fs.mkdir(targetDir, { recursive: true });
    const assets = [];
    const seenHashes = new Set();
    for (const candidate of candidates) {
      if (assets.length >= 14) break;
      const result = await downloadAsset(candidate, targetDir, source.label, assets.length, seenHashes);
      if (result) assets.push({
        src: `/leads/${source.slug}/${result.filename}`,
        alt: result.alt,
        sourceUrl: result.sourceUrl,
        rightsStatus: "pending-client-approval",
      });
    }
    manifest[source.slug] = assets;
    console.log(`  ${assets.length} eligible photos from ${candidates.length} candidates (${pagesToCrawl.length} subpages found)`);
  } catch (error) {
    manifest[source.slug] = [];
    console.log(`  failed: ${error.message}`);
  }
}

await fs.mkdir(path.join(root, "src", "data"), { recursive: true });
await fs.writeFile(path.join(root, "src", "data", "media-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log("\nWrote src/data/media-manifest.json");
