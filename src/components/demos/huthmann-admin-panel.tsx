"use client";

import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CalendarClock,
  Car,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  History,
  LayoutDashboard,
  PackageSearch,
  ScanLine,
  Settings,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import type { LeadProfile } from "@/lib/lead-schema";

type ViewKey =
  | "dashboard"
  | "calendar"
  | "vehicles"
  | "diagnostics"
  | "parts"
  | "inspection"
  | "restoration"
  | "followups"
  | "reports"
  | "settings";

type NavItem = { key: ViewKey; label: string; icon: ReactNode; done: boolean };
type Appointment = { time: string; customer: string; vehicle: string; job: string; bay: string; state: "confirmed" | "waiting" | "urgent" };
type VehicleJob = { plate: string; vehicle: string; customer: string; service: string; status: string; progress: number; due: string };
type Diagnostic = { vehicle: string; code: string; finding: string; action: string; severity: "ok" | "warn" | "critical" };
type Part = { item: string; vehicle: string; stock: number; min: number; supplier: string; eta: string };
type Inspection = { vehicle: string; type: "TUEV" | "AU" | "Inspektion"; due: string; state: "ready" | "due" | "overdue" };
type Restoration = { vehicle: string; phase: string; next: string; progress: number; owner: string };
type FollowUp = { customer: string; vehicle: string; topic: string; due: string; state: "open" | "draft" | "done" };

const NAV: NavItem[] = [
  { key: "dashboard", label: "Uebersicht", icon: <LayoutDashboard size={17} />, done: true },
  { key: "calendar", label: "Termine", icon: <CalendarClock size={17} />, done: true },
  { key: "vehicles", label: "Fahrzeuge", icon: <Car size={17} />, done: true },
  { key: "diagnostics", label: "Diagnose", icon: <ScanLine size={17} />, done: true },
  { key: "parts", label: "Teile & Reifen", icon: <PackageSearch size={17} />, done: true },
  { key: "inspection", label: "TUEV / AU", icon: <ShieldCheck size={17} />, done: true },
  { key: "restoration", label: "Oldtimer", icon: <Sparkles size={17} />, done: true },
  { key: "followups", label: "Follow-up", icon: <FileText size={17} />, done: true },
  { key: "reports", label: "Auswertung", icon: <BarChart3 size={17} />, done: false },
  { key: "settings", label: "Einstellungen", icon: <Settings size={17} />, done: false },
];

const APPOINTMENTS: Appointment[] = [
  { time: "08:15", customer: "Maier", vehicle: "BMW E30 M3", job: "Leerlauf / ECU Diagnose", bay: "Buehne 1", state: "urgent" },
  { time: "09:30", customer: "Schmitt", vehicle: "Audi A4 Avant", job: "TUEV + Bremsencheck", bay: "Buehne 2", state: "confirmed" },
  { time: "11:00", customer: "Koenig", vehicle: "VW Golf GTI", job: "Fahrwerk / Achsvermessung", bay: "Buehne 3", state: "waiting" },
  { time: "14:15", customer: "Fischer", vehicle: "Mercedes W123", job: "Oldtimer Karosserie", bay: "Karosserie", state: "confirmed" },
];

const VEHICLES: VehicleJob[] = [
  { plate: "TBB HM 30", vehicle: "BMW E30 M3", customer: "Maier", service: "ECU Diagnose + Abstimmung", status: "Pruefung laeuft", progress: 62, due: "Heute 16:00" },
  { plate: "MGB AU 41", vehicle: "Audi A4 Avant", customer: "Schmitt", service: "TUEV / AU + Bremse", status: "Teile bestellt", progress: 44, due: "Morgen 10:30" },
  { plate: "WUE GT 86", vehicle: "VW Golf GTI", customer: "Koenig", service: "Fahrwerk Setup", status: "Wartet auf Freigabe", progress: 28, due: "02.07." },
  { plate: "BAD W123", vehicle: "Mercedes W123", customer: "Fischer", service: "Restauration", status: "Blechphase", progress: 51, due: "Langzeit" },
];

