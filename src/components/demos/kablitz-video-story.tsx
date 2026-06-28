"use client";

import { Flame, Gauge, PlayCircle, Wind } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

function reveal(index = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--i": index } as CSSProperties };
}

const VIDEO_ID = "EnQW7RSpgVQ";
const VIDEO_START_SECONDS = 10;

const VIDEO_STEPS = [
  { title: "Verbrennung", description: "Biomasse wird auf dem Kablitz-Rost vollständig und kontrolliert verbrannt.", icon: <Flame size={18} /> },
  { title: "Dampferzeugung", description: "Die Verbrennungswärme erzeugt im Dampfkessel Hochdruckdampf.", icon: <Gauge size={18} /> },
  { title: "Rauchgasreinigung", description: "Das Rauchgas wird mehrstufig gereinigt, bevor es den Kamin verlässt.", icon: <Wind size={18} /> },
];

/**
 * Loads the YouTube iframe only once the section nears the viewport, so the
 * embed (and its scripts/connections) never blocks initial page load.
 */
export function KablitzVideoStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="kablitz-video-story" id="anlage">
      <div className="kablitz-video-bg" data-parallax="0.03" aria-hidden="true" ref={containerRef}>
        {shouldLoad && (
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&start=${VIDEO_START_SECONDS}`}
            title="Kablitz Dampfkessel mit Rauchgasreinigung"
            allow="autoplay; encrypted-media"
            loading="lazy"
            frameBorder={0}
          />
        )}
      </div>
      <div className="kablitz-video-scrim" aria-hidden="true" />
      <div className="kablitz-video-copy">
        <p className="kablitz-eyebrow" {...reveal(0)}>Wie unsere Anlagen arbeiten</p>
        <h2 {...reveal(1)}>Dampfkessel mit Rauchgasreinigung</h2>
        <p className="kablitz-video-desc" {...reveal(2)}>
          Vom Rost bis zum Kamin: So entsteht aus Biomasse sauber nutzbare Prozesswärme und Dampf.
        </p>
        <div className="kablitz-video-steps">
          {VIDEO_STEPS.map((step, index) => (
            <div className="kablitz-video-step" key={step.title} {...reveal(index + 3)}>
              <span>{step.icon}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <a
          className="kablitz-video-link"
          href={`https://www.youtube.com/watch?v=${VIDEO_ID}&t=${VIDEO_START_SECONDS}s`}
          target="_blank"
          rel="noreferrer"
          {...reveal(6)}
        >
          <PlayCircle size={18} /> Video mit Ton ansehen
        </a>
      </div>
    </section>
  );
}
