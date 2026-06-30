import type { LeadProfile } from "@/lib/lead-schema";
import { TmNailsAdminPanel } from "./tm-nails-admin-panel";
import "./tm-nails-admin-page.css";

export function TmNailsAdminPage({ lead }: { lead: LeadProfile }) {
  return (
    <main className="tm-admin">
      <p className="tm-admin-disclaimer">
        Konzept-Vorschau · Fiktive Beispieldaten · Es werden keine echten Daten übermittelt oder gespeichert
      </p>
      <TmNailsAdminPanel lead={lead} />
    </main>
  );
}
