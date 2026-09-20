import type { Transition, Variants } from "motion/react";

/** Shared motion tokens (guide §4, §74, §96): one system, reused everywhere. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const durations = { fast: 0.2, normal: 0.4, medium: 0.6 } as const;

export const springs = {
  responsive: { type: "spring", stiffness: 260, damping: 24 } satisfies Transition,
  snappy: { type: "spring", stiffness: 500, damping: 30 } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.medium, ease } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
