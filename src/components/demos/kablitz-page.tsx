import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Factory,
  Flame,
  Gauge,
  LayoutDashboard,
  MapPin,
  Phone,
  ShieldCheck,
  Thermometer,
  Wrench,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LeadProfile, MediaAsset } from "@/lib/lead-schema";
import { telephoneHref } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import { KablitzProcessStory } from "./kablitz-video-story";
import { KablitzEmberCanvas } from "./kablitz-ember-canvas";
import "./kablitz-page.css";

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

const NAV_ITEMS = ["Leistungen", "Unternehmen", "Zertifikate", "Kontakt"];

const SERVICE_ICONS: ReactNode[] = [
  <Flame size={22} key="feuerungen" />,
  <Gauge size={22} key="energiezentralen" />,
  <Thermometer size={22} key="waermetauscher" />,
  <Factory size={22} key="giesserei" />,
  <Wrench size={22} key="brennstoffe" />,
  <ShieldCheck size={22} key="service" />,
];

export function KablitzPage({ lead }: { lead: LeadProfile }) {
  const gallery = lead.media?.gallery ? [lead.media.hero, ...lead.media.gallery].filter(Boolean) as MediaAsset[] : [];
  const ordered = [...gallery].sort((a, b) => a.src.localeCompare(b.src));
  const at = (i: number) => ordered[i];
  const heroImage = at(0);
  const phoneHref = telephoneHref(lead.contact.phone);

  return (
    <main className="kablitz-page" id="top">
      <MotionLayer />
      <p className="kablitz-disclaimer">Unverbindliches Designkonzept — nicht die offizielle Website des Unternehmens</p>

      <KablitzHeader lead={lead} />

      <Hero lead={lead} heroImage={heroImage} phoneHref={phoneHref} />

      <Ticker />

      <Services />

      <KablitzProcessStory />

      <Gallery assets={ordered.slice(1, 6)} />

      <Company lead={lead} />

      <Certifications lead={lead} />

      <AdminCta lead={lead} />

      <ContactBand lead={lead} phoneHref={phoneHref} />

      <KablitzFooter lead={lead} />
    </main>
  );
}

function KablitzHeader({ lead }: { lead: LeadProfile }) {
  return (
    <header className="kablitz-header">
      <a className="kablitz-wordmark" href="#top" aria-label={`${lead.businessName} Startseite`}>
        <Image src="/leads/kablitz-gmbh-r4t9k2/logo-transparent.png" alt="Kablitz Logo" width={150} height={46} priority unoptimized />
      </a>
      <nav className="kablitz-nav" aria-label="Hauptnavigation">
        {NAV_ITEMS.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
        ))}
      </nav>
      <div className="kablitz-header-actions">
        {lead.contact.mapsUrl && (
          <a className="kablitz-btn kablitz-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={15} /> Route
          </a>
        )}
        <a className="kablitz-btn kablitz-btn-primary" href="#kontakt">Kontakt</a>
      </div>
    </header>
  );
}

function Hero({ lead, heroImage, phoneHref }: { lead: LeadProfile; heroImage?: MediaAsset; phoneHref?: string }) {
  return (
    <section className="kablitz-hero">
      {heroImage && (
        <div className="kablitz-hero-media" data-parallax="0.06">
          <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" unoptimized priority />
          <KablitzEmberCanvas />
          <div className="kablitz-hero-scrim" />
        </div>
      )}
      <div className="kablitz-hero-copy">
        <p className="kablitz-eyebrow" {...reveal(0)}>Biomass &amp; Waste to Energy seit 1901</p>
        <h1 {...reveal(1)}>
          Energie aus<br />Biomasse.<br />Made in<br />Lauda-Königshofen.
        </h1>
        <p className="kablitz-hero-desc" {...reveal(2)}>{lead.shortDescription}</p>
        <div className="kablitz-hero-actions" {...reveal(3)}>
          {phoneHref && (
            <a className="kablitz-btn kablitz-btn-primary" href={phoneHref}>
              <Phone size={16} /> Anrufen
            </a>
          )}
          {lead.contact.mapsUrl && (
            <a className="kablitz-btn kablitz-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin size={16} /> Route
            </a>
          )}
        </div>
        <a className="kablitz-scroll-cue" href="#leistungen" {...reveal(4)}>
          <ArrowDown size={15} /> Mehr entdecken
        </a>
      </div>
      {heroImage && (
        <a className="kablitz-source-tag" href={heroImage.sourceUrl} target="_blank" rel="noreferrer">
          Offizielle Website · Freigabe ausstehend
        </a>
      )}
    </section>
  );
}

