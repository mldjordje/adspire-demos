import { ArrowRight, ArrowUpRight, Camera, LayoutDashboard, MapPin, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LeadProfile } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import { TmNailsBooking } from "./tm-nails-booking";
import "./tm-nails-page.css";

const ASSET = "/leads/tm-nails-beauty-bad-mergentheim-a7p3k9";
const HERO = `${ASSET}/tm-hero.jpg`;

const PORTFOLIO = [
  { src: `${ASSET}/work-french-blue.svg`, tag: "French · Babyblau", alt: "Mandelnägel mit hellblauen French-Tips und Schwüngen" },
  { src: `${ASSET}/work-white-floral.svg`, tag: "Nail Art · Blüten", alt: "Milchig-weiße Nägel mit Blütenmotiv und Silberlinien" },
  { src: `${ASSET}/work-nude.svg`, tag: "Babyboomer · Nude", alt: "Natürliche Nude-Nägel im Babyboomer-Verlauf" },
];

const NAV = [
  { label: "Behandlungen", href: "#leistungen" },
  { label: "Ergebnisse", href: "#portfolio" },
  { label: "Über uns", href: "#about" },
];

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

export function TmNailsPage({ lead }: { lead: LeadProfile }) {
  const services = lead.services ?? [];
  return (
    <main className="tm-page" id="top">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap"
      />
      <MotionLayer />
      <p className="tm-disclaimer">Unverbindliches Designkonzept — nicht die offizielle Website des Studios</p>

      <header className="tm-header site-header">
        <a className="tm-wordmark" href="#top">T<span>M</span> NAILS</a>
        <nav className="tm-nav" aria-label="Hauptnavigation">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="tm-header-cta" href="#booking">Termin buchen</a>
      </header>

      <section className="tm-hero">
        <div className="tm-hero-line" />
        <div className="tm-hero-left">
          <p className="tm-eyebrow" {...reveal(0)}>Nageldesign &amp; Beauty · {lead.city}</p>
          <h1 className="tm-hero-title" {...reveal(1)}>Gepflegte<br /><em>Nägel.</em><br />Echtes Detail.</h1>
          <p className="tm-hero-sub" {...reveal(2)}>
            Maniküre, Gel-Modellage und Nail Art mit Liebe zum Handwerk — für einen Look, der zu dir passt.
          </p>
          <div className="tm-hero-actions" {...reveal(3)}>
            <a className="tm-btn-primary" href="#booking"><span>Jetzt buchen</span></a>
            <a className="tm-btn-ghost" href="#leistungen">Unsere Behandlungen</a>
          </div>
          <div className="tm-scroll-hint" {...reveal(4)}><span className="line" /><span>Scroll</span></div>
        </div>
        <div className="tm-hero-right" data-parallax="0.05">
          <Image src={HERO} alt="Mandelförmige Nägel mit French-Tips und Schwüngen" fill sizes="50vw" priority unoptimized />
          <div className="tm-hero-scrim" />
        </div>
      </section>

      <section className="tm-section" id="leistungen">
        <p className="tm-section-label" {...reveal(0)}>Unsere Behandlungen</p>
        <h2 className="tm-section-heading" {...reveal(1)}>Was wir <em>für dich</em> machen</h2>
        <div className="tm-services-grid">
          {services.map((service, i) => (
            <article className="tm-service-card service-card" key={service.title} {...reveal(i)}>
              <span className="tm-service-icon"><Sparkles size={18} /></span>
              <h3 className="tm-service-name">{service.title}</h3>
              {service.description && <p className="tm-service-desc">{service.description}</p>}
              {service.meta && <p className="tm-service-price">{service.meta}</p>}
            </article>
          ))}
        </div>
      </section>

      <div className="tm-portfolio" id="portfolio">
        <div className="tm-portfolio-intro">
          <p className="tm-section-label" {...reveal(0)}>Ergebnisse</p>
          <h2 className="tm-section-heading" {...reveal(1)}>Echte <em>Designs</em></h2>
        </div>
        <div className="tm-portfolio-track">
          {PORTFOLIO.map((item, i) => (
            <div className="tm-portfolio-item" key={item.src} {...reveal(i)}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 82vw, 440px" unoptimized />
              <div className="tm-portfolio-overlay"><span className="tm-portfolio-tag">{item.tag}</span></div>
            </div>
          ))}
          <div className="tm-portfolio-cta" {...reveal(3)}>
            <p>Mehr auf<br />Instagram</p>
            <a className="tm-btn-primary" href={lead.contact.instagramUrl ?? "#"} target="_blank" rel="noreferrer">
              <Camera size={15} /> <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <section className="tm-section" id="about">
        <div className="tm-about-grid">
          <div className="tm-about-photo-wrap" {...reveal(0)}>
            <Image src={HERO} alt="TM Nails & Beauty — Nageldesign" className="tm-about-photo" width={600} height={800} unoptimized />
            <div className="tm-about-badge">
              <div className="tm-badge-num">7+</div>
              <div className="tm-badge-label">Jahre Erfahrung</div>
            </div>
          </div>
          <div className="tm-about-text">
            <p className="tm-section-label" {...reveal(0)}>Über uns</p>
            <h2 className="tm-section-heading" {...reveal(1)}>Studio <em>TM Nails & Beauty</em></h2>
            <div className="tm-about-divider" {...reveal(2)} />
            <p className="tm-about-body" {...reveal(3)}>
              Schöne Nägel sind für uns kein Job, sondern Leidenschaft. Seit Jahren gestalten wir in {lead.city}
              {" "}Hände, die sich sehen lassen können — sorgfältig, hygienisch und mit Blick fürs Detail.
            </p>
            <p className="tm-about-body" {...reveal(4)}>
              Jede Kundin ist einzigartig. Darum nehmen wir uns Zeit, das Richtige für dich zu finden —
              ob dezent natürlich oder ausdrucksstark im Design.
            </p>
            <div {...reveal(5)}><a className="tm-btn-primary" href="#booking" style={{ marginTop: 8 }}><span>Termin buchen</span></a></div>
            <p className="tm-about-sig" {...reveal(6)}>— Team TM Nails & Beauty</p>
          </div>
        </div>
      </section>

      <section className="tm-booking" id="booking">
        <div className="tm-booking-bg" aria-hidden>
          <span className="tm-orb o1" />
          <span className="tm-orb o2" />
          <span className="tm-orb o3" />
        </div>
        <div className="tm-booking-inner">
          <p className="tm-booking-label" {...reveal(0)}>Termin buchen</p>
          <h2 className="tm-booking-heading" {...reveal(1)}>In 3 Schritt<em>en</em> zum Termin</h2>
          <p className="tm-booking-sub" {...reveal(2)}>Schnell, einfach und direkt — ohne Umwege.</p>
          <TmNailsBooking />
        </div>
      </section>

      <section className="tm-admin-cta" {...reveal(0)}>
        <div>
          <p className="tm-section-label">Software-Konzept</p>
          <h2>Termine, Kundinnen und Umsatz — alles im Blick.</h2>
          <p>Ein Blick in die geplante Salonverwaltung mit Terminkalender, Kundenkartei und Auslastung.</p>
        </div>
        <Link className="tm-btn-primary" href={`/demo/${lead.slug}/admin`}>
          <LayoutDashboard size={15} /> <span>Admin-Vorschau ansehen</span> <ArrowUpRight size={15} />
        </Link>
      </section>

      <footer className="tm-footer">
        <p className="tm-footer-logo">T<span>M</span> NAILS</p>
        <p className="tm-footer-tagline">Nageldesign &amp; Beauty · {lead.city}</p>
        <div className="tm-footer-contact">
          {lead.contact.mapsUrl && (
            <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />Route öffnen</a>
          )}
          <div className="tm-footer-line" />
          {lead.contact.instagramUrl && <a href={lead.contact.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>}
          <div className="tm-footer-line" />
          <Link href={`/demo/${lead.slug}/admin`}>Admin-Vorschau</Link>
        </div>
        <a className="tm-btn-ghost" href="#top" style={{ color: "rgba(255,255,255,.4)" }}>Nach oben <ArrowRight size={13} /></a>
        <p className="tm-footer-copy" style={{ marginTop: 24 }}>© 2026 {lead.businessName} · Unverbindliches Designkonzept</p>
      </footer>
    </main>
  );
}
