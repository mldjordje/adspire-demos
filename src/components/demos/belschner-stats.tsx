"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix?: string; text?: string; label: string };

const STATS: Stat[] = [
  { text: "24/7", value: 0, label: "Notdienst erreichbar" },
  { text: "e-masters", value: 0, label: "Partnerbetrieb" },
  { value: 100, suffix: "%", label: "Regionaler Service" },
  { text: "Smart", value: 0, label: "Home zertifiziert" },
];

function CountUp({ stat, play }: { stat: Stat; play: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!play || stat.text) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) {
      setValue(stat.value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(stat.value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, stat.text, stat.value]);

  const display = stat.text ?? `${value}${stat.suffix ?? ""}`;
  return (
    <div className="belschner-stat">
      <strong>{display}</strong>
      <span>{stat.label}</span>
    </div>
  );
}

export function BelschnerStats() {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setPlay(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setPlay(true);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="belschner-stats" ref={ref}>
      {STATS.map((stat) => (
        <CountUp key={stat.label} stat={stat} play={play} />
      ))}
    </section>
  );
}
