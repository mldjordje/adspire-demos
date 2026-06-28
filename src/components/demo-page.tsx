import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  ExternalLink,
  Hammer,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
  Star,
  Utensils,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import {
  sectionHasContent,
  telephoneHref,
  type ContentItem,
  type LeadProfile,
  type MediaAsset,
} from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";

/** Props that opt an element into the scroll-reveal motion layer, with an optional stagger index. */
function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

export function DemoPage({ lead }: { lead: LeadProfile }) {
  return (
    <main className={`demo-site theme-${lead.family}`} data-family={lead.family} id="top">
      <MotionLayer />
      <ConceptNotice />
      {lead.family === "beauty" && <BeautyTemplate lead={lead} />}
      {lead.family === "barber" && <BarberTemplate lead={lead} />}
      {lead.family === "restaurant" && <RestaurantTemplate lead={lead} />}
      {lead.family === "corporate" && <CorporateTemplate lead={lead} />}
      {lead.family === "construction" && <ConstructionTemplate lead={lead} />}
    </main>
  );
}

function ConceptNotice() {
  return (
    <aside className="concept-notice" aria-label="Hinweis zum Designkonzept">
      <span>Unverbindliches Designkonzept</span>
      <span className="concept-notice-detail">Nicht die offizielle Website des Unternehmens</span>
    </aside>
  );
}

function BeautyTemplate({ lead }: { lead: LeadProfile }) {
  return (
    <>
      <SiteHeader lead={lead} icon={<Sparkles size={17} />} />
      <section className="hero beauty-hero">
        <div className="hero-copy">
          <p className="location-line" {...reveal(0)}>{lead.businessType} · {lead.city}</p>
          <h1 {...reveal(1)}>{lead.tagline}</h1>
          <p className="hero-description" {...reveal(2)}>{lead.shortDescription}</p>
          <div {...reveal(3)}><HeroActions lead={lead} /></div>
          <a className="scroll-cue" href="#angebot" {...reveal(4)}><ArrowDown size={16} /> Entdecken</a>
        </div>
        <MediaSlot label="Hero-Motiv" variant="portrait" asset={lead.media?.hero} parallax={0.1} />
      </section>
      <KineticBand lead={lead} />
      <BeautyFeature />
      <ServicesSection lead={lead} title="Behandlungen im Überblick" icon={<Sparkles />} />
      <MediaRail lead={lead} />
      <BookingDemo lead={lead} />
      <ConceptPillars lead={lead} />
      <ReviewsSection lead={lead} />
      <ContactSection lead={lead} />
      <SiteFooter lead={lead} />
    </>
  );
}

function BarberTemplate({ lead }: { lead: LeadProfile }) {
  return (
    <>
      <SiteHeader lead={lead} icon={<Scissors size={18} />} />
      <section className="hero barber-hero">
        <MediaSlot label="Barbershop-Motiv" variant="wide" asset={lead.media?.hero} parallax={0.08} />
        <div className="hero-copy">
          <p className="location-line" {...reveal(0)}>{lead.city}</p>
          <h1 {...reveal(1)}>{lead.tagline}</h1>
          <p className="hero-description" {...reveal(2)}>{lead.shortDescription}</p>
          <div {...reveal(3)}><HeroActions lead={lead} /></div>
        </div>
      </section>
      <div className="barber-pole" aria-hidden="true" />
      <div className="barber-marquee" aria-hidden="true">
        <div className="marquee-inner">
          <span>Cut · Beard · Style · Bad Mergentheim · </span>
          <span>Cut · Beard · Style · Bad Mergentheim · </span>
        </div>
      </div>
      <ServicesSection lead={lead} title="Leistungen" icon={<Scissors />} />
      <BookingDemo lead={lead} />
      <ConceptPillars lead={lead} />
      <MediaRail lead={lead} />
      <KineticBand lead={lead} />
      <ReviewsSection lead={lead} />
      <ContactSection lead={lead} />
      <SiteFooter lead={lead} />
    </>
  );
}

