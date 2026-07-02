import {
  ArrowDown,
  ArrowRight,
  CalendarClock,
  Car,
  Gauge,
  Mail,
  MapPin,
  Phone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { MotionLayer } from "@/components/motion-layer";
import { HuthmannCarModel } from "@/components/demos/huthmann-car-model";
import type { LeadProfile, MediaAsset } from "@/lib/lead-schema";
import { telephoneHref } from "@/lib/lead-schema";
import "./huthmann-page.css";
import "./automotive-themes.css";

export type AutoModule = { label: string; value: string; icon: ReactNode };
export type AutoStage = { step: string; title: string; label: string; text: string };

export type AutoConfig = {
  theme: string; // css class e.g. "auto-tcp"
  wordmark: string;
  markIcon?: ReactNode;
  eyebrow: string;
  headline: string[];
  navThird: { label: string; href: string };
  heroMode: "video" | "image" | "graphic";
  videoSrc?: string;
  ticker: string[];
  modules: AutoModule[];
  modulesHead: { eyebrow: string; title: string };
  stages: AutoStage[];
  storyHead: { eyebrow: string; title: string };
  servicesHead: { eyebrow: string; title: string };
  storyBlock: { eyebrow: string; title: string; body: string };
  galleryHead: { eyebrow: string; title: string };
  showGallery: boolean;
  showStoryImages: boolean;
  showServiceMedia: boolean;
};

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

export function AutomotiveDemoPage({ lead, config }: { lead: LeadProfile; config: AutoConfig }) {
  const assets = lead.media?.gallery ? ([lead.media.hero, ...lead.media.gallery].filter(Boolean) as MediaAsset[]) : [];
  const ordered = [...assets].sort((a, b) => a.src.localeCompare(b.src));
  const at = (i: number) => ordered[i];
  const hero = lead.media?.hero ?? at(0);
  const heroCar = at(ordered.length > 1 ? 1 : 0) ?? hero;
  const tuning = at(2) ?? heroCar;
  const damage = at(3) ?? tuning;
  const before = at(0) ?? hero;
  const after = at(ordered.length - 1) ?? before;
  const galleryAssets = ordered;
  const phoneHref = telephoneHref(lead.contact.phone);

  return (
    <main className={`huth-page ${config.theme}`} id="top">
      <MotionLayer />
      <p className="huth-disclaimer">Unverbindliches Designkonzept - nicht die offizielle Website von {lead.businessName}</p>

      <Header lead={lead} phoneHref={phoneHref} config={config} />
      <Hero lead={lead} heroCar={heroCar} config={config} />
      <Ticker phrases={config.ticker} />
      <DiagnosticModules config={config} />
      <ScrollStory config={config} fallback={config.heroMode === "graphic" ? undefined : hero} />
      <Services lead={lead} tuning={tuning} damage={damage} config={config} />
      {config.showStoryImages && <RestorationStory before={before} after={after} block={config.storyBlock} />}
      {!config.showStoryImages && <StoryBand block={config.storyBlock} />}
      {config.showGallery && galleryAssets.length > 0 && <Gallery assets={galleryAssets} head={config.galleryHead} />}
      <Contact lead={lead} phoneHref={phoneHref} />
    </main>
  );
}

function Header({ lead, phoneHref, config }: { lead: LeadProfile; phoneHref?: string; config: AutoConfig }) {
  return (
    <header className="site-header huth-header">
      <a className="huth-wordmark" href="#top" aria-label={`${lead.businessName} Startseite`}>
        <span className="huth-mark">{config.markIcon ?? <Gauge size={18} />}</span>
        <span>{config.wordmark}</span>
      </a>
      <nav className="huth-nav" aria-label="Hauptnavigation">
        <a href="#diagnose">Diagnose</a>
        <a href="#leistungen">Leistungen</a>
        <a href={config.navThird.href}>{config.navThird.label}</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
      <div className="huth-header-actions">
        {lead.contact.mapsUrl && (
          <a className="huth-btn huth-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={15} /> Route
          </a>
        )}
        {phoneHref && (
          <a className="huth-btn huth-btn-primary" href={phoneHref}>
            <Phone size={15} /> Anrufen
          </a>
        )}
      </div>
    </header>
  );
}

function Hero({ lead, heroCar, config }: { lead: LeadProfile; heroCar?: MediaAsset; config: AutoConfig }) {
  return (
    <section className="huth-hero">
      <div className="huth-hero-bg" aria-hidden="true">
        {config.heroMode === "video" && config.videoSrc ? (
          <video className="auto-hero-video" autoPlay muted loop playsInline preload="auto" poster={heroCar?.src}>
            <source src={config.videoSrc} type="video/mp4" />
          </video>
        ) : (
          heroCar && <Image src={heroCar.src} alt="" fill sizes="100vw" loading="eager" fetchPriority="high" unoptimized />
        )}
      </div>
      <div className="huth-hero-grid" aria-hidden="true" />
      <div className="huth-lightbar" aria-hidden="true" />
      <div className="huth-hero-copy">
        <p className="huth-eyebrow" {...reveal(0)}>{config.eyebrow}</p>
        <h1 {...reveal(1)}>
          {config.headline.map((line) => (
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
        {config.heroMode === "graphic" ? (
          <GraphicHeroCar asset={heroCar} />
        ) : config.heroMode === "video" && config.videoSrc ? (
          <VideoHeroFrame videoSrc={config.videoSrc} poster={heroCar} />
        ) : (
          <StaticCarFrame asset={heroCar} eager />
        )}
      </div>
    </section>
  );
}

function GraphicHeroCar({ asset }: { asset?: MediaAsset }) {
  return (
    <figure className="huth-hero-car auto-badge-frame" data-parallax="0.05">
      {asset ? (
        <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 900px) 90vw, 52vw" loading="eager" fetchPriority="high" unoptimized style={{ objectFit: "contain" }} />
      ) : (
        <span className="auto-badge-glow" aria-hidden="true" />
      )}
      <span className="auto-badge-ring" aria-hidden="true" />
    </figure>
  );
}

function VideoHeroFrame({ videoSrc, poster }: { videoSrc: string; poster?: MediaAsset }) {
  return (
    <figure className="huth-hero-car huth-model-frame auto-video-frame" data-parallax="0.05">
      <video autoPlay muted loop playsInline preload="auto" poster={poster?.src}>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <span className="auto-video-scan" aria-hidden="true" />
    </figure>
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

function Ticker({ phrases }: { phrases: string[] }) {
  return (
    <div className="huth-ticker" aria-hidden="true">
      <div className="huth-ticker-track">
        {[...phrases, ...phrases].map((phrase, index) => <span key={index}>{phrase}</span>)}
      </div>
    </div>
  );
}

function DiagnosticModules({ config }: { config: AutoConfig }) {
  return (
    <section className="huth-modules" id="diagnose">
      <div className="huth-section-head" {...reveal(0)}>
        <p className="huth-eyebrow">{config.modulesHead.eyebrow}</p>
        <h2>{config.modulesHead.title}</h2>
      </div>
      <div className="huth-module-shell">
        <div className="auto-module-model" aria-label="Rotierbares 3D-Fahrzeugmodell">
          <HuthmannCarModel modelPath="/models/bmw-m3-e30-martin-trafas-1k.glb" variant="showcase" lazy />
        </div>
        <div className="huth-module-grid">
          {config.modules.map((item, index) => (
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

function ScrollStory({ config, fallback }: { config: AutoConfig; fallback?: MediaAsset }) {
  return (
    <section className="huth-story" aria-label="Scrollgesteuerte Werkstattsequenz">
      <div className="huth-story-sticky">
        <div className="huth-story-track">
          <div className="huth-road" />
          <div className="huth-story-model">
            <StaticCarFrame asset={fallback} />
          </div>
          <div className="huth-dyno">
            <span />
          </div>
        </div>
        <ol className="huth-stage-rail">
          {config.stages.map((stage) => <li key={stage.step}>{stage.step}</li>)}
        </ol>
        <div className="huth-stage-grid">
          {config.stages.map((stage, index) => (
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

function Services({ lead, tuning, damage, config }: { lead: LeadProfile; tuning?: MediaAsset; damage?: MediaAsset; config: AutoConfig }) {
  const serviceIcons: ReactNode[] = [<ScanLine key="scan" />, <Wrench key="wrench" />, <Gauge key="gauge" />, <Car key="car" />, <ShieldCheck key="shield" />, <Sparkles key="spark" />];
  return (
    <section className="huth-services" id="leistungen">
      <div className="huth-section-head" {...reveal(0)}>
        <p className="huth-eyebrow">{config.servicesHead.eyebrow}</p>
        <h2>{config.servicesHead.title}</h2>
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
        {config.showServiceMedia && (
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
        )}
      </div>
    </section>
  );
}

function RestorationStory({ before, after, block }: { before?: MediaAsset; after?: MediaAsset; block: AutoConfig["storyBlock"] }) {
  return (
    <section className="huth-restore" id="oldtimer">
      <div className="huth-restore-copy" {...reveal(0)}>
        <p className="huth-eyebrow">{block.eyebrow}</p>
        <h2>{block.title}</h2>
        <p>{block.body}</p>
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

function StoryBand({ block }: { block: AutoConfig["storyBlock"] }) {
  return (
    <section className="huth-restore auto-storyband" id="oldtimer">
      <div className="huth-restore-copy" {...reveal(0)}>
        <p className="huth-eyebrow">{block.eyebrow}</p>
        <h2>{block.title}</h2>
        <p>{block.body}</p>
      </div>
    </section>
  );
}

function Gallery({ assets, head }: { assets: MediaAsset[]; head: AutoConfig["galleryHead"] }) {
  return (
    <section className="huth-gallery" aria-label="Bildmaterial">
      <div className="huth-gallery-head" {...reveal(0)}>
        <p className="huth-eyebrow">{head.eyebrow}</p>
        <h2>{head.title}</h2>
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
