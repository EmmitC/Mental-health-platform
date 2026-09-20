"use client";

import { motion } from "motion/react";
import { useId } from "react";

/**
 * Kit-style pill segmented control: a rounded track with one filled segment
 * that slides between options (shared layoutId). Replaces underline tabs.
 */
export default function SegmentedTabs<T extends string>({
  options, value, onChange, counts, label, className = "",
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  counts?: Partial<Record<T, number>>;
  label: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-sand p-1 ${className}`}
    >
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o)}
            className={`relative flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-[600] transition-colors ${
              active ? "text-cream" : "text-slateM hover:text-slate"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                className="absolute inset-0 rounded-full bg-slate"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{o}</span>
            {counts?.[o] ? (
              <span className={`relative rounded-full px-1.5 text-xs ${active ? "bg-cream/20" : "bg-border"}`}>{counts[o]}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
