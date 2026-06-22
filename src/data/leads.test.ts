import { describe, expect, it } from "vitest";
import { getLeadBySlug, leads } from "@/data/leads";

describe("lead registry", () => {
  it("contains between 10 and 15 unique demo routes", () => {
    expect(leads.length).toBeGreaterThanOrEqual(10);
    expect(leads.length).toBeLessThanOrEqual(15);
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
});
