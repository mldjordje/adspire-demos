import {
  ArrowDown,
  ArrowRight,
  CalendarClock,
  Car,
  CheckCircle2,
  Gauge,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { MotionLayer } from "@/components/motion-layer";
import { HuthmannCarModel } from "@/components/demos/huthmann-car-model";
import type { LeadProfile, MediaAsset } from "@/lib/lead-schema";
import { telephoneHref } from "@/lib/lead-schema";
import "./huthmann-page.css";

const ELIS_SLUG = "kfz-werkstatt-elis-bad-mergentheim-q4m7x2";

type AutomotiveVariant = "huthmann" | "elis";

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

function sourceTag(asset?: MediaAsset) {
  if (!asset) return null;
  return (
    <a className="huth-source" href={asset.sourceUrl} target="_blank" rel="noreferrer">
      Bildquelle - Freigabe ausstehend
    </a>
  );
}

const huthmannModuleItems = [
  { label: "Diagnose", value: "OBD", icon: <ScanLine size={18} /> },
  { label: "Inspektion", value: "TUEV", icon: <CheckCircle2 size={18} /> },
  { label: "Motor", value: "ECU", icon: <Gauge size={18} /> },
  { label: "Karosserie", value: "Body", icon: <ShieldCheck size={18} /> },
  { label: "Oldtimer", value: "E21", icon: <Sparkles size={18} /> },
  { label: "Reifen", value: "Grip", icon: <Car size={18} /> },
];

const elisModuleItems = [
  { label: "Fehlersuche", value: "OBD", icon: <ScanLine size={18} /> },
  { label: "Oelwechsel", value: "Oil", icon: <CheckCircle2 size={18} /> },
  { label: "Bremsen", value: "Stop", icon: <ShieldCheck size={18} /> },
  { label: "Reifen", value: "Grip", icon: <Car size={18} /> },
  { label: "Motor", value: "Check", icon: <Gauge size={18} /> },
  { label: "Service", value: "Fast", icon: <Wrench size={18} /> },
];

const huthmannStages = [
  {
    step: "01",
    title: "Scan",
    label: "Fehlerbild erfassen",
    text: "Fahrzeug- und Motorelektronik werden sauber geprueft, bevor Teile getauscht werden.",
  },
  {
    step: "02",
    title: "Repair",
    label: "Mechanik stabilisieren",
    text: "Motor, Bremsen, Fahrwerk, Auspuff, Getriebe und Klima werden fachgerecht instandgesetzt.",
  },
  {
    step: "03",
    title: "Tune",
    label: "Individuell aufbauen",
    text: "Bodykits, Fahrwerke, Felgen, Edelstahl-Auspuffanlagen und Leistungssteigerung werden nach Wunsch geplant.",
  },
  {
    step: "04",
    title: "Restore",
    label: "Oldtimer zurueck auf die Strasse",
    text: "Restauration, Achs- und Lenkungsinstandsetzung, Zinnarbeiten und Innenausstattung laufen Schritt fuer Schritt.",
  },
];

const elisStages = [
  {
    step: "01",
    title: "Annahme",
    label: "Problem kurz klaeren",
    text: "Fahrzeug, Fehlerbild und Wunschleistung werden direkt aufgenommen.",
  },
  {
    step: "02",
    title: "Check",
    label: "Diagnose und Sichtpruefung",
    text: "Elektronik, Motorraum, Bremsen, Reifen oder Oelservice werden sauber geprueft.",
  },
  {
    step: "03",
    title: "Repair",
    label: "Reparatur freigeben",
    text: "Die naechsten Schritte werden klar abgestimmt, bevor Teile bestellt oder verbaut werden.",
  },
  {
    step: "04",
    title: "Pickup",
    label: "Fahrzeug abholen",
    text: "Probefahrt, kurzer Abschlusscheck und klare Uebergabe nach der Reparatur.",
  },
];

export function HuthmannPage({ lead }: { lead: LeadProfile }) {
  const variant: AutomotiveVariant = lead.slug === ELIS_SLUG ? "elis" : "huthmann";
  const assets = lead.media?.gallery ? ([lead.media.hero, ...lead.media.gallery].filter(Boolean) as MediaAsset[]) : [];
  const ordered = [...assets].sort((a, b) => a.src.localeCompare(b.src));
  const at = (index: number) => ordered[index];
  const hero = variant === "elis" ? lead.media?.hero : at(11) ?? lead.media?.hero;
  const tunnel = variant === "elis" ? at(0) ?? hero : at(8);
  const tuning = variant === "elis" ? at(1) ?? hero : at(9);
  const damage = variant === "elis" ? at(0) ?? hero : at(10);
  const before = variant === "elis" ? at(0) ?? hero : at(17);
  const after = variant === "elis" ? at(1) ?? hero : at(11);
  const galleryAssets = ordered.filter((asset) => asset.src !== tunnel?.src).slice(0, 18);
  const phoneHref = telephoneHref(lead.contact.phone);

  return (
    <main className={`huth-page huth-page-${variant}`} id="top">
      <MotionLayer />
      <p className="huth-disclaimer">Unverbindliches Designkonzept - nicht die offizielle Website von {lead.businessName}</p>
      <Header lead={lead} phoneHref={phoneHref} variant={variant} />
      <Hero lead={lead} hero={hero} tunnel={tunnel} variant={variant} />
      <Ticker variant={variant} />
      <DiagnosticModules variant={variant} />
      <ScrollStory variant={variant} fallback={tunnel ?? hero} />
      <Services lead={lead} tuning={tuning} damage={damage} variant={variant} />
      <RestorationStory before={before} after={after} variant={variant} />
      <Gallery assets={galleryAssets.length ? galleryAssets : ordered} variant={variant} />
      <Contact lead={lead} phoneHref={phoneHref} />
    </main>
  );
}

function Header({ lead, phoneHref, variant }: { lead: LeadProfile; phoneHref?: string; variant: AutomotiveVariant }) {
  const wordmark = variant === "elis" ? "elis" : "huthmann";
  return (
    <header className="site-header huth-header">
      <a className="huth-wordmark" href="#top" aria-label={`${lead.businessName} Startseite`}>
        <span className="huth-mark"><Gauge size={18} /></span>
        <span>{wordmark}</span>
      </a>
      <nav className="huth-nav" aria-label="Hauptnavigation">
        <a href="#diagnose">Diagnose</a>
        <a href="#leistungen">Leistungen</a>
        <a href="#oldtimer">{variant === "elis" ? "Ablauf" : "Oldtimer"}</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
      <div className="huth-header-actions">
        {lead.contact.mapsUrl && (
          <a className="huth-btn huth-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={15} /> Route
          </a>
        )}
        {variant === "huthmann" && <Link className="huth-btn huth-btn-ghost huth-admin-link" href={`/demo/${lead.slug}/admin`}>
          <LayoutDashboard size={15} /> Cockpit
        </Link>}
        {phoneHref && (
          <a className="huth-btn huth-btn-primary" href={phoneHref}>
            <Phone size={15} /> Anrufen
          </a>
        )}
      </div>
    </header>
  );
}

function Hero({ lead, hero, tunnel, variant }: { lead: LeadProfile; hero?: MediaAsset; tunnel?: MediaAsset; variant: AutomotiveVariant }) {
  const headline = variant === "elis"
    ? ["Service.", "Reparatur.", "Reifen."]
    : ["Diagnose.", "Tuning.", "Restauration."];
  return (
    <section className="huth-hero">
      <div className="huth-hero-bg" aria-hidden="true">
        {tunnel && <Image src={tunnel.src} alt="" fill sizes="100vw" loading="eager" fetchPriority="high" unoptimized />}
      </div>
      <div className="huth-hero-grid" aria-hidden="true" />
      <div className="huth-lightbar" aria-hidden="true" />
      <div className="huth-hero-copy">
        <p className="huth-eyebrow" {...reveal(0)}>Bad Mergentheim / Kfz-Fachbetrieb</p>
        <h1 {...reveal(1)}>
          {headline.map((line) => (
            <span key={line}>{line}<br /></span>
          ))}
        </h1>
        <p className="huth-hero-text" {...reveal(2)}>{lead.shortDescription}</p>
        <div className="huth-hero-actions" {...reveal(3)}>
          <a className="huth-btn huth-btn-primary" href="#kontakt">
            Termin anfragen <ArrowRight size={16} />
          </a>
          <a className="huth-btn huth-btn-ghost" href="#diagnose">
            Leistungscheck <ScanLine size={16} />
          </a>
        </div>
        <a className="huth-scroll" href="#diagnose" {...reveal(4)}>
          <ArrowDown size={15} /> Scan starten
        </a>
      </div>
      <div className="huth-car-stage" {...reveal(2)}>
        {variant === "huthmann" ? (
          <HuthmannCarModel modelPath="/models/bmw-m3-e30-martin-trafas-1k.glb" fallback={hero} variant="hero" />
        ) : (
          <StaticCarFrame asset={hero} eager />
        )}
      </div>
    </section>
  );
}

function StaticCarFrame({ asset, eager = false }: { asset?: MediaAsset; eager?: boolean }) {
  if (!asset) return null;
  return (
    <figure className="huth-hero-car huth-model-frame has-fallback" data-parallax="0.05">
      <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 900px) 94vw, 58vw" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} unoptimized />
      {sourceTag(asset)}
    </figure>
  );
}

