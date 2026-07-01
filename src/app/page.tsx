import Link from "next/link";
import { ArrowRight, Car, Layers3, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="hub-home">
      <nav className="hub-nav"><strong>ADSPIRE / CONCEPTS</strong><span>Bad Mergentheim · 2026</span></nav>
      <section className="hub-hero">
        <div>
          <p className="hub-label">Private Präsentationsumgebung</p>
          <h1>Digitale Entwürfe für persönliche Gespräche.</h1>
          <p>Jeder Link in diesem Hub ist ein unverbindliches, nicht indexiertes Designkonzept und kein offizieller Unternehmensauftritt.</p>
          <Link className="hub-cta" href="/control/bm-ops-7f3k9x">Alle Demos ansehen <ArrowRight size={16} /></Link>
        </div>
        <div className="hub-principles">
          <Link className="hub-feature-demo" href="/demo/kfz-werkstatt-elis-bad-mergentheim-q4m7x2">
            <Car />
            <strong>Kfz-Werkstatt Elis</strong>
            <span>Neues Automotive-Konzept mit Werkstattfotos, Service-Fokus und direkter Kontaktaufnahme.</span>
            <small>Demo oeffnen <ArrowRight size={13} /></small>
          </Link>
          <article><Layers3 /><strong>5 Template-Familien</strong><span>Beauty, Barber, Restaurant, Corporate und Construction.</span></article>
          <article><ShieldCheck /><strong>Keine erfundenen Angaben</strong><span>Nur öffentlich belegte oder vom Unternehmen freigegebene Inhalte.</span></article>
        </div>
      </section>
      <footer className="hub-footer"><span>Adspire · Serbia</span><Link href="https://adspire.rs">Agentur ansehen <ArrowRight size={14} /></Link></footer>
    </main>
  );
}
