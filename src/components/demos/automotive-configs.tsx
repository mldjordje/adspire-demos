import { Car, CheckCircle2, Droplet, Gauge, Rocket, ScanLine, ShieldCheck, Snowflake, Sparkles, Wrench, Zap } from "lucide-react";
import type { AutoConfig } from "./automotive-demo";

export const CARCARE_SLUG = "carcare-mgh-bad-mergentheim-c4r7k9";
export const TCP_SLUG = "tcp-tuning-bad-mergentheim-t8p3v6";
export const NIKO_SLUG = "kfz-niko-deissler-bad-mergentheim-n5d8k2";

const carcare: AutoConfig = {
  theme: "auto-carcare",
  wordmark: "carcare",
  markIcon: <Sparkles size={18} />,
  eyebrow: "Bad Mergentheim / Kfz-Meisterbetrieb",
  headline: ["Service.", "Aufbereitung.", "Vertrauen."],
  navThird: { label: "Aufbereitung", href: "#oldtimer" },
  heroMode: "video",
  videoSrc: "/leads/carcare-mgh-bad-mergentheim-c4r7k9/hero.mp4",
  ticker: [
    "Inspektion", "Wartung", "Oelservice", "Bremsen", "Diagnose", "Autoglas",
    "Reifenservice", "Batterie", "Klimaservice", "Aufbereitung", "Abschleppdienst", "Bad Mergentheim",
  ],
  modules: [
    { label: "Diagnose", value: "OBD", icon: <ScanLine size={18} /> },
    { label: "Inspektion", value: "TUEV", icon: <CheckCircle2 size={18} /> },
    { label: "Bremsen", value: "Stop", icon: <ShieldCheck size={18} /> },
    { label: "Reifen", value: "Grip", icon: <Car size={18} /> },
    { label: "Klima", value: "Cool", icon: <Snowflake size={18} /> },
    { label: "Aufbereitung", value: "Shine", icon: <Sparkles size={18} /> },
  ],
  modulesHead: { eyebrow: "Werkstattdiagnose", title: "Vom Fehlerbild zum klaren Fahrplan - mit Meisterbetrieb, fairen Preisen und direktem Service." },
  stages: [
    { step: "01", title: "Annahme", label: "Problem kurz klaeren", text: "Fahrzeug, Fehlerbild und Wunschleistung werden direkt aufgenommen." },
    { step: "02", title: "Check", label: "Diagnose und Sichtpruefung", text: "Elektronik, Bremsen, Reifen, Klima oder Oelservice werden sauber geprueft." },
    { step: "03", title: "Repair", label: "Reparatur freigeben", text: "Die naechsten Schritte werden klar abgestimmt, bevor Teile verbaut werden." },
    { step: "04", title: "Shine", label: "Aufbereitung & Uebergabe", text: "Professionelle Aufbereitung mit Koch-Chemie-Produkten und klare Uebergabe." },
  ],
  storyHead: { eyebrow: "", title: "" },
  servicesHead: { eyebrow: "Werkstatt / Service / Aufbereitung", title: "Mechanik, Diagnose, Glas, Klima und Aufbereitung aus einer Hand." },
  storyBlock: {
    eyebrow: "Buchener Strasse 28 / seit 2023",
    title: "Ihr Auto in besten Haenden.",
    body: "CarCare verbindet erfahrene Mechaniker, Qualitaetsservice und bezahlbare Preise: Mechanikueberpruefung, Autowartung, Oel- und Bremsencheck, Glasservice, Reifen, Batterie, Diagnose, Klimaservice, Aufbereitung mit Koch-Chemie-Produkten und Abschleppservice. Wir kriegen das hin.",
  },
  galleryHead: { eyebrow: "", title: "" },
  featureHead: { eyebrow: "Aus dem bestehenden Auftritt", title: "Mehr als Standard-Werkstatt: Service, Pflege und schnelle Hilfe." },
  features: [
    {
      eyebrow: "Schneller Service",
      title: "Reparaturen, Reifenservice und Oelservice",
      text: "CarCare positioniert sich als Kfz-Werkstatt fuer Reparaturen, Reifenservice, Oelservice und Fahrzeugaufbereitung in Bad Mergentheim.",
      assetIndex: 3,
    },
    {
      eyebrow: "Aufbereitung",
      title: "Koch-Chemie-Produkte fuer Innen und Aussen",
      text: "Die bestehende Seite zeigt Koch-Chemie als Partner fuer professionelle Fahrzeugpflege und Aufbereitung.",
      assetIndex: 2,
    },
    {
      eyebrow: "Komfort",
      title: "Ambientebeleuchtung und Detailarbeiten",
      text: "Der oeffentliche Instagram-/Regional-Eintrag nennt neben Werkstattleistungen auch Ambientebeleuchtung und schnelle, professionelle Betreuung.",
      assetIndex: 1,
    },
  ],
  showGallery: true,
  showStoryImages: false,
  showServiceMedia: true,
} as AutoConfig;

