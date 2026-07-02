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
  heroMode: "graphic",
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
  modulesHead: { eyebrow: "Werkstattdiagnose", title: "Vom Fehlerbild zum klaren Fahrplan - Schritt fuer Schritt." },
  stages: [
    { step: "01", title: "Annahme", label: "Problem kurz klaeren", text: "Fahrzeug, Fehlerbild und Wunschleistung werden direkt aufgenommen." },
    { step: "02", title: "Check", label: "Diagnose und Sichtpruefung", text: "Elektronik, Bremsen, Reifen, Klima oder Oelservice werden sauber geprueft." },
    { step: "03", title: "Repair", label: "Reparatur freigeben", text: "Die naechsten Schritte werden klar abgestimmt, bevor Teile verbaut werden." },
    { step: "04", title: "Shine", label: "Aufbereitung & Uebergabe", text: "Professionelle Aufbereitung mit Koch-Chemie-Produkten und klare Uebergabe." },
  ],
  storyHead: { eyebrow: "", title: "" },
  servicesHead: { eyebrow: "Werkstatt / Service / Aufbereitung", title: "Echte Module fuer echte Fahrzeugprobleme." },
  storyBlock: {
    eyebrow: "CarCare seit 2023",
    title: "Ihr Auto in besten Haenden.",
    body: "Der Demo-Auftritt positioniert CarCare als Kfz-Meisterbetrieb fuer Inspektion, Wartung, Diagnose, Reifen-, Klima- und Bremsenservice sowie professionelle Fahrzeugaufbereitung in Bad Mergentheim. Wir kriegen das hin.",
  },
  galleryHead: { eyebrow: "", title: "" },
  showGallery: false,
  showStoryImages: false,
  showServiceMedia: false,
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
  showGallery: true,
  showStoryImages: false,
  showServiceMedia: true,
} as AutoConfig;

export const AUTOMOTIVE_CONFIGS: Record<string, AutoConfig> = {
  [CARCARE_SLUG]: carcare,
  [TCP_SLUG]: tcp,
  [NIKO_SLUG]: niko,
};
