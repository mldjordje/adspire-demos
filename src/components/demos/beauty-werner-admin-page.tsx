import type { LeadProfile } from "@/lib/lead-schema";
import { BeautyWernerAdminPanel } from "./beauty-werner-admin-panel";
import "./ola-beauty-admin-page.css";

export function BeautyWernerAdminPage({ lead }: { lead: LeadProfile }) {
  return (
    <main className="ola-admin">
      <p className="ola-admin-disclaimer">
        Konzept-Vorschau · Fiktive Beispieldaten · Es werden keine echten Daten übermittelt oder gespeichert
      </p>
      <BeautyWernerAdminPanel lead={lead} />
    </main>
  );
}