function Ticker() {
  const items = [
    "Über 120 Jahre Firmengeschichte",
    "Eigene Gießerei & Stahlfertigung",
    "ISO 9001:2015 zertifiziert",
    "Kunden auf 5 Kontinenten",
  ];
  return (
    <div className="kablitz-ticker" aria-hidden="true">
      <div className="kablitz-ticker-track">
        {[...items, ...items].map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const services = [
    { title: "Feuerungen", description: "Wasser- und luftgekühlte Roste zur Verbrennung von Biomasse und Abfällen." },
    { title: "Energiezentralen", description: "Dampfkessel, Thermoölanlagen, Fernwärme und Stromerzeugung." },
    { title: "Wärmetauscher", description: "Wärmerückgewinnung aus Abgasen senkt die Energiekosten." },
    { title: "Gießerei", description: "Eigene Roststäbe und Rippenplatten, auch für Fremdfabrikate." },
    { title: "Brennstoffe", description: "Lösungen für nahezu jeden Festbrennstoff." },
    { title: "Service", description: "Betreuung der Anlage über die gesamte Lebensdauer." },
  ];
  return (
    <section className="kablitz-services" id="leistungen">
      <div className="kablitz-section-head" {...reveal(0)}>
        <p className="kablitz-eyebrow">Unsere Leistungen</p>
        <h2>Vom Rost bis zum Kraftwerk</h2>
      </div>
      <div className="kablitz-service-grid">
        {services.map((service, index) => (
          <article className="kablitz-service-card" key={service.title} {...reveal(index)}>
            <span className="kablitz-card-icon">{SERVICE_ICONS[index]}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery({ assets }: { assets: MediaAsset[] }) {
  if (!assets.length) return null;
  return (
    <section className="kablitz-gallery">
      <div className="kablitz-gallery-track" role="list">
        {assets.map((asset, index) => (
          <div className="kablitz-gallery-item" role="listitem" key={asset.src} {...reveal(index)}>
            <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 760px) 78vw, 30vw" unoptimized />
          </div>
        ))}
      </div>
    </section>
  );
}

function Company({ lead }: { lead: LeadProfile }) {
  return (
    <section className="kablitz-company" id="unternehmen">
      <div className="kablitz-company-copy" {...reveal(0)}>
        <p className="kablitz-eyebrow">Wer wir sind</p>
        <h2>Familiengeführt seit 1901</h2>
        <p>{lead.notes}</p>
      </div>
    </section>
  );
}

function Certifications({ lead }: { lead: LeadProfile }) {
  if (!lead.certifications?.length) return null;
  return (
    <section className="kablitz-certifications" id="zertifikate">
      <div className="kablitz-section-head" {...reveal(0)}>
        <p className="kablitz-eyebrow">Vertrauen &amp; Qualität</p>
        <h2>Zertifiziert &amp; bewährt</h2>
      </div>
      <div className="kablitz-cert-grid">
        {lead.certifications.map((cert, index) => (
          <article className="kablitz-cert-card" key={cert.title} {...reveal(index)}>
            <span className="kablitz-card-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{cert.title}</h3>
            {cert.description && <p>{cert.description}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminCta({ lead }: { lead: LeadProfile }) {
  return (
    <section className="kablitz-admin-cta" {...reveal(0)}>
      <div className="kablitz-admin-cta-copy">
        <p className="kablitz-eyebrow">Konzept-Vorschau</p>
        <h2>So könnte Ihre Beschaffung &amp; Lagerverwaltung aussehen</h2>
        <p>Mindestbestände, Lieferantenstatus und verspätete Lieferungen auf einen Blick — eine unverbindliche Demo-Ansicht.</p>
      </div>
      <Link className="kablitz-btn kablitz-btn-primary kablitz-admin-btn" href={`/demo/${lead.slug}/admin`}>
        <LayoutDashboard size={16} /> Admin-Vorschau öffnen <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}

function ContactBand({ lead, phoneHref }: { lead: LeadProfile; phoneHref?: string }) {
  return (
    <section className="kablitz-contact" id="kontakt" {...reveal(0)}>
      <div className="kablitz-contact-copy" {...reveal(0)}>
        <p className="kablitz-eyebrow">Kontakt</p>
        <h2>{lead.businessName}</h2>
        <p>Sprechen Sie unverbindlich mit unseren Experten für Biomasse- und Anlagenbau.</p>
        <p className="kablitz-contact-address">{lead.contact.address ?? lead.city}</p>
      </div>
      <div className="kablitz-contact-actions" {...reveal(1)}>
        {phoneHref && (
          <a href={phoneHref}>
            <Phone /> <span><small>Telefon</small>{lead.contact.phone}</span>
          </a>
        )}
        {lead.contact.mapsUrl && (
          <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin /> <span><small>Standort</small>Route öffnen</span>
          </a>
        )}
        <Link href={`/demo/${lead.slug}/admin`}>
          <LayoutDashboard /> <span><small>Konzept</small>Admin-Vorschau</span>
        </Link>
      </div>
    </section>
  );
}

function KablitzFooter({ lead }: { lead: LeadProfile }) {
  return (
    <footer className="kablitz-footer">
      <div className="kablitz-footer-top">
        <Image src="/leads/kablitz-gmbh-r4t9k2/logo-transparent.png" alt="Kablitz Logo" width={110} height={34} unoptimized />
        <a className="kablitz-back-to-top" href="#top">Nach oben <ArrowRight size={14} /></a>
      </div>
      <div className="kablitz-footer-bottom">
        <span>© 2026 {lead.businessName}</span>
        <span>Unverbindliches Designkonzept · Kein offizieller Unternehmensauftritt</span>
      </div>
    </footer>
  );
}
