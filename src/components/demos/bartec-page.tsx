import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Droplets,
  ExternalLink,
  Factory,
  FlameKindling,
  FlaskConical,
  Fuel,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { LeadProfile, MediaAsset } from "@/lib/lead-schema";
import { telephoneHref } from "@/lib/lead-schema";
import { MotionLayer } from "@/components/motion-layer";
import "./bartec-page.css";

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

const NAV_ITEMS = ["Industries", "Products", "Solutions", "Service and Support", "Company"];

const INDUSTRIES: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Oil and Gas",
    description:
      "With decades of expertise in specialized operations, we provide solutions tailored to the demanding standards of the oil and gas sector. Our approach ensures safety, reliability, and efficiency across the entire value chain.",
    icon: <Fuel size={22} />,
  },
  {
    title: "Chemical",
    description:
      "The chemical industry, including petrochemicals and other sensitive processes, requires precise safety solutions. Our expertise supports reliable protection for production environments with elevated risk profiles.",
    icon: <FlaskConical size={22} />,
  },
  {
    title: "Pharmaceutical",
    description:
      "The pharmaceutical sector is defined by strict regulatory requirements, sensitive production environments, and complex quality assurance processes. We deliver safety solutions that ensure reliable performance.",
    icon: <Pill size={22} />,
  },
  {
    title: "Energy",
    description:
      "Applications in the broader energy sector, from traditional fuels to hydrogen and LNG, demand increasingly advanced safety measures. Our solutions help ensure controlled handling and consistent operational protection.",
    icon: <FlameKindling size={22} />,
  },
  {
    title: "Manufacturing and Logistics",
    description:
      "Industrial manufacturing and transport processes rely on stable conditions and predictable workflows. Our tailored solutions help safeguard operations wherever combustible materials or dynamic environments are present.",
    icon: <Truck size={22} />,
  },
  {
    title: "Hydrogen",
    description:
      "Hydrogen's rising importance in the global energy transition brings unique safety and operational challenges across production, storage, and transport. Our protection solutions support secure handling.",
    icon: <Droplets size={22} />,
  },
  {
    title: "Food and Beverages",
    description:
      "Food and beverage production often involves processes where dust or gases create potential hazards. Our sector-specific solutions ensure safe working environments while supporting consistent product quality.",
    icon: <Factory size={22} />,
  },
];

type Product = { name: string; tagline: string; asset?: MediaAsset };

type Story = { title: string; author: string; date: string; asset?: MediaAsset };

export function BartecPage({ lead }: { lead: LeadProfile }) {
  const assets = lead.media?.gallery ? [lead.media.hero, ...lead.media.gallery].filter(Boolean) as MediaAsset[] : [];
  // Manifest is ordered 01..14 — re-derive that order since lead.media splits hero out.
  const ordered = [...assets].sort((a, b) => a.src.localeCompare(b.src));
  const at = (i: number) => ordered[i];

  const heroImage = at(12); // 13 — SP9EX1 Cam, 2048px
  const heroSecondary = at(13); // 14 — MC94, 2048px

  const products: Product[] = [
    { name: "BARTEC SP9EX1 Smartphone Cam version", tagline: "48 MP rear, 8 MP front, 4K video — Zone 0/Zone 1/Division 1", asset: at(0) },
    { name: "BARTEC MC9400/9450EX2 Mobile Computer", tagline: "for Zone 2/22 and Class I,II,III Division 2", asset: at(1) },
    { name: "POLARIS Smart HMI 12,1″ W", tagline: "for Zone 1/21", asset: at(2) },
    { name: "BARTEC SP9EX1 Smartphone", tagline: "World's most compact 5G Smartphone for Zone 0/Zone 1/Division 1", asset: heroSecondary },
    { name: "Vapor Pressure Process Analyzer RVP-4", tagline: "RVP-4" },
  ];

  const stories: Story[] = [
    { title: "BARTEC Strengthens Global Growth Strategy: Maximilian Herberger Appointed CFO", author: "Maximilan Herberger, BARTEC CFO", date: "June 1, 2026", asset: at(3) },
    { title: "BARTEC wins China's largest electric heat tracing project", author: "BARTEC Communications", date: "April 8, 2026", asset: at(4) },
    { title: "Understanding and Preventing Explosions in Pharmaceutical Industry", author: "Julia Klein", date: "November 13, 2025", asset: at(5) },
    { title: "Secure Digitization Using RFID Technology in Hazardous Areas", author: "Reiner Englert", date: "February 3, 2026", asset: at(6) },
    { title: "Shaping the Future Together: BARTEC Supports STEM Talent at Kreative Köpfe 2026", author: "BARTEC Communications", date: "May 11, 2026", asset: at(7) },
    { title: "How to perform a Megger test", author: "Julia Klein", date: "September 30, 2025", asset: at(8) },
    { title: "Types of Explosion Protection", author: "Steffen Mika", date: "August 19, 2025", asset: at(9) },
    { title: "Intrinsically safe vs explosion-proof: Key differences", author: "Steffen Mika", date: "November 10, 2025" },
    { title: "The Critical Importance of Certification of Products and Systems in Hazardous Areas", author: "Steinar Grøndal", date: "January 22, 2026", asset: at(10) },
  ];

  const experienceWorld = at(11); // 12

  const phoneHref = telephoneHref(lead.contact.phone);

  return (
    <main className="bartec-page" id="top">
      <MotionLayer />
      <p className="bartec-disclaimer">Unverbindliches Designkonzept — nicht die offizielle Website von BARTEC</p>

      <BartecHeader lead={lead} />
      <BartecTicker />

      <Hero lead={lead} heroImage={heroImage} />

      <Industries />

      <Products products={products} />

      <Stories stories={stories} />

      <Academy heroImage={experienceWorld} />

      <ContactBand lead={lead} phoneHref={phoneHref} />

      <BartecFooter lead={lead} />
    </main>
  );
}

