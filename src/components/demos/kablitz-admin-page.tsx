import { AlertTriangle, ArrowLeft, CheckCircle2, Clock, ClipboardCheck, PackageSearch, Sparkles, Star, Truck } from "lucide-react";
import Link from "next/link";
import type { LeadProfile } from "@/lib/lead-schema";
import { KablitzAdminMonitor } from "./kablitz-admin-monitor";
import "./kablitz-admin-page.css";

type StockItem = { article: string; onHand: number; min: number; unit: string; reorderQty?: number };
type Order = {
  supplier: string;
  project: string;
  ordered: string;
  expected: string;
  status: "unterwegs" | "verspätet" | "erhalten";
  daysLate?: number;
};
type SupplierScore = { supplier: string; onTimeRate: number; avgDelayDays: number; complaintRate: number };
type ReceivingCheck = { supplier: string; article: string; orderedQty: string; deliveredQty: string; ok: boolean };

const STOCK: StockItem[] = [
  { article: "Gussroste Typ R-415", onHand: 18, min: 40, unit: "Stk.", reorderQty: 60 },
  { article: "Feuerfestbeton FB-90", onHand: 6, min: 12, unit: "t", reorderQty: 15 },
  { article: "Edelstahlrohr DN150", onHand: 54, min: 30, unit: "m" },
  { article: "Schamottesteine", onHand: 9, min: 25, unit: "Palette", reorderQty: 30 },
  { article: "Dichtungssätze WT-Serie", onHand: 47, min: 20, unit: "Stk." },
];

const SUPPLIER_SCORES: SupplierScore[] = [
  { supplier: "Dichtungstechnik Weber", onTimeRate: 96, avgDelayDays: 0.4, complaintRate: 1 },
  { supplier: "Gießerei-Zulieferer Nord", onTimeRate: 88, avgDelayDays: 1.8, complaintRate: 3 },
  { supplier: "Stahlhandel Tauber GmbH", onTimeRate: 71, avgDelayDays: 5.2, complaintRate: 6 },
  { supplier: "Feuerfest Schmidt & Co.", onTimeRate: 64, avgDelayDays: 6.9, complaintRate: 9 },
];

const ORDERS: Order[] = [
  { supplier: "Stahlhandel Tauber GmbH", project: "Anlage Lkr. Ansbach", ordered: "2026-06-02", expected: "2026-06-20", status: "verspätet", daysLate: 8 },
  { supplier: "Feuerfest Schmidt & Co.", project: "Anlage Plzeň (CZ)", ordered: "2026-06-10", expected: "2026-06-25", status: "verspätet", daysLate: 3 },
  { supplier: "Gießerei-Zulieferer Nord", project: "Ersatzteillager", ordered: "2026-06-15", expected: "2026-07-05", status: "unterwegs" },
  { supplier: "Dichtungstechnik Weber", project: "Anlage Lkr. Ansbach", ordered: "2026-05-20", expected: "2026-06-10", status: "erhalten" },
];

const RECEIVING_CHECKS: ReceivingCheck[] = [
  { supplier: "Dichtungstechnik Weber", article: "Dichtungssätze WT-Serie", orderedQty: "50 Stk.", deliveredQty: "50 Stk.", ok: true },
  { supplier: "Gießerei-Zulieferer Nord", article: "Rohgussteile R-415", orderedQty: "60 Stk.", deliveredQty: "54 Stk.", ok: false },
];

function isBelowMin(item: StockItem) {
  return item.onHand < item.min;
}

