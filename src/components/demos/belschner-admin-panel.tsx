"use client";

import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  PackageSearch,
  Receipt,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { LeadProfile } from "@/lib/lead-schema";

type Job = {
  customer: string;
  address: string;
  type: string;
  tech: string;
  status: "geplant" | "in Arbeit" | "wartet auf Material" | "erledigt";
};
type Appointment = { time: string; tech: string; customer: string; task: string };
type Inspection = {
  customer: string;
  object: string;
  type: "DGUV V3" | "E-Check";
  due: string;
  state: "überfällig" | "fällig" | "geplant";
  daysToDue: number;
};
type StockItem = { article: string; onHand: number; min: number; unit: string; reorderQty?: number };

const JOBS: Job[] = [
  { customer: "Bäckerei Hofmann", address: "Marktplatz 4, Weikersheim", type: "Störung — Sicherung fällt", tech: "M. Belschner", status: "in Arbeit" },
  { customer: "Familie Krauß", address: "Tauberweg 11, Weikersheim", type: "Smart-Home Erweiterung", tech: "T. Vogel", status: "geplant" },
  { customer: "Autohaus Renner", address: "Industriestr. 8, Niederstetten", type: "Wallbox-Installation", tech: "L. Sahin", status: "wartet auf Material" },
  { customer: "Praxis Dr. Lang", address: "Schulstr. 2, Weikersheim", type: "Neuinstallation Beleuchtung", tech: "T. Vogel", status: "geplant" },
  { customer: "Wohnpark Tauberhöhe", address: "Am Hang 5, Weikersheim", type: "Zählerplatz erneuern", tech: "M. Belschner", status: "erledigt" },
];

const APPOINTMENTS: Appointment[] = [
  { time: "08:00", tech: "M. Belschner", customer: "Bäckerei Hofmann", task: "Störungssuche Verteilung" },
  { time: "10:30", tech: "T. Vogel", customer: "Praxis Dr. Lang", task: "Aufmaß Beleuchtung" },
  { time: "13:00", tech: "L. Sahin", customer: "Autohaus Renner", task: "Wallbox — Material prüfen" },
  { time: "15:30", tech: "T. Vogel", customer: "Familie Krauß", task: "KNX-Komponenten setzen" },
];

const INSPECTIONS: Inspection[] = [
  { customer: "Autohaus Renner", object: "Werkstatt — ortsveränderliche Geräte", type: "DGUV V3", due: "2026-06-18", state: "überfällig", daysToDue: -11 },
  { customer: "Bäckerei Hofmann", object: "Backstube — Anlage & Geräte", type: "DGUV V3", due: "2026-07-04", state: "fällig", daysToDue: 5 },
  { customer: "Praxis Dr. Lang", object: "Praxisräume — E-Check", type: "E-Check", due: "2026-07-12", state: "fällig", daysToDue: 13 },
  { customer: "Wohnpark Tauberhöhe", object: "Allgemeinanlage Treppenhaus", type: "E-Check", due: "2026-09-01", state: "geplant", daysToDue: 64 },
];

const STOCK: StockItem[] = [
  { article: "Leitung NYM-J 3x1,5", onHand: 120, min: 300, unit: "m", reorderQty: 500 },
  { article: "FI/LS-Schalter 16A", onHand: 4, min: 12, unit: "Stk.", reorderQty: 20 },
  { article: "KNX Taster 2-fach", onHand: 9, min: 8, unit: "Stk." },
  { article: "Wallbox 11 kW", onHand: 0, min: 2, unit: "Stk.", reorderQty: 3 },
  { article: "Steckdose UP reinweiß", onHand: 85, min: 40, unit: "Stk." },
];

const isBelowMin = (item: StockItem) => item.onHand < item.min;
const lowStock = STOCK.filter(isBelowMin);
const openJobs = JOBS.filter((j) => j.status !== "erledigt");
const overdueInspections = INSPECTIONS.filter((i) => i.state === "überfällig");
const dueInspections = INSPECTIONS.filter((i) => i.state === "überfällig" || i.state === "fällig");

