"use client";

import {
  ArrowLeft,
  BarChart3,
  CalendarClock,
  CalendarDays,
  Check,
  Clock,
  Euro,
  LayoutGrid,
  MessageCircle,
  Phone,
  Scissors,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import type { LeadProfile } from "@/lib/lead-schema";

type Status = "bestätigt" | "offen" | "erschienen" | "abgesagt";
type Appt = { time: string; end: string; client: string; service: string; staff: string; price: number; status: Status };

const STAFF = ["Olga", "Marina", "Diana"];

const TODAY: Appt[] = [
  { time: "09:00", end: "10:00", client: "Sandra Köhler", service: "Gesichtsbehandlung Classic", staff: "Marina", price: 55, status: "erschienen" },
  { time: "09:30", end: "11:30", client: "Aylin Demir", service: "Wimpernverlängerung Volumen", staff: "Diana", price: 95, status: "erschienen" },
  { time: "10:15", end: "11:00", client: "Jessica Bauer", service: "Damenhaarschnitt & Föhnen", staff: "Olga", price: 39, status: "bestätigt" },
  { time: "11:00", end: "13:00", client: "Petra Lang", service: "Permanent Make-up Augenbrauen", staff: "Diana", price: 290, status: "bestätigt" },
  { time: "13:00", end: "13:45", client: "Nicole Wagner", service: "Laser-Haarentfernung", staff: "Marina", price: 45, status: "bestätigt" },
  { time: "13:30", end: "14:15", client: "Melisa Yıldız", service: "Carbon-Peeling Laser", staff: "Marina", price: 79, status: "offen" },
  { time: "15:00", end: "16:00", client: "Karin Hofmann", service: "Gesichtsbehandlung Classic", staff: "Marina", price: 55, status: "bestätigt" },
  { time: "16:30", end: "17:30", client: "Tanja Roth", service: "Damenhaarschnitt & Föhnen", staff: "Olga", price: 39, status: "offen" },
];

type Client = { name: string; visits: number; last: string; favorite: string; phone: string; vip: boolean };
const CLIENTS: Client[] = [
  { name: "Sandra Köhler", visits: 22, last: "heute", favorite: "Gesichtsbehandlung Classic", phone: "0151 2345678", vip: true },
  { name: "Aylin Demir", visits: 16, last: "heute", favorite: "Wimpernverlängerung", phone: "0160 9988776", vip: true },
  { name: "Jessica Bauer", visits: 9, last: "vor 3 Wochen", favorite: "Damenhaarschnitt", phone: "0152 5566778", vip: false },
  { name: "Petra Lang", visits: 4, last: "heute", favorite: "Permanent Make-up", phone: "0171 4433221", vip: false },
  { name: "Melisa Yıldız", visits: 7, last: "vor 4 Wochen", favorite: "Carbon-Peeling Laser", phone: "0157 1122334", vip: false },
  { name: "Karin Hofmann", visits: 13, last: "vor 2 Wochen", favorite: "Gesichtsbehandlung", phone: "0162 7766554", vip: true },
];

type Service = { name: string; duration: string; price: string; popular?: boolean };
const SERVICES: Service[] = [
  { name: "Gesichtsbehandlung Classic", duration: "60 Min.", price: "55 €", popular: true },
  { name: "Permanent Make-up Augenbrauen", duration: "120 Min.", price: "ab 290 €", popular: true },
  { name: "Wimpernverlängerung Volumen", duration: "120 Min.", price: "ab 95 €" },
  { name: "Laser-Haarentfernung (Zone)", duration: "30 Min.", price: "ab 45 €" },
  { name: "Carbon-Peeling Laser", duration: "45 Min.", price: "ab 79 €" },
  { name: "Damenhaarschnitt & Föhnen", duration: "60 Min.", price: "ab 39 €" },
];

const WEEK = [
  { day: "Mo", count: 8, load: 0.7 },
  { day: "Di", count: 10, load: 0.9 },
  { day: "Mi", count: 7, load: 0.6 },
  { day: "Do", count: 11, load: 1.0 },
  { day: "Fr", count: 11, load: 1.0 },
  { day: "Sa", count: 9, load: 0.8 },
];

const revenueToday = TODAY.filter((a) => a.status !== "abgesagt").reduce((s, a) => s + a.price, 0);
const showRate = Math.round((TODAY.filter((a) => a.status === "bestätigt" || a.status === "erschienen").length / TODAY.length) * 100);

const OPEN_MIN = 9 * 60;
const SLOT_MIN = 30;
const SLOT_COUNT = 18;
const TIME_SLOTS = Array.from({ length: SLOT_COUNT }, (_, i) => minToStr(OPEN_MIN + i * SLOT_MIN));
const DAY_LABELS = [
  { num: "6", label: "Mo" },
  { num: "7", label: "Di" },
  { num: "8", label: "Mi" },
  { num: "9", label: "Do" },
  { num: "10", label: "Fr" },
  { num: "11", label: "Sa" },
];

type WeekAppt = { day: number; time: string; end: string; client: string; service: string; staff: string; status: Status };
type CalSelection = { mode: "new"; day: number; time: string } | { mode: "view"; appt: WeekAppt } | null;
const WEEK_APPTS: WeekAppt[] = [
  { day: 0, time: "09:00", end: "10:00", client: "Sandra Köhler", service: "Gesichtsbehandlung Classic", staff: "Marina", status: "erschienen" },
  { day: 0, time: "09:30", end: "11:30", client: "Aylin Demir", service: "Wimpernverlängerung Volumen", staff: "Diana", status: "bestätigt" },
  { day: 0, time: "10:30", end: "11:15", client: "Jessica Bauer", service: "Damenhaarschnitt & Föhnen", staff: "Olga", status: "bestätigt" },
  { day: 0, time: "14:00", end: "14:45", client: "Petra Lang", service: "Laser-Haarentfernung", staff: "Marina", status: "bestätigt" },
  { day: 0, time: "15:00", end: "16:00", client: "Nicole Wagner", service: "Gesichtsbehandlung Classic", staff: "Marina", status: "offen" },
  { day: 1, time: "09:30", end: "11:30", client: "Melisa Yıldız", service: "Wimpernverlängerung Volumen", staff: "Diana", status: "bestätigt" },
  { day: 1, time: "11:00", end: "12:00", client: "Karin Hofmann", service: "Damenhaarschnitt & Föhnen", staff: "Olga", status: "bestätigt" },
  { day: 1, time: "13:00", end: "15:00", client: "Tanja Roth", service: "Permanent Make-up Augenbrauen", staff: "Diana", status: "bestätigt" },
  { day: 1, time: "15:00", end: "15:45", client: "Sabine Vogel", service: "Carbon-Peeling Laser", staff: "Marina", status: "offen" },
  { day: 2, time: "09:00", end: "10:00", client: "Laura Simon", service: "Gesichtsbehandlung Classic", staff: "Marina", status: "bestätigt" },
  { day: 2, time: "10:30", end: "12:30", client: "Emma Frank", service: "Wimpernverlängerung Volumen", staff: "Diana", status: "bestätigt" },
  { day: 2, time: "14:00", end: "14:45", client: "Nina Berg", service: "Laser-Haarentfernung", staff: "Marina", status: "bestätigt" },
  { day: 3, time: "09:00", end: "10:00", client: "Sofia Klein", service: "Gesichtsbehandlung Classic", staff: "Marina", status: "bestätigt" },
  { day: 3, time: "10:30", end: "11:30", client: "Hannah Groß", service: "Damenhaarschnitt & Föhnen", staff: "Olga", status: "bestätigt" },
  { day: 3, time: "12:00", end: "14:00", client: "Mia Weber", service: "Permanent Make-up Augenbrauen", staff: "Diana", status: "bestätigt" },
  { day: 3, time: "14:30", end: "15:15", client: "Lea Arnold", service: "Carbon-Peeling Laser", staff: "Marina", status: "offen" },
  { day: 3, time: "16:00", end: "18:00", client: "Emily Busch", service: "Wimpernverlängerung Volumen", staff: "Diana", status: "bestätigt" },
  { day: 4, time: "09:00", end: "09:45", client: "Clara Reich", service: "Laser-Haarentfernung", staff: "Marina", status: "bestätigt" },
  { day: 4, time: "10:00", end: "11:00", client: "Julia Ernst", service: "Gesichtsbehandlung Classic", staff: "Marina", status: "bestätigt" },
  { day: 4, time: "11:30", end: "12:30", client: "Anna Fuchs", service: "Damenhaarschnitt & Föhnen", staff: "Olga", status: "bestätigt" },
  { day: 4, time: "14:00", end: "15:00", client: "Marie Kurz", service: "Gesichtsbehandlung Classic", staff: "Marina", status: "bestätigt" },
  { day: 4, time: "15:30", end: "17:30", client: "Lisa Horn", service: "Wimpernverlängerung Volumen", staff: "Diana", status: "offen" },
  { day: 5, time: "09:30", end: "11:30", client: "Paula Sommer", service: "Permanent Make-up Augenbrauen", staff: "Diana", status: "bestätigt" },
  { day: 5, time: "11:00", end: "12:00", client: "Ida Vogt", service: "Damenhaarschnitt & Föhnen", staff: "Olga", status: "bestätigt" },
  { day: 5, time: "12:30", end: "13:15", client: "Nora Beck", service: "Carbon-Peeling Laser", staff: "Marina", status: "bestätigt" },
  { day: 5, time: "14:00", end: "15:00", client: "Ella Roth", service: "Gesichtsbehandlung Classic", staff: "Marina", status: "offen" },
];

type ViewKey = "dashboard" | "calendar" | "upcoming" | "clients" | "services" | "stats" | "messages" | "settings";
type NavItem = { key: ViewKey; label: string; icon: ReactNode; done: boolean };

const NAV: NavItem[] = [
  { key: "dashboard", label: "Übersicht", icon: <BarChart3 size={17} />, done: true },
  { key: "calendar", label: "Terminkalender", icon: <CalendarDays size={17} />, done: true },
  { key: "upcoming", label: "Kommende Termine", icon: <CalendarClock size={17} />, done: true },
  { key: "clients", label: "Kundinnen", icon: <Users size={17} />, done: true },
  { key: "services", label: "Leistungen & Preise", icon: <Scissors size={17} />, done: true },
  { key: "stats", label: "Auslastung", icon: <TrendingUp size={17} />, done: true },
  { key: "messages", label: "Nachrichten / WhatsApp", icon: <MessageCircle size={17} />, done: false },
  { key: "settings", label: "Einstellungen", icon: <Settings size={17} />, done: false },
];

const PLACEHOLDER: Record<string, string> = {
  messages: "Termin-Erinnerungen und Bestätigungen automatisch per WhatsApp an die Kundinnen senden.",
  settings: "Öffnungszeiten, Mitarbeiterinnen, Online-Buchungsregeln und Benachrichtigungen verwalten.",
};

const STATUS_ICON: Record<Status, ReactNode> = {
  bestätigt: <Check size={13} />,
  erschienen: <Star size={13} />,
  offen: <Clock size={13} />,
  abgesagt: <X size={13} />,
};

export function BeautyWernerAdminPanel({ lead }: { lead: LeadProfile }) {
  const [view, setView] = useState<ViewKey>("dashboard");
  const active = NAV.find((n) => n.key === view)!;

  return (
    <div className="ola-admin-panel">
      <aside className="ola-admin-sidebar">
        <div className="ola-admin-brand">
          <span className="ola-admin-logo">BEAUTY <i>WERNER</i></span>
          <span className="ola-admin-brand-sub">Studioverwaltung</span>
        </div>
        <nav className="ola-admin-nav">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`ola-admin-navitem${view === item.key ? " is-active" : ""}${item.done ? "" : " is-wip"}`}
              onClick={() => setView(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
              {!item.done && <em className="ola-admin-dot" aria-label="In Entwicklung" />}
            </button>
          ))}
        </nav>
        <Link className="ola-admin-back" href={`/demo/${lead.slug}`}>
          <ArrowLeft size={15} /> Zurück zur Demo
        </Link>
      </aside>

      <main className="ola-admin-main">
        <header className="ola-admin-topbar">
          <div>
            <h1>{active.label}</h1>
            <p>{lead.businessName} · Montag, 6. Juli 2026</p>
          </div>
          <span className="ola-admin-tag">Fiktive Daten · nichts wird gespeichert</span>
        </header>

        <div className="ola-admin-content">
          {view === "dashboard" && <Dashboard onJump={setView} />}
          {view === "calendar" && <Calendar />}
          {view === "upcoming" && <Upcoming />}
          {view === "clients" && <Clients />}
          {view === "services" && <Services />}
          {view === "stats" && <Stats />}
          {!active.done && <Wip title={active.label} copy={PLACEHOLDER[active.key]} />}
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return <span className={`ola-admin-status s-${status}`}>{STATUS_ICON[status]} {status}</span>;
}

