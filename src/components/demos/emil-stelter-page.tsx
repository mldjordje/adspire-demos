import {
  ArrowDown,
  ArrowRight,
  Building2,
  Droplets,
  ExternalLink,
  Home,
  LayoutDashboard,
  MapPin,
  PaintRoller,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LeadProfile, MediaAsset } from "@/lib/lead-schema";
import { telephoneHref } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import "./emil-stelter-page.css";

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

const NAV_ITEMS = ["Leistungen", "Unternehmen", "Referenzen", "Kontakt"];

const SERVICE_ICONS: ReactNode[] = [
  <PaintRoller size={22} key="malerarbeiten" />,
  <Sparkles size={22} key="wandgestaltung" />,
  <Building2 size={22} key="geruestbau" />,
  <Home size={22} key="stuckateurarbeiten" />,
  <Droplets size={22} key="wasserschaden" />,
  <ShieldCheck size={22} key="sanierung" />,
];

export function EmilStelterPage({ lead }: { lead: LeadProfile }) {
  const gallery = lead.media?.gallery ? ([lead.media.hero, ...lead.media.gallery].filter(Boolean) as MediaAsset[]) : [];
  const ordered = [...gallery].sort((a, b) => a.src.localeCompare(b.src));
  const heroImage = ordered[0];
  const phoneHref = telephoneHref(lead.contact.phone);

  return (
    <main className="emil-page" id="top">
      <MotionLayer />
      <p className="emil-disclaimer">Unverbindliches Designkonzept - nicht die offizielle Website des Unternehmens</p>

      <EmilHeader lead={lead} />
      <Hero lead={lead} heroImage={heroImage} phoneHref={phoneHref} />
      <Stats />
      <Services services={lead.services ?? []} />
      <CraftStory assets={ordered.slice(1, 4)} />
      <Gallery assets={ordered.slice(4, 11)} />
      <Company />
      <Certifications lead={lead} />
      <AdminCta lead={lead} />
      <ContactBand lead={lead} phoneHref={phoneHref} />
      <EmilFooter lead={lead} />
    </main>
  );
}

function EmilHeader({ lead }: { lead: LeadProfile }) {
  return (
    <header className="emil-header">
      <a className="emil-wordmark" href="#top" aria-label={`${lead.businessName} Startseite`}>
        <Image src="/leads/emil-stelter-gmbh-bad-mergentheim-p6d4n8/logo.gif" alt="Emil Stelter Logo" width={150} height={56} priority unoptimized />
      </a>
      <nav className="emil-nav" aria-label="Hauptnavigation">
        {NAV_ITEMS.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
        ))}
      </nav>
      <div className="emil-header-actions">
        {lead.contact.mapsUrl && (
          <a className="emil-btn emil-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={15} /> Route
          </a>
        )}
        <a className="emil-btn emil-btn-primary" href="#kontakt">Kontakt</a>
      </div>
    </header>
  );
}

function Hero({
  lead,
  heroImage,
  phoneHref,
}: {
  lead: LeadProfile;
  heroImage?: MediaAsset;
  phoneHref?: string;
}) {
  return (
    <section className="emil-hero">
      {heroImage && (
        <div className="emil-hero-media" data-parallax="0.06">
          <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" unoptimized priority />
          <div className="emil-hero-scrim" />
        </div>
      )}
      <div className="emil-hero-copy">
        <p className="emil-eyebrow" {...reveal(0)}>Bad Mergentheim - Meisterbetrieb seit 1956</p>
        <h1 className="emil-hero-title">
          {["Wir", "kleiden", "Gebäude", "neu", "ein."].map((word, i) => (
            <span className="emil-hero-word" style={{ "--w": i } as CSSProperties} key={word + i}>
              {word}
            </span>
          ))}
        </h1>
        <p className="emil-hero-desc" {...reveal(2)}>
          {lead.shortDescription}
        </p>
        <div className="emil-hero-actions" {...reveal(3)}>
          {phoneHref && (
            <a className="emil-btn emil-btn-primary" href={phoneHref}>
              <Phone size={16} /> Anrufen
            </a>
          )}
          {lead.contact.mapsUrl && (
            <a className="emil-btn emil-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin size={16} /> Route
            </a>
          )}
        </div>
        <a className="emil-scroll-cue" href="#leistungen" {...reveal(4)}>
          <ArrowDown size={15} /> Mehr entdecken
        </a>
      </div>
      {heroImage && (
        <a className="emil-source-tag" href={heroImage.sourceUrl} target="_blank" rel="noreferrer">
          Offizielle Website - Freigabe ausstehend
        </a>
      )}
    </section>
  );
}

function Stats() {
  const stats = [
    ["3.", "Generation"],
    ["60+", "Jahre Kompetenz"],
    ["1956", "Firmengruendung"],
    ["12", "Leistungsbereiche"],
  ];
  return (
    <section className="emil-stats" aria-label="Emil Stelter Kennzahlen">
      {stats.map(([figure, label]) => (
        <article className="emil-stat" key={label}>
          <strong>{figure}</strong>
          <span>{label}</span>
        </article>
      ))}
    </section>
  );
}