type ViewKey =
  | "dashboard"
  | "jobs"
  | "schedule"
  | "inspections"
  | "stock"
  | "offers"
  | "invoices"
  | "customers"
  | "settings";

type NavItem = { key: ViewKey; label: string; icon: ReactNode; done: boolean };

const NAV: NavItem[] = [
  { key: "dashboard", label: "Übersicht", icon: <BarChart3 size={17} />, done: true },
  { key: "jobs", label: "Aufträge", icon: <ClipboardList size={17} />, done: true },
  { key: "schedule", label: "Disposition / Termine", icon: <CalendarClock size={17} />, done: true },
  { key: "inspections", label: "Prüfungen (DGUV V3 / E-Check)", icon: <ShieldCheck size={17} />, done: true },
  { key: "stock", label: "Material / Lager", icon: <PackageSearch size={17} />, done: true },
  { key: "offers", label: "Angebote", icon: <FileText size={17} />, done: false },
  { key: "invoices", label: "Rechnungen", icon: <Receipt size={17} />, done: false },
  { key: "customers", label: "Kunden", icon: <Users size={17} />, done: false },
  { key: "settings", label: "Einstellungen", icon: <Settings size={17} />, done: false },
];

const PLACEHOLDER_COPY: Record<string, string> = {
  offers: "Angebote per Vorlage erstellen, versenden und in Aufträge umwandeln.",
  invoices: "Aus erledigten Aufträgen Rechnungen erzeugen — inkl. Zahlungsstatus.",
  customers: "Kundenstamm mit Objekten, Anlagen und Prüfhistorie an einem Ort.",
  settings: "Benutzer, Rollen, Prüfintervalle, Mindestbestände und Benachrichtigungen.",
};

export function BelschnerAdminPanel({ lead }: { lead: LeadProfile }) {
  const [view, setView] = useState<ViewKey>("dashboard");
  const active = NAV.find((n) => n.key === view)!;

  return (
    <div className="belschner-panel">
      <aside className="belschner-panel-sidebar">
        <div className="belschner-panel-brand">
          <Image src="/leads/belschner-elektrotechnik-w7k4n2/logo.svg" alt="Belschner Elektrotechnik" width={150} height={41} unoptimized />
          <span>Auftrags- &amp; Prüfungsmanagement</span>
        </div>
        <nav className="belschner-panel-nav">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`belschner-panel-navitem ${view === item.key ? "is-active" : ""} ${item.done ? "" : "is-wip"}`}
              onClick={() => setView(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
              {!item.done && <em className="belschner-panel-dot" aria-label="In Entwicklung" />}
            </button>
          ))}
        </nav>
        <Link className="belschner-panel-back" href={`/demo/${lead.slug}`}>
          <ArrowLeft size={15} /> Zurück zur Demo
        </Link>
      </aside>

      <main className="belschner-panel-main">
        <header className="belschner-panel-topbar">
          <div>
            <h1>{active.label}</h1>
            <p>{lead.businessName} · Konzept-Vorschau</p>
          </div>
          <span className="belschner-panel-demo-tag">Fiktive Daten · nichts wird gespeichert</span>
        </header>

        <div className="belschner-panel-content">
          {view === "dashboard" && <DashboardView onJump={setView} />}
          {view === "jobs" && <JobsView />}
          {view === "schedule" && <ScheduleView />}
          {view === "inspections" && <InspectionsView />}
          {view === "stock" && <StockView />}
          {!active.done && <RedPlaceholder title={active.label} copy={PLACEHOLDER_COPY[active.key]} />}
        </div>
      </main>
    </div>
  );
}

function RedPlaceholder({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="belschner-panel-wip">
      <span className="belschner-panel-wip-badge">In Entwicklung</span>
      <h2>{title}</h2>
      <p>{copy}</p>
      <p className="belschner-panel-wip-note">Dieses Modul ist Teil des geplanten Funktionsumfangs und noch nicht umgesetzt.</p>
    </div>
  );
}

