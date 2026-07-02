import { notFound } from "next/navigation";
import { DemoPage } from "@/components/demo-page";
import { BartecPage } from "@/components/demos/bartec-page";
import { BelschnerPage } from "@/components/demos/belschner-page";
import { BeautyWernerPage } from "@/components/demos/beauty-werner-page";
import { EdelmannPage } from "@/components/demos/edelmann-page";
import { EmilStelterPage } from "@/components/demos/emil-stelter-page";
import { HbNailsPage } from "@/components/demos/hb-nails-page";
import { HoyerPage } from "@/components/demos/hoyer-page";
import { HuthmannPage } from "@/components/demos/huthmann-page";
import { KablitzPage } from "@/components/demos/kablitz-page";
import { OlaBeautyPage } from "@/components/demos/ola-beauty-page";
import { TmNailsPage } from "@/components/demos/tm-nails-page";
import { getLeadBySlug, leads } from "@/data/leads";
import { buildDemoMetadata } from "@/lib/metadata";

type DemoRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return leads.map((lead) => ({ slug: lead.slug }));
}

export async function generateMetadata({ params }: DemoRouteProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);
  if (!lead) return buildDemoMetadata("Nicht gefunden", "Dieses Konzept ist nicht verfügbar.");
  return buildDemoMetadata(lead.businessName, lead.shortDescription);
}

export default async function DemoRoute({ params }: DemoRouteProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);
  if (!lead) notFound();
  if (slug === "bartec-gmbh-e5x8p3") return <BartecPage lead={lead} />;
  if (slug === "kablitz-gmbh-r4t9k2") return <KablitzPage lead={lead} />;
  if (slug === "edelmann-fachmarkt-bad-mergentheim-h5k9r3") return <EdelmannPage lead={lead} />;
  if (slug === "hoyer-energie-service-bad-mergentheim-e8h4k2") return <HoyerPage lead={lead} />;
  if (slug === "belschner-elektrotechnik-w7k4n2") return <BelschnerPage lead={lead} />;
  if (slug === "emil-stelter-gmbh-bad-mergentheim-p6d4n8") return <EmilStelterPage lead={lead} />;
  if (slug === "huthmann-tuning-automobile-s9k3m6") return <HuthmannPage lead={lead} />;
  if (slug === "kfz-werkstatt-elis-bad-mergentheim-q4m7x2") return <HuthmannPage lead={lead} />;
  if (slug === "ola-beauty-bad-mergentheim-n8k4w2") return <OlaBeautyPage lead={lead} />;
  if (slug === "tm-nails-beauty-bad-mergentheim-a7p3k9") return <TmNailsPage lead={lead} />;
  if (slug === "hb-nails-bad-mergentheim-z3v6q8") return <HbNailsPage lead={lead} />;
  if (slug === "beauty-werner-bad-mergentheim-r3m8x5") return <BeautyWernerPage lead={lead} />;
  return <DemoPage lead={lead} />;
}
