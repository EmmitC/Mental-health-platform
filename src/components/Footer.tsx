"use client";

import type { Page } from "@/lib/nav";
import { toast } from "./Toast";

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-slate text-cream/80">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="font-display text-xl font-[400] text-cream mb-3">
              Serene<span className="text-sageMid">Mind</span>
            </p>
            <p className="text-sm leading-relaxed text-cream/60 max-w-[220px]">
              Professional mental health support, whenever you need it.
            </p>
            <button
              onClick={() => navigate("crisis")}
              className="mt-5 inline-flex items-center gap-2 bg-crisisL/10 border border-crisis/30 text-[#FF9C8F] px-4 py-2 rounded-lg text-sm font-[600] hover:bg-crisis/20 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-crisis animate-pulse"></span>
              Emergency Help
            </button>
          </div>

          <div>
            <p className="text-sm font-[600] text-cream mb-4 uppercase tracking-widest">Services</p>
            <ul className="space-y-2.5">
              {["Individual Counseling", "Couples Counseling", "Family Counseling", "Youth Counseling", "Stress Management", "Anxiety Support"].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => navigate("counselors")}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-[600] text-cream mb-4 uppercase tracking-widest">Company</p>
            <ul className="space-y-2.5">
              {[
                { label: "About us", page: "about" as Page },
                { label: "Counselors", page: "counselors" as Page },
                { label: "Resources", page: "resources" as Page },
                { label: "Pricing", page: "pricing" as Page },
                { label: "FAQs", page: "faq" as Page },
                { label: "Contact", page: "contact" as Page },
              ].map(({ label, page }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-[600] text-cream mb-4 uppercase tracking-widest">Legal</p>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Data Usage"].map((s) => (
                <li key={s}>
                  <button onClick={() => toast(`${s} page is coming soon`)} className="text-sm text-cream/60 hover:text-cream transition-colors">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/60">
            &copy; {new Date().getFullYear()} SereneMind. All rights reserved.
          </p>
          <p className="text-xs text-cream/60 text-center">
            This platform is not an emergency service. If you are in immediate danger, contact your local emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
}
