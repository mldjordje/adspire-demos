import { describe, expect, it } from "vitest";
import { buildDemoMetadata } from "@/lib/metadata";

describe("buildDemoMetadata", () => {
  it("marks every concept route as noindex and nofollow", () => {
    const metadata = buildDemoMetadata("Beispiel GmbH", "Designkonzept für Beispiel GmbH");
    expect(metadata.robots).toEqual({ index: false, follow: false, googleBot: { index: false, follow: false } });
  });
});
