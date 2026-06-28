"use client";

import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  History,
  LayoutDashboard,
  PackageSearch,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { LeadProfile } from "@/lib/lead-schema";

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

const isBelowMin = (item: StockItem) => item.onHand < item.min;
const lowStock = STOCK.filter(isBelowMin);
const lateOrders = ORDERS.filter((o) => o.status === "verspätet");
const avgOnTime = Math.round(SUPPLIER_SCORES.reduce((s, x) => s + x.onTimeRate, 0) / SUPPLIER_SCORES.length);

type ViewKey =
  | "dashboard"
  | "stock"
  | "orders"
  | "receiving"
  | "suppliers"
  | "approvals"
  | "movements"
  | "reports"
  | "settings";

type NavItem = { key: ViewKey; label: string; icon: ReactNode; done: boolean };

const NAV: NavItem[] = [
  { key: "dashboard", label: "Übersicht", icon: <LayoutDashboard size={17} />, done: true },
  { key: "stock", label: "Lagerbestand", icon: <PackageSearch size={17} />, done: true },
  { key: "orders", label: "Bestellungen", icon: <Truck size={17} />, done: true },
  { key: "receiving", label: "Wareneingang", icon: <ClipboardCheck size={17} />, done: true },
  { key: "suppliers", label: "Lieferanten", icon: <Star size={17} />, done: true },
  { key: "approvals", label: "Genehmigungen", icon: <ShieldCheck size={17} />, done: false },
  { key: "movements", label: "Lagerbewegungen", icon: <History size={17} />, done: false },
  { key: "reports", label: "Berichte", icon: <BarChart3 size={17} />, done: false },
  { key: "settings", label: "Einstellungen", icon: <Settings size={17} />, done: false },
];

const PLACEHOLDER_COPY: Record<string, string> = {
  approvals: "Mehrstufige Freigabe von Bestellungen ab einem definierten Betrag.",
  movements: "Lückenlose Historie jeder Bestandsbewegung — exportierbar für Audits.",
  reports: "Auswertungen zu Verbrauch, Liefertreue und Beständen.",
  settings: "Benutzer, Rollen, Mindestbestände und Benachrichtigungen verwalten.",
};

export function KablitzAdminPanel({ lead }: { lead: LeadProfile }) {
  const [view, setView] = useState<ViewKey>("dashboard");
  const active = NAV.find((n) => n.key === view)!;

  return (
    <div className="kablitz-panel">
      <aside className="kablitz-panel-sidebar">
        <div className="kablitz-panel-brand">
          <Image src="/leads/kablitz-gmbh-r4t9k2/logo-kablitz.png" alt="Kablitz" width={120} height={17} unoptimized />
          <span>Beschaffung &amp; Lager</span>
        </div>
        <nav className="kablitz-panel-nav">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`kablitz-panel-navitem ${view === item.key ? "is-active" : ""} ${item.done ? "" : "is-wip"}`}
              onClick={() => setView(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
              {!item.done && <em className="kablitz-panel-dot" aria-label="In Entwicklung" />}
            </button>
          ))}
        </nav>
        <Link className="kablitz-panel-back" href={`/demo/${lead.slug}`}>
          <ArrowLeft size={15} /> Zurück zur Demo
        </Link>
      </aside>

      <main className="kablitz-panel-main">
        <header className="kablitz-panel-topbar">
          <div>
            <h1>{active.label}</h1>
            <p>{lead.businessName} · Konzept-Vorschau</p>
          </div>
          <span className="kablitz-panel-demo-tag">Fiktive Daten · nichts wird gespeichert</span>
        </header>

        <div className="kablitz-panel-content">
          {view === "dashboard" && <DashboardView />}
          {view === "stock" && <StockView />}
          {view === "orders" && <OrdersView />}
          {view === "receiving" && <ReceivingView />}
          {view === "suppliers" && <SuppliersView />}
          {!active.done && <RedPlaceholder title={active.label} copy={PLACEHOLDER_COPY[active.key]} />}
        </div>
      </main>
    </div>
  );
}

function RedPlaceholder({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="kablitz-panel-wip">
      <span className="kablitz-panel-wip-badge">In Entwicklung</span>
      <h2>{title}</h2>
      <p>{copy}</p>
      <p className="kablitz-panel-wip-note">Dieses Modul ist Teil des geplanten Funktionsumfangs und noch nicht umgesetzt.</p>
    </div>
  );
}

function DashboardView() {
  const tiles = [
    { label: "Unter Mindestbestand", value: lowStock.length, tone: "warn" },
    { label: "Überfällige Lieferungen", value: lateOrders.length, tone: "danger" },
    { label: "Offene Bestellungen", value: ORDERS.filter((o) => o.status !== "erhalten").length, tone: "neutral" },
    { label: "Ø Liefertreue", value: `${avgOnTime}%`, tone: "ok" },
  ];
  return (
    <>
      {(lowStock.length > 0 || lateOrders.length > 0) && (
        <div className="kablitz-admin-alerts">
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
        </div>
      )}
      <div className="kablitz-panel-tiles">
        {tiles.map((t) => (
          <article key={t.label} className={`kablitz-panel-tile tone-${t.tone}`}>
            <strong>{t.value}</strong>
            <span>{t.label}</span>
          </article>
        ))}
      </div>
    </>
  );
}

function StockView() {
  return (
    <>
      <section className="kablitz-admin-block">
        <h2><PackageSearch size={18} /> Lagerbestand &amp; Mindestbestand</h2>
        <div className="kablitz-admin-table">
          <div className="kablitz-admin-row kablitz-admin-row-head">
            <span>Artikel</span><span>Bestand</span><span>Mindestbestand</span><span>Status</span>
          </div>
          {STOCK.map((item) => (
            <div className={`kablitz-admin-row ${isBelowMin(item) ? "is-low" : ""}`} key={item.article}>
              <span>{item.article}</span>
              <span>{item.onHand} {item.unit}</span>
              <span>{item.min} {item.unit}</span>
              <span className="kablitz-admin-status">
                {isBelowMin(item) ? <><AlertTriangle size={14} /> Nachbestellen</> : <><CheckCircle2 size={14} /> Ausreichend</>}
              </span>
            </div>
          ))}
        </div>
      </section>

      {lowStock.length > 0 && (
        <section className="kablitz-admin-block">
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
    </>
  );
}

function OrdersView() {
  return (
    <section className="kablitz-admin-block">
      <h2><Truck size={18} /> Bestellungen bei Lieferanten</h2>
      <div className="kablitz-admin-table kablitz-admin-orders-5col">
        <div className="kablitz-admin-row kablitz-admin-row-head">
          <span>Lieferant</span><span>Projekt / Anlage</span><span>Bestellt am</span><span>Erwartet am</span><span>Status</span>
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
  );
}

function ReceivingView() {
  return (
    <section className="kablitz-admin-block">
      <h2><ClipboardCheck size={18} /> Wareneingangsprüfung</h2>
      <div className="kablitz-admin-receiving">
        {RECEIVING_CHECKS.map((check) => (
          <article className={`kablitz-admin-receiving-card ${check.ok ? "" : "is-mismatch"}`} key={check.article}>
            <div>
              <h3>{check.article}</h3>
              <p>{check.supplier} · bestellt {check.orderedQty}, geliefert {check.deliveredQty}</p>
            </div>
            <span className="kablitz-admin-status">
              {check.ok ? <><CheckCircle2 size={14} /> Menge stimmt</> : <><AlertTriangle size={14} /> Abweichung — prüfen</>}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function SuppliersView() {
  return (
    <section className="kablitz-admin-block">
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
  );
}
