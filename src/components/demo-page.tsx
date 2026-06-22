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
import type { ReactNode } from "react";
import Image from "next/image";
import {
  sectionHasContent,
  telephoneHref,
  type ContentItem,
  type LeadProfile,
  type MediaAsset,
} from "@/lib/lead-schema";

export function DemoPage({ lead }: { lead: LeadProfile }) {
  return (
    <main className={`demo-site theme-${lead.family}`} data-family={lead.family} id="top">
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
          <p className="location-line">{lead.businessType} · {lead.city}</p>
          <h1>{lead.tagline}</h1>
          <p className="hero-description">{lead.shortDescription}</p>
          <HeroActions lead={lead} />
          <a className="scroll-cue" href="#angebot"><ArrowDown size={16} /> Entdecken</a>
        </div>
        <MediaSlot label="Hero-Motiv" variant="portrait" asset={lead.media?.hero} />
      </section>
      <ServicesSection lead={lead} title="Behandlungen im Überblick" icon={<Sparkles />} />
      <MediaRail lead={lead} />
      <BookingDemo lead={lead} />
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
        <MediaSlot label="Barbershop-Motiv" variant="wide" asset={lead.media?.hero} />
        <div className="hero-copy">
          <p className="location-line">{lead.city}</p>
          <h1>{lead.tagline}</h1>
          <p className="hero-description">{lead.shortDescription}</p>
          <HeroActions lead={lead} />
        </div>
      </section>
      <div className="barber-marquee" aria-hidden="true">
        <span>Cut · Beard · Style · Bad Mergentheim · </span>
        <span>Cut · Beard · Style · Bad Mergentheim</span>
      </div>
      <ServicesSection lead={lead} title="Leistungen" icon={<Scissors />} />
      <BookingDemo lead={lead} />
      <MediaRail lead={lead} />
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
          <p className="location-line">{lead.city}</p>
          <h1>{lead.businessName}</h1>
          <div className="restaurant-rule"><Utensils size={18} /></div>
          <p className="restaurant-tagline">{lead.tagline}</p>
          <HeroActions lead={lead} />
        </div>
      </section>
      <section className="restaurant-intro section-shell">
        <div>
          <p className="section-index">01</p>
          <h2>Ein klarer erster Eindruck</h2>
        </div>
        <p>{lead.shortDescription}</p>
      </section>
      <ServicesSection lead={lead} title="Speisekarte & Angebot" icon={<Utensils />} />
      <MediaRail lead={lead} />
      <OpeningHours lead={lead} />
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
          <p className="location-line">{lead.businessType} · {lead.city}</p>
          <h1>{lead.tagline}</h1>
          <p className="hero-description">{lead.shortDescription}</p>
          <HeroActions lead={lead} />
        </div>
        <div className="corporate-visual">
          <MediaSlot label="Unternehmensmotiv" variant="landscape" asset={lead.media?.hero} />
          <div className="corporate-note">Klar. Erreichbar. Mobil.</div>
        </div>
      </section>
      <ServicesSection lead={lead} title="Leistungen auf einen Blick" />
      <ProcessSection lead={lead} />
      <MediaRail lead={lead} />
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
          <p className="location-line">{lead.businessType} · {lead.city}</p>
          <h1>{lead.tagline}</h1>
          <p className="hero-description">{lead.shortDescription}</p>
          <HeroActions lead={lead} />
        </div>
        <MediaSlot label="Projekt- oder Teamfoto" variant="landscape" asset={lead.media?.hero} />
        <div className="construction-stripe" aria-hidden="true" />
      </section>
      <ServicesSection lead={lead} title="Leistungen für Ihr Projekt" icon={<Hammer />} />
      <ProcessSection lead={lead} />
      <ProjectsSection lead={lead} />
      <MediaRail lead={lead} />
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
    <div className="section-heading">
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
          <article className="service-card" key={service.title}>
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
}: {
  label: string;
  variant: "portrait" | "wide" | "landscape";
  asset?: MediaAsset;
}) {
  return (
    <div className={`media-slot media-${variant} ${asset ? "has-asset" : ""}`} aria-label={asset ? undefined : `${label} – Platzhalter`}>
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

function MediaRail({ lead }: { lead: LeadProfile }) {
  const assets = lead.media?.gallery ?? [];
  return (
    <section className="media-section" aria-label={`Bildkonzept für ${lead.businessName}`}>
      <div className="media-copy">
        <p className="section-index">Visuelle Ebene</p>
        <h2>Platz für echte Einblicke</h2>
        <p>Bildmaterial von der offiziellen Website; finale Nutzung erst nach Freigabe des Unternehmens.</p>
      </div>
      <div className="media-rail">
        {assets.length ? (
          assets.map((asset) => <MediaSlot key={asset.src} label="Unternehmensfoto" variant="portrait" asset={asset} />)
        ) : (
          <>
            <MediaSlot label="Detail" variant="portrait" />
            <MediaSlot label="Ambiente" variant="portrait" />
            <MediaSlot label="Team oder Arbeit" variant="portrait" />
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
          <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</article>
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
        {lead.reviews?.map((review) => (
          <blockquote key={`${review.sourceUrl}-${review.quote}`}>
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
    <section className="contact-section" id="kontakt">
      <div className="contact-copy">
        <p className="section-index">Kontakt</p>
        <h2>{lead.businessName}</h2>
        <p>{lead.contact.address ?? lead.city}</p>
      </div>
      <div className="contact-actions">
        {phoneHref && <a href={phoneHref}><Phone /> <span><small>Telefon</small>{lead.contact.phone}</span></a>}
        {lead.contact.mapsUrl && <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer"><MapPin /> <span><small>Standort</small>Route öffnen</span></a>}
        {lead.contact.website && <a href={lead.contact.website} target="_blank" rel="noreferrer"><ExternalLink /> <span><small>Aktuell</small>Bestehende Website</span></a>}
      </div>
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
