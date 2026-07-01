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
    slug: "ola-beauty-bad-mergentheim-n8k4w2",
    family: "beauty",
    status: "research",
    businessName: "Ola Beauty",
    businessType: "Nagelstudio & Beauty",
    city: "Bad Mergentheim",
    tagline: "Nageldesign & Beauty in Bad Mergentheim.",
    shortDescription:
      "Unverbindlicher Entwurf für ein Nagelstudio: klare Mobil-Optik, Online-Terminbuchung und eine Admin-Vorschau für die Salonverwaltung.",
    primaryCta: "booking-demo",
    services: [
      { title: "Maniküre & Naturnagel", description: "Pflege, Form und glänzendes Finish — gepflegte Hände in unter einer Stunde.", meta: "ab 28 €" },
      { title: "Gel-Nägel & Modellage", description: "Stabile Verstärkung in Wunschform und -länge, langlebig und natürlich.", meta: "ab 49 €" },
      { title: "French & Babyboomer", description: "Der zeitlose Klassiker — sanfter Verlauf, perfekt für jeden Anlass.", meta: "ab 55 €" },
      { title: "Nail Art & Design", description: "Individuelle Motive, Schwünge, Blüten oder Steinchen nach deiner Idee.", meta: "ab 8 €/Nagel" },
      { title: "Maniküre + Shellac", description: "Wochenlanger Glanz ohne Absplittern — ideal für den Alltag.", meta: "ab 38 €" },
      { title: "Auffüllen & Refill", description: "Bestehende Modellage frisch aufgefüllt und nachmodelliert.", meta: "ab 39 €" },
    ],
    contact: {
      mapsUrl: "https://www.google.com/maps/place/OLA+BEAUTY/@49.49274,9.7712851,732m/data=!3m1!1e3!4m6!3m5!1s0x4798710f9c9d6019:0xcd6a35e6d0259f17!8m2!3d49.49274!4d9.77386!16s%2Fg%2F11d_tqv0kl",
      instagramUrl: "https://www.instagram.com/",
    },
    sources: ["https://www.google.com/maps/place/OLA+BEAUTY/@49.49274,9.77386,17z"],
    notes: "Demo-Konzept Nagelstudio. Bilder als stilisierte SVG-Illustrationen, da keine freigegebenen Fotos vorliegen.",
  },
  {
    slug: "tm-nails-beauty-bad-mergentheim-a7p3k9",
    family: "beauty",
    status: "research",
    businessName: "TM Nails & Beauty",
    businessType: "Nagelstudio & Beauty",
    city: "Bad Mergentheim",
    tagline: "Nageldesign & Beauty im Activ-Center Bad Mergentheim.",
    shortDescription:
      "Unverbindlicher Entwurf für TM Nails & Beauty im Activ-Center: klare Mobil-Optik, Online-Terminbuchung und eine Admin-Vorschau für die Salonverwaltung.",
    primaryCta: "booking-demo",
    services: [
      { title: "Maniküre & Naturnagel", description: "Pflege, Form und glänzendes Finish — gepflegte Hände in unter einer Stunde.", meta: "ab 28 €" },
      { title: "Gel-Nägel & Modellage", description: "Stabile Verstärkung in Wunschform und -länge, langlebig und natürlich.", meta: "ab 49 €" },
      { title: "French & Babyboomer", description: "Der zeitlose Klassiker — sanfter Verlauf, perfekt für jeden Anlass.", meta: "ab 55 €" },
      { title: "Nail Art & Design", description: "Individuelle Motive, Schwünge, Blüten oder Steinchen nach deiner Idee.", meta: "ab 8 €/Nagel" },
      { title: "Maniküre + Shellac", description: "Wochenlanger Glanz ohne Absplittern — ideal für den Alltag.", meta: "ab 38 €" },
      { title: "Pediküre & Fußpflege", description: "Entspannende Pflege für gepflegte Füße — ideal zur warmen Jahreszeit.", meta: "ab 35 €" },
    ],
    contact: {
      mapsUrl: "https://www.google.com/maps/place/TM+Nails+%26+Beauty+im+Activ-Center+Bad+Mergentheim/@49.4941027,9.7683449,1465m/data=!3m2!1e3!5s0x4799b93a6760f763:0xae3a393da278d0b1!4m6!3m5!1s0x4798716a66cb1081:0x6f17bfa00de175bd!8m2!3d49.4941027!4d9.7734949!16s%2Fg%2F11sgy23bfy",
      address: "Im Activ-Center, 97980 Bad Mergentheim",
      instagramUrl: "https://www.instagram.com/",
    },
    sources: ["https://www.google.com/maps/place/TM+Nails+%26+Beauty+im+Activ-Center+Bad+Mergentheim/@49.4941027,9.7734949,17z"],
    notes: "Demo-Konzept Nagelstudio (gleiche Branche wie Ola Beauty, anderer Salon). Bilder als stilisierte SVG-Illustrationen, da keine freigegebenen Fotos vorliegen.",
  },
  {
    slug: "hb-nails-bad-mergentheim-z3v6q8",
    family: "beauty",
    status: "research",
    businessName: "H.B Nails",
    businessType: "Nagelstudio & Beauty",
    city: "Bad Mergentheim",
    tagline: "Nageldesign, French & Ombré in Bad Mergentheim.",
    shortDescription:
      "Unverbindlicher Entwurf für H.B Nails: dunkle, ausdrucksstarke Mobil-Optik, Online-Terminbuchung und eine Admin-Vorschau für die Salonverwaltung.",
    primaryCta: "booking-demo",
    services: [
      { title: "Maniküre & Naturnagel", description: "Pflege, Form und glänzendes Finish — gepflegte Hände in unter einer Stunde.", meta: "ab 26 €" },
      { title: "Gel-Modellage XL", description: "Extralange Coffin- und Ballerina-Form, stabil modelliert in deiner Wunschlänge.", meta: "ab 52 €" },
      { title: "French & Black-Tip", description: "Vom klassischen French bis zum kontrastreichen Schwarz-Weiß-Design.", meta: "ab 55 €" },
      { title: "Rot & Ombré-Verlauf", description: "Sattes Rot oder weicher Farbverlauf — ausdrucksstark und edel zugleich.", meta: "ab 49 €" },
      { title: "Nail Art & Kristalle", description: "Individuelle Motive, Chrome, Folien oder funkelnde Steinchen nach deiner Idee.", meta: "ab 9 €/Nagel" },
      { title: "Auffüllen & Refill", description: "Bestehende Modellage frisch aufgefüllt und nachmodelliert.", meta: "ab 38 €" },
    ],
    contact: {
      mapsUrl: "https://www.google.com/maps/place/H.B+Nails/@49.492612,9.7673129,1465m/data=!3m1!1e3!4m6!3m5!1s0x479871f41a4b24fd:0xf623af73dc31e723!8m2!3d49.492612!4d9.7724626!16s%2Fg%2F11jp2sfs33",
      instagramUrl: "https://www.instagram.com/",
    },
    sources: ["https://www.google.com/maps/place/H.B+Nails/@49.492612,9.7724626,17z"],
    notes: "Demo-Konzept Nagelstudio (dritter Nagel-Salon nach Ola Beauty und TM Nails). Eigenes dunkles Design-Konzept mit Rot-Akzent zur Abgrenzung. Bilder als stilisierte SVG-Illustrationen, da keine freigegebenen Fotos vorliegen.",
  },
  {
    slug: "haargenau-bei-magda-p7r2v9",
    family: "beauty",
    status: "research",
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
  {
    slug: "kablitz-gmbh-r4t9k2",
    family: "corporate",
    status: "research",
    businessName: "Richard Kablitz GmbH",
    businessType: "Biomasse- & Anlagenbau",
    city: "Lauda-Königshofen",
    tagline: "Biomass & Waste to Energy seit 1901.",
    shortDescription:
      "Dieser unverbindliche Entwurf zeigt Richard Kablitz – seit 1901 inhabergeführter Anlagenbauer für Biomasse-Heizkraftwerke, Kesselanlagen, Heißgaserzeuger und Wärmerückgewinnung, mit eigener Gießerei und über 70 Mitarbeitern weltweit.",
    primaryCta: "call",
    highlights: [
      "Über 120 Jahre Firmengeschichte",
      "Eigene Gießerei & Stahlfertigung",
      "ISO 9001:2015 zertifiziert",
      "70+ Mitarbeiter weltweit",
      "Kunden auf 5 Kontinenten",
      "Familiengeführt seit 1901",
    ],
    services: [
      { title: "Feuerungen", description: "Wasser- und luftgekühlte Rostsysteme für nahezu jede Biomasse." },
      { title: "Energiezentralen", description: "Dampfkessel, Thermoölanlagen und Heißwassersysteme." },
      { title: "Wärmetauscher", description: "Rückgewinnungstechnik für effiziente Prozesswärme." },
      { title: "Gießerei", description: "Eigene Gussroste und Lamellenplatten aus eigener Fertigung." },
      { title: "Brennstofflösungen", description: "Biomasse, Agrarreste, Ersatzbrennstoffe und Altholz." },
      { title: "Service & Wartung", description: "Betreuung der Anlagen über die gesamte Lebensdauer." },
    ],
    process: [
      { title: "Planung", description: "Auslegung kompletter Heizkraftwerke und Kesselanlagen." },
      { title: "Fertigung", description: "Eigene Gießerei für Roste und Verschleißteile." },
      { title: "Montage", description: "Inbetriebnahme weltweit beim Kunden vor Ort." },
      { title: "Service", description: "Ersatzteile und Wartung über den gesamten Betrieb." },
    ],
    certifications: [
      { title: "ISO 9001:2015", description: "Zertifiziertes Qualitätsmanagement, Erstzertifizierung 1996." },
      { title: "Gegründet 1901", description: "Ursprünglich in Riga, seit den 1950ern in Deutschland ansässig." },
      { title: "70+ Mitarbeiter", description: "Familiengeführt, Kunden in Europa, Asien, Amerika, Australien und Neuseeland." },
    ],
    contact: {
      phone: "+49 9343 79010",
      address: "Bahnhofstraße 72–78, 97922 Lauda-Königshofen",
      mapsUrl: "https://maps.app.goo.gl/UWMA2mEu4vbreYqVA",
      website: "https://www.kablitz.de/",
    },
    media: mediaFor("kablitz-gmbh-r4t9k2"),
    sources: [
      "https://maps.app.goo.gl/UWMA2mEu4vbreYqVA",
      "https://www.kablitz.de/",
      "https://www.kablitz.de/kontakt/",
      "https://www.kablitz.de/wer-wir-sind/",
    ],
    notes:
      "Gegründet 1901 in Riga (Lettland) durch Richard Kablitz, Umzug der Familie und des Unternehmens nach Deutschland Anfang der 1950er. Inhabergeführtes Traditionsunternehmen, über 120 Jahre Firmengeschichte, eigene Gießerei und Stahlfertigung am Standort. Über 70 Mitarbeiter weltweit, Kunden vor allem aus Holzwerkstoff- und Sägeindustrie, daneben Energieversorger, Contractingunternehmen und Kommunen. ISO 9001:2015 zertifiziert (Erstzertifizierung 1996).",
  },
  {
    slug: "emil-stelter-gmbh-bad-mergentheim-p6d4n8",
    family: "corporate",
    status: "research",
    businessName: "Emil Stelter GmbH",
    businessType: "Maler- & Stuckateurbetrieb",
    city: "Bad Mergentheim",
    tagline: "Wir kleiden Ihr Gebaeude, Ihre Wohnung oder einfach nur Ihr Zimmer neu ein.",
    shortDescription:
      "Dieser unverbindliche Entwurf zeigt Emil Stelter als modernen Meisterbetrieb fuer Malerarbeiten, Stuckateurarbeiten, Geruestbau, kreative Wandgestaltung, Sanierung, Trockenbau, Waermedaemmung und schnelle Hilfe bei Wasserschaden oder Schimmel.",
    primaryCta: "call",
    highlights: [
      "Meisterbetrieb in dritter Generation",
      "60 Jahre Kompetenz und Erfahrung",
      "Maler- und Stuckateurarbeiten",
      "Geruestbau und Sanierung",
      "Waermedaemmung und Trockenbau",
      "Standort Bad Mergentheim",
    ],
    services: [
      {
        title: "Malerarbeiten",
        description:
          "Solide Handwerkskunst fuer Raeume, Fassaden und abgestimmte Farbkonzepte von kuehl und sachlich bis warm und gemuetlich.",
      },
      {
        title: "Kreative Wandgestaltung",
        description:
          "Individuelle Oberflaechen und Techniken fuer Waende, abgestimmt auf persoenliche Wuensche und Raumwirkung.",
      },
      {
        title: "Geruestbau",
        description:
          "Passende Gerueste fuer Arbeiten in der Hoehe, damit Fassade, Sanierung und Renovierung sicher ausgefuehrt werden koennen.",
      },
      {
        title: "Stuckateurarbeiten",
        description:
          "Innenputz, Aussenputz und handwerkliche Gestaltung, die Untergrund, Raumklima und Wetterschutz zusammenbringt.",
      },
      {
        title: "Wasserschaden",
        description:
          "Schnelle Trocknung, Feuchtemessung und geplante Sanierung, bevor Holzfaeule, Schimmel oder Folgeschaeden entstehen.",
      },
      {
        title: "Sanierung",
        description:
          "Altbau-, Wohnhaus- und Industriebausanierung mit Erfahrung, sauberer Ausfuehrung und abgestimmten Materialien.",
      },
      { title: "Restaurierung", description: "Restaurierung und Denkmalpflege mit fachkundigem Blick fuer bestehende Substanz." },
      { title: "Schimmelsanierung", description: "Fachgerechte Schimmelsanierung statt nur oberflaechlicher Entfernung befallener Stellen." },
      { title: "Tapezierarbeiten", description: "Professionelle Tapezierarbeiten mit sauberem Finish und hochwertiger Ausfuehrung." },
      { title: "Lackierarbeiten", description: "Neue Oberflaechen fuer Moebel, Tueren, Zaeune, Gelaender und beanspruchte Bauteile." },
      { title: "Trockenbau", description: "Loesungen fuer Schallschutz, Raumaufteilung, Klimawirksamkeit und flexible Nutzung." },
      { title: "Waermedaemmung", description: "Energetische Sanierung mit aktuellem Fachwissen zu Anforderungen und Materialien." },
    ],
    process: [
      { title: "Beratung", description: "Wunsch, Untergrund, Nutzung und Gestaltung gemeinsam klaeren." },
      { title: "Planung", description: "Material, Geruest, Ablauf und Sanierungsschritte passend abstimmen." },
      { title: "Ausfuehrung", description: "Maler-, Stuckateur- und Sanierungsarbeiten handwerklich sauber umsetzen." },
      { title: "Uebergabe", description: "Fertigstellung, Kontrolle und Pflegehinweise direkt besprechen." },
    ],
    certifications: [
      { title: "Meisterbetrieb", description: "Das Unternehmen steht zur Tradition des deutschen Handwerks." },
      { title: "3. Generation", description: "Der Betrieb wird laut Website in der dritten Generation gefuehrt." },
      { title: "60 Jahre Erfahrung", description: "Die Website nennt 60 Jahre Kompetenz und Erfahrung fuer Kunden." },
    ],
    contact: {
      phone: "+49 7931 97810",
      email: "info@emil-stelter-gmbh.de",
      address: "Dainbacher Weg 12, 97980 Bad Mergentheim",
      mapsUrl: maps("Emil Stelter GmbH Dainbacher Weg 12 Bad Mergentheim"),
      website: "https://www.emil-stelter-gmbh.de/",
    },
    media: mediaFor("emil-stelter-gmbh-bad-mergentheim-p6d4n8"),
    sources: [
      "https://www.emil-stelter-gmbh.de/",
      "https://www.emil-stelter-gmbh.de/pages/impressum.php",
      "https://www.emil-stelter-gmbh.de/pages/das-sind-wir/firmengeschichte.php",
      "https://www.emil-stelter-gmbh.de/pages/das-sind-wir.php",
    ],
    notes:
      "Website copy states: 'Wir kleiden Ihr Gebaeude, Ihre Wohnung oder einfach nur Ihr Zimmer neu ein', Meisterbetrieb in der 3. Generation and 60 Jahre Kompetenz und Erfahrung. Contact from Impressum: Emil Stelter GmbH, Dainbacher Weg 12, 97980 Bad Mergentheim, Telefon 07931 97810, info@emil-stelter-gmbh.de, represented by Andre Stelter.",
  },
  {
    slug: "belschner-elektrotechnik-w7k4n2",
    family: "corporate",
    status: "research",
    businessName: "Belschner Elektrotechnik",
    businessType: "Elektro-Fachbetrieb",
    city: "Weikersheim",
    tagline: "Strom, der mitdenkt — vom Anschluss bis zum Smart Home.",
    shortDescription:
      "Dieser unverbindliche Entwurf zeigt Belschner Elektrotechnik — Elektro-Fachbetrieb und e-masters-Partner aus Weikersheim für Elektroinstallation, Service, Smart Home und intelligente Modernisierung in Haus und Wohnung.",
    primaryCta: "call",
    highlights: [
      "e-masters Partner",
      "Smart Home & Gebäudeautomation",
      "24/7 Notdienst",
      "Intelligente Modernisierung",
      "Service & Wartung",
      "Regionaler Fachbetrieb",
    ],
    services: [
      { title: "Elektroinstallation", description: "Fachgerechte Installation für Neubau, Sanierung und Erweiterung." },
      { title: "Intelligent modernisieren", description: "Bestehende Elektrik sicher und effizient auf den neuesten Stand bringen." },
      { title: "Smart Home", description: "Licht, Heizung, Beschattung und Sicherheit zentral und intelligent gesteuert." },
      { title: "Service & Wartung", description: "Prüfung, Instandhaltung und schneller Notdienst für Ihre Anlage." },
      { title: "Telefonanlagen", description: "Kommunikationstechnik für Wohnung, Haus und Büro." },
      { title: "Satellitentechnik", description: "Empfangs- und Verteiltechnik, sauber installiert." },
    ],
    process: [
      { title: "Anschluss", description: "Sichere Anbindung ans Netz — Zählerplatz und Hausanschluss nach Norm." },
      { title: "Installation", description: "Saubere Verkabelung und fachgerechte Elektroinstallation." },
      { title: "Smart Home", description: "Vernetzte Steuerung von Licht, Wärme und Sicherheit." },
      { title: "Effizienz", description: "PV, Lastmanagement und Modernisierung senken den Verbrauch." },
    ],
    certifications: [
      { title: "e-masters Partner", description: "Mitglied der europäischen Gemeinschaft selbstständiger Elektro-Fachbetriebe." },
      { title: "Smart-Home-Fachbetrieb", description: "Planung und Installation vernetzter, intelligenter Gebäudetechnik." },
      { title: "Regional verwurzelt", description: "Fachbetrieb aus Weikersheim — kurze Wege, persönlicher Service." },
    ],
    contact: {
      phone: "+49 7934 9953363",
      email: "info@elektro-belschner.de",
      address: "Dürrbachweg 2, 97990 Weikersheim",
      mapsUrl: "https://maps.app.goo.gl/J7vSpMKXtJgbrVpS8",
      website: "https://www.elektro-belschner.de/",
    },
    media: mediaFor("belschner-elektrotechnik-w7k4n2"),
    sources: [
      "https://www.elektro-belschner.de/",
      "https://maps.app.goo.gl/J7vSpMKXtJgbrVpS8",
    ],
    notes:
      "Elektro-Fachbetrieb in Weikersheim (Dürrbachweg 2, 97990). Mitglied der e-masters-Gemeinschaft. Leistungen: Elektroinstallation, intelligente Modernisierung, Smart Home / Intelligentes Wohnen, Service & Wartung, Telefonanlagen, Satellitentechnik. Werte: Qualität, Sicherheit und Energie. Mo–Fr 08:00–17:00. Keine Gründungsjahr- oder Mitarbeiterzahl auf der Website angegeben — bewusst allgemein gehalten.",
  },
  {
    slug: "huthmann-tuning-automobile-s9k3m6",
    family: "corporate",
    status: "research",
    businessName: "Huthmann Tuning & Automobile",
    businessType: "Kfz-Fachbetrieb",
    city: "Bad Mergentheim",
    tagline: "Kfz-Service, Tuning und Oldtimer aus Bad Mergentheim.",
    shortDescription:
      "Dieser unverbindliche Entwurf zeigt Huthmann Tuning & Automobile als modernen Kfz-Fachbetrieb fuer Diagnostik, Inspektion, Reparatur, Tuning, Unfallinstandsetzung und Oldtimer-Restauration.",
    primaryCta: "call",
    highlights: [
      "Diagnostik und Reparatur der Fahrzeug- und Motorelektronik",
      "Inspektionen, TUEV und AU Service",
      "Fahrzeugtuning nach Wunsch",
      "Oldtimer-Restauration und Karosserie-Instandsetzung",
      "Unfallinstandsetzung mit Gutachter- und Versicherungsabwicklung",
      "Faire Preise und persoenliche Abstimmung vor Arbeitsbeginn",
    ],
    services: [
      {
        title: "Diagnose & Inspektion",
        description:
          "Fahrzeug- und Motorelektronik, Inspektionen aller Art, TUEV/AU Service und transparente Abstimmung vor der Reparatur.",
      },
      {
        title: "Reparatur & Service",
        description:
          "Motoren, Bremsen, Fahrwerk, Auspuff, Getriebespuelung, Autoglas, Klimatechnik sowie Rad- und Reifenservice.",
      },
      {
        title: "Tuning",
        description:
          "Bodykits, Edelstahl-Auspuffanlagen, Karosserieverbreiterungen, Felgen, Fahrwerke, Interieur und Leistungssteigerung inklusive TUEV Vollabnahme.",
      },
      {
        title: "Oldtimer & Karosserie",
        description:
          "Teil- und Komplettrestaurationen, Sand- oder Sodastrahlung, Zinnarbeiten, Achs- und Lenkungsinstandsetzung sowie Innenausstattung nach Wunsch.",
      },
      {
        title: "Unfallinstandsetzung",
        description:
          "Reparatur, Instandsetzung und Formalitaeten bei Unfall-, Hagel- oder Kratzerschaeden in Zusammenarbeit mit einem unabhaengigen Sachverstaendigen.",
      },
      {
        title: "Sonderloesungen",
        description:
          "Metrische und zoellische Sonderschrauben nach Bedarf sowie Beschaffung umgebauter Fahrzeuge nach Kundenwunsch.",
      },
    ],
    process: [
      { title: "Fehlerbild", description: "Diagnose und persoenliche Besprechung der notwendigen Arbeiten." },
      { title: "Freigabe", description: "Klare Abstimmung zu Umfang, Teilen und naechsten Schritten." },
      { title: "Werkstatt", description: "Fachgerechte Reparatur, Tuning oder Restauration am Fahrzeug." },
      { title: "Abnahme", description: "Probefahrt, TUEV/AU oder Vollabnahme je nach Leistungsumfang." },
    ],
    certifications: [
      { title: "Kfz-Fachbetrieb", description: "Werkstattservice fuer alle Fahrzeugmarken." },
      { title: "Oldtimer-Schwerpunkt", description: "Restauration und Karosserie-Instandsetzung mit BMW E21 Referenz." },
      { title: "Unfallservice", description: "Unterstuetzung bei Gutachter, Versicherung und Reparaturabwicklung." },
    ],
    openingHours: [
      "Mo-Do 08:00-12:00 und 13:00-17:00",
      "Fr 08:00-13:00",
      "Sa nur nach Vereinbarung",
      "So geschlossen",
    ],
    contact: {
      phone: "+49 7931 991970",
      email: "info@huthmann-tuning.de",
      address: "Wilhelm-Frank-Str. 28, 97980 Bad Mergentheim",
      mapsUrl: maps("Huthmann Tuning Automobile Wilhelm-Frank-Str. 28 Bad Mergentheim"),
      website: "https://huthmann-tuning.de/",
    },
    media: mediaFor("huthmann-tuning-automobile-s9k3m6", 11),
    sources: [
      "https://huthmann-tuning.de/",
      "https://huthmann-tuning.de/unsere-leistungen",
      "https://huthmann-tuning.de/unsere-leistungen/tuning",
      "https://huthmann-tuning.de/unsere-leistungen/unfallinstandsetzung",
      "https://huthmann-tuning.de/unsere-leistungen/oldtimer",
      "https://huthmann-tuning.de/referenzen/fotostrecke",
      "https://huthmann-tuning.de/kontakt",
    ],
    notes:
      "Website copy lists Kfz-Werkstatt, Fahrzeug- und Motorelektronik, Inspektionen, Motor/Bremsen/Fahrwerk/Auspuff, Getriebespuelungen, Autoglas, Klimatechnik, Reifenservice, TUEV/AU, Unfallinstandsetzung, Fahrzeugtuning, Oldtimer-Restauration, Karosserie-Instandsetzung and custom metric/imperial screws. Contact: Roland Huthmann, Wilhelm-Frank-Str. 28, 97980 Bad Mergentheim, Telefon 07931 991970.",
  },
  {
    slug: "kfz-werkstatt-elis-bad-mergentheim-q4m7x2",
    family: "corporate",
    status: "research",
    businessName: "Kfz-Werkstatt Elis",
    businessType: "Kfz-Werkstatt",
    city: "Bad Mergentheim",
    tagline: "Autoreparatur, Service und Reifen in Bad Mergentheim.",
    shortDescription:
      "Unverbindlicher Demo-Auftritt fuer Kfz-Werkstatt Elis: direkte Kontaktaufnahme, klare Leistungen und echte Werkstattbilder fuer schnelle Reparaturen, Wartung und Reifenservice.",
    primaryCta: "call",
    highlights: [
      "Kfz-Reparaturen fuer gaengige Fahrzeuge",
      "Fehlersuche und Diagnose",
      "Oelwechsel und Wartung",
      "Bremsen, Reifen und Fahrwerk",
      "Direkte Terminabsprache per Telefon",
      "Werkstatt in Bad Mergentheim",
    ],
    services: [
      {
        title: "Diagnose & Fehlersuche",
        description:
          "Elektronik, Motorraum und sichtbare Fehler werden geprueft, damit die Reparatur gezielt starten kann.",
      },
      {
        title: "Oelwechsel & Wartung",
        description:
          "Regelmaessiger Service mit Oelwechsel, Sichtpruefung und klarer Abstimmung der naechsten Arbeiten.",
      },
      {
        title: "Bremsenservice",
        description:
          "Kontrolle und Reparatur von Bremsbelaegen, Scheiben und relevanten Sicherheitskomponenten.",
      },
      {
        title: "Reifenwechsel",
        description:
          "Saisonaler Reifenwechsel und kurze Sichtpruefung auf Profil, Zustand und sichere Fahrt.",
      },
      {
        title: "Motor & Fahrwerk",
        description:
          "Allgemeine Reparaturen an Motor, Fahrwerk, Auspuff und Verschleissteilen nach Diagnose.",
      },
      {
        title: "Schneller Werkstatttermin",
        description:
          "Telefonisch erreichbar fuer Terminabsprache, Rueckfragen und kurzfristige Servicewuensche.",
      },
    ],
    process: [
      { title: "Annahme", description: "Fahrzeug und Fehlerbild kurz besprechen." },
      { title: "Diagnose", description: "Sichtpruefung, OBD-Check und Kosteneinschaetzung." },
      { title: "Reparatur", description: "Freigegebene Arbeiten sauber durchfuehren." },
      { title: "Abholung", description: "Abschlusscheck und Uebergabe." },
    ],
    certifications: [
      { title: "Freie Kfz-Werkstatt", description: "Service und Reparatur fuer gaengige Fahrzeuge." },
      { title: "Lokaler Betrieb", description: "Direkt erreichbar in Bad Mergentheim." },
      { title: "Praxisnaher Service", description: "Klare Abstimmung vor der Reparatur." },
    ],
    openingHours: [
      "Termin nach telefonischer Vereinbarung",
    ],
    contact: {
      phone: "+49 170 3389506",
      address: "Dainbacher Weg 1, 97980 Bad Mergentheim",
      mapsUrl: maps("Kfz-Werkstatt Elis Dainbacher Weg 1 Bad Mergentheim"),
      instagramUrl: "https://www.instagram.com/kfz_werkstatt_elis/",
    },
    media: mediaFor("kfz-werkstatt-elis-bad-mergentheim-q4m7x2"),
    sources: [
      "https://www.google.com/maps/place/Kfz-Werkstatt+Elis/",
      "https://www.instagram.com/kfz_werkstatt_elis/",
    ],
    notes:
      "Search result for Instagram lists Adresse: Dainbacher Weg 1, 97980 Bad Mergentheim and phone 01703389506. User supplied the two workshop photos for this demo.",
  },
];

export const leads = rawLeads.map((lead) => leadProfileSchema.parse(lead));

export function getLeadBySlug(slug: string): LeadProfile | undefined {
  return leads.find((lead) => lead.slug === slug);
}
