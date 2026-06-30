import type { LeadProfile } from "@/lib/lead-schema";
import { OlaBeautyAdminPanel } from "./ola-beauty-admin-panel";
import "./ola-beauty-admin-page.css";

export function OlaBeautyAdminPage({ lead }: { lead: LeadProfile }) {
  return (
    <main className="ola-admin">
      <p className="ola-admin-disclaimer">
        Konzept-Vorschau · Fiktive Beispieldaten · Es werden keine echten Daten übermittelt oder gespeichert
      </p>
      <OlaBeautyAdminPanel lead={lead} />
    </main>
  );
}