function DashboardView({ onJump }: { onJump: (v: ViewKey) => void }) {
  const tiles = [
    { label: "Prüfungen überfällig", value: overdueInspections.length, tone: "danger" },
    { label: "Offene Aufträge", value: openJobs.length, tone: "neutral" },
    { label: "Termine heute", value: APPOINTMENTS.length, tone: "ok" },
    { label: "Material unter Mindestbestand", value: lowStock.length, tone: "warn" },
  ];
  return (
    <>
      {(overdueInspections.length > 0 || lowStock.length > 0) && (
        <div className="belschner-admin-alerts">
          {overdueInspections.length > 0 && (
            <button type="button" className="belschner-admin-alert is-danger" onClick={() => onJump("inspections")}>
              <ShieldCheck size={18} />
              <span>{overdueInspections.length} Prüfung(en) überfällig — gesetzliche Frist (DGUV V3) verstrichen. Termin vereinbaren.</span>
            </button>
          )}
          {lowStock.length > 0 && (
            <button type="button" className="belschner-admin-alert is-warning" onClick={() => onJump("stock")}>
              <AlertTriangle size={18} />
              <span>{lowStock.length} Artikel unter Mindestbestand — Nachbestellung erforderlich.</span>
            </button>
          )}
        </div>
      )}
      <div className="belschner-panel-tiles">
        {tiles.map((t) => (
          <article key={t.label} className={`belschner-panel-tile tone-${t.tone}`}>
            <strong>{t.value}</strong>
            <span>{t.label}</span>
          </article>
        ))}
      </div>

      <section className="belschner-admin-block">
        <h2><ShieldCheck size={18} /> Nächste Prüffristen</h2>
        <div className="belschner-admin-receiving">
          {dueInspections.map((insp) => (
            <article className={`belschner-admin-receiving-card ${insp.state === "überfällig" ? "is-mismatch" : ""}`} key={insp.customer + insp.object}>
              <div>
                <h3>{insp.customer} · {insp.type}</h3>
                <p>{insp.object} · fällig {insp.due}</p>
              </div>
              <span className="belschner-admin-status">
                {insp.state === "überfällig"
                  ? <><AlertTriangle size={14} /> {Math.abs(insp.daysToDue)} Tage überfällig</>
                  : <><Clock size={14} /> in {insp.daysToDue} Tagen</>}
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function JobsView() {
  return (
    <section className="belschner-admin-block">
      <h2><ClipboardList size={18} /> Aufträge</h2>
      <div className="belschner-admin-table belschner-admin-jobs-5col">
        <div className="belschner-admin-row belschner-admin-row-head">
          <span>Kunde</span><span>Adresse</span><span>Auftrag</span><span>Techniker</span><span>Status</span>
        </div>
        {JOBS.map((job) => (
          <div className={`belschner-admin-row ${job.status === "wartet auf Material" ? "is-late" : ""}`} key={job.customer}>
            <span>{job.customer}</span>
            <span className="belschner-admin-project">{job.address}</span>
            <span>{job.type}</span>
            <span>{job.tech}</span>
            <span className="belschner-admin-status">
              {job.status === "erledigt" && <><CheckCircle2 size={14} /> Erledigt</>}
              {job.status === "in Arbeit" && <><Wrench size={14} /> In Arbeit</>}
              {job.status === "geplant" && <><CalendarClock size={14} /> Geplant</>}
              {job.status === "wartet auf Material" && <><Clock size={14} /> Wartet auf Material</>}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScheduleView() {
  return (
    <section className="belschner-admin-block">
      <h2><CalendarClock size={18} /> Disposition — heute, {APPOINTMENTS.length} Termine</h2>
      <div className="belschner-admin-schedule">
        {APPOINTMENTS.map((appt) => (
          <article className="belschner-admin-schedule-row" key={appt.time + appt.customer}>
            <span className="belschner-admin-schedule-time">{appt.time}</span>
            <div className="belschner-admin-schedule-body">
              <h3>{appt.customer}</h3>
              <p>{appt.task}</p>
            </div>
            <span className="belschner-admin-schedule-tech">{appt.tech}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function InspectionsView() {
  return (
    <>
      <section className="belschner-admin-block">
        <h2><ShieldCheck size={18} /> Prüfungen — DGUV V3 &amp; E-Check</h2>
        <div className="belschner-admin-table belschner-admin-insp-5col">
          <div className="belschner-admin-row belschner-admin-row-head">
            <span>Kunde</span><span>Prüfobjekt</span><span>Art</span><span>Fällig am</span><span>Status</span>
          </div>
          {INSPECTIONS.map((insp) => (
            <div className={`belschner-admin-row ${insp.state === "überfällig" ? "is-late" : insp.state === "fällig" ? "is-low" : ""}`} key={insp.customer + insp.object}>
              <span>{insp.customer}</span>
              <span className="belschner-admin-project">{insp.object}</span>
              <span>{insp.type}</span>
              <span>{insp.due}</span>
              <span className="belschner-admin-status">
                {insp.state === "überfällig" && <><AlertTriangle size={14} /> {Math.abs(insp.daysToDue)} Tage überfällig</>}
                {insp.state === "fällig" && <><Clock size={14} /> in {insp.daysToDue} Tagen</>}
                {insp.state === "geplant" && <><CheckCircle2 size={14} /> geplant</>}
              </span>
            </div>
          ))}
        </div>
      </section>

      {dueInspections.length > 0 && (
        <section className="belschner-admin-block">
          <h2><Sparkles size={18} /> Erinnerung an Kunden senden</h2>
          <div className="belschner-admin-suggestions">
            {dueInspections.map((insp) => (
              <article className="belschner-admin-suggestion" key={insp.customer + insp.object}>
                <div>
                  <h3>{insp.customer} · {insp.type}</h3>
                  <p>{insp.object} — fällig {insp.due}{insp.state === "überfällig" ? " (überfällig)" : ""}.</p>
                </div>
                <div className="belschner-admin-suggestion-actions">
                  <span className="belschner-admin-suggestion-qty">Termin {insp.due}</span>
                  <button type="button" className="belschner-admin-suggestion-btn">Erinnerung senden</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function StockView() {
  return (
    <>
      <section className="belschner-admin-block">
        <h2><PackageSearch size={18} /> Material &amp; Mindestbestand</h2>
        <div className="belschner-admin-table">
          <div className="belschner-admin-row belschner-admin-row-head">
            <span>Artikel</span><span>Bestand</span><span>Mindestbestand</span><span>Status</span>
          </div>
          {STOCK.map((item) => (
            <div className={`belschner-admin-row ${isBelowMin(item) ? "is-low" : ""}`} key={item.article}>
              <span>{item.article}</span>
              <span>{item.onHand} {item.unit}</span>
              <span>{item.min} {item.unit}</span>
              <span className="belschner-admin-status">
                {isBelowMin(item) ? <><AlertTriangle size={14} /> Nachbestellen</> : <><CheckCircle2 size={14} /> Ausreichend</>}
              </span>
            </div>
          ))}
        </div>
      </section>

      {lowStock.length > 0 && (
        <section className="belschner-admin-block">
          <h2><Sparkles size={18} /> Automatische Bestellvorschläge</h2>
          <div className="belschner-admin-suggestions">
            {lowStock.map((item) => (
              <article className="belschner-admin-suggestion" key={item.article}>
                <div>
                  <h3>{item.article}</h3>
                  <p>Bestand {item.onHand} {item.unit} liegt unter Mindestbestand ({item.min} {item.unit}).</p>
                </div>
                <div className="belschner-admin-suggestion-actions">
                  <span className="belschner-admin-suggestion-qty">+{item.reorderQty ?? item.min} {item.unit}</span>
                  <button type="button" className="belschner-admin-suggestion-btn">Bestellung bestätigen</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
