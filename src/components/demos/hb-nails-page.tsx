import { ArrowRight, ArrowUpRight, Camera, LayoutDashboard, MapPin, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LeadProfile } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import { HbNailsBooking } from "./hb-nails-booking";
import "./hb-nails-page.css";

const ASSET = "/leads/hb-nails-bad-mergentheim-z3v6q8";
const HERO = `${ASSET}/hbnails2.jpg`;
const ABOUT = `${ASSET}/hbnails1.jpg`;

const PORTFOLIO = [
  { src: `${ASSET}/hbnails1.jpg`, tag: "Rot · Ombré XL", alt: "Extralange Coffin-Nägel im roten Ombré-Verlauf mit Kristall-Akzent" },
  { src: `${ASSET}/hbnails2.jpg`, tag: "French · Black-Tip", alt: "Coffin-Nägel in Weiß mit schwarzen French-Tips" },
  { src: `${ASSET}/hb-nude.svg`, tag: "Nude · Rot-Akzent", alt: "Natürliche Nude-Nägel mit rotem Akzentnagel" },
];

const NAV = [
  { label: "Ergebnisse", href: "#portfolio" },
  { label: "Behandlungen", href: "#leistungen" },
  { label: "Über uns", href: "#about" },
];

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

export function HbNailsPage({ lead }: { lead: LeadProfile }) {
  const services = lead.services ?? [];
  return (
    <main className="hb-page" id="top">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap"
      />
      <MotionLayer />
      <p className="hb-disclaimer">Unverbindliches Designkonzept — nicht die offizielle Website des Studios</p>

      <header className="hb-header site-header">
        <a className="hb-wordmark" href="#top">H<span>.</span>B NAILS</a>
        <nav className="hb-nav" aria-label="Hauptnavigation">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="hb-header-cta" href="#booking">Termin buchen</a>
      </header>

      <section className="hb-hero">
        <div className="hb-hero-left">
          <p className="hb-eyebrow" {...reveal(0)}>Nageldesign &amp; Beauty · {lead.city}</p>
          <h1 className="hb-hero-title" {...reveal(1)}>Nägel mit<br /><em>Charakter.</em><br />Kompromisslos.</h1>
          <p className="hb-hero-sub" {...reveal(2)}>
            French, Ombré und extralange Modellagen — präzise gearbeitet, für einen Look, der auffällt.
          </p>
          <div className="hb-hero-actions" {...reveal(3)}>
            <a className="hb-btn-primary" href="#booking"><span>Jetzt buchen</span></a>
            <a className="hb-btn-ghost" href="#portfolio">Ergebnisse ansehen</a>
          </div>
          <div className="hb-hero-meta" {...reveal(4)}>
            <div><strong>8+</strong><span>Jahre</span></div>
            <div><strong>40+</strong><span>Designs</span></div>
            <div><strong>5,0</strong><span>Bewertung</span></div>
          </div>
        </div>
        <div className="hb-hero-right" data-parallax="0.05">
          <Image src={HERO} alt="Coffin-Nägel in Weiß mit schwarzen French-Tips" fill sizes="50vw" priority unoptimized />
          <div className="hb-hero-scrim" />
        </div>
      </section>

      <div className="hb-portfolio" id="portfolio">
        <div className="hb-portfolio-intro">
          <p className="hb-section-label" {...reveal(0)}>Ergebnisse</p>
          <h2 className="hb-section-heading" {...reveal(1)}>Echte <em>Designs</em></h2>
        </div>
        <div className="hb-portfolio-track">
          {PORTFOLIO.map((item, i) => (
            <div className="hb-portfolio-item" key={item.src} {...reveal(i)}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 82vw, 430px" unoptimized />
              <div className="hb-portfolio-overlay"><span className="hb-portfolio-tag">{item.tag}</span></div>
            </div>
          ))}
          <div className="hb-portfolio-cta" {...reveal(3)}>
            <p>Mehr auf<br />Instagram</p>
            <a className="hb-btn-primary" href={lead.contact.instagramUrl ?? "#"} target="_blank" rel="noreferrer">
              <Camera size={15} /> <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <section className="hb-section" id="leistungen">
        <p className="hb-section-label" {...reveal(0)}>Unsere Behandlungen</p>
        <h2 className="hb-section-heading" {...reveal(1)}>Was wir <em>für dich</em> machen</h2>
        <div className="hb-services-grid">
          {services.map((service, i) => (
            <article className="hb-service-card service-card" key={service.title} {...reveal(i)}>
              <span className="hb-service-icon"><Sparkles size={18} /></span>
              <h3 className="hb-service-name">{service.title}</h3>
              {service.description && <p className="hb-service-desc">{service.description}</p>}
              {service.meta && <p className="hb-service-price">{service.meta}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="hb-about" id="about">
        <div className="hb-section">
          <div className="hb-about-grid">
            <div className="hb-about-text">
              <p className="hb-section-label" {...reveal(0)}>Über uns</p>
              <h2 className="hb-section-heading" {...reveal(1)}>Studio <em>H.B Nails</em></h2>
              <div className="hb-about-divider" {...reveal(2)} />
              <p className="hb-about-body" {...reveal(3)}>
                Bei H.B Nails ist jedes Set Handarbeit. Seit Jahren gestalten wir in {lead.city}
                {" "}Nägel mit klarer Linie — präzise, hygienisch und mit einem Auge fürs Detail.
              </p>
              <p className="hb-about-body" {...reveal(4)}>
                Ob dezenter French oder ausdrucksstarkes Rot-Ombré in XL-Länge: Wir nehmen uns Zeit,
                bis der Look sitzt und zu dir passt.
              </p>
              <div {...reveal(5)}><a className="hb-btn-primary" href="#booking" style={{ marginTop: 8 }}><span>Termin buchen</span></a></div>
              <p className="hb-about-sig" {...reveal(6)}>— Team H.B Nails</p>
            </div>
            <div className="hb-about-photo-wrap" {...reveal(0)}>
              <Image src={ABOUT} alt="H.B Nails — rotes Ombré-Nageldesign" className="hb-about-photo" width={600} height={800} unoptimized />
              <div className="hb-about-badge">
                <div className="hb-badge-num">8+</div>
                <div className="hb-badge-label">Jahre Erfahrung</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hb-booking" id="booking">
        <div className="hb-booking-bg" aria-hidden>
          <span className="hb-orb o1" />
          <span className="hb-orb o2" />
          <span className="hb-orb o3" />
        </div>
        <div className="hb-booking-inner">
          <p className="hb-booking-label" {...reveal(0)}>Termin buchen</p>
          <h2 className="hb-booking-heading" {...reveal(1)}>In 3 Schritt<em>en</em> zum Termin</h2>
          <p className="hb-booking-sub" {...reveal(2)}>Schnell, einfach und direkt — ohne Umwege.</p>
          <HbNailsBooking />
        </div>
      </section>

      <section className="hb-section">
        <div className="hb-admin-cta" {...reveal(0)}>
          <div>
            <p className="hb-section-label">Software-Konzept</p>
            <h2>Termine, Kundinnen und Umsatz — alles im Blick.</h2>
            <p>Ein Blick in die geplante Salonverwaltung mit Terminkalender, Kundenkartei und Auslastung.</p>
          </div>
          <Link className="hb-btn-primary" href={`/demo/${lead.slug}/admin`}>
            <LayoutDashboard size={15} /> <span>Admin-Vorschau ansehen</span> <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <footer className="hb-footer">
        <p className="hb-footer-logo">H<span>.</span>B NAILS</p>
        <p className="hb-footer-tagline">Nageldesign &amp; Beauty · {lead.city}</p>
        <div className="hb-footer-contact">
          {lead.contact.mapsUrl && (
            <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />Route öffnen</a>
          )}
          <div className="hb-footer-line" />
          {lead.contact.instagramUrl && <a href={lead.contact.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>}
          <div className="hb-footer-line" />
          <Link href={`/demo/${lead.slug}/admin`}>Admin-Vorschau</Link>
        </div>
        <a className="hb-btn-ghost" href="#top" style={{ color: "rgba(245,242,239,.4)" }}>Nach oben <ArrowRight size={13} /></a>
        <p className="hb-footer-copy" style={{ marginTop: 24 }}>© 2026 {lead.businessName} · Unverbindliches Designkonzept</p>
      </footer>
    </main>
  );
}