export function KablitzAdminPage({ lead }: { lead: LeadProfile }) {
  const lowStock = STOCK.filter(isBelowMin);
  const lateOrders = ORDERS.filter((order) => order.status === "verspätet");

  return (
    <main className="kablitz-admin">
      <p className="kablitz-admin-disclaimer">
        Konzept-Vorschau · Fiktive Beispieldaten · Es werden keine echten Daten übermittelt oder gespeichert
      </p>

      <header className="kablitz-admin-header">
        <Link className="kablitz-admin-back" href={`/demo/${lead.slug}`}>
          <ArrowLeft size={16} /> Zurück zur Demo-Seite
        </Link>
        <h1>Beschaffung &amp; Lager — {lead.businessName}</h1>
      </header>

      {(lowStock.length > 0 || lateOrders.length > 0) && (
        <section className="kablitz-admin-alerts">
          {lowStock.length > 0 && (
            <article className="kablitz-admin-alert is-warning">
              <AlertTriangle size={18} />
              <span>{lowStock.length} Artikel unter Mindestbestand — Nachbestellung erforderlich.</span>
            </article>
          )}
          {lateOrders.length > 0 && (
            <article className="kablitz-admin-alert is-danger">
              <Clock size={18} />
              <span>{lateOrders.length} Bestellung(en) überfällig — Lieferant kontaktieren.</span>
            </article>
          )}
        </section>
      )}

      <KablitzAdminMonitor />

      <section className="kablitz-admin-section">
        <h2><PackageSearch size={18} /> Lagerbestand</h2>
        <div className="kablitz-admin-table">
          <div className="kablitz-admin-row kablitz-admin-row-head">
            <span>Artikel</span>
            <span>Bestand</span>
            <span>Mindestbestand</span>
            <span>Status</span>
          </div>
          {STOCK.map((item) => (
            <div className={`kablitz-admin-row ${isBelowMin(item) ? "is-low" : ""}`} key={item.article}>
              <span>{item.article}</span>
              <span>{item.onHand} {item.unit}</span>
              <span>{item.min} {item.unit}</span>
              <span className="kablitz-admin-status">
                {isBelowMin(item) ? (
                  <><AlertTriangle size={14} /> Nachbestellen</>
                ) : (
                  <><CheckCircle2 size={14} /> Ausreichend</>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      {lowStock.length > 0 && (
        <section className="kablitz-admin-section">
          <h2><Sparkles size={18} /> Automatische Bestellvorschläge</h2>
          <div className="kablitz-admin-suggestions">
            {lowStock.map((item) => (
              <article className="kablitz-admin-suggestion" key={item.article}>
                <div>
                  <h3>{item.article}</h3>
                  <p>Bestand {item.onHand} {item.unit} liegt unter Mindestbestand ({item.min} {item.unit}).</p>
                </div>
                <div className="kablitz-admin-suggestion-actions">
                  <span className="kablitz-admin-suggestion-qty">+{item.reorderQty ?? item.min} {item.unit}</span>
                  <button type="button" className="kablitz-admin-suggestion-btn">Bestellung bestätigen</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="kablitz-admin-section">
        <h2><Truck size={18} /> Bestellungen bei Lieferanten</h2>
        <div className="kablitz-admin-table kablitz-admin-orders kablitz-admin-orders-5col">
          <div className="kablitz-admin-row kablitz-admin-row-head">
            <span>Lieferant</span>
            <span>Projekt / Anlage</span>
            <span>Bestellt am</span>
            <span>Erwartet am</span>
            <span>Status</span>
          </div>
          {ORDERS.map((order) => (
            <div className={`kablitz-admin-row ${order.status === "verspätet" ? "is-late" : ""}`} key={order.supplier}>
              <span>{order.supplier}</span>
              <span className="kablitz-admin-project">{order.project}</span>
              <span>{order.ordered}</span>
              <span>{order.expected}</span>
              <span className="kablitz-admin-status">
                {order.status === "verspätet" && <><Clock size={14} /> {order.daysLate} Tage verspätet</>}
                {order.status === "unterwegs" && <>Unterwegs</>}
                {order.status === "erhalten" && <><CheckCircle2 size={14} /> Erhalten</>}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="kablitz-admin-section">
        <h2><ClipboardCheck size={18} /> Wareneingangsprüfung</h2>
        <div className="kablitz-admin-receiving">
          {RECEIVING_CHECKS.map((check) => (
            <article className={`kablitz-admin-receiving-card ${check.ok ? "" : "is-mismatch"}`} key={check.article}>
              <div>
                <h3>{check.article}</h3>
                <p>{check.supplier} · bestellt {check.orderedQty}, geliefert {check.deliveredQty}</p>
              </div>
              <span className="kablitz-admin-status">
                {check.ok ? (
                  <><CheckCircle2 size={14} /> Menge stimmt</>
                ) : (
                  <><AlertTriangle size={14} /> Abweichung — prüfen</>
                )}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="kablitz-admin-section">
        <h2><Star size={18} /> Lieferantenbewertung</h2>
        <div className="kablitz-admin-scores">
          {SUPPLIER_SCORES.map((score) => (
            <article className="kablitz-admin-score-card" key={score.supplier}>
              <div className="kablitz-admin-score-head">
                <h3>{score.supplier}</h3>
                <span className={`kablitz-admin-score-value ${score.onTimeRate < 75 ? "is-low" : ""}`}>{score.onTimeRate}%</span>
              </div>
              <div className="kablitz-admin-score-bar">
                <span style={{ width: `${score.onTimeRate}%` }} />
              </div>
              <p>Liefertreue · Ø {score.avgDelayDays.toFixed(1)} Tage Verzug · {score.complaintRate}% Reklamationen</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