function RestaurantTemplate({ lead }: { lead: LeadProfile }) {
  return (
    <>
      <SiteHeader lead={lead} icon={<Utensils size={17} />} />
      <section className="hero restaurant-hero">
        {lead.media?.hero && (
          <Image className="restaurant-hero-image" src={lead.media.hero.src} alt={lead.media.hero.alt} fill sizes="100vw" unoptimized />
        )}
        <div className="restaurant-frame">
          <p className="location-line" {...reveal(0)}>{lead.city}</p>
          <h1 {...reveal(1)}>{lead.businessName}</h1>
          <div className="restaurant-rule" {...reveal(2)}><Utensils size={18} /></div>
          <p className="restaurant-tagline" {...reveal(3)}>{lead.tagline}</p>
          <div {...reveal(4)}><HeroActions lead={lead} /></div>
        </div>
      </section>
      <div className="kinetic-band" aria-hidden="true">
        <div className="kinetic-track">
          <span>{lead.tagline}</span>
          <span>{lead.businessType} · {lead.city}</span>
          <span>{lead.tagline}</span>
          <span>{lead.businessType} · {lead.city}</span>
        </div>
      </div>
      <section className="restaurant-intro section-shell">
        <div {...reveal(0)}>
          <p className="section-index">01</p>
          <h2>Ein klarer erster Eindruck</h2>
        </div>
        <p {...reveal(1)}>{lead.shortDescription}</p>
      </section>
      <ServicesSection lead={lead} title="Speisekarte & Angebot" icon={<Utensils />} />
      <RestaurantGallery lead={lead} />
      <OpeningHours lead={lead} />
      <ConceptPillars lead={lead} />
      <ReviewsSection lead={lead} />
      <ContactSection lead={lead} />
      <SiteFooter lead={lead} />
    </>
  );
}

function CorporateTemplate({ lead }: { lead: LeadProfile }) {
  return (
    <>
      <SiteHeader lead={lead} />
      <section className="hero corporate-hero">
        <div className="hero-copy">
          <p className="location-line" {...reveal(0)}>{lead.businessType} · {lead.city}</p>
          <h1 {...reveal(1)}>{lead.tagline}</h1>
          <p className="hero-description" {...reveal(2)}>{lead.shortDescription}</p>
          <div {...reveal(3)}><HeroActions lead={lead} /></div>
        </div>
        <div className="corporate-visual" {...reveal(2)}>
          <MediaSlot label="Unternehmensmotiv" variant="landscape" asset={lead.media?.hero} parallax={0.08} />
          <div className="corporate-note">Klar. Erreichbar. Mobil.</div>
        </div>
      </section>
      <ServicesSection lead={lead} title="Leistungen auf einen Blick" />
      <ProcessSection lead={lead} />
      <MediaRail lead={lead} />
      <KineticBand lead={lead} />
      <ConceptPillars lead={lead} />
      <CertificationsSection lead={lead} />
      <ReviewsSection lead={lead} />
      <ContactSection lead={lead} />
      <SiteFooter lead={lead} />
    </>
  );
}

function ConstructionTemplate({ lead }: { lead: LeadProfile }) {
  return (
    <>
      <SiteHeader lead={lead} icon={<Hammer size={18} />} />
      <section className="hero construction-hero">
        <div className="hero-copy">
          <p className="location-line" {...reveal(0)}>{lead.businessType} · {lead.city}</p>
          <h1 {...reveal(1)}>{lead.tagline}</h1>
          <p className="hero-description" {...reveal(2)}>{lead.shortDescription}</p>
          <div {...reveal(3)}><HeroActions lead={lead} /></div>
        </div>
        <MediaSlot label="Projekt- oder Teamfoto" variant="landscape" asset={lead.media?.hero} parallax={0.1} />
        <div className="construction-stripe" aria-hidden="true" />
      </section>
      <div className="kinetic-band" aria-hidden="true">
        <div className="kinetic-track">
          <span>{lead.businessType}</span>
          <span>{lead.city}</span>
          <span>{lead.businessType}</span>
          <span>{lead.city}</span>
        </div>
      </div>
      <ServicesSection lead={lead} title="Leistungen für Ihr Projekt" icon={<Hammer />} />
      <ProcessSection lead={lead} />
      <ProjectsSection lead={lead} />
      <MediaRail lead={lead} />
      <ConceptPillars lead={lead} />
      <EquipmentSection lead={lead} />
      <CertificationsSection lead={lead} />
      <FaqSection lead={lead} />
      <ContactSection lead={lead} />
      <SiteFooter lead={lead} />
    </>
  );
}

