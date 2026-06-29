import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cable,
  Cpu,
  LayoutDashboard,
  MapPin,
  Phone,
  Plug,
  Satellite,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LeadProfile, MediaAsset } from "@/lib/lead-schema";
import { telephoneHref } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import { BelschnerProcessStory } from "./belschner-process-story";
import { BelschnerHeroCircuit } from "./belschner-hero-circuit";
import { BelschnerStats } from "./belschner-stats";
import "./belschner-page.css";

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

const NAV_ITEMS = ["Leistungen", "Unternehmen", "Qualität", "Kontakt"];

const SERVICE_ICONS: ReactNode[] = [
  <Plug size={22} key="installation" />,
  <Cpu size={22} key="modernisieren" />,
  <LayoutDashboard size={22} key="smarthome" />,
  <Wrench size={22} key="service" />,
  <Cable size={22} key="telefon" />,
  <Satellite size={22} key="sat" />,
];

export function BelschnerPage({ lead }: { lead: LeadProfile }) {
  const gallery = lead.media?.gallery ? [lead.media.hero, ...lead.media.gallery].filter(Boolean) as MediaAsset[] : [];
  const ordered = [...gallery].sort((a, b) => a.src.localeCompare(b.src));
  const at = (i: number) => ordered[i];
  const heroImage = at(0);
  const phoneHref = telephoneHref(lead.contact.phone);

  return (
    <main className="belschner-page" id="top">
      <MotionLayer />
      <p className="belschner-disclaimer">Unverbindliches Designkonzept — nicht die offizielle Website des Unternehmens</p>

      <BelschnerHeader lead={lead} />

      <Hero lead={lead} heroImage={heroImage} phoneHref={phoneHref} />

      <BelschnerStats />

      <Services lead={lead} />

      <BelschnerProcessStory />

      <Gallery assets={ordered.slice(1, 6)} />

      <Company />

      <Certifications lead={lead} />

      <AdminCta lead={lead} />

      <ContactBand lead={lead} phoneHref={phoneHref} />

      <BelschnerFooter lead={lead} />
    </main>
  );
}

function BelschnerHeader({ lead }: { lead: LeadProfile }) {
  return (
    <header className="belschner-header">
      <a className="belschner-wordmark" href="#top" aria-label={`${lead.businessName} Startseite`}>
        <Image src="/leads/belschner-elektrotechnik-w7k4n2/logo.svg" alt="Belschner Elektrotechnik Logo" width={172} height={47} priority unoptimized />
      </a>
      <nav className="belschner-nav" aria-label="Hauptnavigation">
        {NAV_ITEMS.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
        ))}
      </nav>
      <div className="belschner-header-actions">
        {lead.contact.mapsUrl && (
          <a className="belschner-btn belschner-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={15} /> Route
          </a>
        )}
        <a className="belschner-btn belschner-btn-primary" href="#kontakt">Kontakt</a>
      </div>
    </header>
  );
}

function Hero({ lead, heroImage, phoneHref }: { lead: LeadProfile; heroImage?: MediaAsset; phoneHref?: string }) {
  return (
    <section className="belschner-hero">
      {heroImage && (
        <div className="belschner-hero-media" data-parallax="0.06">
          <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" unoptimized priority />
          <div className="belschner-hero-scrim" />
          <BelschnerHeroCircuit />
        </div>
      )}
      <div className="belschner-hero-copy">
        <p className="belschner-eyebrow" {...reveal(0)}>e-masters Partner · Weikersheim</p>
        <h1 className="belschner-hero-title">
          {["Strom,", "der", "mitdenkt."].map((word, i) => (
            <span className="belschner-hero-word" style={{ "--w": i } as CSSProperties} key={word + i}>
              {word}
            </span>
          ))}
        </h1>
        <p className="belschner-hero-desc" {...reveal(2)}>
          Elektroinstallation, Service und Smart Home — vom sicheren Anschluss bis zum intelligenten Zuhause.
        </p>
        <div className="belschner-hero-actions" {...reveal(3)}>
          {phoneHref && (
            <a className="belschner-btn belschner-btn-primary" href={phoneHref}>
              <Phone size={16} /> Anrufen
            </a>
          )}
          {lead.contact.mapsUrl && (
            <a className="belschner-btn belschner-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin size={16} /> Route
            </a>
          )}
        </div>
        <a className="belschner-scroll-cue" href="#leistungen" {...reveal(4)}>
          <ArrowDown size={15} /> Mehr entdecken
        </a>
      </div>
      {heroImage && (
        <a className="belschner-source-tag" href={heroImage.sourceUrl} target="_blank" rel="noreferrer">
          Offizielle Website · Freigabe ausstehend
        </a>
      )}
    </section>
  );
}