const DIAGNOSTICS: Diagnostic[] = [
  { vehicle: "BMW E30 M3", code: "Lambda / Gemisch", finding: "Unruhiger Warmlauf, Sensorwerte springen.", action: "Messfahrt + Sensor gegenpruefen", severity: "warn" },
  { vehicle: "Audi A4 Avant", code: "Bremsverschleiss", finding: "Belag vorne links unter Grenze.", action: "Kostenvoranschlag senden", severity: "critical" },
  { vehicle: "VW Golf GTI", code: "Fahrwerk", finding: "Sturzwerte ausserhalb Setup-Ziel.", action: "Achsvermessung nachjustieren", severity: "warn" },
  { vehicle: "Mercedes W123", code: "Karosserie", finding: "Schweller rechts dokumentiert.", action: "Fotoprotokoll anlegen", severity: "ok" },
];

const PARTS: Part[] = [
  { item: "Bremsscheiben Satz vorne", vehicle: "Audi A4 Avant", stock: 0, min: 1, supplier: "Stahlgruber", eta: "Morgen 08:00" },
  { item: "Lambda-Sonde Bosch", vehicle: "BMW E30 M3", stock: 1, min: 1, supplier: "WM SE", eta: "Lager" },
  { item: "Reifen 225/40 R18", vehicle: "VW Golf GTI", stock: 2, min: 4, supplier: "Reifen Gross", eta: "03.07." },
  { item: "Schwellerblech rechts", vehicle: "Mercedes W123", stock: 0, min: 1, supplier: "Classic Parts", eta: "07.07." },
];

const INSPECTIONS: Inspection[] = [
  { vehicle: "Audi A4 Avant", type: "TUEV", due: "2026-07-01", state: "due" },
  { vehicle: "Audi A4 Avant", type: "AU", due: "2026-07-01", state: "due" },
  { vehicle: "BMW E30 M3", type: "Inspektion", due: "2026-06-28", state: "overdue" },
  { vehicle: "VW Golf GTI", type: "Inspektion", due: "2026-08-14", state: "ready" },
];

const RESTORATIONS: Restoration[] = [
  { vehicle: "Mercedes W123", phase: "Blech / Zinn", next: "Fotodoku und Freigabe Schweller", progress: 51, owner: "Fischer" },
  { vehicle: "BMW E21", phase: "Innenraum", next: "Sattlertermin bestaetigen", progress: 73, owner: "Referenzprojekt" },
  { vehicle: "Porsche 944", phase: "Demontage", next: "Teileliste erstellen", progress: 18, owner: "Neumann" },
];

const FOLLOWUPS: FollowUp[] = [
  { customer: "Schmitt", vehicle: "Audi A4 Avant", topic: "KVA Bremsen freigeben", due: "Heute", state: "draft" },
  { customer: "Maier", vehicle: "BMW E30 M3", topic: "Messfahrt-Protokoll senden", due: "Heute", state: "open" },
  { customer: "Koenig", vehicle: "VW Golf GTI", topic: "Setup-Wunsch bestaetigen", due: "Morgen", state: "open" },
  { customer: "Fischer", vehicle: "Mercedes W123", topic: "Restaurationsfotos", due: "Erledigt", state: "done" },
];

const PLACEHOLDER_COPY: Record<string, string> = {
  reports: "Monatsauswertung fuer Umsatz nach Leistungsbereich, Buehnenauslastung, Teilemarge und wiederkehrende Kunden.",
  settings: "Mitarbeiter, Buehnen, Standardpreise, Erinnerungstexte und Rollenrechte verwalten.",
};

const lowParts = PARTS.filter((item) => item.stock < item.min);
const urgentAppointments = APPOINTMENTS.filter((item) => item.state === "urgent" || item.state === "waiting");
const dueInspections = INSPECTIONS.filter((item) => item.state !== "ready");
const openFollowups = FOLLOWUPS.filter((item) => item.state !== "done");

