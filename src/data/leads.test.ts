import { describe, expect, it } from "vitest";
import { getLeadBySlug, leads } from "@/data/leads";

describe("lead registry", () => {
  it("contains between 10 and 18 unique demo routes", () => {
    expect(leads.length).toBeGreaterThanOrEqual(10);
    expect(leads.length).toBeLessThanOrEqual(18);
    expect(new Set(leads.map((lead) => lead.slug)).size).toBe(leads.length);
  });

  it("covers all five approved template families", () => {
    expect(new Set(leads.map((lead) => lead.family))).toEqual(
      new Set(["beauty", "barber", "restaurant", "corporate", "construction"]),
    );
  });

  it("finds a lead by slug and returns undefined for unknown routes", () => {
    expect(getLeadBySlug(leads[0].slug)).toEqual(leads[0]);
    expect(getLeadBySlug("does-not-exist-a1b2c3")).toBeUndefined();
  });

  it("requires at least one public source for every lead", () => {
    for (const lead of leads) expect(lead.sources.length).toBeGreaterThan(0);
  });

  it("contains BARTEC from the newly supplied Maps lead", () => {
    expect(leads.find((lead) => lead.businessName === "BARTEC GmbH")).toMatchObject({
      family: "corporate",
      city: "Bad Mergentheim",
    });
  });

  it("tracks source and approval status for every imported media asset", () => {
    const assets = leads.flatMap((lead) => [
      ...(lead.media?.hero ? [lead.media.hero] : []),
      ...(lead.media?.gallery ?? []),
      ...(lead.media?.projects ?? []),
      ...(lead.media?.team ?? []),
    ]);
    expect(assets.length).toBeGreaterThan(0);
    for (const asset of assets) {
      expect(asset.src).toMatch(/^\/leads\//);
      expect(asset.sourceUrl).toMatch(/^https?:\/\//);
      expect(asset.rightsStatus).toBe("pending-client-approval");
    }
  });
});
