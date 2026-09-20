"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** SVG progress ring (guide §33). `value` is 0-100. */
export default function ProgressRing({
  value, size = 96, stroke = 9, track = "rgba(255,255,255,0.35)", color = "#FAF3E8", children,
}: {
  value: number; size?: number; stroke?: number; track?: string; color?: string; children?: ReactNode;
}) {
  const r = 50 - stroke / 2;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="-rotate-90" width={size} height={size} aria-hidden="true">
        <circle cx="50" cy="50" r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <motion.circle
          cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          pathLength={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: value / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