function SiteHeader({ lead, icon }: { lead: LeadProfile; icon?: ReactNode }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={`${lead.businessName} Startseite`}>
        {icon}<span>{lead.businessName}</span>
      </a>
      <nav aria-label="Seitennavigation">
        {sectionHasContent(lead.services) && <a href="#angebot">Angebot</a>}
        <a href="#kontakt">Kontakt</a>
      </nav>
      <PrimaryAction lead={lead} compact />
    </header>
  );
}

function HeroActions({ lead }: { lead: LeadProfile }) {
  return (
    <div className="hero-actions">
      <PrimaryAction lead={lead} />
      {lead.contact.mapsUrl && (
        <a className="button button-secondary" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
          <MapPin size={17} /> Route
        </a>
      )}
    </div>
  );
}

function PrimaryAction({ lead, compact = false }: { lead: LeadProfile; compact?: boolean }) {
  const phoneHref = telephoneHref(lead.contact.phone);
  if (lead.primaryCta === "call" && phoneHref) {
    return <a className={`button button-primary ${compact ? "button-compact" : ""}`} href={phoneHref}><Phone size={16} /> Anrufen</a>;
  }
  if (lead.primaryCta === "booking-demo") {
    return <a className={`button button-primary ${compact ? "button-compact" : ""}`} href="#termin"><CalendarDays size={16} /> Termin ansehen</a>;
  }
  if (lead.contact.mapsUrl) {
    return <a className={`button button-primary ${compact ? "button-compact" : ""}`} href={lead.contact.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Route</a>;
  }
  return <a className={`button button-primary ${compact ? "button-compact" : ""}`} href="#kontakt">Kontakt</a>;
}

function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="section-heading" {...reveal(0)}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function ServicesSection({ lead, title, icon }: { lead: LeadProfile; title: string; icon?: ReactNode }) {
  if (!sectionHasContent(lead.services)) return null;
  return (
    <section className="section-shell services-section" id="angebot">
      <SectionTitle title={title} />
      <div className="service-grid">
        {lead.services?.map((service, index) => (
          <article className="service-card" key={service.title} {...reveal(index)}>
            <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="card-icon">{icon ?? <ChevronRight />}</span>
            <h3>{service.title}</h3>
            {service.description && <p>{service.description}</p>}
            {service.meta && <span className="card-meta">{service.meta}</span>}
          </article>
        ))}
      </div>
    </section>
  );
}

function MediaSlot({
  label,
  variant,
  asset,
  parallax,
  revealIndex,
}: {
  label: string;
  variant: "portrait" | "wide" | "landscape";
  asset?: MediaAsset;
  parallax?: number;
  revealIndex?: number;
}) {
  const parallaxProps = asset && parallax ? { "data-parallax": String(parallax) } : {};
  const revealProps = revealIndex === undefined ? {} : reveal(revealIndex);
  return (
    <div
      className={`media-slot media-${variant} ${asset ? "has-asset" : ""}`}
      aria-label={asset ? undefined : `${label} – Platzhalter`}
      {...parallaxProps}
      {...revealProps}
    >
      {asset ? (
        <>
          <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 760px) 80vw, 33vw" unoptimized />
          <a className="media-source" href={asset.sourceUrl} target="_blank" rel="noreferrer">
            Offizielle Website · Freigabe ausstehend
          </a>
        </>
      ) : (
        <>
          <span className="media-mark" aria-hidden="true" />
          <span>{label}</span>
          <small>Freigegebenes Bild einsetzen</small>
        </>
      )}
    </div>
  );
}

// Restaurant-only horizontal scroll-snap gallery. Uses real gallery images when
// present, otherwise falls back to labelled placeholders.
function RestaurantGallery({ lead }: { lead: LeadProfile }) {
  const assets = lead.media?.gallery ?? [];
  const items = assets.length ? assets : null;
  return (
    <section className="resto-gallery" aria-label={`Bildergalerie für ${lead.businessName}`}>
      <div className="resto-gallery-head" {...reveal(0)}>
        <div>
          <p className="section-index">Galerie</p>
          <h2>Einblicke</h2>
        </div>
        <span className="scroll-hint" aria-hidden="true">Wischen <ArrowRight size={15} /></span>
      </div>
      <div className="resto-gallery-track" role="list">
        {items
          ? items.map((asset, index) => (
              <figure className="resto-shot" role="listitem" key={asset.src} {...reveal(index)}>
                <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 760px) 78vw, 32vw" unoptimized />
                <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
                <a className="media-source" href={asset.sourceUrl} target="_blank" rel="noreferrer">
                  Offizielle Website · Freigabe ausstehend
                </a>
              </figure>
            ))
          : ["Ambiente", "Gericht", "Detail", "Tisch"].map((label, index) => (
              <figure className="resto-shot is-empty" role="listitem" key={label} {...reveal(index)}>
                <span className="media-mark" aria-hidden="true" />
                <span>{label}</span>
                <small>Freigegebenes Bild einsetzen</small>
              </figure>
            ))}
      </div>
    </section>
  );
}

