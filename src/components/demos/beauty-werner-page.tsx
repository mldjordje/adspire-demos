import { ArrowRight, ArrowUpRight, Camera, LayoutDashboard, MapPin, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LeadProfile } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import { BeautyWernerBooking } from "./beauty-werner-booking";
import "./ola-beauty-page.css";
import "./beauty-werner-page.css";

const ASSET = "/leads/beauty-werner-bad-mergentheim-r3m8x5";
const HERO_FALLBACK = `${ASSET}/hero.svg`;
const ABOUT_FALLBACK = `${ASSET}/about.svg`;

const PORTFOLIO_FALLBACK = [
  { src: `${ASSET}/work-lashes.svg`, alt: "Stilisierte Illustration ausdrucksstarker Wimpern" },
  { src: `${ASSET}/work-pmu.svg`, alt: "Stilisierte Illustration betonter Augenbrauen" },
  { src: `${ASSET}/work-skin.svg`, alt: "Stilisierte Illustration gepflegter, strahlender Haut" },
];

const PORTFOLIO_TAGS = ["Permanent Make-up · Brauen", "Wimpern · Volumen", "Kosmetik · Behandlung"];

const NAV = [
  { label: "Behandlungen", href: "#leistungen" },
  { label: "Ergebnisse", href: "#portfolio" },
  { label: "Über uns", href: "#about" },
];

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

