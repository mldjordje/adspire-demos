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

const STAFF = ["Hanna", "Bianca", "Nora"];

const TODAY: Appt[] = [
  { time: "09:00", end: "09:45", client: "Sandra Köhler", service: "Maniküre + Shellac", staff: "Hanna", price: 38, status: "erschienen" },
  { time: "09:30", end: "11:00", client: "Aylin Demir", service: "Gel-Modellage XL", staff: "Bianca", price: 62, status: "erschienen" },
  { time: "10:00", end: "11:30", client: "Jessica Bauer", service: "French & Black-Tip", staff: "Nora", price: 55, status: "bestätigt" },
  { time: "11:15", end: "12:00", client: "Petra Lang", service: "Maniküre & Naturnagel", staff: "Hanna", price: 26, status: "bestätigt" },
  { time: "13:00", end: "14:15", client: "Nicole Wagner", service: "Auffüllen & Refill", staff: "Bianca", price: 42, status: "bestätigt" },
  { time: "13:30", end: "15:15", client: "Melisa Yıldız", service: "Rot & Ombré XL", staff: "Nora", price: 84, status: "offen" },
  { time: "15:00", end: "15:45", client: "Karin Hofmann", service: "Maniküre + Shellac", staff: "Hanna", price: 38, status: "bestätigt" },
  { time: "16:30", end: "18:00", client: "Tanja Roth", service: "Gel-Modellage XL", staff: "Bianca", price: 62, status: "offen" },
];

type Client = { name: string; visits: number; last: string; favorite: string; phone: string; vip: boolean };
const CLIENTS: Client[] = [
  { name: "Sandra Köhler", visits: 24, last: "heute", favorite: "Maniküre + Shellac", phone: "0151 2345678", vip: true },
  { name: "Aylin Demir", visits: 18, last: "heute", favorite: "Gel-Modellage XL", phone: "0160 9988776", vip: true },
  { name: "Jessica Bauer", visits: 9, last: "vor 3 Wochen", favorite: "French & Black-Tip", phone: "0152 5566778", vip: false },
  { name: "Nicole Wagner", visits: 31, last: "heute", favorite: "Auffüllen & Refill", phone: "0171 4433221", vip: true },
  { name: "Melisa Yıldız", visits: 6, last: "vor 4 Wochen", favorite: "Rot & Ombré XL", phone: "0157 1122334", vip: false },
  { name: "Karin Hofmann", visits: 12, last: "vor 2 Wochen", favorite: "Maniküre + Shellac", phone: "0162 7766554", vip: false },
];

type Service = { name: string; duration: string; price: string; popular?: boolean };
const SERVICES: Service[] = [
  { name: "Maniküre & Naturnagel", duration: "45 Min.", price: "26 €" },
  { name: "Maniküre + Shellac", duration: "45 Min.", price: "38 €", popular: true },
  { name: "Gel-Modellage XL (Vollset)", duration: "90 Min.", price: "ab 52 €", popular: true },
  { name: "Auffüllen & Refill", duration: "75 Min.", price: "ab 38 €" },
  { name: "French & Black-Tip", duration: "90 Min.", price: "ab 55 €" },
  { name: "Rot & Ombré-Verlauf", duration: "90 Min.", price: "ab 49 €" },
  { name: "Nail Art & Kristalle (pro Nagel)", duration: "+10 Min.", price: "ab 9 €" },
];

const WEEK = [
  { day: "Mo", count: 9, load: 0.75 },
  { day: "Di", count: 11, load: 0.92 },
  { day: "Mi", count: 8, load: 0.66 },
  { day: "Do", count: 12, load: 1.0 },
  { day: "Fr", count: 13, load: 1.0 },
  { day: "Sa", count: 11, load: 0.9 },
];

const revenueToday = TODAY.filter((a) => a.status !== "abgesagt").reduce((s, a) => s + a.price, 0);
const showRate = Math.round((TODAY.filter((a) => a.status === "bestätigt" || a.status === "erschienen").length / TODAY.length) * 100);

