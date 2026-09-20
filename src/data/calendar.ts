export const calDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export interface CalDay {
  date: Date;
  unavailable: boolean;
}

/** The next 28 bookable days, starting tomorrow, built from the real calendar. */
export function buildDays(): CalDay[] {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return Array.from({ length: 28 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i + 1);
    // Demo availability: no Sundays, plus a few blocked days.
    return { date: d, unavailable: d.getDay() === 0 || d.getDate() % 7 === 4 };
  });
}

export const fmtLong = (d: Date) =>
  d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

export const fmtRange = (days: CalDay[]) =>
  `${days[0].date.toLocaleDateString("en-GB", { month: "long" })} to ${days[days.length - 1].date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`;

/** Blank cells needed so the first day lands in the right Monday-first column. */
export const leadingBlanks = (days: CalDay[]) => (days[0].date.getDay() + 6) % 7;
