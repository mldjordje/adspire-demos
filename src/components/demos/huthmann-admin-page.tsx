import type { LeadProfile } from "@/lib/lead-schema";
import { HuthmannAdminPanel } from "./huthmann-admin-panel";
import "./huthmann-admin-page.css";

export function HuthmannAdminPage({ lead }: { lead: LeadProfile }) {
  return (
    <main className="huth-admin">
      <p className="huth-admin-disclaimer">
        Konzept-Vorschau - fiktive Werkstattdaten - es werden keine echten Daten gespeichert
      </p>
      <HuthmannAdminPanel lead={lead} />
    </main>
  );
}
