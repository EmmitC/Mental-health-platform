"use client";

import { useTheme } from "@/lib/theme";
import Icon from "@/components/Icon";

/** Sun/moon switch. `labelled` adds a text label for use in menus and sidebars. */
export default function ThemeToggle({ labelled = false, onDark = false, tab = false, className = "" }: { labelled?: boolean; onDark?: boolean; tab?: boolean; className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  if (tab) {
    return (
      <button
        onClick={toggle}
        role="switch"
        aria-checked={dark}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className={`flex flex-col items-center gap-0.5 rounded-full px-1.5 py-1.5 ${onDark ? "text-cream/60" : "text-slateL"} ${className}`}
      >
        <Icon name={dark ? "sun" : "moon"} className="h-5 w-5" />
        <span className="text-[10px] font-[500]">{dark ? "Light" : "Dark"}</span>
      </button>
    );
  }
  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center gap-3 rounded-full text-sm font-[500] transition-colors ${
        onDark
          ? `${labelled ? "px-3 py-2.5 w-full" : "h-10 w-10 justify-center"} text-cream/70 hover:bg-cream/10 hover:text-cream`
          : labelled
            ? "px-3 py-2.5 w-full hover:bg-sand text-slateM"
            : "h-10 w-10 justify-center hover:bg-sand text-slateM hover:text-slate"
      } ${className}`}
    >
      <Icon name={dark ? "sun" : "moon"} className="h-5 w-5" />
      {labelled && <span>{dark ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}