export function HuthmannAdminPanel({ lead }: { lead: LeadProfile }) {
  const [view, setView] = useState<ViewKey>("dashboard");
  const active = NAV.find((item) => item.key === view)!;

  return (
    <div className="huth-admin-panel">
      <aside className="huth-admin-sidebar">
        <div className="huth-admin-brand">
          <span className="huth-admin-mark"><Gauge size={18} /></span>
          <strong>huthmann</strong>
          <small>Werkstatt-Cockpit</small>
        </div>
        <nav className="huth-admin-nav" aria-label="Admin Navigation">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`huth-admin-navitem ${view === item.key ? "is-active" : ""} ${item.done ? "" : "is-wip"}`}
              onClick={() => setView(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
              {!item.done && <i aria-label="In Entwicklung" />}
            </button>
          ))}
        </nav>
        <Link className="huth-admin-back" href={`/demo/${lead.slug}`}>
          <ArrowLeft size={15} /> Zurueck zur Demo
        </Link>
      </aside>

      <section className="huth-admin-main">
        <header className="huth-admin-topbar">
          <div>
            <h1>{active.label}</h1>
            <p>{lead.businessName} - operative Konzept-Vorschau</p>
          </div>
          <span>Fiktive Daten</span>
        </header>
        <div className="huth-admin-content">
          {view === "dashboard" && <DashboardView onJump={setView} />}
          {view === "calendar" && <CalendarView />}
          {view === "vehicles" && <VehiclesView />}
          {view === "diagnostics" && <DiagnosticsView />}
          {view === "parts" && <PartsView />}
          {view === "inspection" && <InspectionView />}
          {view === "restoration" && <RestorationView />}
          {view === "followups" && <FollowupsView />}
          {!active.done && <Placeholder title={active.label} copy={PLACEHOLDER_COPY[active.key]} />}
        </div>
      </section>
    </div>
  );
}