function Services({ lead }: { lead: LeadProfile }) {
  const services = lead.services ?? [];
  return (
    <section className="belschner-services" id="leistungen">
      <div className="belschner-section-head" {...reveal(0)}>
        <p className="belschner-eyebrow">Leistungen</p>
        <h2>Was wir für Sie tun</h2>
      </div>
      <div className="belschner-service-grid">
        {services.map((service, index) => (
          <article className="belschner-service-card service-card" key={service.title} {...reveal(index)}>
            <span className="belschner-card-icon">{SERVICE_ICONS[index % SERVICE_ICONS.length]}</span>
            <h3>{service.title}</h3>
            {service.description && <p>{service.description}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery({ assets }: { assets: MediaAsset[] }) {
  if (!assets.length) return null;
  return (
    <section className="belschner-gallery">
      <div className="belschner-gallery-track" role="list">
        {assets.map((asset, index) => (
          <div className="belschner-gallery-item" role="listitem" key={asset.src} {...reveal(index)}>
            <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 760px) 78vw, 30vw" unoptimized />
          </div>
        ))}
      </div>
    </section>
  );
}

function Company() {
  return (
    <section className="belschner-company" id="unternehmen">
      <div className="belschner-company-copy" {...reveal(0)}>
        <p className="belschner-eyebrow">Über uns</p>
        <h2>Ihr Elektro-Fachbetrieb in Weikersheim.</h2>
        <p>
          Als Elektro-Profi und e-masters-Partner stehen wir für Qualität, Sicherheit und Energie. Von der
          Installation über Service und Wartung bis zum vernetzten Smart Home — saubere Lösungen aus einer Hand,
          regional und persönlich.
        </p>
      </div>
    </section>
  );
}

function Certifications({ lead }: { lead: LeadProfile }) {
  if (!lead.certifications?.length) return null;
  return (
    <section className="belschner-certifications" id="qualität">
      <div className="belschner-section-head" {...reveal(0)}>
        <p className="belschner-eyebrow">Qualität</p>
        <h2>Worauf Sie sich verlassen können</h2>
      </div>
      <div className="belschner-cert-grid">
        {lead.certifications.map((cert, index) => (
          <article className="belschner-cert-card" key={cert.title} {...reveal(index)}>
            <span className="belschner-card-icon belschner-cert-icon"><ShieldCheck size={20} /></span>
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
    <section className="belschner-admin-cta" {...reveal(0)}>
      <div className="belschner-admin-cta-copy">
        <p className="belschner-eyebrow">Software-Konzept</p>
        <h2>Aufträge, Termine und Prüffristen — alles im Blick.</h2>
        <p>Ein Blick in das geplante Auftrags- und Prüfungsmanagement für den Betrieb.</p>
      </div>
      <Link className="belschner-btn belschner-btn-primary belschner-admin-btn" href={`/demo/${lead.slug}/admin`}>
        <LayoutDashboard size={16} /> Control-Panel ansehen <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}

function ContactBand({ lead, phoneHref }: { lead: LeadProfile; phoneHref?: string }) {
  return (
    <section className="belschner-contact" id="kontakt" {...reveal(0)}>
      <div className="belschner-contact-copy" {...reveal(0)}>
        <p className="belschner-eyebrow">Kontakt</p>
        <h2>{lead.businessName}</h2>
        <p>Sprechen Sie unverbindlich mit uns über Installation, Modernisierung oder Smart Home.</p>
        <p className="belschner-contact-address">{lead.contact.address ?? lead.city}</p>
      </div>
      <div className="belschner-contact-actions" {...reveal(1)}>
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

function BelschnerFooter({ lead }: { lead: LeadProfile }) {
  return (
    <footer className="belschner-footer">
      <div className="belschner-footer-top">
        <Image src="/leads/belschner-elektrotechnik-w7k4n2/logo.svg" alt="Belschner Elektrotechnik Logo" width={140} height={38} unoptimized />
        <a className="belschner-back-to-top" href="#top">Nach oben <ArrowRight size={14} /></a>
      </div>
      <div className="belschner-footer-bottom">
        <span>© 2026 {lead.businessName}</span>
        <span>Unverbindliches Designkonzept · Kein offizieller Unternehmensauftritt</span>
      </div>
    </footer>
  );
}
