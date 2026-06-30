"use client";

import {
  ArrowLeft,
  BarChart3,
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
import { useState, type ReactNode } from "react";
import type { LeadProfile } from "@/lib/lead-schema";

type Status = "bestätigt" | "offen" | "erschienen" | "abgesagt";
type Appt = { time: string; end: string; client: string; service: string; staff: string; price: number; status: Status };

const STAFF = ["Ola", "Lena", "Marija"];

const TODAY: Appt[] = [
  { time: "09:00", end: "09:45", client: "Sandra Köhler", service: "Maniküre + Shellac", staff: "Ola", price: 38, status: "erschienen" },
  { time: "09:30", end: "11:00", client: "Aylin Demir", service: "Gel-Nägel Neu", staff: "Lena", price: 59, status: "erschienen" },
  { time: "10:00", end: "11:30", client: "Jessica Bauer", service: "French & Babyboomer", staff: "Marija", price: 55, status: "bestätigt" },
  { time: "11:15", end: "12:00", client: "Petra Lang", service: "Maniküre & Naturnagel", staff: "Ola", price: 28, status: "bestätigt" },
  { time: "13:00", end: "14:15", client: "Nicole Wagner", service: "Auffüllen & Refill", staff: "Lena", price: 42, status: "bestätigt" },
  { time: "13:30", end: "15:00", client: "Melisa Yıldız", service: "Nail Art Vollset", staff: "Marija", price: 78, status: "offen" },
  { time: "15:00", end: "15:45", client: "Karin Hofmann", service: "Maniküre + Shellac", staff: "Ola", price: 38, status: "bestätigt" },
  { time: "16:30", end: "18:00", client: "Tanja Roth", service: "Gel-Nägel Neu", staff: "Lena", price: 59, status: "offen" },
];

type Client = { name: string; visits: number; last: string; favorite: string; phone: string; vip: boolean };
const CLIENTS: Client[] = [
  { name: "Sandra Köhler", visits: 24, last: "heute", favorite: "Maniküre + Shellac", phone: "0151 2345678", vip: true },
  { name: "Aylin Demir", visits: 18, last: "heute", favorite: "Gel-Nägel Neu", phone: "0160 9988776", vip: true },
  { name: "Jessica Bauer", visits: 9, last: "vor 3 Wochen", favorite: "French & Babyboomer", phone: "0152 5566778", vip: false },
  { name: "Nicole Wagner", visits: 31, last: "heute", favorite: "Auffüllen & Refill", phone: "0171 4433221", vip: true },
  { name: "Melisa Yıldız", visits: 6, last: "vor 4 Wochen", favorite: "Nail Art Vollset", phone: "0157 1122334", vip: false },
  { name: "Karin Hofmann", visits: 12, last: "vor 2 Wochen", favorite: "Maniküre + Shellac", phone: "0162 7766554", vip: false },
];

type Service = { name: string; duration: string; price: string; popular?: boolean };
const SERVICES: Service[] = [
  { name: "Maniküre & Naturnagel", duration: "45 Min.", price: "28 €" },
  { name: "Maniküre + Shellac", duration: "45 Min.", price: "38 €", popular: true },
  { name: "Gel-Nägel Neu (Vollset)", duration: "90 Min.", price: "ab 59 €", popular: true },
  { name: "Auffüllen & Refill", duration: "75 Min.", price: "ab 39 €" },
  { name: "French & Babyboomer", duration: "90 Min.", price: "ab 55 €" },
  { name: "Nail Art (pro Nagel)", duration: "+10 Min.", price: "ab 8 €" },
];

const WEEK = [
  { day: "Mo", count: 9, load: 0.75 },
  { day: "Di", count: 11, load: 0.92 },
  { day: "Mi", count: 8, load: 0.66 },
  { day: "Do", count: 12, load: 1.0 },
  { day: "Fr", count: 12, load: 1.0 },
  { day: "Sa", count: 10, load: 0.83 },
];

const revenueToday = TODAY.filter((a) => a.status !== "abgesagt").reduce((s, a) => s + a.price, 0);
const showRate = Math.round((TODAY.filter((a) => a.status === "bestätigt" || a.status === "erschienen").length / TODAY.length) * 100);

type ViewKey = "dashboard" | "calendar" | "clients" | "services" | "stats" | "messages" | "settings";
type NavItem = { key: ViewKey; label: string; icon: ReactNode; done: boolean };

const NAV: NavItem[] = [
  { key: "dashboard", label: "Übersicht", icon: <BarChart3 size={17} />, done: true },
  { key: "calendar", label: "Terminkalender", icon: <CalendarDays size={17} />, done: true },
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

export function OlaBeautyAdminPanel({ lead }: { lead: LeadProfile }) {
  const [view, setView] = useState<ViewKey>("dashboard");
  const active = NAV.find((n) => n.key === view)!;

  return (
    <div className="ola-admin-panel">
      <aside className="ola-admin-sidebar">
        <div className="ola-admin-brand">
          <span className="ola-admin-logo">OL<i>A</i> BEAUTY</span>
          <span className="ola-admin-brand-sub">Salonverwaltung</span>
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
  const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  return (
    <section className="ola-admin-block">
      <div className="ola-admin-legend">
        {STAFF.map((s, i) => (
          <span key={s} className="ola-admin-legend-item"><i className={`ola-admin-legend-dot staff-${i}`} />{s}</span>
        ))}
      </div>
      <div className="ola-admin-cal">
        <div className="ola-admin-cal-col ola-admin-cal-hours">
          <span className="ola-admin-cal-head">Zeit</span>
          {slots.map((s) => <span key={s} className="ola-admin-cal-hour">{s}</span>)}
        </div>
        {STAFF.map((staff, si) => (
          <div className="ola-admin-cal-col" key={staff}>
            <span className="ola-admin-cal-head"><UserRound size={13} /> {staff}</span>
            <div className="ola-admin-cal-track">
              {TODAY.filter((a) => a.staff === staff).map((a) => {
                const start = toMin(a.time);
                const top = ((start - 540) / 60) * 56;
                const height = ((toMin(a.end) - start) / 60) * 56;
                return (
                  <div key={a.time} className={`ola-admin-cal-event staff-${si} ${a.status === "offen" ? "is-tentative" : ""}`} style={{ top, height }}>
                    <strong>{a.time} {a.client}</strong>
                    <small>{a.service}</small>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
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
        <article className="ola-admin-tile tone-gold"><span className="ola-admin-tile-icon"><Euro size={16} /></span><strong>3.140 €</strong><span className="ola-admin-tile-label">Umsatz diese Woche</span></article>
        <article className="ola-admin-tile tone-ok"><span className="ola-admin-tile-icon"><CalendarDays size={16} /></span><strong>62</strong><span className="ola-admin-tile-label">Termine diese Woche</span></article>
        <article className="ola-admin-tile tone-neutral"><span className="ola-admin-tile-icon"><LayoutGrid size={16} /></span><strong>86 %</strong><span className="ola-admin-tile-label">Ø Auslastung</span></article>
        <article className="ola-admin-tile tone-warn"><span className="ola-admin-tile-icon"><UserRound size={16} /></span><strong>+7</strong><span className="ola-admin-tile-label">Neue Kundinnen</span></article>
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
