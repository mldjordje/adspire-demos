import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoPage } from "@/components/demo-page";
import type { LeadProfile } from "@/lib/lead-schema";

const lead: LeadProfile = {
  slug: "beispiel-bau-a7k3p9",
  family: "construction",
  status: "ready",
  businessName: "Beispiel Bau",
  businessType: "Bauunternehmen",
  city: "Bad Mergentheim",
  tagline: "Solide Arbeit. Klare Abläufe.",
  shortDescription: "Ein unverbindliches Designkonzept.",
  primaryCta: "call",
  services: [{ title: "Sanierung", description: "Leistungsbeschreibung" }],
  sources: ["https://example.com"],
  contact: { phone: "+49 7931 000000", mapsUrl: "https://maps.example.com" },
  media: {
    hero: {
      src: "/leads/beispiel/hero.webp",
      alt: "Beispiel Bau Projekt",
      sourceUrl: "https://example.com/hero.webp",
      rightsStatus: "pending-client-approval",
    },
  },
};

describe("DemoPage", () => {
  it("shows the unofficial concept notice and verified call/map actions", () => {
    const { container } = render(<DemoPage lead={lead} />);
    expect(screen.getByLabelText(/hinweis zum designkonzept/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /anrufen/i })[0]).toHaveAttribute("href", "tel:+497931000000");
    expect(screen.getAllByRole("link", { name: /route/i })[0]).toHaveAttribute("href", lead.contact.mapsUrl);
    expect(screen.getByRole("img", { name: "Beispiel Bau Projekt" })).toHaveAttribute("src", lead.media?.hero?.src);
    expect(container.querySelector("form")).not.toBeInTheDocument();
  });

  it("does not render empty optional sections", () => {
    render(<DemoPage lead={lead} />);
    expect(screen.queryByText(/bewertungen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/zertifikate/i)).not.toBeInTheDocument();
  });
});