export function BeautyWernerPage({ lead }: { lead: LeadProfile }) {
  const services = lead.services ?? [];
  const gallery = lead.media?.gallery ?? [];
  const heroSrc = lead.media?.hero?.src ?? HERO_FALLBACK;
  const heroAlt = lead.media?.hero?.alt ?? "Stilisierte Beauty-Illustration";
  const aboutSrc = gallery[3]?.src ?? lead.media?.hero?.src ?? ABOUT_FALLBACK;
  const aboutAlt = gallery[3]?.alt ?? "Beauty Werner — Studio";
  const portfolio = PORTFOLIO_FALLBACK.map((fb, i) => ({
    src: gallery[i]?.src ?? fb.src,
    alt: gallery[i]?.alt ?? fb.alt,
    tag: PORTFOLIO_TAGS[i],
  }));
  return (
    <main className="ola-page bw-theme" id="top">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap"
      />
      <MotionLayer />
      <p className="ola-disclaimer">Unverbindliches Designkonzept — nicht die offizielle Website des Studios</p>

      <header className="ola-header site-header">
        <a className="ola-wordmark" href="#top">BEAUTY<span> </span>WERNER</a>
        <nav className="ola-nav" aria-label="Hauptnavigation">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="ola-header-cta" href="#booking">Termin anfragen</a>
      </header>

      <section className="ola-hero">
        <div className="ola-hero-line" />
        <div className="ola-hero-left">
          <p className="ola-eyebrow" {...reveal(0)}>Kosmetik &amp; Beauty · {lead.city}</p>
          <h1 className="ola-hero-title" {...reveal(1)}>Schönheit,<br /><em>die bleibt.</em></h1>
          <p className="ola-hero-sub" {...reveal(2)}>
            Kosmetik, Permanent Make-up, Wimpern und Laser — von der Meisterin, mit Ruhe, Sorgfalt und Blick fürs Detail.
          </p>
          <div className="ola-hero-actions" {...reveal(3)}>
            <a className="ola-btn-primary" href="#booking"><span>Termin anfragen</span></a>
            <a className="ola-btn-ghost" href="#leistungen">Unsere Behandlungen</a>
          </div>
          <div className="ola-scroll-hint" {...reveal(4)}><span className="line" /><span>Scroll</span></div>
        </div>
        <div className="ola-hero-right" data-parallax="0.05">
          <Image src={heroSrc} alt={heroAlt} fill sizes="50vw" priority unoptimized style={{ objectFit: "cover" }} />
          <div className="ola-hero-scrim" />
        </div>
      </section>

      <section className="ola-section" id="leistungen">
        <p className="ola-section-label" {...reveal(0)}>Unsere Behandlungen</p>
        <h2 className="ola-section-heading" {...reveal(1)}>Was wir <em>für Sie</em> tun</h2>
        <div className="ola-services-grid">
          {services.map((service, i) => (
            <article className="ola-service-card service-card" key={service.title} {...reveal(i)}>
              <span className="ola-service-icon"><Sparkles size={18} /></span>
              <h3 className="ola-service-name">{service.title}</h3>
              {service.description && <p className="ola-service-desc">{service.description}</p>}
              {service.meta && <p className="ola-service-price">{service.meta}</p>}
            </article>
          ))}
        </div>
      </section>

      <div className="ola-portfolio" id="portfolio">
        <div className="ola-portfolio-intro">
          <p className="ola-section-label" {...reveal(0)}>Ergebnisse</p>
          <h2 className="ola-section-heading" {...reveal(1)}>Feines <em>Handwerk</em></h2>
        </div>
        <div className="ola-portfolio-track">
          {portfolio.map((item, i) => (
            <div className="ola-portfolio-item" key={item.src} {...reveal(i)}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 82vw, 440px" unoptimized />
              <div className="ola-portfolio-overlay"><span className="ola-portfolio-tag">{item.tag}</span></div>
            </div>
          ))}
          <div className="ola-portfolio-cta" {...reveal(3)}>
            <p>Mehr auf<br />Instagram</p>
            <a className="ola-btn-primary" href={lead.contact.instagramUrl ?? "#"} target="_blank" rel="noreferrer">
              <Camera size={15} /> <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <section className="ola-section" id="about">
        <div className="ola-about-grid">
          <div className="ola-about-photo-wrap" {...reveal(0)}>
            <Image src={aboutSrc} alt={aboutAlt} className="ola-about-photo" width={600} height={800} unoptimized style={{ objectFit: "cover" }} />
            <div className="ola-about-badge">
              <div className="ola-badge-num">2009</div>
              <div className="ola-badge-label">Meisterin seit</div>
            </div>
          </div>
          <div className="ola-about-text">
            <p className="ola-section-label" {...reveal(0)}>Über uns</p>
            <h2 className="ola-section-heading" {...reveal(1)}>Studio <em>Beauty Werner</em></h2>
            <div className="ola-about-divider" {...reveal(2)} />
            <p className="ola-about-body" {...reveal(3)}>
              Inhaberin Olga Werner ist Meisterin ihres Fachs. In {lead.city} verbindet ihr Studio klassisches
              Handwerk mit moderner Kosmetik — von der Gesichtspflege bis zur Laser-Behandlung.
            </p>
            <p className="ola-about-body" {...reveal(4)}>
              Jede Behandlung beginnt mit einem Gespräch. Wir nehmen uns Zeit, das Richtige für Sie zu finden —
              natürlich betont statt überladen.
            </p>
            <div {...reveal(5)}><a className="ola-btn-primary" href="#booking" style={{ marginTop: 8 }}><span>Termin anfragen</span></a></div>
            <p className="ola-about-sig" {...reveal(6)}>— Olga Werner &amp; Team</p>
          </div>
        </div>
      </section>

      <section className="ola-booking" id="booking">
        <div className="ola-booking-bg" aria-hidden>
          <span className="ola-orb o1" />
          <span className="ola-orb o2" />
          <span className="ola-orb o3" />
        </div>
        <div className="ola-booking-inner">
          <p className="ola-booking-label" {...reveal(0)}>Termin anfragen</p>
          <h2 className="ola-booking-heading" {...reveal(1)}>In 4 Schritt<em>en</em> zum Termin</h2>
          <p className="ola-booking-sub" {...reveal(2)}>Schnell, einfach und direkt — ohne Umwege.</p>
          <BeautyWernerBooking />
        </div>
      </section>

      <section className="ola-admin-cta" {...reveal(0)}>
        <div>
          <p className="ola-section-label">Software-Konzept</p>
          <h2>Termine, Kundinnen und Umsatz — alles im Blick.</h2>
          <p>Ein Blick in die geplante Studioverwaltung mit Terminkalender, Kundenkartei und Auslastung.</p>
        </div>
        <Link className="ola-btn-primary" href={`/demo/${lead.slug}/admin`}>
          <LayoutDashboard size={15} /> <span>Admin-Vorschau ansehen</span> <ArrowUpRight size={15} />
        </Link>
      </section>

      <footer className="ola-footer">
        <p className="ola-footer-logo">BEAUTY<span> </span>WERNER</p>
        <p className="ola-footer-tagline">Kosmetik &amp; Beauty · {lead.city}</p>
        <div className="ola-footer-contact">
          {lead.contact.mapsUrl && (
            <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />Route öffnen</a>
          )}
          <div className="ola-footer-line" />
          {lead.contact.instagramUrl && <a href={lead.contact.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>}
          <div className="ola-footer-line" />
          <Link href={`/demo/${lead.slug}/admin`}>Admin-Vorschau</Link>
        </div>
        <a className="ola-btn-ghost" href="#top" style={{ color: "rgba(255,255,255,.4)" }}>Nach oben <ArrowRight size={13} /></a>
        <p className="ola-footer-copy" style={{ marginTop: 24 }}>© 2026 {lead.businessName} · Unverbindliches Designkonzept</p>
      </footer>
    </main>
  );
}