const tcp: AutoConfig = {
  theme: "auto-tcp",
  wordmark: "tcp",
  markIcon: <Gauge size={18} />,
  eyebrow: "Bad Mergentheim / Kfz-Meisterbetrieb & Tuning",
  headline: ["Chiptuning.", "Leistung.", "Pruefstand."],
  navThird: { label: "Pruefstand", href: "#oldtimer" },
  heroMode: "video",
  videoSrc: "/leads/tcp-tuning-bad-mergentheim-t8p3v6/hero.mp4",
  ticker: [
    "Chiptuning", "Leistungsoptimierung", "Eco Tuning", "V-Max Aufhebung", "Pruefstand", "Steuergeraet",
    "PKW", "LKW", "Motorrad", "Landmaschinen", "Verbrauch", "Reparatur", "Sie suchen wir finden",
  ],
  modules: [
    { label: "Chiptuning", value: "ECU", icon: <Zap size={18} /> },
    { label: "Leistung", value: "PS+", icon: <Gauge size={18} /> },
    { label: "Eco Tuning", value: "Eco", icon: <Droplet size={18} /> },
    { label: "V-Max", value: "Open", icon: <Rocket size={18} /> },
    { label: "Pruefstand", value: "Dyno", icon: <ScanLine size={18} /> },
    { label: "Reparatur", value: "Fix", icon: <Wrench size={18} /> },
  ],
  modulesHead: { eyebrow: "Live diagnostic bay", title: "Aus Messwerten wird echte, saubere Mehrleistung." },
  stages: [
    { step: "01", title: "Messung", label: "Eingangsmessung", text: "Fahrzeug wird begutachtet, Probefahrt und Eingangsmessung auf dem Pruefstand." },
    { step: "02", title: "Optimieren", label: "Software abstimmen", text: "Steuergeraet auslesen, Originalsoftware sichern und individuell optimieren." },
    { step: "03", title: "Aufspielen", label: "Leistung freigeben", text: "Optimierte Software aufspielen, Ausgangsmessung und Feinabstimmung." },
    { step: "04", title: "Abnahme", label: "Abschlussdiagnose", text: "Abschlussdiagnose, Probefahrt und Uebergabe mit sauberer Mehrleistung." },
  ],
  storyHead: { eyebrow: "", title: "" },
  servicesHead: { eyebrow: "Tuning / Leistung / Werkstatt", title: "Keine austauschbaren Karten. Echte Module fuer echte Leistung." },
  storyBlock: {
    eyebrow: "Eigener Leistungspruefstand",
    title: "Von der Eingangsmessung bis zur Abschlussdiagnose.",
    body: "TCP - Top Car Performance ist Kfz-Meisterbetrieb und Tuning-Spezialist in Bad Mergentheim: Chiptuning fuer PKW, LKW, Motorrad und Landmaschinen, Leistungsoptimierung, Eco Tuning und V-Max Aufhebung - gemessen auf dem eigenen Pruefstand. Sie suchen, wir finden.",
  },
  galleryHead: { eyebrow: "Reference motion rail", title: "Pruefstand, Werkstatt und Fahrzeuge als bewegte Galerie." },
  featureHead: { eyebrow: "Chiptuning / Pruefstand / Handel", title: "TCP zeigt mehr Tiefe: Messung, Kennfeld und Fahrzeugvielfalt." },
  features: [
    {
      eyebrow: "Ablauf",
      title: "Originalsoftware sichern, optimieren, messen",
      text: "Die Chiptuning-Seite beschreibt einen klaren Ablauf: Steuergeraet auslesen, Original sichern, Software optimieren und Leistung pruefen.",
      assetIndex: 8,
    },
    {
      eyebrow: "Allrad-Leistungspruefstand",
      title: "Eingangs- und Ausgangsmessung statt Bauchgefuehl",
      text: "TCP kommuniziert den eigenen Leistungspruefstand als Kern des Angebots fuer saubere Vorher-/Nachher-Werte.",
      assetIndex: 0,
    },
    {
      eyebrow: "Fahrzeugkategorien",
      title: "PKW, LKW, Motorrad, Boote, Jetski und Traktoren",
      text: "Neben PKW werden auch LKW, Motorrad, Landmaschinen sowie Boote und Jetski als Zielgruppen fuer Optimierung genannt.",
      assetIndex: 10,
    },
  ],
  showGallery: true,
  showStoryImages: true,
  showServiceMedia: true,
} as AutoConfig;

