"use client";

import { Activity, Flame, Gauge, Thermometer, Wind } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Kpi = {
  key: string;
  label: string;
  unit: string;
  target: number;
  max: number;
  decimals: number;
  icon: React.ReactNode;
};

const KPIS: Kpi[] = [
  { key: "pressure", label: "Kesseldruck", unit: "bar", target: 18.4, max: 30, decimals: 1, icon: <Gauge size={16} /> },
  { key: "fluegas", label: "Rauchgastemperatur", unit: "°C", target: 168, max: 300, decimals: 0, icon: <Thermometer size={16} /> },
  { key: "efficiency", label: "Wirkungsgrad", unit: "%", target: 91.6, max: 100, decimals: 1, icon: <Activity size={16} /> },
  { key: "throughput", label: "Brennstoffdurchsatz", unit: "t/h", target: 4.7, max: 8, decimals: 1, icon: <Flame size={16} /> },
];

/** Deterministic pseudo-random so SSR and first client paint agree. */
function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function CountUpGauge({ kpi, play }: { kpi: Kpi; play: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!play) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) {
      setValue(kpi.target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(kpi.target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, kpi.target]);

  const pct = Math.min(1, value / kpi.max);
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <article className="kablitz-monitor-gauge">
      <svg viewBox="0 0 64 64" className="kablitz-monitor-arc">
        <circle cx="32" cy="32" r={R} className="kablitz-monitor-arc-bg" />
        <circle
          cx="32"
          cy="32"
          r={R}
          className="kablitz-monitor-arc-fg"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct)}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <div className="kablitz-monitor-gauge-body">
        <span className="kablitz-monitor-gauge-label">{kpi.icon} {kpi.label}</span>
        <strong>{value.toFixed(kpi.decimals)}<small>{kpi.unit}</small></strong>
      </div>
    </article>
  );
}

function Sparkline({ play }: { play: boolean }) {
  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: 24 }, (_, i) => 80 + seeded(i) * 30),
  );
  useEffect(() => {
    if (!play) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;
    const id = window.setInterval(() => {
      setPoints((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        const drift = (Math.random() - 0.5) * 14;
        next.push(Math.max(60, Math.min(120, last + drift)));
        return next;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, [play]);

  const W = 220;
  const H = 56;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * W;
      const y = H - ((p - min) / range) * (H - 8) - 4;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="kablitz-monitor-spark">
      <span className="kablitz-monitor-spark-label"><Wind size={14} /> Dampfleistung (live, t/h)</span>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="kablitz-monitor-spark-svg">
        <path d={`${path} L${W},${H} L0,${H} Z`} className="kablitz-monitor-spark-fill" />
        <path d={path} className="kablitz-monitor-spark-line" />
      </svg>
    </div>
  );
}

function PlantFlow() {
  // CSS-animated flow dots along an SVG schematic: feed → grate → boiler → stack.
  return (
    <svg viewBox="0 0 320 120" className="kablitz-monitor-flow" role="img" aria-label="Anlagenschema">
      {/* path: infeed bottom-left → grate → up boiler → over to stack */}
      <path id="kablitz-flowpath" d="M12,96 H110 L150,60 H210 V24 H300" className="kablitz-monitor-flow-path" fill="none" />
      <rect x="96" y="86" width="64" height="8" rx="2" className="kablitz-monitor-flow-grate" />
      <rect x="196" y="20" width="34" height="60" rx="4" className="kablitz-monitor-flow-boiler" />
      <rect x="292" y="8" width="14" height="40" rx="2" className="kablitz-monitor-flow-stack" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} r="4" className="kablitz-monitor-flow-dot">
          <animateMotion dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite">
            <mpath href="#kablitz-flowpath" />
          </animateMotion>
        </circle>
      ))}
      <text x="12" y="112" className="kablitz-monitor-flow-cap">Biomasse</text>
      <text x="118" y="112" className="kablitz-monitor-flow-cap">Rost</text>
      <text x="196" y="112" className="kablitz-monitor-flow-cap">Kessel</text>
      <text x="270" y="112" className="kablitz-monitor-flow-cap">Kamin</text>
    </svg>
  );
}

export function KablitzAdminMonitor() {
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
    <section className="kablitz-admin-section kablitz-monitor" ref={ref}>
      <h2><Activity size={18} /> Anlagen-Monitoring (Live)</h2>
      <div className="kablitz-monitor-grid">
        <div className="kablitz-monitor-gauges">
          {KPIS.map((kpi) => (
            <CountUpGauge key={kpi.key} kpi={kpi} play={play} />
          ))}
        </div>
        <div className="kablitz-monitor-side">
          <PlantFlow />
          <Sparkline play={play} />
        </div>
      </div>
    </section>
  );
}
