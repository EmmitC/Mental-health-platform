"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

const KEY = "serenemind-theme";

/**
 * Inline in <head> (see app/layout.tsx) so the right theme paints on first
 * frame. Uses the saved choice, else the OS preference.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})()`;

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // Sync React state with what the init script already applied.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
    const id = window.setTimeout(() => document.documentElement.classList.add("theme-ready"), 100);

    // Follow the OS if the user has not chosen explicitly.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(KEY)) return;
      } catch {}
      const next: Theme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(id);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