function BartecHeader({ lead }: { lead: LeadProfile }) {
  return (
    <header className="site-header bartec-header">
      <a className="bartec-wordmark" href="#top" aria-label={`${lead.businessName} Startseite`}>
        <BartecLogo />
      </a>
      <nav className="bartec-nav" aria-label="Hauptnavigation">
        {NAV_ITEMS.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</a>
        ))}
      </nav>
      <div className="bartec-header-actions">
        {lead.contact.mapsUrl && (
          <a className="bartec-btn bartec-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={15} /> Route
          </a>
        )}
        <a className="bartec-btn bartec-btn-primary" href="#kontakt">Contact us</a>
      </div>
    </header>
  );
}

function BartecLogo() {
  return (
    <svg className="bartec-logo" viewBox="0 0 220 40" role="img" aria-label="BARTEC">
      <rect width="220" height="40" fill="none" />
      <text x="0" y="29" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="30" fontWeight="800" letterSpacing="1" fill="currentColor">
        BARTEC
      </text>
      <circle cx="206" cy="11" r="5" fill="var(--bartec-accent)" />
    </svg>
  );
}

function BartecTicker() {
  const items = [
    "Meet us at Offshore Northern Seas Exhibition (ONS) 2026",
    "BARTEC Academy — New Explosion Protection Professional (ExPP) Awareness Certificate",
    "BARTEC SP9EX1 and SC9EX1 — Smartphone and Smartscanner for Zone 1/Div. 1",
  ];
  return (
    <div className="bartec-ticker" aria-hidden="true">
      <div className="bartec-ticker-track">
        {[...items, ...items].map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function Hero({ lead, heroImage }: { lead: LeadProfile; heroImage?: MediaAsset }) {
  return (
    <section className="bartec-hero">
      {heroImage && (
        <div className="bartec-hero-media" data-parallax="0.06">
          <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" unoptimized priority />
          <div className="bartec-hero-scrim" />
        </div>
      )}
      <div className="bartec-hero-grain" aria-hidden="true" />
      <div className="bartec-hero-copy">
        <p className="bartec-eyebrow" {...reveal(0)}>Explosion Protection Since 1975</p>
        <h1 {...reveal(1)}>
          Safety<br />beyond<br />protection
        </h1>
        <p className="bartec-hero-desc" {...reveal(2)}>{lead.shortDescription}</p>
        <div className="bartec-hero-actions" {...reveal(3)}>
          <a className="bartec-btn bartec-btn-primary" href="#kontakt">
            Contact us <ArrowUpRight size={16} />
          </a>
          {lead.contact.mapsUrl && (
            <a className="bartec-btn bartec-btn-ghost" href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin size={16} /> Route
            </a>
          )}
        </div>
        <a className="bartec-scroll-cue" href="#industries" {...reveal(4)}>
          <ArrowDown size={15} /> Scroll
        </a>
      </div>
      {heroImage && (
        <a className="bartec-source-tag" href={heroImage.sourceUrl} target="_blank" rel="noreferrer">
          Offizielle Website · Freigabe ausstehend
        </a>
      )}
    </section>
  );
}

function Industries() {
  return (
    <section className="bartec-industries" id="industries">
      <div className="bartec-section-head" {...reveal(0)}>
        <p className="bartec-eyebrow">Customized solutions</p>
        <h2>Engineered to ensure top performance</h2>
      </div>
      <div className="bartec-industry-grid">
        {INDUSTRIES.map((industry, index) => (
          <article className="bartec-industry-card" key={industry.title} {...reveal(index)}>
            <span className="bartec-card-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="bartec-card-icon">{industry.icon}</span>
            <h3>{industry.title}</h3>
            <p>{industry.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Products({ products }: { products: Product[] }) {
  return (
    <section className="bartec-products" id="products">
      <div className="bartec-section-head" {...reveal(0)}>
        <p className="bartec-eyebrow">New products</p>
        <h2>Engineered to ensure top performance</h2>
      </div>
      <div className="bartec-product-track" role="list">
        {products.map((product, index) => (
          <article className="bartec-product-card" role="listitem" key={product.name} {...reveal(index)}>
            <div className="bartec-product-media">
              {product.asset ? (
                <Image src={product.asset.src} alt={product.asset.alt} fill sizes="(max-width: 760px) 78vw, 30vw" unoptimized />
              ) : (
                <span className="bartec-product-fallback"><Cpu size={28} /></span>
              )}
            </div>
            <h3>{product.name}</h3>
            <p>{product.tagline}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stories({ stories }: { stories: Story[] }) {
  return (
    <section className="bartec-stories" id="company">
      <div className="bartec-section-head" {...reveal(0)}>
        <p className="bartec-eyebrow">Read our</p>
        <h2>Top stories</h2>
      </div>
      <div className="bartec-story-grid">
        {stories.map((story, index) => (
          <article className={`bartec-story-card ${story.asset ? "" : "is-text-only"}`} key={story.title} {...reveal(index)}>
            {story.asset && (
              <div className="bartec-story-media">
                <Image src={story.asset.src} alt={story.asset.alt} fill sizes="(max-width: 760px) 90vw, 30vw" unoptimized />
              </div>
            )}
            <p className="bartec-story-meta">{story.date} · {story.author}</p>
            <h3>{story.title}</h3>
            {story.asset && (
              <a className="bartec-source-tag" href={story.asset.sourceUrl} target="_blank" rel="noreferrer">
                Offizielle Website · Freigabe ausstehend
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Academy({ heroImage }: { heroImage?: MediaAsset }) {
  return (
    <section className="bartec-academy" id="solutions">
      <div className="bartec-academy-copy" {...reveal(0)}>
        <p className="bartec-eyebrow">BARTEC Academy</p>
        <h2>World-class education for hazardous industries</h2>
        <p>
          At BARTEC Academy, we offer world-class education tailored to engineers, operators, inspectors, and
          decision-makers in hazardous industries. Discover explosion-protection trainings — basic and advanced,
          physical and online.
        </p>
        <p className="bartec-academy-sub">
          <ShieldCheck size={16} /> BARTEC Experience World — dive into our virtual brand experience.
        </p>
      </div>
      {heroImage && (
        <div className="bartec-academy-media" {...reveal(1)} data-parallax="0.05">
          <Image src={heroImage.src} alt={heroImage.alt} fill sizes="(max-width: 760px) 90vw, 40vw" unoptimized />
          <a className="bartec-source-tag" href={heroImage.sourceUrl} target="_blank" rel="noreferrer">
            Offizielle Website · Freigabe ausstehend
          </a>
        </div>
      )}
    </section>
  );
}

function ContactBand({ lead, phoneHref }: { lead: LeadProfile; phoneHref?: string }) {
  return (
    <section className="bartec-contact" id="kontakt" {...reveal(0)}>
      <div className="bartec-contact-copy" {...reveal(0)}>
        <p className="bartec-eyebrow">Contact us</p>
        <h2>{lead.businessName}</h2>
        <p>Don&apos;t hesitate to reach out to our experts if you have any questions or want to learn more.</p>
        <p className="bartec-contact-address">{lead.contact.address ?? lead.city}</p>
      </div>
      <div className="bartec-contact-actions" {...reveal(1)}>
        {phoneHref && (
          <a href={phoneHref}>
            <Phone /> <span><small>Telefon</small>{lead.contact.phone}</span>
          </a>
        )}
        {lead.contact.mapsUrl && (
          <a href={lead.contact.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin /> <span><small>Standort</small>Route öffnen</span>
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

function BartecFooter({ lead }: { lead: LeadProfile }) {
  const columns = [
    { title: "Industries", items: INDUSTRIES.map((i) => i.title) },
    { title: "Company", items: ["Careers", "Academy", "Newsroom"] },
    { title: "Products", items: ["Mobile Devices", "Process Analysis", "Lighting", "Automation"] },
    { title: "Solutions", items: ["Service and Support", "Repair", "Engineering"] },
  ];
  return (
    <footer className="bartec-footer">
      <div className="bartec-footer-top">
        <BartecLogo />
        <a className="bartec-back-to-top" href="#top">Back to top <ArrowRight size={14} /></a>
      </div>
      <div className="bartec-footer-grid">
        {columns.map((column) => (
          <div key={column.title}>
            <h4>{column.title}</h4>
            <ul>
              {column.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="bartec-footer-bottom">
        <span>© 2026 {lead.businessName}</span>
        <span>Unverbindliches Designkonzept · Kein offizieller Unternehmensauftritt</span>
      </div>
    </footer>
  );
}
