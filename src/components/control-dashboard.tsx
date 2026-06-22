"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import type { LeadProfile, LeadStatus } from "@/lib/lead-schema";
import { telephoneHref } from "@/lib/lead-schema";

const statusOptions: Array<{ value: LeadStatus; label: string }> = [
  { value: "research", label: "Vorbereitung" },
  { value: "ready", label: "Bereit" },
  { value: "visited", label: "Besucht" },
  { value: "decision-maker-away", label: "Entscheider nicht da" },
  { value: "interested", label: "Interessiert" },
  { value: "follow-up-approved", label: "Follow-up erlaubt" },
  { value: "meeting", label: "Termin" },
  { value: "proposal", label: "Angebot" },
  { value: "declined", label: "Abgelehnt" },
];

export function ControlDashboard({ leads }: { leads: LeadProfile[] }) {
  const [origin, setOrigin] = useState("");
  const [statuses, setStatuses] = useState<Record<string, LeadStatus>>({});

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOrigin(window.location.origin);
      const saved = window.localStorage.getItem("bm-outreach-statuses");
      if (saved) setStatuses(JSON.parse(saved));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const counts = useMemo(() => {
    const active = leads.map((lead) => statuses[lead.slug] ?? lead.status);
    return statusOptions.map((status) => ({ ...status, count: active.filter((item) => item === status.value).length }));
  }, [leads, statuses]);

  function updateStatus(slug: string, status: LeadStatus) {
    const next = { ...statuses, [slug]: status };
    setStatuses(next);
    window.localStorage.setItem("bm-outreach-statuses", JSON.stringify(next));
  }

  return (
    <main className="control-page">
      <header className="control-header">
        <div><p>Bad Mergentheim</p><h1>Outreach Control</h1></div>
        <span>{leads.length} vorbereitete Kontakte</span>
      </header>
      <section className="status-strip">
        {counts.filter((item) => item.count > 0).map((item) => <div key={item.value}><strong>{item.count}</strong><span>{item.label}</span></div>)}
      </section>
      <section className="lead-table" aria-label="Lead Übersicht">
        {leads.map((lead, index) => {
          const demoUrl = `${origin}/demo/${lead.slug}`;
          const phoneHref = telephoneHref(lead.contact.phone);
          return (
            <article className="lead-row" key={lead.slug}>
              <div className="lead-order">{String(index + 1).padStart(2, "0")}</div>
              <div className="lead-identity"><span>{lead.family}</span><h2>{lead.businessName}</h2><p>{lead.businessType} · {lead.contact.address ?? lead.city}</p></div>
              <div className="lead-links">
                <a href={`/demo/${lead.slug}`} target="_blank"><ExternalLink /> Demo</a>
                {lead.contact.mapsUrl && <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer"><MapPin /> Route</a>}
                {phoneHref && <a href={phoneHref}><Phone /> Anrufen</a>}
              </div>
              <select value={statuses[lead.slug] ?? lead.status} onChange={(event) => updateStatus(lead.slug, event.target.value as LeadStatus)} aria-label={`Status für ${lead.businessName}`}>
                {statusOptions.map((status) => <option value={status.value} key={status.value}>{status.label}</option>)}
              </select>
              <div className="qr-cell">{origin && <QRCodeSVG value={demoUrl} size={72} level="M" marginSize={1} />}</div>
            </article>
          );
        })}
      </section>
      <p className="control-note">Statusänderungen werden nur in diesem Browser gespeichert. Vor dem Außentermin als PDF sichern oder exportieren.</p>
    </main>
  );
}
