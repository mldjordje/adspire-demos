"use client";

import { Check } from "lucide-react";
import { useState } from "react";

const SERVICES = [
  { name: "Maniküre & Naturnagel", price: "ab 28 €" },
  { name: "Gel-Nägel & Modellage", price: "ab 49 €" },
  { name: "French & Babyboomer", price: "ab 55 €" },
  { name: "Nail Art & Design", price: "ab 8 €/Nagel" },
  { name: "Maniküre + Shellac", price: "ab 38 €" },
  { name: "Auffüllen & Refill", price: "ab 39 €" },
];

const DATES = [
  { n: "Mo", d: "6. Juli" },
  { n: "Di", d: "7. Juli" },
  { n: "Mi", d: "8. Juli" },
  { n: "Do", d: "9. Juli" },
  { n: "Fr", d: "10. Juli" },
  { n: "Sa", d: "11. Juli" },
  { n: "Mo", d: "13. Juli" },
  { n: "Di", d: "14. Juli" },
];

const TIMES = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

export function OlaBeautyBooking() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<string | null>(null);
  const [dateIdx, setDateIdx] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const canStep2 = Boolean(service);
  const canStep3 = canStep2 && dateIdx !== null && Boolean(time);
  const dateLabel = dateIdx !== null ? `${DATES[dateIdx].n}, ${DATES[dateIdx].d}` : "Wann passt es dir?";

  function goStep(target: number) {
    if (target === 1 || (target === 2 && canStep2) || (target === 3 && canStep3)) setStep(target);
  }

  if (done) {
    return (
      <div className="ola-success" data-reveal>
        <div className="ola-success-icon"><Check size={22} /></div>
        <p className="ola-success-title">Termin bestätigt</p>
        <p className="ola-success-desc">
          Wir freuen uns auf dich, {name}!<br />
          {service} · {dateLabel} um {time} Uhr.<br />
          Ola Beauty meldet sich kurz per WhatsApp zur Bestätigung.
        </p>
      </div>
    );
  }

  return (
    <div data-reveal>
      <div className="ola-steps">
        <button type="button" className={`ola-step-row${step === 1 ? " active" : ""}${service ? " done" : ""}`} onClick={() => goStep(1)}>
          <span className="ola-step-num">1</span>
          <span className="ola-step-content">
            <span className="ola-step-title">Behandlung wählen</span>
            <span className="ola-step-desc">{service ?? "Welche Behandlung darf es sein?"}</span>
          </span>
          <span className="ola-step-arrow">›</span>
        </button>
        <button type="button" disabled={!canStep2} className={`ola-step-row${step === 2 ? " active" : ""}${canStep3 ? " done" : ""}`} onClick={() => goStep(2)}>
          <span className="ola-step-num">2</span>
          <span className="ola-step-content">
            <span className="ola-step-title">Datum &amp; Uhrzeit</span>
            <span className="ola-step-desc">{canStep3 ? `${dateLabel} · ${time}` : "Termin aussuchen"}</span>
          </span>
          <span className="ola-step-arrow">›</span>
        </button>
        <button type="button" disabled={!canStep3} className={`ola-step-row${step === 3 ? " active" : ""}`} onClick={() => goStep(3)}>
          <span className="ola-step-num">3</span>
          <span className="ola-step-content">
            <span className="ola-step-title">Bestätigen</span>
            <span className="ola-step-desc">Deine Kontaktdaten</span>
          </span>
          <span className="ola-step-arrow">›</span>
        </button>
      </div>

      {step === 1 && (
        <div className="ola-panel">
          <div className="ola-chip-row">
            {SERVICES.map((s) => (
              <button
                type="button"
                key={s.name}
                className={`ola-chip${service === s.name ? " chosen" : ""}`}
                onClick={() => { setService(s.name); setStep(2); }}
              >
                {s.name}
                <small>{s.price}</small>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="ola-panel">
          <div className="ola-date-grid">
            {DATES.map((d, i) => (
              <button
                type="button"
                key={d.d}
                className={`ola-date-btn${dateIdx === i ? " picked" : ""}`}
                onClick={() => setDateIdx(i)}
              >
                <span className="dname">{d.n}</span>
                {d.d}
              </button>
            ))}
          </div>
          {dateIdx !== null && (
            <div className="ola-time-grid">
              {TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`ola-time-btn${time === t ? " picked" : ""}`}
                  onClick={() => { setTime(t); setStep(3); }}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="ola-panel">
          <div className="ola-confirm">
            <input className="ola-input" placeholder="Dein Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="ola-input" placeholder="Handynummer (WhatsApp)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button
              type="button"
              className="ola-btn-book"
              disabled={!name.trim() || !phone.trim()}
              onClick={() => setDone(true)}
            >
              Termin bestätigen
            </button>
          </div>
        </div>
      )}

      <p className="ola-booking-note">Unverbindlich · Kostenlos · Jederzeit stornierbar</p>
    </div>
  );
}
