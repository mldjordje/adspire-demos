import mediaManifest from "@/data/media-manifest.json";
import { leadProfileSchema, mediaAssetSchema, type LeadProfile } from "@/lib/lead-schema";

const importedMedia = Object.fromEntries(
  Object.entries(mediaManifest).map(([slug, assets]) => [slug, mediaAssetSchema.array().parse(assets)]),
);

function mediaFor(slug: string, heroIndex = 0): LeadProfile["media"] {
  const assets = importedMedia[slug] ?? [];
  if (!assets.length) return undefined;
  const hero = assets[heroIndex] ?? assets[0];
  return { hero, gallery: assets.filter((asset) => asset.src !== hero.src) };
}

const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const conceptCopy = (businessType: string) =>
  `Dieser unverbindliche Entwurf zeigt, wie ${businessType.toLowerCase()} online klar, mobil und direkt erreichbar präsentiert werden kann.`;

const rawLeads: LeadProfile[] = [
  {
    slug: "katjas-hair-beauty-lounge-k4m8q2",
    family: "beauty",
    status: "research",
    adminPreview: "appointments",
    businessName: "Katja's Hair & Beauty Lounge",
    businessType: "Hair & Beauty Lounge",
    city: "Bad Mergentheim",
    tagline: "Hair & Beauty in Bad Mergentheim.",
    shortDescription: conceptCopy("Hair & Beauty Lounge"),
    primaryCta: "directions",
    contact: { mapsUrl: maps("Katja's Hair & Beauty Lounge Bad Mergentheim") },
    sources: ["https://www.openstreetmap.org/node/7728684485"],
  },
  {
    slug: "haargenau-bei-magda-p7r2v9",
    family: "beauty",
    status: "research",
    adminPreview: "appointments",
    businessName: "Haar-genau! bei Magda",
    businessType: "Friseursalon",
    city: "Bad Mergentheim",
    tagline: "Friseurhandwerk in Bad Mergentheim.",
    shortDescription: conceptCopy("Friseursalon"),
    primaryCta: "call",
    media: mediaFor("haargenau-bei-magda-p7r2v9"),
    contact: {
      phone: "+49 7931 8333",
      mapsUrl: maps("Haar-genau bei Magda Bad Mergentheim"),
      website: "https://www.haargenau-bei-magda.de/",
    },
    sources: ["https://www.haargenau-bei-magda.de/"],
  },
  {
    slug: "gentlemans-barber-shop-x3f8n1",
    family: "barber",
    status: "research",
    adminPreview: "appointments",
    businessName: "Gentleman's Barber Shop",
    businessType: "Barbershop",
    city: "Bad Mergentheim",
    tagline: "Barbering in Bad Mergentheim.",
    shortDescription: conceptCopy("Barbershop"),
    primaryCta: "directions",
    contact: { mapsUrl: maps("Gentleman's Barber Shop Bad Mergentheim") },
    sources: ["https://www.openstreetmap.org/node/7580015290"],
  },
  {
    slug: "gentlemens-barber-lounge-b9t4c6",
    family: "barber",
    status: "research",
    adminPreview: "appointments",
    businessName: "Gentlemen's Barber Lounge",
    businessType: "Barbershop",
    city: "Bad Mergentheim",
    tagline: "Barber Lounge im Herzen der Stadt.",
    shortDescription: conceptCopy("Barbershop"),
    primaryCta: "directions",
    contact: {
      address: "Münzgasse 5, 97980 Bad Mergentheim",
      mapsUrl: maps("Gentlemen's Barber Lounge Münzgasse 5 Bad Mergentheim"),
    },
    sources: ["https://www.openstreetmap.org/node/10983667958"],
  },
  {
    slug: "il-siciliano-mergentheim-h6k2w8",
    family: "restaurant",
    status: "research",
    adminPreview: "tables",
    businessName: "Il Siciliano",
    businessType: "Trattoria & Pizzeria",
    city: "Bad Mergentheim",
    tagline: "Trattoria & Pizzeria in der Kirchstraße.",
    shortDescription:
      "Frisch zubereitete Speisen in mediterranem Flair, gepaart mit sizilianischer Gastfreundschaft – mitten in Bad Mergentheim.",
    primaryCta: "call",
    services: [
      { title: "Pizza", description: "Aus dem Ofen, auf Wunsch auch glutenfrei." },
      { title: "Desserts", description: "Hausgemachte Dolci und neue Variationen." },
      { title: "Fingerfood", description: "Süße und herzhafte Häppchen." },
      { title: "Zum Mitnehmen & Lieferung", description: "Speisen zum Abholen oder nach Hause geliefert." },
    ],
    media: mediaFor("il-siciliano-mergentheim-h6k2w8", 4),
    contact: {
      phone: "+49 7931 9614581",
      address: "Kirchstraße 13, 97980 Bad Mergentheim",
      mapsUrl: maps("Il Siciliano Kirchstraße 13 Bad Mergentheim"),
      website: "https://il-siciliano.de/",
    },
    sources: ["https://il-siciliano.de/", "https://www.openstreetmap.org/way/516299475"],
  },
  {
    slug: "restaurant-alexander-q8d3m7",
    family: "restaurant",
    status: "research",
    adminPreview: "tables",
    businessName: "Restaurant Alexander",
    businessType: "Griechisches Spezialitätenlokal",
    city: "Bad Mergentheim",
    tagline: "Griechische Spezialitäten in der Wolfgangstraße.",
    shortDescription:
      "Griechisches Spezialitätenlokal und Hotel, als Familienbetrieb geführt – seit 2008 in Bad Mergentheim.",
    primaryCta: "call",
    services: [
      { title: "Griechische Spezialitäten", description: "Mediterrane Küche aus Griechenland." },
      { title: "Hotel & Restaurant", description: "Restaurant mit angeschlossenen Gästezimmern." },
      { title: "Familienbetrieb", description: "Seit 2008 familiengeführt." },
    ],
    media: mediaFor("restaurant-alexander-q8d3m7"),
    openingHours: ["Mo–So 11:30–14:30 und 17:30–24:00", "Warme Küche bis 23:45"],
    contact: {
      phone: "+49 7931 97300",
      address: "Wolfgangstraße 4, 97980 Bad Mergentheim",
      mapsUrl: maps("Restaurant Alexander Wolfgangstraße 4 Bad Mergentheim"),
      website: "https://www.alexander-mergentheim.de/",
    },
    sources: ["https://www.alexander-mergentheim.de/", "https://www.openstreetmap.org/way/517998987"],
  },
  {
    slug: "zum-goldstueck-v5j9s2",
    family: "restaurant",
    status: "research",
    adminPreview: "tables",
    businessName: "Zum Goldstück",
    businessType: "Gutbürgerliche Küche",
    city: "Bad Mergentheim",
    tagline: "Gutbürgerlich an der Mühlwehrstraße.",
    shortDescription:
      "Frisch & hausgemacht in rustikalem Ambiente an der Mühlwehrstraße – Kochen aus Leidenschaft.",
    primaryCta: "call",
    services: [
      { title: "Herzhafte Klassiker", description: "Gutbürgerliche Gerichte, frisch zubereitet." },
      { title: "Vegetarisch & Vegan", description: "Fleischlose Alternativen auf der Karte." },
      { title: "Mittagstisch", description: "Wöchentlich wechselnde Mittagsangebote." },
      { title: "Weine & Spirituosen", description: "Erlesene Tropfen aus dem Taubertal." },
    ],
    media: mediaFor("zum-goldstueck-v5j9s2"),
    openingHours: ["Mo, Di, Fr–So 11:30–14:30 und 17:00–21:00", "Do 17:00–21:00", "Mi geschlossen"],
    contact: {
      phone: "+49 7931 5698432",
      address: "Mühlwehrstraße 25, 97980 Bad Mergentheim",
      mapsUrl: maps("Zum Goldstück Mühlwehrstraße 25 Bad Mergentheim"),
      website: "https://zum-goldstueck.de/",
    },
    sources: ["https://zum-goldstueck.de/"],
  },
  {
    slug: "gaestehaus-birgit-f2z7l4",
    family: "corporate",
    status: "research",
    adminPreview: "rooms",
    businessName: "Gästehaus Birgit",
    businessType: "Hotelpension ★★★",
    city: "Bad Mergentheim",
    tagline: "Gästehaus in Markelsheim.",
    shortDescription:
      "★★★ Hotelpension am Ortsrand von Markelsheim, ruhig am Tauberradweg – liebevoll gestaltete Zimmer und ein reichhaltiges Frühstück.",
    primaryCta: "call",
    services: [
      { title: "Gästezimmer", description: "Liebevoll gestaltete Zimmer in ruhiger Lage." },
      { title: "Ferienwohnungen", description: "Eigene Ferienwohnungen für längere Aufenthalte." },
      { title: "Reichhaltiges Frühstück", description: "Kräftiger Start in den Tag." },
      { title: "Fahrradverleih & BettBike", description: "Direkt am Tauberradweg, mit abschließbarer Fahrradgarage." },
      { title: "Garten & Pavillon", description: "Sitz- und Liegeplätze im Grünen." },
      { title: "Kostenlose Parkplätze", description: "Parken direkt am Haus, WLAN inklusive." },
    ],
    contact: {
      phone: "+49 7931 9090-0",
      address: "Scheuerntorstraße 25, 97980 Bad Mergentheim",
      mapsUrl: maps("Gästehaus Birgit Scheuerntorstraße 25 Bad Mergentheim"),
      website: "http://www.gaestehausbirgit.de/",
    },
    sources: ["http://www.gaestehausbirgit.de/"],
  },
  {
    slug: "immobilien-lebenswert-r4n8y6",
    family: "corporate",
    status: "research",
    businessName: "Immobilien-Lebenswert",
    businessType: "Immobilienbüro",
    city: "Bad Mergentheim",
    tagline: "Immobilien in Bad Mergentheim.",
    shortDescription: conceptCopy("Immobilienbüro"),
    primaryCta: "call",
    media: mediaFor("immobilien-lebenswert-r4n8y6"),
    contact: {
      phone: "+49 931 30 44 59 62",
      address: "Oberer Graben 62, 97980 Bad Mergentheim",
      mapsUrl: maps("Immobilien-Lebenswert Oberer Graben 62 Bad Mergentheim"),
      website: "https://immobilien-lebenswert.de/",
    },
    sources: ["https://immobilien-lebenswert.de/", "https://www.openstreetmap.org/node/11053135237"],
  },
  {
    slug: "rechtsanwalt-glaeser-c7p2h5",
    family: "corporate",
    status: "research",
    businessName: "Rechtsanwalt Gläser",
    businessType: "Rechtsanwaltskanzlei",
    city: "Bad Mergentheim",
    tagline: "Kanzlei in Bad Mergentheim seit 1996.",
    shortDescription:
      "Kanzlei in Bad Mergentheim seit 1996 – Fachanwalt für Strafrecht, tätig in zahlreichen Rechtsgebieten.",
    primaryCta: "directions",
    services: [
      { title: "Strafrecht", description: "Fachanwalt für Strafrecht, Verteidigung in allen Instanzen." },
      { title: "Verkehrsrecht", description: "Verkehrsrecht, Ordnungswidrigkeiten und Unfallregulierung." },
      { title: "Miet- & Immobilienrecht", description: "Rund um Wohnen, Vermietung und Immobilien." },
      { title: "Bau- & Architektenrecht", description: "Rechtsfragen am Bau und in der Planung." },
      { title: "Automobilrecht", description: "Rechtliche Fragen rund ums Fahrzeug." },
      { title: "Internationales Recht", description: "Auch für spanischsprachige Mandanten." },
    ],
    media: mediaFor("rechtsanwalt-glaeser-c7p2h5"),
    contact: {
      address: "Mittlerer Graben 42, 97980 Bad Mergentheim",
      mapsUrl: maps("Rechtsanwalt Gläser Mittlerer Graben 42 Bad Mergentheim"),
      website: "https://www.glaeser-rechtsanwalt.de/",
    },
    sources: ["https://www.glaeser-rechtsanwalt.de/"],
  },
  {
    slug: "schreinerei-heck-m3w8k1",
    family: "construction",
    status: "research",
    businessName: "Schreinerei Heck",
    businessType: "Schreinerei",
    city: "Bad Mergentheim",
    tagline: "Schreinerhandwerk aus Bad Mergentheim.",
    shortDescription:
      "Dieser unverbindliche Entwurf zeigt die Schreinerei Heck mit ihren Leistungen von Innenausbau bis Küche – klar, mobil und direkt erreichbar.",
    primaryCta: "call",
    services: [
      { title: "Innenausbau", description: "Maßgefertigter Ausbau für Wohn- und Geschäftsräume." },
      { title: "Küchen", description: "Planung und Einbau individueller Küchen." },
      { title: "Fenster", description: "Fenster nach Maß." },
      { title: "Türen", description: "Innen- und Außentüren vom Fach." },
      { title: "Badeinrichtung", description: "Möbel und Ausbau fürs Bad." },
    ],
    media: mediaFor("schreinerei-heck-m3w8k1"),
    contact: {
      phone: "+49 7931 51083",
      address: "Beim Braunstall 7, 97980 Bad Mergentheim",
      mapsUrl: maps("Schreinerei Heck Beim Braunstall 7 Bad Mergentheim"),
      website: "https://www.schreiner-heck.de/",
    },
    sources: ["https://www.schreiner-heck.de/", "https://www.openstreetmap.org/way/514538338"],
  },
  {
    slug: "grabmale-maurer-t9g4d2",
    family: "construction",
    status: "research",
    businessName: "Grabmale Maurer",
    businessType: "Steinmetzbetrieb",
    city: "Bad Mergentheim",
    tagline: "Steinmetzhandwerk in Bad Mergentheim.",
    shortDescription:
      "Steinmetzhandwerk aus Bad Mergentheim – individuelle Grabmale, Naturstein und Restaurierung, nach persönlicher Beratung gefertigt.",
    primaryCta: "call",
    services: [
      { title: "Individuelle Entwürfe", description: "Grabmale nach persönlichen Wünschen gestaltet." },
      { title: "Einzel- & Doppelgrab", description: "Klassische Grabmale in vielen Steinarten." },
      { title: "Urnengrab & Reihengräber", description: "Lösungen für jede Grabform." },
      { title: "Felsen", description: "Natürliche Findlinge als Grabmal." },
      { title: "Grabschmuck & Schrift", description: "Inschriften, Ornamente und Ziersplitt." },
      { title: "Restaurierung", description: "Aufarbeitung bestehender Grabmale." },
    ],
    media: mediaFor("grabmale-maurer-t9g4d2"),
    contact: {
      phone: "+49 7931 9204090",
      address: "Schillerstraße 18, 97980 Bad Mergentheim",
      mapsUrl: maps("Grabmale Maurer Schillerstraße 18 Bad Mergentheim"),
      website: "https://www.maurer-grabmale.de/kontakt/bad-mergentheim/",
    },
    sources: [
      "https://www.maurer-grabmale.de/kontakt/bad-mergentheim/",
      "https://www.openstreetmap.org/way/516150832",
    ],
  },
  {
    slug: "bartec-gmbh-e5x8p3",
    family: "corporate",
    status: "research",
    businessName: "BARTEC GmbH",
    businessType: "Sicherheitstechnik",
    city: "Bad Mergentheim",
    tagline: "Sicherheit für explosionsgefährdete Bereiche.",
    shortDescription:
      "Dieser unverbindliche Entwurf zeigt BARTEC – seit 1975 globaler Partner für Explosionsschutz, Sicherheit und Effizienz in explosionsgefährdeten Bereichen.",
    primaryCta: "directions",
    highlights: ["Öl & Gas", "Chemie", "Pharma", "Energie", "Wasserstoff", "Lebensmittel"],
    services: [
      { title: "Mobile Geräte", description: "Smartphones und Mobilcomputer für explosionsgefährdete Zonen." },
      { title: "Analyse- & Messtechnik", description: "Geräte für Prozessanalyse und Prüfung." },
      { title: "Beleuchtung & Infrastruktur", description: "Beleuchtungssysteme für explosionsgefährdete Atmosphären." },
      { title: "Energieverteilung", description: "Lösungen für das Energiemanagement im Ex-Bereich." },
      { title: "Automation & Steuerung", description: "Industrielle Prozesssteuerung und Automatisierung." },
      { title: "Begleitheizung", description: "Schlüsselfertige Heat-Tracing-Systeme." },
      { title: "Gefahrguttransport", description: "Lösungen für den sicheren Transport gefährlicher Güter." },
      { title: "Drahtlose Kommunikation", description: "Kommunikationssysteme für abgeschirmte Bereiche." },
    ],
    process: [
      { title: "Beratung", description: "Expertenwissen für explosionsgefährdete Bereiche." },
      { title: "Engineering", description: "Planung und Umsetzung großer Projekte." },
      { title: "Service", description: "Betreuung über ein weltweites Partnernetzwerk." },
      { title: "Reparatur", description: "Rücksende- und Reparaturservice." },
    ],
    careers: [
      { title: "Offenes Arbeitsumfeld", description: "International, mit klaren Zielen." },
      { title: "Ausbildung", description: "Solide, gefragt und zukunftssicher." },
      { title: "Praktika", description: "Spannende Einblicke in den Explosionsschutz." },
    ],
    heroVideoId: "pfqKai4dqgg",
    missionStatement: {
      headline: "Zu schützen, was am wertvollsten ist.",
      sub: "Safety beyond protection · seit 1975",
    },
    brand: { accent: "#fd7e14", accentSoft: "#6c757d" },
    contact: {
      address: "Max-Eyth-Straße 16, 97980 Bad Mergentheim",
      mapsUrl: "https://maps.app.goo.gl/5YNYXuKvYbFonLsc9",
      website: "https://bartec.com/de/",
    },
    media: mediaFor("bartec-gmbh-e5x8p3", 5),
    sources: [
      "https://maps.app.goo.gl/5YNYXuKvYbFonLsc9",
      "https://bartec.com/de/",
      "https://www.openstreetmap.org/way/358550050",
    ],
  },
];

export const leads = rawLeads.map((lead) => leadProfileSchema.parse(lead));

export function getLeadBySlug(slug: string): LeadProfile | undefined {
  return leads.find((lead) => lead.slug === slug);
}