function Services({ services }: { services: NonNullable<LeadProfile["services"]> }) {
  return (
    <section className="emil-services" id="leistungen">
      <div className="emil-section-head" {...reveal(0)}>
        <p className="emil-eyebrow">Leistungen</p>
        <h2>Handwerk fuer Fassade, Raum und Sanierung</h2>
      </div>
      <div className="emil-service-grid">
        {services.slice(0, 6).map((service, index) => (
          <article className="emil-service-card" key={service.title} {...reveal(index)}>
            <span className="emil-card-icon">{SERVICE_ICONS[index]}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CraftStory({ assets }: { assets: MediaAsset[] }) {
  const story = [
    { title: "Farbe planen", text: "Von harmonischen Farbkonzepten bis zu kreativen Oberflaechen: Gestaltung beginnt mit Beratung." },
    { title: "Untergrund sichern", text: "Putz, Daemmung, Feuchte und Schimmel werden fachgerecht bewertet, bevor der Aufbau startet." },
    { title: "Sauber ausfuehren", text: "Maler-, Stuckateur- und Trockenbauarbeiten greifen als handwerklicher Ablauf ineinander." },
  ];
  return (
    <section className="emil-story" id="unternehmen">
      <div className="emil-story-copy" {...reveal(0)}>
        <p className="emil-eyebrow">Das sind wir</p>
        <h2>Tradition des deutschen Handwerks, modern inszeniert.</h2>
        <p>Der Meisterbetrieb arbeitet in dritter Generation und verbindet Gestaltung, Schutz und Sanierung rund um Gebaeude und Innenraeume.</p>
      </div>
      <div className="emil-story-steps">
        {story.map((item, index) => (
          <article className="emil-story-step" key={item.title} {...reveal(index)}>
            {assets[index] && <Image src={assets[index].src} alt={assets[index].alt} fill sizes="(max-width: 760px) 90vw, 30vw" unoptimized />}
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery({ assets }: { assets: MediaAsset[] }) {
  if (!assets.length) return null;
  return (
    <section className="emil-gallery" id="referenzen">
      <div className="emil-gallery-track" role="list">
        {assets.map((asset, index) => (
          <div className="emil-gallery-item" role="listitem" key={asset.src} {...reveal(index)}>
            <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 760px) 78vw, 30vw" unoptimized />
          </div>
        ))}
      </div>
    </section>
  );
}

function Company() {
  return (
    <section className="emil-company">
      <div className="emil-company-copy" {...reveal(0)}>
        <p className="emil-eyebrow">Meisterbetrieb</p>
        <h2>Gebaeude, Wohnung oder Zimmer neu einkleiden.</h2>
        <p>
          Emil Stelter steht fuer Malerarbeiten, Stuckateurarbeiten, Geruestbau, Restaurierung,
          Sanierung, Trockenbau, Waermedaemmung und schnelle Hilfe bei Wasserschaden oder Schimmel.
        </p>
      </div>
    </section>
  );
}

function Certifications({ lead }: { lead: LeadProfile }) {
  if (!lead.certifications?.length) return null;
  return (
    <section className="emil-certifications">
      <div className="emil-section-head" {...reveal(0)}>
        <p className="emil-eyebrow">Qualitaet</p>
        <h2>Worauf Kunden sich verlassen koennen</h2>
      </div>
      <div className="emil-cert-grid">
        {lead.certifications.map((cert, index) => (
          <article className="emil-cert-card" key={cert.title} {...reveal(index)}>
            <span className="emil-card-number">{String(index + 1).padStart(2, "0")}</span>
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
    <section className="emil-admin-cta" {...reveal(0)}>
      <div className="emil-admin-cta-copy">
        <p className="emil-eyebrow">Software-Konzept</p>
        <h2>Anfragen, Baustellen und Material sauber im Blick.</h2>
        <p>Eine interne Vorschau fuer Auftragsplanung, Rueckrufe und laufende Projekte.</p>
      </div>
      <Link className="emil-btn emil-btn-primary emil-admin-btn" href={`/demo/${lead.slug}/admin`}>
        <LayoutDashboard size={16} /> Control-Panel ansehen <ExternalLink size={16} />
      </Link>
    </section>
  );
}

function ContactBand({ lead, phoneHref }: { lead: LeadProfile; phoneHref?: string }) {
  return (
    <section className="emil-contact" id="kontakt" {...reveal(0)}>
      <div className="emil-contact-copy" {...reveal(0)}>
        <p className="emil-eyebrow">Kontakt</p>
        <h2>{lead.businessName}</h2>
        <p>{lead.contact.address ?? lead.city}</p>
      </div>
      <div className="emil-contact-actions" {...reveal(1)}>
        {phoneHref && (
          <a href={phoneHref}>
            <Phone /> <span><small>Telefon</small>{lead.contact.phone}</span>
          </a>
        )}
        {lead.contact.mapsUrl && (
          <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin /> <span><small>Standort</small>Route oeffnen</span>
          </a>
        )}
        {lead.contact.website && (
          <a href={lead.contact.website} target="_blank" rel="noreferrer">
            <ExternalLink /> <span><small>Aktuell</small>Bestehende Website</span>
          </a>
        )}
      </div>
    </section>
  );
}

function EmilFooter({ lead }: { lead: LeadProfile }) {
  return (
    <footer className="emil-footer">
      <div className="emil-footer-top">
        <Image src="/leads/emil-stelter-gmbh-bad-mergentheim-p6d4n8/logo.gif" alt="Emil Stelter Logo" width={104} height={39} unoptimized />
        <a className="emil-back-to-top" href="#top">Nach oben <ArrowRight size={14} /></a>
      </div>
      <div className="emil-footer-bottom">
        <span>(c) 2026 {lead.businessName}</span>
        <span>Unverbindliches Designkonzept - Kein offizieller Unternehmensauftritt</span>
      </div>
    </footer>
  );
}
