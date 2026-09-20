"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type ToastItem = { id: number; message: string };

const listeners = new Set<(t: ToastItem) => void>();
let nextId = 1;

/** Show a short confirmation message. Safe to call from anywhere. */
export function toast(message: string) {
  const item = { id: nextId++, message };
  listeners.forEach((l) => l(item));
}

export default function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const onToast = (t: ToastItem) => {
      setItems((prev) => [...prev.slice(-2), t]);
      window.setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), 3200);
    };
    listeners.add(onToast);
    return () => {
      listeners.delete(onToast);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4"
    >
      <AnimatePresence>
      {items.map((t) => (
        <motion.div
          key={t.id}
          layout
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-slate px-5 py-3 text-sm font-[500] text-cream shadow-[0_8px_30px_rgba(60,32,16,0.18)]"
        >
          <svg className="h-4 w-4 flex-shrink-0 text-sageMid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
          {t.message}
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
  );
}