// Beauty-only editorial section: a sticky heading beside reveal-on-scroll
// statements. Describes the design concept only — no invented business facts.
function BeautyFeature() {
  const statements = [
    "Ein ruhiger erster Eindruck, der sofort sitzt – ohne visuelles Rauschen.",
    "Auf dem Smartphone genauso klar und elegant wie am großen Bildschirm.",
    "Anfrage, Anruf und Route sind immer nur einen Fingertipp entfernt.",
  ];
  return (
    <section className="beauty-feature">
      <div className="beauty-feature-sticky">
        <p className="section-index">Konzept</p>
        <h2>Ein Auftritt, der wirkt</h2>
      </div>
      <div className="beauty-feature-list">
        {statements.map((statement, index) => (
          <p key={statement} {...reveal(index)}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {statement}
          </p>
        ))}
      </div>
    </section>
  );
}

function MediaRail({ lead }: { lead: LeadProfile }) {
  const assets = lead.media?.gallery ?? [];
  return (
    <section className="media-section" aria-label={`Bildkonzept für ${lead.businessName}`} {...reveal(0)}>
      <div className="media-copy" {...reveal(0)}>
        <p className="section-index">Visuelle Ebene</p>
        <h2>Platz für echte Einblicke</h2>
        <p>Bildmaterial von der offiziellen Website; finale Nutzung erst nach Freigabe des Unternehmens.</p>
      </div>
      <div className="media-rail">
        {assets.length ? (
          assets.map((asset, index) => (
            <MediaSlot key={asset.src} label="Unternehmensfoto" variant="portrait" asset={asset} revealIndex={index} />
          ))
        ) : (
          <>
            <MediaSlot label="Detail" variant="portrait" revealIndex={0} />
            <MediaSlot label="Ambiente" variant="portrait" revealIndex={1} />
            <MediaSlot label="Team oder Arbeit" variant="portrait" revealIndex={2} />
          </>
        )}
      </div>
    </section>
  );
}

function BookingDemo({ lead }: { lead: LeadProfile }) {
  if (lead.family !== "beauty" && lead.family !== "barber") return null;
  return (
    <section className="booking-demo section-shell" id="termin">
      <div>
        <p className="section-index">Termin</p>
        <h2>Vom Interesse zur Anfrage</h2>
        <p>Eine spätere Terminlösung kann nach dem persönlichen Gespräch passend ausgewählt werden.</p>
      </div>
      <div className="booking-steps" aria-label="Demo für einen Terminablauf">
        {["Leistung wählen", "Zeit abstimmen", "Bestätigung erhalten"].map((step, index) => (
          <div key={step}><span>{index + 1}</span><strong>{step}</strong></div>
        ))}
        <p className="demo-form-note">Demo – es werden keine Daten übermittelt oder gespeichert.</p>
      </div>
    </section>
  );
}

function OpeningHours({ lead }: { lead: LeadProfile }) {
  if (!sectionHasContent(lead.openingHours)) return null;
  return (
    <section className="hours-section section-shell">
      <div><Clock3 /><h2>Öffnungszeiten</h2></div>
      <ul>{lead.openingHours?.map((hours) => <li key={hours}>{hours}</li>)}</ul>
    </section>
  );
}

function ProcessSection({ lead }: { lead: LeadProfile }) {
  if (!sectionHasContent(lead.process)) return null;
  return <ListSection title="So läuft die Zusammenarbeit" items={lead.process ?? []} className="process-section" />;
}

function ProjectsSection({ lead }: { lead: LeadProfile }) {
  if (!sectionHasContent(lead.projects)) return null;
  return <ListSection title="Ausgewählte Projekte" items={lead.projects ?? []} className="projects-section" />;
}