const niko: AutoConfig = {
  theme: "auto-niko",
  wordmark: "deissler",
  markIcon: <Wrench size={18} />,
  eyebrow: "Bad Mergentheim-Wachbach / Kfz-Meisterbetrieb",
  headline: ["Service.", "Reparatur.", "Vertrauen."],
  navThird: { label: "Team", href: "#oldtimer" },
  heroMode: "image",
  ticker: [
    "Inspektion", "TUEV-Durchsicht", "Motorservice", "Dieselservice", "Elektro & Hybrid", "Klimaservice",
    "Achsvermessung", "Reifen & Felgen", "Bremsen", "Batterie", "Abschleppservice", "Bad Mergentheim-Wachbach",
  ],
  modules: [
    { label: "Inspektion", value: "TUEV", icon: <CheckCircle2 size={18} /> },
    { label: "Motor", value: "Oil", icon: <Gauge size={18} /> },
    { label: "Elektro", value: "Volt", icon: <Zap size={18} /> },
    { label: "Klima", value: "Cool", icon: <Snowflake size={18} /> },
    { label: "Reifen", value: "Grip", icon: <Car size={18} /> },
    { label: "Bremsen", value: "Stop", icon: <ShieldCheck size={18} /> },
  ],
  modulesHead: { eyebrow: "Werkstattdiagnose", title: "Fehlerbild, Wartung und Termin werden sauber zusammengefuehrt." },
  stages: [
    { step: "01", title: "Annahme", label: "Problem kurz klaeren", text: "Fahrzeug und Fehlerbild werden direkt aufgenommen und besprochen." },
    { step: "02", title: "Check", label: "Diagnose und Pruefung", text: "Moderne Prueftechnik, Elektronikdiagnose und Sichtpruefung mit geschultem Personal." },
    { step: "03", title: "Repair", label: "Reparatur freigeben", text: "Ersatzteile in Erstausruesterqualitaet, Reparatur nach klarer Abstimmung." },
    { step: "04", title: "Pickup", label: "Fahrzeug abholen", text: "Abschlusscheck, Probefahrt und Uebergabe - schnell, professionell und fair." },
  ],
  storyHead: { eyebrow: "", title: "" },
  servicesHead: { eyebrow: "Werkstatt / Service / Reifen", title: "Direkte Leistungen fuer schnelle Reparaturen und planbare Wartung." },
  storyBlock: {
    eyebrow: "Meisterbetrieb & Team",
    title: "Schnell, professionell und fair - mit eigenem Team in Wachbach.",
    body: "Der KFZ-Meisterbetrieb Niko Deissler in Bad Mergentheim-Wachbach bietet Fahrzeugservice, Motor- und Elektroservice, Klimaservice, Achsvermessung, Reifen, Bremsen, Batterie und Abschlepp- sowie Pannenhilfe - kompetent und zu fairen Preisen.",
  },
  galleryHead: { eyebrow: "Werkstatt & Team", title: "Werkstatt und Team als schnelle, bewegte Galerie." },
  featureHead: { eyebrow: "Leistungen der Werkstatt", title: "Die Leistungsliste ist breiter: Service, Systeme, Reifen und Pannenhilfe." },
  features: [
    {
      eyebrow: "Fahrzeugservice",
      title: "Inspektion, Urlaubscheck, Wintercheck und TUEV-Durchsicht",
      text: "Niko Deissler beschreibt die Werkstatt als freie Kfz-Werkstatt fuer alle Marken mit schnellem, fachmaennischem Service.",
      assetIndex: 4,
    },
    {
      eyebrow: "Motor / Elektro / Sicherheit",
      title: "Motordiagnose, Dieselreinigung, Start-Stopp und Sicherheitssysteme",
      text: "Die Leistungsseite listet Motorservice, Elektronikdiagnose, Elektro- und Hybridservice sowie Wartung moderner Sicherheitssysteme.",
      assetIndex: 5,
    },
    {
      eyebrow: "Reifen & Mobilitaet",
      title: "Raederwechsel, RDKS, Einlagerung und Abschlepphilfe",
      text: "Neben Bremsen, Batterie und Klima werden Raederwechsel, Auswuchten, RDKS-Wartung und Pannenhilfe aufgefuehrt.",
      assetIndex: 9,
    },
  ],
  showGallery: true,
  showStoryImages: false,
  showServiceMedia: true,
} as AutoConfig;

export const AUTOMOTIVE_CONFIGS: Record<string, AutoConfig> = {
  [CARCARE_SLUG]: carcare,
  [TCP_SLUG]: tcp,
  [NIKO_SLUG]: niko,
};
