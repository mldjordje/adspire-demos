import {
  ArrowDown,
  ArrowRight,
  Boxes,
  HardHat,
  Layers,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Shovel,
  Truck,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { LeadProfile, MediaAsset } from "@/lib/lead-schema";
import { telephoneHref } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import "./kablitz-page.css";
import "./brunner-page.css";

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

const NAV_ITEMS = ["Leistungen", "Unternehmen", "Ablauf", "Kontakt"];

const SERVICE_ICONS: ReactNode[] = [
  <Package size={22} key="baustoffe" />,
  <Truck size={22} key="transporte" />,
  <Shovel size={22} key="erdarbeiten" />,
  <Layers size={22} key="schuettgut" />,
  <HardHat size={22} key="service" />,
  <MessageCircle size={22} key="beratung" />,
];

export function BrunnerPage({ lead }: { lead: LeadProfile }) {
  const services = lead.services ?? [];
  const process = lead.process ?? [];
  const gallery = lead.media?.gallery ? [lead.media.hero, ...lead.media.gallery].filter(Boolean) as MediaAsset[] : [];
  const heroImage = lead.media?.hero;
  const galleryAssets = gallery.slice(1);
  const phoneHref = telephoneHref(lead.contact.phone);

  return (
    <main className="kablitz-page brunner-theme" id="top">
      <MotionLayer />
      <p className="kablitz-disclaimer">Unverbindliches Designkonzept — nicht die offizielle Website des Unternehmens</p>

      <header className="kablitz-header">
        <a className="kablitz-wordmark brunner-wordmark" href="#top" aria-label={`${lead.businessName} Startseite`}>
          <Truck size={20} /> <span className="brunner-wordmark-name">BRUNNER</span><span className="brunner-wordmark-sub">Baustoffe &amp; Transporte</span>
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

      <section className="kablitz-hero brunner-hero">
        <div className="kablitz-hero-media" data-parallax="0.06">
          {heroImage && <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" unoptimized priority />}
          <div className="kablitz-hero-scrim" />
        </div>
        <div className="kablitz-hero-copy">
          <p className="kablitz-eyebrow" {...reveal(0)}>Baustoffe &amp; Transporte · {lead.city}</p>
          <h1 className="kablitz-hero-title">
            {["Ihre", "Baustelle,", "unser", "Job."].map((word, i) => (
              <span className="kablitz-hero-word" style={{ "--w": i } as CSSProperties} key={word + i}>
                {word}
              </span>
            ))}
          </h1>
          <p className="kablitz-hero-desc" {...reveal(2)}>
            Baustofflieferung, Transporte und Erdarbeiten — zuverlässig und termingerecht direkt auf Ihre Baustelle.
          </p>
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

      <section className="kablitz-services" id="leistungen">
        <div className="kablitz-section-head" {...reveal(0)}>
          <p className="kablitz-eyebrow">Leistungen</p>
          <h2>Was wir für Sie tun</h2>
        </div>
        <div className="kablitz-service-grid">
          {services.map((service, index) => (
            <article className="kablitz-service-card" key={service.title} {...reveal(index)}>
              <span className="kablitz-card-icon">{SERVICE_ICONS[index % SERVICE_ICONS.length]}</span>
              <h3>{service.title}</h3>
              {service.description && <p>{service.description}</p>}
            </article>
          ))}
        </div>
      </section>

      {galleryAssets.length > 0 && (
        <section className="kablitz-gallery">
          <div className="kablitz-gallery-track" role="list">
            {galleryAssets.map((asset, index) => (
              <div className="kablitz-gallery-item" role="listitem" key={asset.src} {...reveal(index)}>
                <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 760px) 78vw, 30vw" unoptimized />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="kablitz-company" id="unternehmen">
        <div className="kablitz-company-copy" {...reveal(0)}>
          <p className="kablitz-eyebrow">Über uns</p>
          <h2>Ihr Partner für die Baustelle.</h2>
          <p>
            Sebastian Brunner Baustoffe &amp; Transporte aus Bad Mergentheim-Wachbach liefert Baustoffe,
            übernimmt Transporte und führt Erdarbeiten aus — zuverlässig, termingerecht und direkt vor Ort
            im Main-Tauber-Kreis.
          </p>
        </div>
      </section>

      {lead.certifications?.length ? (
        <section className="kablitz-certifications" id="ablauf">
          <div className="kablitz-section-head" {...reveal(0)}>
            <p className="kablitz-eyebrow">Ablauf</p>
            <h2>So arbeiten wir</h2>
          </div>
          <div className="kablitz-cert-grid">
            {process.map((step, index) => (
              <article className="kablitz-cert-card" key={step.title} {...reveal(index)}>
                <span className="kablitz-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                {step.description && <p>{step.description}</p>}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="kablitz-contact" id="kontakt" {...reveal(0)}>
        <div className="kablitz-contact-copy" {...reveal(0)}>
          <p className="kablitz-eyebrow">Kontakt</p>
          <h2>{lead.businessName}</h2>
          <p>Fragen Sie unverbindlich Material, Transport oder Erdarbeiten für Ihre Baustelle an.</p>
          <p className="kablitz-contact-address">{lead.contact.address ?? lead.city}</p>
          {lead.openingHours?.length ? (
            <p className="kablitz-contact-address">{lead.openingHours.join(" · ")}</p>
          ) : null}
        </div>
        <div className="kablitz-contact-actions" {...reveal(1)}>
          {phoneHref && (
            <a href={phoneHref}>
              <Phone /> <span><small>Telefon</small>{lead.contact.phone}</span>
            </a>
          )}
          {lead.contact.email && (
            <a href={`mailto:${lead.contact.email}`}>
              <Boxes /> <span><small>E-Mail</small>{lead.contact.email}</span>
            </a>
          )}
          {lead.contact.mapsUrl && (
            <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin /> <span><small>Bauhof</small>Route öffnen</span>
            </a>
          )}
        </div>
      </section>

      <footer className="kablitz-footer">
        <div className="kablitz-footer-top">
          <span className="kablitz-wordmark brunner-wordmark brunner-wordmark-footer">
            <Truck size={18} /> <span className="brunner-wordmark-name">BRUNNER</span>
          </span>
          <a className="kablitz-back-to-top" href="#top">Nach oben <ArrowRight size={14} /></a>
        </div>
        <div className="kablitz-footer-bottom">
          <span>© 2026 {lead.businessName}</span>
          <span>Unverbindliches Designkonzept · Kein offizieller Unternehmensauftritt</span>
        </div>
      </footer>
    </main>
  );
}
