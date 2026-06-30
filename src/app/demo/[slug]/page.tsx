import { notFound } from "next/navigation";
import { DemoPage } from "@/components/demo-page";
import { BartecPage } from "@/components/demos/bartec-page";
import { BelschnerPage } from "@/components/demos/belschner-page";
import { HuthmannPage } from "@/components/demos/huthmann-page";
import { KablitzPage } from "@/components/demos/kablitz-page";
import { OlaBeautyPage } from "@/components/demos/ola-beauty-page";
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
  if (slug === "belschner-elektrotechnik-w7k4n2") return <BelschnerPage lead={lead} />;
  if (slug === "huthmann-tuning-automobile-s9k3m6") return <HuthmannPage lead={lead} />;
  if (slug === "ola-beauty-bad-mergentheim-n8k4w2") return <OlaBeautyPage lead={lead} />;
  return <DemoPage lead={lead} />;
}
