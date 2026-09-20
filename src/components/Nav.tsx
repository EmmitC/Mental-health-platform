"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Page } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";

interface NavProps {
  navigate: (page: Page) => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  currentPage?: Page;
}

export default function Nav({ navigate, isAuthenticated, onLogin, onLogout, currentPage }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("home")}
          className="font-display text-xl font-[500] text-slate tracking-tight"
        >
          Serene<span className="text-sage">Mind</span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "Counselors", page: "counselors" as Page },
            { label: "Resources", page: "resources" as Page },
            { label: "Pricing", page: "pricing" as Page },
            { label: "About", page: "about" as Page },
          ].map(({ label, page }) => (
            <button
              key={label}
              onClick={() => navigate(page)}
              aria-current={currentPage === page || (page === "counselors" && currentPage === "counselor-profile") ? "page" : undefined}
              className={`relative py-1 text-sm font-[500] transition-colors ${
                currentPage === page || (page === "counselors" && currentPage === "counselor-profile")
                  ? "text-slate"
                  : "text-slateM hover:text-slate"
              }`}
            >
              {(currentPage === page || (page === "counselors" && currentPage === "counselor-profile")) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-sage"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => navigate("crisis")}
            className="text-sm font-[500] text-crisis hover:text-crisisD flex items-center gap-1.5 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-crisis animate-pulse"></span>
            Need Help Now?
          </button>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("dashboard")}
                className="text-sm font-[500] text-slateM hover:text-slate px-4 py-2 rounded-lg hover:bg-sand transition-all"
              >
                Dashboard
              </button>
              <button
                onClick={onLogout}
                className="text-sm font-[500] text-slateM hover:text-slate px-4 py-2 rounded-lg hover:bg-sand transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="text-sm font-[500] text-slateM hover:text-slate px-4 py-2 rounded-lg hover:bg-sand transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("register")}
                className="text-sm font-[600] text-cream bg-sage hover:bg-sageD px-5 py-2 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-sand transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 bg-slate transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block h-0.5 bg-slate transition-all ${mobileOpen ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 bg-slate transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </div>

      <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden border-t border-border bg-cream px-5 py-4 space-y-1"
        >
          {[
            { label: "Home", page: "home" as Page },
            { label: "Find a Counselor", page: "counselors" as Page },
            { label: "Resources", page: "resources" as Page },
            { label: "About", page: "about" as Page },
            { label: "FAQs", page: "faq" as Page },
            { label: "Pricing", page: "pricing" as Page },
            { label: "Contact", page: "contact" as Page },
          ].map(({ label, page }) => (
            <button
              key={label}
              onClick={() => { navigate(page); setMobileOpen(false); }}
              className="block w-full text-left py-2.5 px-3 text-sm font-[500] text-slateM hover:text-slate hover:bg-sand rounded-lg transition-all"
            >
              {label}
            </button>
          ))}
          <ThemeToggle labelled />
          <button
            onClick={() => { navigate("crisis"); setMobileOpen(false); }}
            className="block w-full text-left py-2.5 px-3 text-sm font-[600] text-crisis hover:bg-crisisL rounded-lg transition-all"
          >
            Emergency Help
          </button>
          <div className="pt-3 border-t border-border space-y-2">
            {isAuthenticated ? (
              <>
                <button onClick={() => { navigate("dashboard"); setMobileOpen(false); }} className="block w-full text-center py-2.5 text-sm font-[500] text-slateM border border-border rounded-lg">Dashboard</button>
                <button onClick={() => { onLogout(); setMobileOpen(false); }} className="block w-full text-center py-2.5 text-sm font-[500] text-slateM border border-border rounded-lg">Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={() => { onLogin(); setMobileOpen(false); }} className="block w-full text-center py-2.5 text-sm font-[500] text-slateM border border-border rounded-lg">Sign In</button>
                <button onClick={() => { navigate("register"); setMobileOpen(false); }} className="block w-full text-center py-2.5 text-sm font-[600] text-cream bg-sage rounded-lg">Get Started</button>
              </>
            )}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