function DashboardView({ onJump }: { onJump: (view: ViewKey) => void }) {
  return (
    <>
      <div className="huth-admin-alerts">
        {urgentAppointments.map((item) => (
          <button className={`huth-admin-alert is-${item.state}`} type="button" key={item.time} onClick={() => onJump("calendar")}>
            <AlertTriangle size={18} />
            <span>{item.time} - {item.vehicle}: {item.job}</span>
          </button>
        ))}
      </div>
      <div className="huth-admin-tiles">
        <Tile label="Termine heute" value={APPOINTMENTS.length} tone="neutral" onClick={() => onJump("calendar")} />
        <Tile label="Fahrzeuge aktiv" value={VEHICLES.length} tone="ok" onClick={() => onJump("vehicles")} />
        <Tile label="Diagnose offen" value={DIAGNOSTICS.filter((item) => item.severity !== "ok").length} tone="warn" onClick={() => onJump("diagnostics")} />
        <Tile label="Teile knapp" value={lowParts.length} tone="danger" onClick={() => onJump("parts")} />
        <Tile label="TUEV / AU faellig" value={dueInspections.length} tone="warn" onClick={() => onJump("inspection")} />
        <Tile label="Follow-ups" value={openFollowups.length} tone="neutral" onClick={() => onJump("followups")} />
      </div>
      <section className="huth-admin-block">
        <BlockHead icon={<Wrench size={18} />} title="Werkstatt-Auslastung" />
        <div className="huth-admin-bay-grid">
          {APPOINTMENTS.map((item) => (
            <article className="huth-admin-bay" key={item.bay}>
              <small>{item.bay}</small>
              <strong>{item.vehicle}</strong>
              <span>{item.job}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Tile({ label, value, tone, onClick }: { label: string; value: string | number; tone: string; onClick: () => void }) {
  return (
    <button className={`huth-admin-tile tone-${tone}`} type="button" onClick={onClick}>
      <strong>{value}</strong>
      <span>{label}</span>
    </button>
  );
}

function BlockHead({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="huth-admin-block-head">
      <h2>{icon} {title}</h2>
      <div className="huth-admin-tools">
        <button type="button">Export</button>
        <button type="button" className="is-primary">Aktion</button>
      </div>
    </div>
  );
}

function CalendarView() {
  return (
    <section className="huth-admin-block">
      <BlockHead icon={<CalendarClock size={18} />} title="Tagesplan mit Buehnen" />
      <div className="huth-admin-schedule">
        {APPOINTMENTS.map((item) => (
          <article className={`huth-admin-schedule-row is-${item.state}`} key={item.time + item.vehicle}>
            <span>{item.time}</span>
            <div>
              <h3>{item.vehicle}</h3>
              <p>{item.customer} - {item.job}</p>
            </div>
            <strong>{item.bay}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function VehiclesView() {
  return (
    <section className="huth-admin-block">
      <BlockHead icon={<Car size={18} />} title="Fahrzeuge in Arbeit" />
      <DataTable columns="1.1fr 1.3fr 1.4fr 1fr 1fr" heads={["Kennz.", "Fahrzeug", "Auftrag", "Status", "Faellig"]}>
        {VEHICLES.map((item) => (
          <div className="huth-admin-row" key={item.plate}>
            <span>{item.plate}</span>
            <span><strong>{item.vehicle}</strong><small>{item.customer}</small></span>
            <span>{item.service}</span>
            <span><Progress value={item.progress} label={item.status} /></span>
            <span>{item.due}</span>
          </div>
        ))}
      </DataTable>
    </section>
  );
}

function DiagnosticsView() {
  return (
    <section className="huth-admin-block">
      <BlockHead icon={<ScanLine size={18} />} title="Diagnose & Freigaben" />
      <div className="huth-admin-cards">
        {DIAGNOSTICS.map((item) => (
          <article className={`huth-admin-card tone-${item.severity}`} key={item.vehicle + item.code}>
            <div>
              <small>{item.vehicle}</small>
              <h3>{item.code}</h3>
              <p>{item.finding}</p>
            </div>
            <span>{item.action}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function PartsView() {
  return (
    <section className="huth-admin-block">
      <BlockHead icon={<PackageSearch size={18} />} title="Teile, Reifen & Lieferstatus" />
      <DataTable columns="1.7fr 1.3fr .8fr 1.1fr 1fr" heads={["Teil", "Fahrzeug", "Bestand", "Lieferant", "ETA"]}>
        {PARTS.map((item) => (
          <div className={`huth-admin-row ${item.stock < item.min ? "is-low" : ""}`} key={item.item}>
            <span>{item.item}</span>
            <span>{item.vehicle}</span>
            <span>{item.stock} / {item.min}</span>
            <span>{item.supplier}</span>
            <span className="huth-admin-status">{item.stock < item.min ? <><AlertTriangle size={14} /> {item.eta}</> : <><CheckCircle2 size={14} /> Lager</>}</span>
          </div>
        ))}
      </DataTable>
    </section>
  );
}

function InspectionView() {
  return (
    <section className="huth-admin-block">
      <BlockHead icon={<ShieldCheck size={18} />} title="TUEV / AU / Inspektion" />
      <DataTable columns="1.6fr 1fr 1fr 1.4fr" heads={["Fahrzeug", "Typ", "Faellig", "Status"]}>
        {INSPECTIONS.map((item) => (
          <div className={`huth-admin-row is-${item.state}`} key={item.vehicle + item.type}>
            <span>{item.vehicle}</span>
            <span>{item.type}</span>
            <span>{item.due}</span>
            <span className="huth-admin-status">{item.state === "ready" ? <><CheckCircle2 size={14} /> OK</> : <><AlertTriangle size={14} /> Einplanen</>}</span>
          </div>
        ))}
      </DataTable>
    </section>
  );
}

function RestorationView() {
  return (
    <section className="huth-admin-block">
      <BlockHead icon={<Sparkles size={18} />} title="Oldtimer-Restaurationen" />
      <div className="huth-admin-cards">
        {RESTORATIONS.map((item) => (
          <article className="huth-admin-card tone-ok" key={item.vehicle}>
            <div>
              <small>{item.owner}</small>
              <h3>{item.vehicle}</h3>
              <p>{item.phase} - {item.next}</p>
            </div>
            <Progress value={item.progress} label={`${item.progress}%`} />
          </article>
        ))}
      </div>
    </section>
  );
}

function FollowupsView() {
  return (
    <section className="huth-admin-block">
      <BlockHead icon={<FileText size={18} />} title="Kunden-Follow-up & Rechnung" />
      <div className="huth-admin-schedule">
        {FOLLOWUPS.map((item) => (
          <article className={`huth-admin-schedule-row is-${item.state}`} key={item.customer + item.topic}>
            <span>{item.due}</span>
            <div>
              <h3>{item.customer} - {item.vehicle}</h3>
              <p>{item.topic}</p>
            </div>
            <strong>{item.state === "draft" ? "Entwurf" : item.state === "done" ? "Erledigt" : "Offen"}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function DataTable({ columns, heads, children }: { columns: string; heads: string[]; children: ReactNode }) {
  return (
    <div className="huth-admin-table" style={{ "--cols": columns } as CSSProperties}>
      <div className="huth-admin-row huth-admin-row-head">
        {heads.map((head) => <span key={head}>{head}</span>)}
      </div>
      {children}
    </div>
  );
}

function Progress({ value, label }: { value: number; label: string }) {
  return (
    <span className="huth-admin-progress">
      <i><b style={{ width: `${value}%` }} /></i>
      <small>{label}</small>
    </span>
  );
}

function Placeholder({ title, copy }: { title: string; copy: string }) {
  return (
    <section className="huth-admin-placeholder">
      <History size={22} />
      <h2>{title}</h2>
      <p>{copy}</p>
    </section>
  );
}
