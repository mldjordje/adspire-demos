import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Hammer,
  KeyRound,
  LayoutDashboard,
  Layers,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { LeadProfile } from "@/lib/lead-schema";
import { telephoneHref } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import "./edelmann-page.css";

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

const NAV_ITEMS = [
  { label: "Sortiment", href: "#sortiment" },
  { label: "Stahlhandel", href: "#stahl" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Kontakt", href: "#kontakt" },
];

const SERVICE_ICONS: ReactNode[] = [
  <Wrench size={22} key="werkzeug" />,
  <Layers size={22} key="stahl" />,
  <Hammer size={22} key="befestigung" />,
  <Boxes size={22} key="tore" />,
  <ShieldCheck size={22} key="arbeitsschutz" />,
  <Zap size={22} key="schweiss" />,
];

export function EdelmannPage({ lead }: { lead: LeadProfile }) {
  const services = lead.services ?? [];
  const highlights = lead.highlights ?? [];
  const process = lead.process ?? [];
  const phoneHref = telephoneHref(lead.contact.phone);

  return (
    <main className="edelmann-page" id="top">
      <MotionLayer />
      <p className="edl-disclaimer">Unverbindliches Designkonzept — nicht die offizielle Website des Unternehmens</p>

      <header className="edl-header">
        <a className="edl-wordmark" href="#top">
          EDELMANN<span>Fachmarkt</span>
        </a>
        <nav className="edl-nav" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="edl-header-actions">
          {phoneHref && (
            <a className="edl-btn edl-btn-primary" href={phoneHref}>
              <Phone size={15} /> Anrufen
            </a>
          )}
        </div>
      </header>

      <section className="edl-hero">
        <div className="edl-hero-grid" aria-hidden />
        <div className="edl-hazard" aria-hidden />
        <div className="edl-hero-inner">
          <p className="edl-eyebrow" {...reveal(0)}>Seit 1936 · {lead.city}</p>
          <h1 className="edl-hero-title" {...reveal(1)}>
            Werkzeug, Stahl &amp; <span>Handwerksbedarf</span>
          </h1>
          <p className="edl-hero-sub" {...reveal(2)}>
            Über 70.000 Artikel für Profi, Handwerk und Industrie — mit eigenem Stahlhandel,
            Zuschnitt und starken Marken. Alles aus einer Hand.
          </p>
          <div className="edl-hero-actions" {...reveal(3)}>
            {phoneHref && (
              <a className="edl-btn edl-btn-primary" href={phoneHref}>
                <Phone size={16} /> Anrufen
              </a>
            )}
            {lead.contact.website && (
              <a className="edl-btn edl-btn-ghost" href={lead.contact.website} target="_blank" rel="noreferrer">
                Zum Shop <ArrowUpRight size={15} />
              </a>
            )}
          </div>
          <div className="edl-hero-stats" {...reveal(4)}>
            <div><strong>1936</strong><span>gegründet</span></div>
            <div><strong>70.000+</strong><span>Artikel</span></div>
            <div><strong>Stahl</strong><span>mit Zuschnitt</span></div>
          </div>
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="edl-ribbon" aria-label="Auf einen Blick">
          <div className="edl-ribbon-track">
            {[...highlights, ...highlights].map((h, i) => (
              <span className="edl-ribbon-item" key={h + i}><Zap size={13} /> {h}</span>
            ))}
          </div>
        </section>
      )}

      <section className="edl-section" id="sortiment">
        <div className="edl-section-head" {...reveal(0)}>
          <p className="edl-eyebrow">Sortiment</p>
          <h2>Was wir führen</h2>
        </div>
        <div className="edl-service-grid">
          {services.map((service, index) => (
            <article className="edl-service-card" key={service.title} {...reveal(index)}>
              <span className="edl-card-icon">{SERVICE_ICONS[index % SERVICE_ICONS.length]}</span>
              <h3>{service.title}</h3>
              {service.description && <p>{service.description}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="edl-steel" id="stahl">
        <div className="edl-steel-copy" {...reveal(0)}>
          <p className="edl-eyebrow edl-eyebrow-light">Stahlhandel</p>
          <h2>Metall nach Maß.</h2>
          <p>
            Eigener Stahlhandel mit Zuschnitt, Verzinkung und Pulverbeschichtung — von der einzelnen
            Stange bis zur kompletten Materialliste. Profis liefern Sie die Maße, wir das Metall.
          </p>
          <ul className="edl-steel-list">
            <li><Layers size={16} /> Zuschnitt auf Wunschmaß</li>
            <li><ShieldCheck size={16} /> Verzinkung &amp; Pulverbeschichtung</li>
            <li><KeyRound size={16} /> Schließanlagen aus einer Hand</li>
            <li><Truck size={16} /> Versandkostenfrei ab 150 €</li>
          </ul>
        </div>
        <div className="edl-steel-visual" aria-hidden>
          <span className="edl-beam edl-beam-1" />
          <span className="edl-beam edl-beam-2" />
          <span className="edl-beam edl-beam-3" />
        </div>
      </section>

      {process.length > 0 && (
        <section className="edl-section" id="ablauf">
          <div className="edl-section-head" {...reveal(0)}>
            <p className="edl-eyebrow">Ablauf</p>
            <h2>So läuft&apos;s</h2>
          </div>
          <div className="edl-process-grid">
            {process.map((step, index) => (
              <article className="edl-process-card" key={step.title} {...reveal(index)}>
                <span className="edl-process-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                {step.description && <p>{step.description}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="edl-admin-cta" {...reveal(0)}>
        <div>
          <p className="edl-eyebrow edl-eyebrow-light">Software-Konzept</p>
          <h2>Lager, Bestellungen und Lieferanten im Griff.</h2>
          <p>Ein Blick in das geplante Beschaffungs- und Lagersystem für den Fachmarkt.</p>
        </div>
        <Link className="edl-btn edl-btn-primary edl-admin-btn" href={`/demo/${lead.slug}/admin`}>
          <LayoutDashboard size={16} /> Control-Panel ansehen <ArrowUpRight size={16} />
        </Link>
      </section>

      <section className="edl-contact" id="kontakt" {...reveal(0)}>
        <div className="edl-contact-copy">
          <p className="edl-eyebrow">Kontakt</p>
          <h2>{lead.businessName}</h2>
          <p className="edl-contact-address">{lead.contact.address ?? lead.city}</p>
          {lead.openingHours?.length ? (
            <ul className="edl-hours">
              {lead.openingHours.map((line) => <li key={line}>{line}</li>)}
            </ul>
          ) : null}
        </div>
        <div className="edl-contact-actions">
          {phoneHref && (
            <a href={phoneHref}><Phone /> <span><small>Telefon</small>{lead.contact.phone}</span></a>
          )}
          {lead.contact.email && (
            <a href={`mailto:${lead.contact.email}`}><ArrowRight /> <span><small>E-Mail</small>{lead.contact.email}</span></a>
          )}
          {lead.contact.mapsUrl && (
            <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer"><MapPin /> <span><small>Standort</small>Route öffnen</span></a>
          )}
          <Link href={`/demo/${lead.slug}/admin`}><LayoutDashboard /> <span><small>Konzept</small>Admin-Vorschau</span></Link>
        </div>
      </section>

      <footer className="edl-footer">
        <div className="edl-footer-top">
          <span className="edl-wordmark edl-wordmark-footer">EDELMANN<span>Fachmarkt</span></span>
          <a className="edl-back-to-top" href="#top">Nach oben <ArrowRight size={14} /></a>
        </div>
        <div className="edl-footer-bottom">
          <span>© 2026 {lead.businessName}</span>
          <span>Unverbindliches Designkonzept · Kein offizieller Unternehmensauftritt</span>
        </div>
      </footer>
    </main>
  );
}
