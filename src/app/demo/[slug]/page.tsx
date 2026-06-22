import { notFound } from "next/navigation";
import { DemoPage } from "@/components/demo-page";
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
  return <DemoPage lead={lead} />;
}