// ── Week calendar (Mo–Sa, 30-min slots) ──
const OPEN_MIN = 9 * 60; // 09:00
const SLOT_MIN = 30;
const SLOT_COUNT = 18; // 09:00 → 18:00
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
  { day: 0, time: "09:00", end: "10:00", client: "Sandra Köhler", service: "Maniküre + Shellac", staff: "Hanna", status: "erschienen" },
  { day: 0, time: "09:30", end: "11:00", client: "Jessica Bauer", service: "French & Black-Tip", staff: "Nora", status: "bestätigt" },
  { day: 0, time: "10:00", end: "11:30", client: "Aylin Demir", service: "Gel-Modellage XL", staff: "Bianca", status: "bestätigt" },
  { day: 0, time: "14:00", end: "14:30", client: "Petra Lang", service: "Maniküre & Naturnagel", staff: "Hanna", status: "bestätigt" },
  { day: 0, time: "15:00", end: "16:00", client: "Nicole Wagner", service: "Auffüllen & Refill", staff: "Bianca", status: "offen" },
  { day: 1, time: "09:30", end: "11:15", client: "Melisa Yıldız", service: "Rot & Ombré XL", staff: "Nora", status: "bestätigt" },
  { day: 1, time: "11:00", end: "12:00", client: "Karin Hofmann", service: "Maniküre + Shellac", staff: "Hanna", status: "bestätigt" },
  { day: 1, time: "13:00", end: "14:30", client: "Tanja Roth", service: "Gel-Modellage XL", staff: "Bianca", status: "bestätigt" },
  { day: 1, time: "15:00", end: "16:30", client: "Sabine Vogel", service: "French & Black-Tip", staff: "Nora", status: "offen" },
  { day: 2, time: "09:00", end: "10:00", client: "Laura Simon", service: "Maniküre + Shellac", staff: "Hanna", status: "bestätigt" },
  { day: 2, time: "10:30", end: "12:00", client: "Emma Frank", service: "Gel-Modellage XL", staff: "Bianca", status: "bestätigt" },
  { day: 2, time: "14:00", end: "15:00", client: "Nina Berg", service: "Auffüllen & Refill", staff: "Nora", status: "bestätigt" },
  { day: 3, time: "09:00", end: "10:30", client: "Sofia Klein", service: "French & Black-Tip", staff: "Hanna", status: "bestätigt" },
  { day: 3, time: "10:30", end: "11:30", client: "Hannah Groß", service: "Maniküre + Shellac", staff: "Bianca", status: "bestätigt" },
  { day: 3, time: "12:00", end: "13:45", client: "Mia Weber", service: "Rot & Ombré XL", staff: "Nora", status: "bestätigt" },
  { day: 3, time: "14:30", end: "15:30", client: "Lea Arnold", service: "Auffüllen & Refill", staff: "Hanna", status: "offen" },
  { day: 3, time: "16:00", end: "17:30", client: "Emily Busch", service: "Gel-Modellage XL", staff: "Bianca", status: "bestätigt" },
  { day: 4, time: "09:00", end: "09:30", client: "Clara Reich", service: "Maniküre & Naturnagel", staff: "Nora", status: "bestätigt" },
  { day: 4, time: "10:00", end: "11:30", client: "Julia Ernst", service: "Gel-Modellage XL", staff: "Hanna", status: "bestätigt" },
  { day: 4, time: "11:30", end: "13:00", client: "Anna Fuchs", service: "French & Black-Tip", staff: "Bianca", status: "bestätigt" },
  { day: 4, time: "14:00", end: "15:00", client: "Marie Kurz", service: "Maniküre + Shellac", staff: "Nora", status: "bestätigt" },
  { day: 4, time: "15:30", end: "17:15", client: "Lisa Horn", service: "Rot & Ombré XL", staff: "Hanna", status: "offen" },
  { day: 5, time: "09:30", end: "11:00", client: "Paula Sommer", service: "Gel-Modellage XL", staff: "Bianca", status: "bestätigt" },
  { day: 5, time: "11:00", end: "12:00", client: "Ida Vogt", service: "Auffüllen & Refill", staff: "Nora", status: "bestätigt" },
  { day: 5, time: "12:30", end: "13:00", client: "Nele Beck", service: "Maniküre & Naturnagel", staff: "Hanna", status: "bestätigt" },
  { day: 5, time: "14:00", end: "15:30", client: "Ella Roth", service: "French & Black-Tip", staff: "Bianca", status: "offen" },
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

