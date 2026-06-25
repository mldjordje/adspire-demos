import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import type { CSSProperties } from "react";
import { buildDemoSchedule, type ScheduleKind } from "@/lib/demo-schedule";
import type { LeadProfile } from "@/lib/lead-schema";

const KIND_LABEL: Record<ScheduleKind, string> = {
  appointments: "Terminkalender",
  tables: "Tischplan",
  rooms: "Zimmerplan",
};

export function AdminPreviewTeaser({ lead }: { lead: LeadProfile }) {
  if (!lead.adminPreview) return null;
  return (
    <section className="admin-teaser section-shell">
      <div data-reveal="" style={{ "--i": 0 } as CSSProperties}>
        <p className="section-index">Verwaltung</p>
        <h2>So könnte Ihre Verwaltung aussehen</h2>
        <p>Ein {KIND_LABEL[lead.adminPreview].toLowerCase()} auf einen Blick – mit Beispielterminen, rein zur Veranschaulichung.</p>
      </div>
      <Link className="button button-primary" href={`/demo/${lead.slug}/admin`} data-reveal="" style={{ "--i": 1 } as CSSProperties}>
        <CalendarDays size={16} /> Verwaltungsvorschau ansehen
      </Link>
    </section>
  );
}

export function AdminPreviewPage({ lead }: { lead: LeadProfile }) {
  const kind = lead.adminPreview;
  if (!kind) return null;
  const { days, blocks, laneCount } = buildDemoSchedule(lead.slug, kind);
  const hourStart = kind === "rooms" ? 0 : 8;
  const hourEnd = kind === "rooms" ? 1 : 20;
  const hours = Array.from({ length: hourEnd - hourStart }, (_, i) => hourStart + i);

  return (
    <main className={`admin-preview theme-${lead.family}`} data-family={lead.family}>
      <aside className="concept-notice" aria-label="Hinweis zur Demo-Ansicht">
        <span>Beispielhafte Verwaltungsansicht</span>
        <span className="concept-notice-detail">Fiktive Termine · keine echten Daten · nichts wird gespeichert</span>
      </aside>
      <header className="admin-preview-header">
        <Link className="admin-back" href={`/demo/${lead.slug}`}><ArrowLeft size={16} /> Zurück zum Konzept</Link>
        <h1>{KIND_LABEL[kind]} · {lead.businessName}</h1>
      </header>
      <div className="admin-grid" style={{ "--lanes": laneCount } as CSSProperties}>
        <div className="admin-grid-corner" />
        {days.map((day) => (
          <div className="admin-grid-day" key={day}>{day}</div>
        ))}
        <div className="admin-grid-hours">
          {hours.map((hour) => (
            <span key={hour}>{String(hour).padStart(2, "0")}:00</span>
          ))}
        </div>
        {days.map((_, dayIndex) => (
          <div className="admin-grid-col" key={dayIndex} style={{ "--rows": hours.length } as CSSProperties}>
            {blocks
              .filter((block) => block.day === dayIndex)
              .map((block, i) => {
                const top = ((block.start - hourStart) / (hourEnd - hourStart)) * 100;
                const height = (block.durationHours / (hourEnd - hourStart)) * 100;
                const left = (block.lane / laneCount) * 100;
                const width = 100 / laneCount;
                return (
                  <div
                    className="admin-block"
                    key={i}
                    style={{ top: `${top}%`, height: `${height}%`, left: `${left}%`, width: `${width}%` }}
                  >
                    <strong>{block.title}</strong>
                    <span>{block.subtitle}</span>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
      <footer className="admin-preview-footer">
        <span>Demo · es werden keine Daten übermittelt oder gespeichert</span>
        <Link href={`/demo/${lead.slug}`}>Zurück zum Konzept <ArrowRight size={14} /></Link>
      </footer>
    </main>
  );
}