function EquipmentSection({ lead }: { lead: LeadProfile }) {
  if (!sectionHasContent(lead.equipment)) return null;
  return <ListSection title="Ausstattung" items={lead.equipment ?? []} className="equipment-section" />;
}

function CertificationsSection({ lead }: { lead: LeadProfile }) {
  if (!sectionHasContent(lead.certifications)) return null;
  return <ListSection title="Zertifikate" items={lead.certifications ?? []} className="certifications-section" />;
}

function ListSection({ title, items, className }: { title: string; items: ContentItem[]; className: string }) {
  return (
    <section className={`section-shell list-section ${className}`}>
      <SectionTitle title={title} />
      <div className="list-grid">
        {items.map((item, index) => (
          <article key={item.title} {...reveal(index)}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</article>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ lead }: { lead: LeadProfile }) {
  if (!sectionHasContent(lead.faq)) return null;
  return (
    <section className="section-shell faq-section">
      <SectionTitle title="Häufige Fragen" />
      <div>{lead.faq?.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
    </section>
  );
}

function ReviewsSection({ lead }: { lead: LeadProfile }) {
  if (!sectionHasContent(lead.reviews)) return null;
  return (
    <section className="section-shell reviews-section">
      <SectionTitle title="Bewertungen" description="Nur mit überprüfbarer öffentlicher Quelle." />
      <div className="review-grid">
        {lead.reviews?.map((review, index) => (
          <blockquote key={`${review.sourceUrl}-${review.quote}`} {...reveal(index)}>
            {review.rating && <div className="stars" aria-label={`${review.rating} von 5 Sternen`}>{Array.from({ length: review.rating }, (_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>}
            <p>“{review.quote}”</p>
            <a href={review.sourceUrl} target="_blank" rel="noreferrer">Quelle <ExternalLink size={13} /></a>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ lead }: { lead: LeadProfile }) {
  const phoneHref = telephoneHref(lead.contact.phone);
  return (
    <section className="contact-section" id="kontakt" {...reveal(0)}>
      <div className="contact-copy" {...reveal(0)}>
        <p className="section-index">Kontakt</p>
        <h2>{lead.businessName}</h2>
        <p>{lead.contact.address ?? lead.city}</p>
      </div>
      <div className="contact-actions" {...reveal(1)}>
        {phoneHref && <a href={phoneHref}><Phone /> <span><small>Telefon</small>{lead.contact.phone}</span></a>}
        {lead.contact.mapsUrl && <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer"><MapPin /> <span><small>Standort</small>Route öffnen</span></a>}
        {lead.contact.website && <a href={lead.contact.website} target="_blank" rel="noreferrer"><ExternalLink /> <span><small>Aktuell</small>Bestehende Website</span></a>}
      </div>
    </section>
  );
}

function KineticBand({ lead }: { lead: LeadProfile }) {
  const phrases = [lead.tagline, `${lead.businessType} · ${lead.city}`];
  return (
    <div className="kinetic-band" aria-hidden="true">
      <div className="kinetic-track">
        {[...phrases, ...phrases].map((phrase, index) => (
          <span key={index}>{phrase}</span>
        ))}
      </div>
    </div>
  );
}

// Neutral concept pillars — describe the demo idea only, never invented business facts.
function ConceptPillars({ lead }: { lead: LeadProfile }) {
  const pillars = [
    { figure: "Mobil", label: "Auf jedem Smartphone klar lesbar und in Sekunden bedienbar." },
    { figure: "Direkt", label: `Anruf und Route zu ${lead.businessName} mit einem einzigen Tipp.` },
    { figure: "Klar", label: "Ein ruhiger, moderner Auftritt – ohne Ablenkung, ohne Ballast." },
  ];
  return (
    <section className="stat-band" aria-label="Designkonzept auf einen Blick">
      {pillars.map((pillar, index) => (
        <article key={pillar.figure} {...reveal(index)}>
          <span className="stat-figure">{pillar.figure}</span>
          <span className="stat-label">{pillar.label}</span>
        </article>
      ))}
    </section>
  );
}

function SiteFooter({ lead }: { lead: LeadProfile }) {
  return (
    <footer className="site-footer">
      <strong>{lead.businessName}</strong>
      <span>Unverbindliches Designkonzept · Kein offizieller Unternehmensauftritt</span>
      <a href="#top">Nach oben <ArrowRight size={14} /></a>
    </footer>
  );
}
