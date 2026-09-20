"use client";

import type { Page } from "@/lib/nav";
import Icon from "../components/Icon";

interface CrisisProps {
  navigate: (page: Page) => void;
}

const hotlines = [
  { name: "Uganda Police Emergency", number: "999 / 112", type: "Emergency", available: "24/7" },
  { name: "Mulago National Referral Hospital", number: "+256 414 554 001", type: "Hospital", available: "24/7" },
  { name: "Mental Health Uganda", number: "+256 800 212 121", type: "Crisis Line", available: "24/7" },
  { name: "MIFUMI (Domestic Violence)", number: "+256 392 177 002", type: "Support Line", available: "Mon–Fri 8am–6pm" },
  { name: "Child Helpline Uganda", number: "116", type: "Child Protection", available: "24/7" },
  { name: "Butabika Hospital", number: "+256 414 505 855", type: "Psychiatric Care", available: "24/7" },
];

export default function Crisis({ navigate }: CrisisProps) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Emergency Banner */}
      <div className="bg-crisis px-5 py-4">
        <p className="text-center text-cream text-sm font-[600]">
          If you are in immediate physical danger, call your local emergency services (999 or 112) right now. This page is not an emergency service.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-16">
        <div className="text-center mb-14">
          <div className="w-16 h-16 bg-crisisL text-crisis rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="phone" className="h-7 w-7" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-[400] text-slate mb-4">
            Are you safe right now?
          </h1>
          <p className="text-slateM text-lg leading-relaxed max-w-xl mx-auto">
            If you are experiencing a crisis or have thoughts of harming yourself or others, please reach out to a crisis service immediately.
          </p>
        </div>

        {/* Immediate danger CTA */}
        <div className="bg-crisis/5 border-2 border-crisis/30 rounded-[12px] p-8 text-center mb-10">
          <h2 className="font-[700] text-slate text-xl mb-3">In immediate danger?</h2>
          <p className="text-slateM mb-6 leading-relaxed">
            Call <strong>999</strong> or <strong>112</strong> immediately, or go to your nearest emergency facility.
          </p>
          <a
            href="tel:999"
            className="inline-flex items-center gap-2.5 bg-crisis hover:bg-crisisD text-cream font-[700] text-lg px-10 py-4 rounded-xl transition-colors"
          >
            <Icon name="phone" className="h-5 w-5" />
            Call 999: Emergency
          </a>
          <p className="text-slateL text-xs mt-4">You can also tap the number to call on mobile</p>
        </div>

        {/* Safe button */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate("home")}
            className="text-slateM font-[500] border border-border px-6 py-3 rounded-xl hover:bg-sand transition-all"
          >
            I am safe, return to SereneMind
          </button>
        </div>

        {/* Crisis Resources */}
        <div>
          <h2 className="font-display text-2xl font-[400] text-slate mb-2">Crisis & Support Resources</h2>
          <p className="text-slateM text-sm mb-8">
            These resources are provided for information only. Availability may change; please verify before relying on them.
          </p>

          <div className="space-y-3">
            {hotlines.map(({ name, number, type, available }) => (
              <div
                key={name}
                className="bg-cream border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-[600] text-terra bg-terraL px-2 py-0.5 rounded-full">{type}</span>
                    <span className="text-xs text-slateL">{available}</span>
                  </div>
                  <p className="font-[600] text-slate text-sm">{name}</p>
                </div>
                <a
                  href={`tel:${number.replace(/[^0-9+]/g, "")}`}
                  className="flex flex-shrink-0 items-center gap-2 rounded-full border border-sageMid px-4 py-2.5 font-[700] text-sageD hover:bg-sageL text-sm transition-colors"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-amberL border border-amber/30 rounded-xl p-6">
          <p className="text-sm text-slateM leading-relaxed">
            <strong>Important:</strong> SereneMind is a counseling and wellness platform, not an emergency service. We cannot guarantee response times or 24/7 crisis support. If you are in immediate danger, always contact your local emergency services first.
          </p>
        </div>

        {/* After the crisis */}
        <div className="mt-10 text-center">
          <p className="text-slateM text-sm mb-4">When you are ready, professional counseling support is available.</p>
          <button
            onClick={() => navigate("counselors")}
            className="bg-sage hover:bg-sageD text-cream font-[600] px-6 py-3 rounded-xl transition-colors"
          >
            Find a Counselor
          </button>
        </div>
      </div>
    </div>
  );
}
