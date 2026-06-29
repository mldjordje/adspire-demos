import type { LeadProfile } from "@/lib/lead-schema";
import { BelschnerAdminPanel } from "./belschner-admin-panel";
import "./belschner-admin-page.css";

export function BelschnerAdminPage({ lead }: { lead: LeadProfile }) {
  return (
    <main className="belschner-admin">
      <p className="belschner-admin-disclaimer">
        Konzept-Vorschau · Fiktive Beispieldaten · Es werden keine echten Daten übermittelt oder gespeichert
      </p>
      <BelschnerAdminPanel lead={lead} />
    </main>
  );
}
