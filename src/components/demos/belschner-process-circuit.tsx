"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import "./belschner-circuit.css";

const W = 1440;
const H = 900;
const LANES = 8;

type Trace = { id: string; d: string };
type Node = { x: number; y: number; appearAt: number; big: boolean };

/** Schematic network drawn left→right. Traces reveal via stroke-dashoffset and
 * nodes light up as the scroll progress passes their x position, so the diagram
 * literally builds itself stage by stage. Deterministic (seeded). */
function buildCircuit(seed: number) {
  let s = seed >>> 0;
  const rand = () => ((s = (s * 1664525 + 1013904223) >>> 0), s / 4294967296);
  const traces: Trace[] = [];
  const nodes: Node[] = [];
  const step = H / (LANES + 1);

  for (let i = 0; i < LANES; i++) {
    let y = Math.round(step * (i + 1));
    let x = -60;
    const pts: Array<[number, number]> = [[x, y]];
    while (x < W + 60) {
      x += 80 + Math.floor(rand() * 150);
      pts.push([x, y]);
      if (rand() < 0.55) {
        const dir = rand() < 0.5 ? -1 : 1;
        const ny = Math.min(H - 24, Math.max(24, y + dir * Math.round(step * (0.4 + rand() * 0.5))));
        pts.push([x, ny]);
        y = ny;
      }
    }
    const d = pts.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
    traces.push({ id: `bpc-${i}`, d });
    pts.forEach((p, idx) => {
      if (idx > 0 && idx < pts.length - 1) {
        nodes.push({ x: p[0], y: p[1], appearAt: Math.max(0, Math.min(1, p[0] / W)) * 0.9, big: rand() < 0.28 });
      }
    });
  }
  return { traces, nodes };
}

export function BelschnerProcessCircuit({ progressRef }: { progressRef: RefObject<number> }) {
  const { traces, nodes } = useMemo(() => buildCircuit(41), []);
  const traceRefs = useRef<(SVGPathElement | null)[]>([]);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const animateRef = useRef(true);

  useEffect(() => {
    animateRef.current = !(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false);
    let raf = 0;
    let running = true;
    let smooth = 0;
    const render = () => {
      if (!running) return;
      const target = progressRef.current ?? 0;
      smooth += (target - smooth) * 0.1;
      const p = smooth;
      traceRefs.current.forEach((el, i) => {
        if (!el) return;
        const local = Math.max(0, Math.min(1, p * 1.25 - i * 0.04));
        el.style.strokeDashoffset = String(1 - local);
      });
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const on = p >= nodes[i].appearAt;
        if (el.dataset.on !== String(on)) {
          el.dataset.on = String(on);
          el.classList.toggle("bel-node-live", on);
          el.style.opacity = on ? "1" : "0.22";
        }
      });
      raf = requestAnimationFrame(render);
    };

    const canvas = document.getElementById("bel-process-circuit");
    const observer =
      canvas && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !running) {
              running = true;
              raf = requestAnimationFrame(render);
            } else if (!entry.isIntersecting && running) {
              running = false;
              cancelAnimationFrame(raf);
            }
          })
        : null;
    if (canvas) observer?.observe(canvas);

    raf = requestAnimationFrame(render);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [progressRef, nodes]);

  return (
    <svg id="bel-process-circuit" className="bel-circuit bel-circuit-process" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {/* faint base layer so the board is never empty */}
      <g>
        {traces.map((t) => (
          <path key={`base-${t.id}`} className="bel-trace bel-trace-base" d={t.d} />
        ))}
      </g>

      {/* live traces drawn in by scroll */}
      <g>
        {traces.map((t, i) => (
          <path
            key={t.id}
            id={t.id}
            ref={(el) => { traceRefs.current[i] = el; }}
            className="bel-trace"
            d={t.d}
            pathLength={1}
          />
        ))}
      </g>

      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            ref={(el) => { nodeRefs.current[i] = el; }}
            className="bel-node"
            cx={n.x}
            cy={n.y}
            r={n.big ? 4 : 2.8}
          />
        ))}
      </g>
    </svg>
  );
}