function Ticker({ variant }: { variant: AutomotiveVariant }) {
  const phrases = variant === "elis" ? [
    "Diagnostik",
    "Oelwechsel",
    "Bremsen",
    "Motor",
    "Reifenwechsel",
    "Inspektion",
    "Fahrwerk",
    "Klimacheck",
    "Auspuff",
    "Fehlersuche",
    "Express-Service",
    "Bad Mergentheim",
  ] : [
    "Diagnostik",
    "Inspektion",
    "Motor",
    "Bremsen",
    "Fahrwerk",
    "Auspuff",
    "Getriebespuelung",
    "Autoglas",
    "Klimatechnik",
    "Rad und Reifen",
    "TUEV / AU",
    "Unfallinstandsetzung",
    "Fahrzeugtuning",
    "Oldtimer",
  ];
  return (
    <div className="huth-ticker" aria-hidden="true">
      <div className="huth-ticker-track">
        {[...phrases, ...phrases].map((phrase, index) => <span key={index}>{phrase}</span>)}
      </div>
    </div>
  );
}

function DiagnosticModules({ variant }: { variant: AutomotiveVariant }) {
  const moduleItems = variant === "elis" ? elisModuleItems : huthmannModuleItems;
  return (
    <section className="huth-modules" id="diagnose">
      <div className="huth-section-head" {...reveal(0)}>
        <p className="huth-eyebrow">{variant === "elis" ? "Werkstattdiagnose" : "Live diagnostic bay"}</p>
        <h2>{variant === "elis" ? "Fehlerbild, Wartung und Termin werden sauber zusammengefuehrt." : "Aus Werkstattdaten wird ein klarer Fahrplan."}</h2>
      </div>
      <div className="huth-module-shell">
        <div className="huth-topview" aria-hidden="true">
          <div className="huth-topview-car">
            <span className="huth-topview-cabin" />
            <span className="huth-topview-wheel w1" />
            <span className="huth-topview-wheel w2" />
            <span className="huth-topview-wheel w3" />
            <span className="huth-topview-wheel w4" />
          </div>
        </div>
        <div className="huth-module-grid">
          {moduleItems.map((item, index) => (
            <article className="huth-module" key={item.label} {...reveal(index)}>
              <span>{item.icon}</span>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollStory({ variant, fallback }: { variant: AutomotiveVariant; fallback?: MediaAsset }) {
  const stages = variant === "elis" ? elisStages : huthmannStages;
  return (
    <section className="huth-story" aria-label="Scrollgesteuerte Werkstattsequenz">
      <div className="huth-story-sticky">
        <div className="huth-story-track">
          <div className="huth-road" />
          <div className="huth-story-model">
            {variant === "huthmann" ? (
              <HuthmannCarModel modelPath="/models/bmw-m3-e30-martin-trafas-1k.glb" variant="showcase" lazy />
            ) : (
              <StaticCarFrame asset={fallback} />
            )}
          </div>
          <div className="huth-dyno">
            <span />
          </div>
        </div>
        <ol className="huth-stage-rail">
          {stages.map((stage) => <li key={stage.step}>{stage.step}</li>)}
        </ol>
        <div className="huth-stage-grid">
          {stages.map((stage, index) => (
            <article className="huth-stage" key={stage.title} {...reveal(index)}>
              <span>{stage.step}</span>
              <small>{stage.label}</small>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ lead, tuning, damage, variant }: { lead: LeadProfile; tuning?: MediaAsset; damage?: MediaAsset; variant: AutomotiveVariant }) {
  const serviceIcons: ReactNode[] = [<ScanLine key="scan" />, <Wrench key="wrench" />, <Gauge key="gauge" />, <Car key="car" />];
  return (
    <section className="huth-services" id="leistungen">
      <div className="huth-section-head" {...reveal(0)}>
        <p className="huth-eyebrow">{variant === "elis" ? "Werkstatt / Service / Reifen" : "Werkstatt / Tuning / Karosserie"}</p>
        <h2>{variant === "elis" ? "Direkte Leistungen fuer schnelle Reparaturen und planbare Wartung." : "Keine austauschbaren Karten. Echte Module fuer echte Fahrzeugprobleme."}</h2>
      </div>
      <div className="huth-service-layout">
        <div className="huth-service-stack">
          {lead.services?.map((service, index) => (
            <article className="huth-service" key={service.title} {...reveal(index)}>
              <span className="huth-service-icon">{serviceIcons[index % serviceIcons.length]}</span>
              <span className="huth-service-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              {service.description && <p>{service.description}</p>}
            </article>
          ))}
        </div>
        <div className="huth-service-media" {...reveal(2)}>
          {tuning && (
            <figure>
              <Image src={tuning.src} alt={tuning.alt} fill sizes="(max-width: 900px) 92vw, 42vw" unoptimized />
              {sourceTag(tuning)}
            </figure>
          )}
          {damage && (
            <figure>
              <Image src={damage.src} alt={damage.alt} fill sizes="(max-width: 900px) 70vw, 24vw" unoptimized />
              {sourceTag(damage)}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

function RestorationStory({ before, after, variant }: { before?: MediaAsset; after?: MediaAsset; variant: AutomotiveVariant }) {
  return (
    <section className="huth-restore" id="oldtimer">
      <div className="huth-restore-copy" {...reveal(0)}>
        <p className="huth-eyebrow">{variant === "elis" ? "Serviceablauf" : "BMW E21 Referenz"}</p>
        <h2>{variant === "elis" ? "Von Annahme bis Abholung: Reparatur mit klarem Ablauf." : "Von Demontage bis Strasse: eine Oldtimer-Restauration als Scroll-Moment."}</h2>
        <p>
          {variant === "elis"
            ? "Der Demo-Auftritt positioniert Elis als direkte Kfz-Werkstatt fuer Diagnose, Oelwechsel, Bremsen, Reifen und allgemeine Reparaturen in Bad Mergentheim."
            : "Die bestehende Website zeigt den Weg von Italien nach Bad Mergentheim: Demontage, Sandstrahlen, Blech, Grundierung, Motorueberholung, Innenraum und finaler Zusammenbau."}
        </p>
      </div>
      <div className="huth-before-after" {...reveal(1)}>
        {before && (
          <figure className="huth-before">
            <Image src={before.src} alt={before.alt} fill sizes="(max-width: 900px) 92vw, 42vw" unoptimized />
            {sourceTag(before)}
          </figure>
        )}
        {after && (
          <figure className="huth-after">
            <Image src={after.src} alt={after.alt} fill sizes="(max-width: 900px) 92vw, 42vw" unoptimized />
            {sourceTag(after)}
          </figure>
        )}
        <div className="huth-slider-line" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}

function Gallery({ assets, variant }: { assets: MediaAsset[]; variant: AutomotiveVariant }) {
  return (
    <section className="huth-gallery" aria-label={`${variant === "elis" ? "Elis" : "Huthmann"} Bildmaterial`}>
      <div className="huth-gallery-head" {...reveal(0)}>
        <p className="huth-eyebrow">Reference motion rail</p>
        <h2>{variant === "elis" ? "Werkstattfotos als schnelle, bewegte Service-Galerie." : "Originalbilder als schnelle, bewegte Werkstatt-Galerie."}</h2>
      </div>
      <div className="huth-gallery-track">
        {assets.map((asset, index) => (
          <figure className="huth-shot" key={asset.src} {...reveal(index)}>
            <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 760px) 76vw, 26vw" unoptimized />
            <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
            {sourceTag(asset)}
          </figure>
        ))}
      </div>
    </section>
  );
}

function Contact({ lead, phoneHref }: { lead: LeadProfile; phoneHref?: string }) {
  const openingHours = lead.openingHours?.join(", ") ?? "Termin nach Vereinbarung";
  const routeLabel = lead.contact.address ?? lead.city;
  return (
    <section className="huth-contact" id="kontakt">
      <div className="huth-contact-copy" {...reveal(0)}>
        <p className="huth-eyebrow">Service order terminal</p>
        <h2>{lead.businessName}</h2>
        <p>{lead.contact.address}</p>
      </div>
      <div className="huth-terminal" {...reveal(1)}>
        <div><CalendarClock /><span><small>Oeffnungszeiten</small>{openingHours}</span></div>
        {phoneHref && <a href={phoneHref}><Phone /><span><small>Telefon</small>{lead.contact.phone}</span></a>}
        {lead.contact.email && <a href={`mailto:${lead.contact.email}`}><Mail /><span><small>E-Mail</small>{lead.contact.email}</span></a>}
        {lead.contact.mapsUrl && <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer"><MapPin /><span><small>Route</small>{routeLabel}</span></a>}
      </div>
    </section>
  );
}
