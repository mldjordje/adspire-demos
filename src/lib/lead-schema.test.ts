import { describe, expect, it } from "vitest";
import { leadProfileSchema, sectionHasContent } from "@/lib/lead-schema";

const minimalLead = {
  slug: "beispiel-salon-a7k3p9",
  family: "beauty",
  status: "ready",
  businessName: "Beispiel Salon",
  businessType: "Kosmetikstudio",
  city: "Bad Mergentheim",
  tagline: "Pflege, die zu Ihnen passt.",
  shortDescription: "Ein unverbindliches Designkonzept.",
  primaryCta: "call",
  sources: ["https://example.com"],
  contact: { phone: "+49 7931 000000", mapsUrl: "https://maps.example.com" },
};

describe("leadProfileSchema", () => {
  it("accepts a minimal verified lead", () => {
    expect(leadProfileSchema.parse(minimalLead)).toMatchObject(minimalLead);
  });

  it("rejects predictable or malformed route slugs", () => {
    expect(() => leadProfileSchema.parse({ ...minimalLead, slug: "beispiel-salon" })).toThrow();
  });

  it("rejects unsupported template families", () => {
    expect(() => leadProfileSchema.parse({ ...minimalLead, family: "hotel" })).toThrow();
  });

  it("requires provenance and approval state for every imported image", () => {
    expect(() =>
      leadProfileSchema.parse({
        ...minimalLead,
        media: {
          hero: {
            src: "/leads/example/hero.webp",
            alt: "Example",
          },
        },
      }),
    ).toThrow();
  });
});

describe("sectionHasContent", () => {
  it("hides missing and empty optional sections", () => {
    expect(sectionHasContent(undefined)).toBe(false);
    expect(sectionHasContent([])).toBe(false);
    expect(sectionHasContent("   ")).toBe(false);
  });

  it("shows populated optional sections", () => {
    expect(sectionHasContent([{ title: "Beratung" }])).toBe(true);
  });
});
