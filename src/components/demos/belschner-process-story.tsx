"use client";

import { useEffect, useRef, useState } from "react";
import { BelschnerProcessCircuit } from "./belschner-process-circuit";

const STAGES = [
  { kicker: "01 — Anschluss", title: "Strom kommt ins Haus", description: "Zählerplatz und Hausanschluss — sicher und normgerecht ans Netz gebracht." },
  { kicker: "02 — Installation", title: "Leitungen werden gelegt", description: "Saubere Verkabelung und fachgerechte Elektroinstallation, Raum für Raum." },
  { kicker: "03 — Smart Home", title: "Das Haus wird vernetzt", description: "Licht, Wärme, Beschattung und Sicherheit — zentral und intelligent gesteuert." },
  { kicker: "04 — Effizienz", title: "Energie, die mitdenkt", description: "PV, Lastmanagement und Modernisierung senken dauerhaft den Verbrauch." },
];

function stageFromProgress(p: number) {
  return Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
}

export function BelschnerProcessStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) {
      progressRef.current = 1;
      setActive(STAGES.length - 1);
      setScrollPct(100);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progressRef.current = p;
      setActive(stageFromProgress(p));
      setScrollPct(Math.round(p * 100));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const stage = STAGES[active];

  return (
    <section className="belschner-process" id="ablauf" ref={sectionRef}>
      <div className="belschner-process-sticky">
        <BelschnerProcessCircuit progressRef={progressRef} />
        <div className="belschner-process-veil" aria-hidden="true" />

        {/* Top scroll progress bar */}
        <div className="belschner-process-bar" aria-hidden="true">
          <span style={{ width: `${scrollPct}%` }} />
        </div>

        {/* Stage rail (nodes fill as you pass) */}
        <ol className="belschner-process-rail" aria-hidden="true">
          {STAGES.map((s, i) => (
            <li key={s.title} className={i <= active ? "is-passed" : ""} data-current={i === active}>
              <span className="belschner-process-rail-dot" />
              <span className="belschner-process-rail-label">{s.title}</span>
            </li>
          ))}
        </ol>

        {/* Foreground stage caption — crossfades per stage */}
        <div className="belschner-process-stage">
          <p className="belschner-process-eyebrow">Vom Netz zum smarten Zuhause</p>
          <div className="belschner-process-caption" key={active}>
            <span className="belschner-process-kicker">{stage.kicker}</span>
            <h2>{stage.title}</h2>
            <p>{stage.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
