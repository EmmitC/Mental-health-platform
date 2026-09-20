"use client";

import { animate, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts up to `value` once visible. Writes to the DOM directly, no per-frame React renders. */
export default function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const unsub = mv.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(Math.round(v));
    });
    const controls = animate(mv, value, { duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] });
    return () => {
      unsub();
      controls.stop();
    };
  }, [inView, value, mv, reduce]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
