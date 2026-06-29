import { notFound } from "next/navigation";
import { getLeadBySlug } from "@/data/leads";
import { KablitzAdminPage } from "@/components/demos/kablitz-admin-page";
import { BelschnerAdminPage } from "@/components/demos/belschner-admin-page";
import { buildDemoMetadata } from "@/lib/metadata";

const ADMIN_PREVIEW_SLUGS = new Set(["kablitz-gmbh-r4t9k2", "belschner-elektrotechnik-w7k4n2"]);

type AdminRouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: AdminRouteProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);
  if (!lead) return buildDemoMetadata("Nicht gefunden", "Dieses Konzept ist nicht verfügbar.");
  return buildDemoMetadata(`${lead.businessName} — Admin-Vorschau`, "Unverbindliche Konzept-Vorschau für Beschaffung & Lager.");
}

export default async function AdminRoute({ params }: AdminRouteProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);
  if (!lead || !ADMIN_PREVIEW_SLUGS.has(slug)) notFound();
  if (slug === "belschner-elektrotechnik-w7k4n2") return <BelschnerAdminPage lead={lead} />;
  return <KablitzAdminPage lead={lead} />;
}
