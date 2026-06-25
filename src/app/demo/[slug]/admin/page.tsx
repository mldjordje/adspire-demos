import { notFound } from "next/navigation";
import { AdminPreviewPage } from "@/components/admin-preview";
import { getLeadBySlug, leads } from "@/data/leads";
import { buildDemoMetadata } from "@/lib/metadata";

type AdminRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return leads.filter((lead) => lead.adminPreview).map((lead) => ({ slug: lead.slug }));
}

export async function generateMetadata({ params }: AdminRouteProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);
  if (!lead) return buildDemoMetadata("Nicht gefunden", "Diese Verwaltungsvorschau ist nicht verfügbar.");
  return buildDemoMetadata(`${lead.businessName} — Verwaltungsvorschau`, "Beispielhafte Verwaltungsansicht, keine echten Daten.");
}

export default async function AdminRoute({ params }: AdminRouteProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);
  if (!lead || !lead.adminPreview) notFound();
  return <AdminPreviewPage lead={lead} />;
}
