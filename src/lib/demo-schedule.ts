// Deterministic, fully fictional schedule data for the admin-preview pages.
// Seeded by slug so the static build is stable — never real bookings, never
// submitted or stored anywhere. Purely a "this is what your calendar could
// look like" sales visual.

export type ScheduleKind = "appointments" | "tables" | "rooms";

export type ScheduleBlock = {
  day: number; // 0 = Monday .. 6 = Sunday
  start: number; // hour, 24h
  durationHours: number;
  title: string;
  subtitle: string;
  lane: number; // 0-2, which resource column within the day
};

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

const APPOINTMENT_SERVICES = ["Schnitt", "Bartpflege", "Coloration", "Styling", "Pflege", "Rasur"];
const TABLE_SIZES = [2, 2, 3, 4, 4, 6];
const ROOM_TYPES = ["Doppelzimmer", "Einzelzimmer", "Ferienwohnung", "Doppelzimmer"];

export function buildDemoSchedule(slug: string, kind: ScheduleKind): { days: string[]; blocks: ScheduleBlock[]; laneCount: number } {
  const rand = seededRandom(slug + kind);
  const blocks: ScheduleBlock[] = [];
  const laneCount = kind === "rooms" ? 4 : 3;
  const blocksPerDay = kind === "tables" ? 5 : 4;

  for (let day = 0; day < 7; day++) {
    const used: { lane: number; start: number; end: number }[] = [];
    for (let i = 0; i < blocksPerDay; i++) {
      const lane = Math.floor(rand() * laneCount);
      const startHour = kind === "rooms" ? 14 : 9 + Math.floor(rand() * 10);
      const duration = kind === "rooms" ? 24 : kind === "tables" ? 1.5 : 0.5 + Math.floor(rand() * 2) * 0.5;
      const overlaps = used.some((u) => u.lane === lane && startHour < u.end && startHour + duration > u.start);
      if (overlaps) continue;
      used.push({ lane, start: startHour, end: startHour + duration });

      let title: string;
      let subtitle: string;
      if (kind === "appointments") {
        title = APPOINTMENT_SERVICES[Math.floor(rand() * APPOINTMENT_SERVICES.length)];
        subtitle = `Kund:in ${Math.floor(rand() * 20) + 1}`;
      } else if (kind === "tables") {
        const size = TABLE_SIZES[Math.floor(rand() * TABLE_SIZES.length)];
        title = `Tisch ${lane + 1}`;
        subtitle = `${size} Personen`;
      } else {
        title = ROOM_TYPES[Math.floor(rand() * ROOM_TYPES.length)];
        subtitle = "Belegt";
      }

      blocks.push({ day, start: startHour, durationHours: duration, title, subtitle, lane });
    }
  }

  return { days: DAYS, blocks, laneCount };
}