export function HbNailsAdminPanel({ lead }: { lead: LeadProfile }) {
  const [view, setView] = useState<ViewKey>("dashboard");
  const active = NAV.find((n) => n.key === view)!;

  return (
    <div className="hb-admin-panel">
      <aside className="hb-admin-sidebar">
        <div className="hb-admin-brand">
          <span className="hb-admin-logo">H<i>.</i>B NAILS</span>
          <span className="hb-admin-brand-sub">Salonverwaltung</span>
        </div>
        <nav className="hb-admin-nav">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`hb-admin-navitem${view === item.key ? " is-active" : ""}${item.done ? "" : " is-wip"}`}
              onClick={() => setView(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
              {!item.done && <em className="hb-admin-dot" aria-label="In Entwicklung" />}
            </button>
          ))}
        </nav>
        <Link className="hb-admin-back" href={`/demo/${lead.slug}`}>
          <ArrowLeft size={15} /> Zurück zur Demo
        </Link>
      </aside>

      <main className="hb-admin-main">
        <header className="hb-admin-topbar">
          <div>
            <h1>{active.label}</h1>
            <p>{lead.businessName} · Montag, 6. Juli 2026</p>
          </div>
          <span className="hb-admin-tag">Fiktive Daten · nichts wird gespeichert</span>
        </header>

        <div className="hb-admin-content">
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
  return <span className={`hb-admin-status s-${status}`}>{STATUS_ICON[status]} {status}</span>;
}