function Dashboard({ onJump }: { onJump: (v: ViewKey) => void }) {
  const open = TODAY.filter((a) => a.status === "offen");
  const tiles = [
    { label: "Termine heute", value: String(TODAY.length), tone: "ok", icon: <CalendarDays size={16} /> },
    { label: "Umsatz heute (geplant)", value: `${revenueToday} €`, tone: "gold", icon: <Euro size={16} /> },
    { label: "Bestätigt-Quote", value: `${showRate} %`, tone: "neutral", icon: <Check size={16} /> },
    { label: "Offene Bestätigungen", value: String(open.length), tone: "warn", icon: <Clock size={16} /> },
  ];
  return (
    <>
      {open.length > 0 && (
        <button type="button" className="ola-admin-alert" onClick={() => onJump("calendar")}>
          <Clock size={16} />
          <span>{open.length} Termin(e) noch nicht bestätigt — Erinnerung per WhatsApp senden.</span>
        </button>
      )}
      <div className="ola-admin-tiles">
        {tiles.map((t) => (
          <article key={t.label} className={`ola-admin-tile tone-${t.tone}`}>
            <span className="ola-admin-tile-icon">{t.icon}</span>
            <strong>{t.value}</strong>
            <span className="ola-admin-tile-label">{t.label}</span>
          </article>
        ))}
      </div>

      <section className="ola-admin-block">
        <h2><CalendarDays size={17} /> Heutige Termine</h2>
        <div className="ola-admin-timeline">
          {TODAY.map((a) => (
            <article className={`ola-admin-slot${a.status === "abgesagt" ? " is-cancelled" : ""}`} key={a.time + a.client}>
              <span className="ola-admin-slot-time">{a.time}<small>{a.end}</small></span>
              <span className={`ola-admin-slot-bar staff-${STAFF.indexOf(a.staff)}`} />
              <span className="ola-admin-slot-body">
                <strong>{a.client}</strong>
                <small>{a.service} · {a.staff}</small>
              </span>
              <span className="ola-admin-slot-price">{a.price} €</span>
              <StatusBadge status={a.status} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Calendar() {
  const [appts, setAppts] = useState<WeekAppt[]>(WEEK_APPTS);
  const [sel, setSel] = useState<CalSelection>(null);
  const timeStyle = { gridTemplateRows: `var(--wk-head) repeat(${SLOT_COUNT}, var(--wk-slot))` } as CSSProperties;
  const gridStyle = {
    gridTemplateColumns: `repeat(${DAY_LABELS.length}, minmax(116px, 1fr))`,
    gridTemplateRows: `var(--wk-head) repeat(${SLOT_COUNT}, var(--wk-slot))`,
  } as CSSProperties;

  const setStatus = (target: WeekAppt, status: Status) =>
    setAppts((prev) => prev.map((a) => (a === target ? { ...a, status } : a)));
  const removeAppt = (target: WeekAppt) => setAppts((prev) => prev.filter((a) => a !== target));

  return (
    <section className="ola-admin-block">
      <div className="ola-admin-legend">
        {STAFF.map((s, i) => (
          <span key={s} className="ola-admin-legend-item"><i className={`ola-admin-legend-dot staff-${i}`} />{s}</span>
        ))}
        <span className="ola-admin-legend-note">Woche 6.–11. Juli · 30-Min-Raster · Slot antippen zum Buchen</span>
      </div>

      <div className="ola-admin-week-scroll">
        <div className="ola-admin-week-times" style={timeStyle}>
          <span className="ola-admin-week-corner">Zeit</span>
          {TIME_SLOTS.map((t) => (
            <span key={t} className={`ola-admin-week-time${t.endsWith(":00") ? " is-hour" : ""}`}>{t}</span>
          ))}
        </div>
        <div className="ola-admin-week-grid" style={gridStyle}>
          {DAY_LABELS.map((d, i) => (
            <div className={`ola-admin-week-dayhead${i === 0 ? " is-today" : ""}`} key={d.label} style={{ gridColumn: i + 1, gridRow: 1 }}>
              <strong>{d.num}</strong><span>{d.label}</span>
            </div>
          ))}
          {TIME_SLOTS.map((t, r) =>
            DAY_LABELS.map((d, c) => (
              <button
                type="button"
                key={`${d.label}-${t}`}
                className={`ola-admin-week-cell${t.endsWith(":00") ? " is-hour" : ""}`}
                style={{ gridColumn: c + 1, gridRow: r + 2 }}
                onClick={() => setSel({ mode: "new", day: c, time: t })}
                aria-label={`${d.label} ${t} — Termin buchen`}
              />
            )),
          )}
          {appts.map((a) => {
            const startRow = 2 + (toMin(a.time) - OPEN_MIN) / SLOT_MIN;
            const span = (toMin(a.end) - toMin(a.time)) / SLOT_MIN;
            return (
              <button
                type="button"
                key={`${a.day}-${a.time}-${a.client}`}
                className={`ola-admin-week-event staff-${STAFF.indexOf(a.staff)}${a.status === "offen" ? " is-tentative" : ""}`}
                style={{ gridColumn: a.day + 1, gridRow: `${startRow} / span ${span}` }}
                title={`${a.time}–${a.end} · ${a.client} · ${a.service} · ${a.staff}`}
                onClick={() => setSel({ mode: "view", appt: a })}
              >
                <strong>{a.time} {a.client}</strong>
                <span>{a.service}</span>
              </button>
            );
          })}
        </div>
      </div>

      {sel && (
        <CalModal
          sel={sel}
          onClose={() => setSel(null)}
          onCreate={(a) => { setAppts((prev) => [...prev, a]); setSel(null); }}
          onStatus={(a, s) => { setStatus(a, s); setSel(null); }}
          onRemove={(a) => { removeAppt(a); setSel(null); }}
        />
      )}
    </section>
  );
}

const SERVICE_NAMES = SERVICES.map((s) => s.name);

function CalModal({
  sel, onClose, onCreate, onStatus, onRemove,
}: {
  sel: NonNullable<CalSelection>;
  onClose: () => void;
  onCreate: (a: WeekAppt) => void;
  onStatus: (a: WeekAppt, s: Status) => void;
  onRemove: (a: WeekAppt) => void;
}) {
  const [client, setClient] = useState("");
  const [service, setService] = useState(SERVICE_NAMES[0]);
  const [staff, setStaff] = useState(STAFF[0]);
  const [dur, setDur] = useState(60);

  if (sel.mode === "view") {
    const a = sel.appt;
    return (
      <div className="ola-cal-modal" role="dialog" aria-modal="true">
        <div className="ola-cal-modal-backdrop" onClick={onClose} />
        <div className="ola-cal-modal-card">
          <div className="ola-cal-modal-head">
            <div>
              <strong>{a.client}</strong>
              <span>{DAY_LABELS[a.day].label}, {a.day + 6}. Juli · {a.time}–{a.end}</span>
            </div>
            <button type="button" className="ola-cal-modal-close" onClick={onClose} aria-label="Schließen"><X size={16} /></button>
          </div>
          <div className="ola-cal-view">
            <p><Scissors size={14} /> {a.service}</p>
            <p><UserRound size={14} /> {a.staff}</p>
            <p><Clock size={14} /> {a.time}–{a.end} Uhr</p>
            <div className="ola-cal-view-status"><StatusBadge status={a.status} /></div>
          </div>
          <div className="ola-cal-actions">
            <button type="button" className="ola-cal-btn primary" onClick={() => onStatus(a, "bestätigt")}><Check size={14} /> Bestätigen</button>
            <button type="button" className="ola-cal-btn" onClick={() => onStatus(a, "erschienen")}><Star size={14} /> Erschienen</button>
            <button type="button" className="ola-cal-btn danger" onClick={() => onRemove(a)}><X size={14} /> Absagen</button>
          </div>
          <p className="ola-cal-modal-note">Konzept-Vorschau · Änderungen werden nicht gespeichert</p>
        </div>
      </div>
    );
  }

  const start = toMin(sel.time);
  return (
    <div className="ola-cal-modal" role="dialog" aria-modal="true">
      <div className="ola-cal-modal-backdrop" onClick={onClose} />
      <div className="ola-cal-modal-card">
        <div className="ola-cal-modal-head">
          <div>
            <strong>Neuer Termin</strong>
            <span>{DAY_LABELS[sel.day].label}, {sel.day + 6}. Juli · {sel.time} Uhr</span>
          </div>
          <button type="button" className="ola-cal-modal-close" onClick={onClose} aria-label="Schließen"><X size={16} /></button>
        </div>
        <div className="ola-cal-form">
          <label>Behandlung
            <select value={service} onChange={(e) => setService(e.target.value)}>
              {SERVICE_NAMES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label>Mitarbeiterin
            <select value={staff} onChange={(e) => setStaff(e.target.value)}>
              {STAFF.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label>Dauer
            <select value={dur} onChange={(e) => setDur(Number(e.target.value))}>
              <option value={30}>30 Min.</option>
              <option value={60}>60 Min.</option>
              <option value={90}>90 Min.</option>
              <option value={120}>120 Min.</option>
            </select>
          </label>
          <label>Kundin
            <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Name der Kundin" />
          </label>
          <button
            type="button"
            className="ola-cal-btn primary block"
            onClick={() => onCreate({
              day: sel.day,
              time: sel.time,
              end: minToStr(start + dur),
              client: client.trim() || "Neue Kundin",
              service,
              staff,
              status: "bestätigt",
            })}
          >
            <Check size={14} /> Termin eintragen
          </button>
        </div>
        <p className="ola-cal-modal-note">Konzept-Vorschau · Änderungen werden nicht gespeichert</p>
      </div>
    </div>
  );
}

function Upcoming() {
  const sorted = [...WEEK_APPTS].sort((a, b) => (a.day - b.day) || (toMin(a.time) - toMin(b.time)));
  return (
    <section className="ola-admin-block">
      <h2><CalendarClock size={17} /> Kommende Termine</h2>
      <ol className="ola-admin-upcoming">
        {sorted.map((a) => (
          <li className={`ola-admin-up-item staff-${STAFF.indexOf(a.staff)}${a.status === "offen" ? " is-tentative" : ""}`} key={`${a.day}-${a.time}-${a.client}`}>
            <span className="ola-admin-up-day"><b>{a.day + 6}.</b><small>{DAY_LABELS[a.day].label}</small></span>
            <span className="ola-admin-up-time">{a.time}<small>{a.end}</small></span>
            <span className="ola-admin-up-body">
              <strong>{a.client}</strong>
              <small>{a.service}</small>
              <span className="ola-admin-up-meta"><UserRound size={11} /> {a.staff}</span>
            </span>
            <StatusBadge status={a.status} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function Clients() {
  return (
    <section className="ola-admin-block">
      <h2><Users size={17} /> Kundinnen ({CLIENTS.length})</h2>
      <div className="ola-admin-table cols-clients">
        <div className="ola-admin-row head">
          <span>Name</span><span>Besuche</span><span>Letzter</span><span>Favorit</span><span>Telefon</span>
        </div>
        {CLIENTS.map((c) => (
          <div className="ola-admin-row" key={c.name}>
            <span className="ola-admin-name">
              <i className="ola-admin-avatar">{c.name.charAt(0)}</i>
              {c.name}{c.vip && <em className="ola-admin-vip"><Star size={11} /> VIP</em>}
            </span>
            <span>{c.visits}×</span>
            <span>{c.last}</span>
            <span>{c.favorite}</span>
            <span className="ola-admin-phone"><Phone size={12} /> {c.phone}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="ola-admin-block">
      <h2><Scissors size={17} /> Leistungen &amp; Preise</h2>
      <div className="ola-admin-services">
        {SERVICES.map((s) => (
          <article className="ola-admin-service-card" key={s.name}>
            <span className="ola-admin-service-icon"><Sparkles size={16} /></span>
            <div className="ola-admin-service-body">
              <h3>{s.name}{s.popular && <em className="ola-admin-popular">beliebt</em>}</h3>
              <p><Clock size={12} /> {s.duration}</p>
            </div>
            <span className="ola-admin-service-price">{s.price}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const max = Math.max(...WEEK.map((w) => w.count));
  return (
    <>
      <div className="ola-admin-tiles">
        <article className="ola-admin-tile tone-gold"><span className="ola-admin-tile-icon"><Euro size={16} /></span><strong>4.680 €</strong><span className="ola-admin-tile-label">Umsatz diese Woche</span></article>
        <article className="ola-admin-tile tone-ok"><span className="ola-admin-tile-icon"><CalendarDays size={16} /></span><strong>56</strong><span className="ola-admin-tile-label">Termine diese Woche</span></article>
        <article className="ola-admin-tile tone-neutral"><span className="ola-admin-tile-icon"><LayoutGrid size={16} /></span><strong>83 %</strong><span className="ola-admin-tile-label">Ø Auslastung</span></article>
        <article className="ola-admin-tile tone-warn"><span className="ola-admin-tile-icon"><UserRound size={16} /></span><strong>+5</strong><span className="ola-admin-tile-label">Neue Kundinnen</span></article>
      </div>
      <section className="ola-admin-block">
        <h2><TrendingUp size={17} /> Auslastung pro Tag</h2>
        <div className="ola-admin-bars">
          {WEEK.map((w) => (
            <div className="ola-admin-bar-col" key={w.day}>
              <span className="ola-admin-bar-val">{w.count}</span>
              <div className="ola-admin-bar-track">
                <div className="ola-admin-bar-fill" style={{ height: `${(w.count / max) * 100}%`, opacity: 0.45 + w.load * 0.55 }} />
              </div>
              <span className="ola-admin-bar-day">{w.day}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Wip({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="ola-admin-wip">
      <span className="ola-admin-wip-badge">In Entwicklung</span>
      <h2>{title}</h2>
      <p>{copy}</p>
      <p className="ola-admin-wip-note">Dieses Modul ist Teil des geplanten Funktionsumfangs und noch nicht umgesetzt.</p>
    </div>
  );
}

function toMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minToStr(m: number) {
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}
