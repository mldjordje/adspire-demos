import {
  ArrowDown,
  ArrowRight,
  Droplet,
  Factory,
  Flame,
  Fuel,
  Globe,
  MapPin,
  Sun,
  Truck,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { LeadProfile, MediaAsset } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import { KablitzEmberCanvas } from "./kablitz-ember-canvas";
import "./kablitz-page.css";
import "./hoyer-page.css";

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

const NAV_ITEMS = ["Leistungen", "Unternehmen", "Qualität", "Kontakt"];

const SERVICE_ICONS: ReactNode[] = [
  <Flame size={22} key="heizoel" />,
  <Factory size={22} key="pellets" />,
  <Fuel size={22} key="diesel" />,
  <Droplet size={22} key="fluessiggas" />,
  <Truck size={22} key="schmierstoffe" />,
  <Sun size={22} key="energiewende" />,
];

export function HoyerPage({ lead }: { lead: LeadProfile }) {
  const services = lead.services ?? [];
  const gallery = lead.media?.gallery ? [lead.media.hero, ...lead.media.gallery].filter(Boolean) as MediaAsset[] : [];
  const heroImage = lead.media?.hero;
  const galleryAssets = gallery.slice(1);
  return (
    <main className="kablitz-page hoyer-theme" id="top">
      <MotionLayer />
      <p className="kablitz-disclaimer">Unverbindliches Designkonzept — nicht die offizielle Website des Unternehmens</p>

      <header className="kablitz-header">
        <a className="kablitz-wordmark hoyer-wordmark" href="#top" aria-label={`${lead.businessName} Startseite`}>
          HOYER<span>·</span>Energie
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

      <section className="kablitz-hero hoyer-hero">
        <div className="kablitz-hero-media" data-parallax="0.06">
          {heroImage && <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" unoptimized priority />}
          <KablitzEmberCanvas />
          <div className="kablitz-hero-scrim" />
        </div>
        <div className="kablitz-hero-copy">
          <p className="kablitz-eyebrow" {...reveal(0)}>Energie-Service · {lead.city}</p>
          <h1 className="kablitz-hero-title">
            {["Wärme,", "die", "ankommt."].map((word, i) => (
              <span className="kablitz-hero-word" style={{ "--w": i } as CSSProperties} key={word + i}>
                {word}
              </span>
            ))}
          </h1>
          <p className="kablitz-hero-desc" {...reveal(2)}>
            Heizöl, Holzpellets, Kraftstoffe und Schmierstoffe — zuverlässig geliefert. Dazu moderne
            Energie mit PV, Strom und E-Mobilität. Günstig geht jetzt.
          </p>
          <div className="kablitz-hero-actions" {...reveal(3)}>
            {lead.contact.website && (
              <a className="kablitz-btn kablitz-btn-primary" href={lead.contact.website} target="_blank" rel="noreferrer">
                <Globe size={16} /> Preis anfragen
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
      </section>

      <section className="kablitz-services" id="leistungen">
        <div className="kablitz-section-head" {...reveal(0)}>
          <p className="kablitz-eyebrow">Leistungen</p>
          <h2>Energie für die Region</h2>
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
          <h2>Ihr Energie-Partner vor Ort.</h2>
          <p>
            Der Hoyer Energie-Service versorgt {lead.city} und die Region — mit klassischen Brennstoffen
            aus regionalen Lagern und eigenem Fuhrpark, und mit Lösungen für die Energiewende von PV bis
            Ladeinfrastruktur. Alles aus einer Hand, planbar und pünktlich.
          </p>
        </div>
      </section>

      {lead.certifications?.length ? (
        <section className="kablitz-certifications" id="qualität">
          <div className="kablitz-section-head" {...reveal(0)}>
            <p className="kablitz-eyebrow">Qualität</p>
            <h2>Worauf Sie sich verlassen können</h2>
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
      ) : null}

      <section className="kablitz-contact" id="kontakt" {...reveal(0)}>
        <div className="kablitz-contact-copy" {...reveal(0)}>
          <p className="kablitz-eyebrow">Kontakt</p>
          <h2>{lead.businessName}</h2>
          <p>Fragen Sie unverbindlich Ihren tagesaktuellen Preis für Öl, Pellets oder Kraftstoff an.</p>
          <p className="kablitz-contact-address">{lead.contact.address ?? lead.city}</p>
        </div>
        <div className="kablitz-contact-actions" {...reveal(1)}>
          {lead.contact.website && (
            <a href={lead.contact.website} target="_blank" rel="noreferrer">
              <Globe /> <span><small>Online</small>Preis anfragen</span>
            </a>
          )}
          {lead.contact.mapsUrl && (
            <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin /> <span><small>Standort</small>Route öffnen</span>
            </a>
          )}
        </div>
      </section>

      <footer className="kablitz-footer">
        <div className="kablitz-footer-top">
          <span className="kablitz-wordmark hoyer-wordmark hoyer-wordmark-footer">HOYER<span>·</span>Energie</span>
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