function Dashboard({ onJump }: { onJump: (v: ViewKey) => void }) {
  const open = TODAY.filter((a) => a.status === "offen");
  const tiles = [
    { label: "Termine heute", value: String(TODAY.length), tone: "ok", icon: <CalendarDays size={16} /> },
    { label: "Umsatz heute (geplant)", value: `${revenueToday} €`, tone: "crimson", icon: <Euro size={16} /> },
    { label: "Bestätigt-Quote", value: `${showRate} %`, tone: "neutral", icon: <Check size={16} /> },
    { label: "Offene Bestätigungen", value: String(open.length), tone: "warn", icon: <Clock size={16} /> },
  ];
  return (
    <>
      {open.length > 0 && (
        <button type="button" className="hb-admin-alert" onClick={() => onJump("calendar")}>
          <Clock size={16} />
          <span>{open.length} Termin(e) noch nicht bestätigt — Erinnerung per WhatsApp senden.</span>
        </button>
      )}
      <div className="hb-admin-tiles">
        {tiles.map((t) => (
          <article key={t.label} className={`hb-admin-tile tone-${t.tone}`}>
            <span className="hb-admin-tile-icon">{t.icon}</span>
            <strong>{t.value}</strong>
            <span className="hb-admin-tile-label">{t.label}</span>
          </article>
        ))}
      </div>

      <section className="hb-admin-block">
        <h2><CalendarDays size={17} /> Heutige Termine</h2>
        <div className="hb-admin-timeline">
          {TODAY.map((a) => (
            <article className={`hb-admin-slot${a.status === "abgesagt" ? " is-cancelled" : ""}`} key={a.time + a.client}>
              <span className="hb-admin-slot-time">{a.time}<small>{a.end}</small></span>
              <span className={`hb-admin-slot-bar staff-${STAFF.indexOf(a.staff)}`} />
              <span className="hb-admin-slot-body">
                <strong>{a.client}</strong>
                <small>{a.service} · {a.staff}</small>
              </span>
              <span className="hb-admin-slot-price">{a.price} €</span>
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
    <section className="hb-admin-block">
      <div className="hb-admin-legend">
        {STAFF.map((s, i) => (
          <span key={s} className="hb-admin-legend-item"><i className={`hb-admin-legend-dot staff-${i}`} />{s}</span>
        ))}
        <span className="hb-admin-legend-note">Woche 6.–11. Juli · 30-Min-Raster · Slot antippen zum Buchen</span>
      </div>

      <div className="hb-admin-week-scroll">
        <div className="hb-admin-week-times" style={timeStyle}>
          <span className="hb-admin-week-corner">Zeit</span>
          {TIME_SLOTS.map((t) => (
            <span key={t} className={`hb-admin-week-time${t.endsWith(":00") ? " is-hour" : ""}`}>{t}</span>
          ))}
        </div>
        <div className="hb-admin-week-grid" style={gridStyle}>
          {DAY_LABELS.map((d, i) => (
            <div className={`hb-admin-week-dayhead${i === 0 ? " is-today" : ""}`} key={d.label} style={{ gridColumn: i + 1, gridRow: 1 }}>
              <strong>{d.num}</strong><span>{d.label}</span>
            </div>
          ))}
          {TIME_SLOTS.map((t, r) =>
            DAY_LABELS.map((d, c) => (
              <button
                type="button"
                key={`${d.label}-${t}`}
                className={`hb-admin-week-cell${t.endsWith(":00") ? " is-hour" : ""}`}
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
                className={`hb-admin-week-event staff-${STAFF.indexOf(a.staff)}${a.status === "offen" ? " is-tentative" : ""}`}
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
      <div className="hb-cal-modal" role="dialog" aria-modal="true">
        <div className="hb-cal-modal-backdrop" onClick={onClose} />
        <div className="hb-cal-modal-card">
          <div className="hb-cal-modal-head">
            <div>
              <strong>{a.client}</strong>
              <span>{DAY_LABELS[a.day].label}, {a.day + 6}. Juli · {a.time}–{a.end}</span>
            </div>
            <button type="button" className="hb-cal-modal-close" onClick={onClose} aria-label="Schließen"><X size={16} /></button>
          </div>
          <div className="hb-cal-view">
            <p><Scissors size={14} /> {a.service}</p>
            <p><UserRound size={14} /> {a.staff}</p>
            <p><Clock size={14} /> {a.time}–{a.end} Uhr</p>
            <div className="hb-cal-view-status"><StatusBadge status={a.status} /></div>
          </div>
          <div className="hb-cal-actions">
            <button type="button" className="hb-cal-btn primary" onClick={() => onStatus(a, "bestätigt")}><Check size={14} /> Bestätigen</button>
            <button type="button" className="hb-cal-btn" onClick={() => onStatus(a, "erschienen")}><Star size={14} /> Erschienen</button>
            <button type="button" className="hb-cal-btn danger" onClick={() => onRemove(a)}><X size={14} /> Absagen</button>
          </div>
          <p className="hb-cal-modal-note">Konzept-Vorschau · Änderungen werden nicht gespeichert</p>
        </div>
      </div>
    );
  }

  const start = toMin(sel.time);
  return (
    <div className="hb-cal-modal" role="dialog" aria-modal="true">
      <div className="hb-cal-modal-backdrop" onClick={onClose} />
      <div className="hb-cal-modal-card">
        <div className="hb-cal-modal-head">
          <div>
            <strong>Neuer Termin</strong>
            <span>{DAY_LABELS[sel.day].label}, {sel.day + 6}. Juli · {sel.time} Uhr</span>
          </div>
          <button type="button" className="hb-cal-modal-close" onClick={onClose} aria-label="Schließen"><X size={16} /></button>
        </div>
        <div className="hb-cal-form">
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
            className="hb-cal-btn primary block"
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
        <p className="hb-cal-modal-note">Konzept-Vorschau · Änderungen werden nicht gespeichert</p>
      </div>
    </div>
  );
}

function Upcoming() {
  const sorted = [...WEEK_APPTS].sort((a, b) => (a.day - b.day) || (toMin(a.time) - toMin(b.time)));
  return (
    <section className="hb-admin-block">
      <h2><CalendarClock size={17} /> Kommende Termine</h2>
      <ol className="hb-admin-upcoming">
        {sorted.map((a) => (
          <li className={`hb-admin-up-item staff-${STAFF.indexOf(a.staff)}${a.status === "offen" ? " is-tentative" : ""}`} key={`${a.day}-${a.time}-${a.client}`}>
            <span className="hb-admin-up-day"><b>{a.day + 6}.</b><small>{DAY_LABELS[a.day].label}</small></span>
            <span className="hb-admin-up-time">{a.time}<small>{a.end}</small></span>
            <span className="hb-admin-up-body">
              <strong>{a.client}</strong>
              <small>{a.service}</small>
              <span className="hb-admin-up-meta"><UserRound size={11} /> {a.staff}</span>
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
    <section className="hb-admin-block">
      <h2><Users size={17} /> Kundinnen ({CLIENTS.length})</h2>
      <div className="hb-admin-table cols-clients">
        <div className="hb-admin-row head">
          <span>Name</span><span>Besuche</span><span>Letzter</span><span>Favorit</span><span>Telefon</span>
        </div>
        {CLIENTS.map((c) => (
          <div className="hb-admin-row" key={c.name}>
            <span className="hb-admin-name">
              <i className="hb-admin-avatar">{c.name.charAt(0)}</i>
              {c.name}{c.vip && <em className="hb-admin-vip"><Star size={11} /> VIP</em>}
            </span>
            <span>{c.visits}×</span>
            <span>{c.last}</span>
            <span>{c.favorite}</span>
            <span className="hb-admin-phone"><Phone size={12} /> {c.phone}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="hb-admin-block">
      <h2><Scissors size={17} /> Leistungen &amp; Preise</h2>
      <div className="hb-admin-services">
        {SERVICES.map((s) => (
          <article className="hb-admin-service-card" key={s.name}>
            <span className="hb-admin-service-icon"><Sparkles size={16} /></span>
            <div className="hb-admin-service-body">
              <h3>{s.name}{s.popular && <em className="hb-admin-popular">beliebt</em>}</h3>
              <p><Clock size={12} /> {s.duration}</p>
            </div>
            <span className="hb-admin-service-price">{s.price}</span>
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
      <div className="hb-admin-tiles">
        <article className="hb-admin-tile tone-crimson"><span className="hb-admin-tile-icon"><Euro size={16} /></span><strong>3.360 €</strong><span className="hb-admin-tile-label">Umsatz diese Woche</span></article>
        <article className="hb-admin-tile tone-ok"><span className="hb-admin-tile-icon"><CalendarDays size={16} /></span><strong>64</strong><span className="hb-admin-tile-label">Termine diese Woche</span></article>
        <article className="hb-admin-tile tone-neutral"><span className="hb-admin-tile-icon"><LayoutGrid size={16} /></span><strong>87 %</strong><span className="hb-admin-tile-label">Ø Auslastung</span></article>
        <article className="hb-admin-tile tone-warn"><span className="hb-admin-tile-icon"><UserRound size={16} /></span><strong>+8</strong><span className="hb-admin-tile-label">Neue Kundinnen</span></article>
      </div>
      <section className="hb-admin-block">
        <h2><TrendingUp size={17} /> Auslastung pro Tag</h2>
        <div className="hb-admin-bars">
          {WEEK.map((w) => (
            <div className="hb-admin-bar-col" key={w.day}>
              <span className="hb-admin-bar-val">{w.count}</span>
              <div className="hb-admin-bar-track">
                <div className="hb-admin-bar-fill" style={{ height: `${(w.count / max) * 100}%`, opacity: 0.45 + w.load * 0.55 }} />
              </div>
              <span className="hb-admin-bar-day">{w.day}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Wip({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="hb-admin-wip">
      <span className="hb-admin-wip-badge">In Entwicklung</span>
      <h2>{title}</h2>
      <p>{copy}</p>
      <p className="hb-admin-wip-note">Dieses Modul ist Teil des geplanten Funktionsumfangs und noch nicht umgesetzt.</p>
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
