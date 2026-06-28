"use client";

import { PlayCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "EnQW7RSpgVQ";
const VIDEO_START_SECONDS = 10;

const STAGES = [
  { title: "Biomasse", description: "Holzreste und Festbrennstoffe gelangen auf den Kablitz-Rost." },
  { title: "Feuerung", description: "Auf dem luft- bzw. wassergekühlten Rost entzündet sich der Brennstoff." },
  { title: "Dampferzeugung", description: "Die Verbrennungswärme erzeugt im Kessel Hochdruckdampf." },
  { title: "Rauchgasreinigung", description: "Das Rauchgas wird mehrstufig gereinigt — sauber aus dem Kamin." },
];

/** Maps overall scroll progress (0..1) to an active stage index. */
function stageFromProgress(p: number) {
  return Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
}

export function KablitzProcessStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Scroll progress → progressRef + active stage (rAF-throttled, MotionLayer style).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) {
      progressRef.current = 1;
      setActive(STAGES.length - 1);
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

  // Canvas process animation driven by progressRef + time.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Seeded particles for biomass infeed.
    const feed = Array.from({ length: 26 }, (_, i) => ({
      x: Math.random(),
      y: 0.2 + Math.random() * 0.16,
      r: 3 + Math.random() * 4,
      seed: i * 13.7,
    }));

    let raf = 0;
    let running = true;
    const draw = (now: number) => {
      const W = canvas.width;
      const H = canvas.height;
      const p = progressRef.current;
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.5;
      const grateY = H * 0.62;
      const grateW = W * 0.42;

      // --- Grate (Kablitz-Rost) ---
      ctx.strokeStyle = "rgba(255,255,255,0.32)";
      ctx.lineWidth = Math.max(2, W * 0.0016);
      const bars = 9;
      for (let i = 0; i <= bars; i++) {
        const x = cx - grateW / 2 + (grateW * i) / bars;
        ctx.beginPath();
        ctx.moveTo(x, grateY);
        ctx.lineTo(x - grateW * 0.04, grateY + H * 0.05);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx - grateW / 2, grateY);
      ctx.lineTo(cx + grateW / 2, grateY);
      ctx.stroke();

      // --- Biomass infeed (stage 0) ---
      const feedAmt = Math.max(0, 1 - p * 2.2);
      for (const f of feed) {
        const travel = ((t * 0.12 + f.seed) % 1);
        const fx = W * 0.06 + travel * (cx - grateW / 2 - W * 0.06);
        const fy = grateY - H * 0.02 + Math.sin(travel * 6 + f.seed) * H * 0.01;
        ctx.globalAlpha = feedAmt * 0.8;
        ctx.fillStyle = "#b08456";
        ctx.beginPath();
        ctx.arc(fx, fy, f.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // --- Flames on grate (grow with progress, stages 1-2) ---
      const flame = Math.min(1, Math.max(0, p * 2.4));
      const flameCount = 22;
      for (let i = 0; i < flameCount; i++) {
        const fx = cx - grateW / 2 + (grateW * (i + 0.5)) / flameCount;
        const flick = 0.7 + 0.3 * Math.sin(t * 6 + i * 1.7);
        const fh = H * 0.16 * flame * flick;
        const grad = ctx.createLinearGradient(0, grateY, 0, grateY - fh);
        grad.addColorStop(0, "rgba(192,4,24,0.9)");
        grad.addColorStop(0.5, "rgba(255,90,20,0.85)");
        grad.addColorStop(1, "rgba(255,200,60,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(fx - grateW * 0.02, grateY);
        ctx.quadraticCurveTo(fx, grateY - fh * 1.2, fx + grateW * 0.004, grateY - fh);
        ctx.quadraticCurveTo(fx, grateY - fh * 0.5, fx + grateW * 0.02, grateY);
        ctx.closePath();
        ctx.fill();
      }

      // --- Boiler tubes + steam (stage 2) ---
      const steam = Math.min(1, Math.max(0, (p - 0.45) * 3));
      ctx.strokeStyle = `rgba(255,255,255,${0.18 + 0.2 * steam})`;
      ctx.lineWidth = Math.max(2, W * 0.0018);
      for (let i = 0; i < 4; i++) {
        const sx = cx - grateW * 0.18 + i * grateW * 0.12;
        ctx.beginPath();
        for (let s = 0; s <= 10; s++) {
          const yy = grateY - H * 0.18 - (s / 10) * H * 0.28 * steam;
          const xx = sx + Math.sin(s * 0.9 + t * 2 + i) * W * 0.012 * steam;
          if (s === 0) ctx.moveTo(xx, yy);
          else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }

      // --- Flue gas cleaning → clean stack (stage 3) ---
      const clean = Math.min(1, Math.max(0, (p - 0.7) * 3.3));
      const stackX = cx + grateW * 0.55;
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fillRect(stackX - W * 0.012, grateY - H * 0.3, W * 0.024, H * 0.3);
      for (let i = 0; i < 8; i++) {
        const puff = ((t * 0.2 + i / 8) % 1);
        const py = grateY - H * 0.3 - puff * H * 0.16;
        ctx.globalAlpha = clean * (1 - puff) * 0.5;
        ctx.fillStyle = "#dfe6ea";
        ctx.beginPath();
        ctx.arc(stackX + Math.sin(puff * 5 + i) * W * 0.01, py, (4 + puff * 10) * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      progressRef.current = 1;
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Lightbox: lock scroll + Escape to close.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  return (
    <section className="kablitz-process" id="anlage" ref={sectionRef}>
      <div className="kablitz-process-sticky">
        <canvas ref={canvasRef} className="kablitz-process-canvas" aria-hidden="true" />
        <div className="kablitz-process-copy">
          <p className="kablitz-eyebrow">Wie unsere Anlagen arbeiten</p>
          <h2>Vom Rost bis zum Kamin</h2>
          <p className="kablitz-process-desc">
            Scrollen Sie durch den Prozess: So entsteht aus Biomasse sauber nutzbare Energie.
          </p>
          <ol className="kablitz-process-steps">
            {STAGES.map((stage, index) => (
              <li key={stage.title} className={index === active ? "is-active" : ""}>
                <span className="kablitz-process-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <button type="button" className="kablitz-process-videolink" onClick={() => setLightbox(true)}>
            <PlayCircle size={18} /> Video mit Ton ansehen
          </button>
        </div>
      </div>

      {lightbox && (
        <div className="kablitz-lightbox" role="dialog" aria-modal="true" aria-label="Anlagen-Video" onClick={() => setLightbox(false)}>
          <button type="button" className="kablitz-lightbox-close" aria-label="Schließen" onClick={() => setLightbox(false)}>
            <X size={22} />
          </button>
          <div className="kablitz-lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&start=${VIDEO_START_SECONDS}&rel=0&modestbranding=1`}
              title="Kablitz Dampfkessel mit Rauchgasreinigung"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
