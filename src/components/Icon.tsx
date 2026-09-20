"use client";

/**
 * One consistent line-icon family (24px grid, 1.75 stroke, round caps/joins).
 * Replaces emoji and text glyphs so icons match across the whole product.
 */
const paths: Record<string, string> = {
  search: "M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z",
  mail: "M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zm-1 1l9 6.5L21 7",
  heart: "M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z",
  check: "M5 13l4 4L19 7",
  x: "M6 6l12 12M18 6L6 18",
  mic: "M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3zm-6-3a6 6 0 0012 0m-6 6v3",
  camera: "M3 8a2 2 0 012-2h1.5l1.2-2h6.6l1.2 2H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm9 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7z",
  screen: "M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm5 15h6m-3-3v3",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zm-8 8a8 8 0 0116 0",
  card: "M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 3h18M7 15h3",
  article: "M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm6 0v6h6M9 13h6M9 17h6",
  guide: "M5 4.5A1.5 1.5 0 016.5 3H19v15H6.5A1.5 1.5 0 005 19.5v-15zM5 19.5A1.5 1.5 0 006.5 21H19v-3",
  exercise: "M12 21c-4-2-7-5-7-9a7 7 0 0114 0c0 4-3 7-7 9zm0-13v8m-3-4h6",
  audio: "M4 14v-2a8 8 0 0116 0v2M4 14a2 2 0 012-2h1v6H6a2 2 0 01-2-2zm16 0a2 2 0 00-2-2h-1v6h1a2 2 0 002-2z",
  video: "M4 6h10a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm14 4l4-2v8l-4-2",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
  edit: "M4 20h4L19 9l-4-4L4 16v4zm9-13l4 4",
  chevL: "M15 6l-6 6 6 6",
  chevR: "M9 6l6 6-6 6",
  calendar: "M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zm-1 5h16M8 3v4m8-4v4",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  sun: "M12 16a4 4 0 100-8 4 4 0 000 8zm0-13v2m0 14v2M3 12h2m14 0h2M5.6 5.6L7 7m10 10l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4",
  moon: "M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z",
  eyeOff: "M3 3l18 18M10.6 6.1A9.7 9.7 0 0112 6c6.5 0 10 6 10 6a17 17 0 01-3.2 3.9M6.6 7.6A16.6 16.6 0 002 12s3.5 6 10 6c1.6 0 3-.4 4.3-1M9.9 9.9a3 3 0 004.2 4.2",
};

export type IconName = keyof typeof paths;

export default function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-shrink-0 ${className}`}
    >
      <path d={paths[name]} />
    </svg>
  );
}

/** Kit mood colours: very low (lilac), low (orange), okay (taupe), good (yellow), great (green). */
export const moodColors = ["#B9A6E8", "#F58A52", "#C9B8A4", "#FFCF5C", "#9ABB5C"];

/**
 * Mood faces 0 (very low) … 4 (great) as line SVGs. With `filled` the face
 * takes the kit's mood colour with dark features (same in light and dark).
 */
export function MoodFace({ level, className = "h-8 w-8", filled = false }: { level: number; className?: string; filled?: boolean }) {
  const i = Math.max(0, Math.min(4, level));
  const mouths = [
    "M8.5 16.5c1-1.2 2.2-1.8 3.5-1.8s2.5.6 3.5 1.8",
    "M9 16c.9-.7 1.9-1 3-1s2.1.3 3 1",
    "M9 15.5h6",
    "M9 14.5c.9.8 1.9 1.2 3 1.2s2.1-.4 3-1.2",
    "M8 14c1 2 2.4 3 4 3s3-1 4-3z",
  ];
  const ink = filled ? "#3C2010" : "currentColor";
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9.5" fill={filled ? moodColors[i] : "none"} />
      <path d="M9 9.5v.01M15 9.5v.01" strokeWidth={2.4} />
      <path d={mouths[i]} />
    </svg>
  );
}
