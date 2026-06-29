"use client";

import { useEffect, useMemo, useState } from "react";
import "./belschner-circuit.css";

const W = 1440;
const H = 900;
const LANES = 7;

type Trace = { id: string; d: string };
type Node = { x: number; y: number; hot: boolean };

/** Deterministic PCB-style network: horizontal current lanes with right-angle
 * jogs, junction nodes and edge pads. Same output on server & client (seeded). */
function buildCircuit(seed: number) {
  let s = seed >>> 0;
  const rand = () => ((s = (s * 1664525 + 1013904223) >>> 0), s / 4294967296);
  const traces: Trace[] = [];
  const nodes: Node[] = [];
  const pads: Array<{ x: number; y: number }> = [];
  const step = H / (LANES + 1);

  for (let i = 0; i < LANES; i++) {
    let y = Math.round(step * (i + 1));
    let x = -80;
    const pts: Array<[number, number]> = [[x, y]];
    while (x < W + 80) {
      x += 90 + Math.floor(rand() * 170);
      pts.push([x, y]);
      if (rand() < 0.5) {
        const dir = rand() < 0.5 ? -1 : 1;
        const ny = Math.min(H - 30, Math.max(30, y + dir * Math.round(step * (0.4 + rand() * 0.4))));
        pts.push([x, ny]);
        y = ny;
      }
    }
    const d = pts.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
    traces.push({ id: `bhc-${i}`, d });
    pts.forEach((p, idx) => {
      if (idx > 0 && idx < pts.length - 1) nodes.push({ x: p[0], y: p[1], hot: rand() < 0.32 });
    });
    pads.push({ x: pts[1][0], y: pts[1][1] });
  }
  return { traces, nodes, pads };
}

export function BelschnerHeroCircuit() {
  const { traces, nodes } = useMemo(() => buildCircuit(73), []);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false));
  }, []);

  return (
    <svg className="bel-circuit bel-circuit-hero" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="bel-trace-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1ec8ff" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#1ec8ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1ec8ff" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <g>
        {traces.map((t) => (
          <path key={t.id} id={t.id} className="bel-trace" d={t.d} />
        ))}
      </g>

      <g>
        {nodes.map((n, i) =>
          n.hot ? (
            <g key={i}>
              <circle className="bel-node-halo" cx={n.x} cy={n.y} r="9" />
              <circle className="bel-node bel-node-hot" cx={n.x} cy={n.y} r="3.4" />
            </g>
          ) : (
            <circle key={i} className="bel-node" cx={n.x} cy={n.y} r="2.6" />
          ),
        )}
      </g>

      {animate && (
        <g>
          {traces.map((t, i) => (
            <g key={`p-${t.id}`}>
              <animateMotion dur={`${5 + (i % 4) * 1.6}s`} begin={`${i * 0.7}s`} repeatCount="indefinite">
                <mpath href={`#${t.id}`} />
              </animateMotion>
              <circle className="bel-pulse-halo" r="7" />
              <circle className="bel-pulse-core" r="2.6" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
