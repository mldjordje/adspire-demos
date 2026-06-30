import { notFound } from "next/navigation";
import { getLeadBySlug } from "@/data/leads";
import { KablitzAdminPage } from "@/components/demos/kablitz-admin-page";
import { BelschnerAdminPage } from "@/components/demos/belschner-admin-page";
import { HuthmannAdminPage } from "@/components/demos/huthmann-admin-page";
import { OlaBeautyAdminPage } from "@/components/demos/ola-beauty-admin-page";
import { TmNailsAdminPage } from "@/components/demos/tm-nails-admin-page";
import { buildDemoMetadata } from "@/lib/metadata";

const ADMIN_PREVIEW_SLUGS = new Set([
  "kablitz-gmbh-r4t9k2",
  "belschner-elektrotechnik-w7k4n2",
  "huthmann-tuning-automobile-s9k3m6",
  "ola-beauty-bad-mergentheim-n8k4w2",
  "tm-nails-beauty-bad-mergentheim-a7p3k9",
]);

type AdminRouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: AdminRouteProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);
  if (!lead) return buildDemoMetadata("Nicht gefunden", "Dieses Konzept ist nicht verfuegbar.");
  const isNailStudio = slug === "ola-beauty-bad-mergentheim-n8k4w2" || slug === "tm-nails-beauty-bad-mergentheim-a7p3k9";
  const description = slug === "huthmann-tuning-automobile-s9k3m6"
    ? "Unverbindliche Konzept-Vorschau fuer Werkstatt, Fahrzeuge und Kunden-Follow-up."
    : isNailStudio
      ? "Unverbindliche Konzept-Vorschau fuer Terminkalender, Kundinnen und Auslastung."
      : "Unverbindliche Konzept-Vorschau fuer Beschaffung und Lager.";
  return buildDemoMetadata(`${lead.businessName} - Admin-Vorschau`, description);
}

export default async function AdminRoute({ params }: AdminRouteProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);
  if (!lead || !ADMIN_PREVIEW_SLUGS.has(slug)) notFound();
  if (slug === "belschner-elektrotechnik-w7k4n2") return <BelschnerAdminPage lead={lead} />;
  if (slug === "huthmann-tuning-automobile-s9k3m6") return <HuthmannAdminPage lead={lead} />;
  if (slug === "ola-beauty-bad-mergentheim-n8k4w2") return <OlaBeautyAdminPage lead={lead} />;
  if (slug === "tm-nails-beauty-bad-mergentheim-a7p3k9") return <TmNailsAdminPage lead={lead} />;
  return <KablitzAdminPage lead={lead} />;
}
