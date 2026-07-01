import type { LeadProfile } from "@/lib/lead-schema";
import { HbNailsAdminPanel } from "./hb-nails-admin-panel";
import "./hb-nails-admin-page.css";

export function HbNailsAdminPage({ lead }: { lead: LeadProfile }) {
  return (
    <main className="hb-admin">
      <p className="hb-admin-disclaimer">
        Konzept-Vorschau · Fiktive Beispieldaten · Es werden keine echten Daten übermittelt oder gespeichert
      </p>
      <HbNailsAdminPanel lead={lead} />
    </main>
  );
}
