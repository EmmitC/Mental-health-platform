"use client";

import { useState } from "react";
import { counselorClients, type CounselorClient } from "../data/counselorMock";
import type { Page } from "@/lib/nav";

interface CounselorClientsProps {
  navigate: (page: Page) => void;
}

export default function CounselorClients({ navigate: _navigate }: CounselorClientsProps) {
  const [selected, setSelected] = useState<CounselorClient | null>(null);
  const [search, setSearch] = useState("");

  const filtered = counselorClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    return (
      <div className="min-h-screen bg-cream pb-20 lg:pb-8">
        <div className="px-5 lg:px-8 py-6 border-b border-border flex items-center gap-4">
          <button
            onClick={() => setSelected(null)}
            className="text-slateM hover:text-slate transition-colors text-sm"
          >
            ← Clients
          </button>
        </div>

        <div className="max-w-2xl mx-auto px-5 lg:px-8 py-8">
          {/* Client header */}
          <div className="flex items-center gap-5 mb-8">
            <img
              src={selected.photo}
              alt={selected.name}
              className="w-16 h-16 rounded-[12px] object-cover object-top bg-sand"
            />
            <div>
              <h2 className="font-display text-2xl font-[400] text-slate">{selected.name}</h2>
              <p className="text-slateM text-sm">Age {selected.age} · {selected.preferredLanguage}</p>
            </div>
          </div>

          {/* Confidentiality notice */}
          <div className="bg-amberL border border-amber/20 rounded-xl p-4 mb-6">
            <p className="text-amber text-xs leading-relaxed">
              <strong>Confidential client record.</strong> This information is accessible to you only because of your ongoing therapeutic relationship. Do not share or export this data outside of this platform.
            </p>
          </div>

          <div className="space-y-5">
            {/* Session summary */}
            <div className="bg-cream border border-border rounded-[12px] p-5">
              <h3 className="font-[600] text-slate mb-4">Session history</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-display text-3xl font-[300] text-sage">{selected.totalSessions}</p>
                  <p className="text-slateM text-xs">Total sessions</p>
                </div>
                <div>
                  <p className="text-slate text-sm font-[500]">{selected.lastSession}</p>
                  <p className="text-slateM text-xs">Last session</p>
                </div>
                <div>
                  <p className="text-slate text-sm font-[500]">{selected.nextSession ?? "None scheduled"}</p>
                  <p className="text-slateM text-xs">Next session</p>
                </div>
              </div>
            </div>

            {/* Concerns */}
            <div className="bg-cream border border-border rounded-[12px] p-5">
              <h3 className="font-[600] text-slate mb-3">Presenting concerns</h3>
              <div className="flex flex-wrap gap-2">
                {selected.concerns.map((c) => (
                  <span key={c} className="bg-sageL text-sage text-sm font-[500] px-3 py-1.5 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Intake notes */}
            <div className="bg-cream border border-border rounded-[12px] p-5">
              <h3 className="font-[600] text-slate mb-3">Intake information</h3>
              <p className="text-slateM text-sm leading-relaxed">
                Client has been experiencing elevated stress and difficulty sleeping over the past three months. No prior counseling history. No medications reported. Emergency contact: provided on file.
              </p>
            </div>

            {/* Preferred details */}
            <div className="bg-cream border border-border rounded-[12px] p-5">
              <h3 className="font-[600] text-slate mb-3">Client details</h3>
              <dl className="space-y-2">
                {[
                  { label: "Preferred language", value: selected.preferredLanguage },
                  { label: "Session type preference", value: "Video" },
                  { label: "Timezone", value: "Africa/Kampala (EAT)" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <dt className="text-slateM text-sm">{label}</dt>
                    <dd className="font-[500] text-slate text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="px-5 lg:px-8 py-6 border-b border-border">
        <h1 className="font-display text-2xl md:text-3xl font-[400] text-slate mb-4">Clients</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clients..."
          className="w-full max-w-sm border border-border hover:border-borderDark focus:border-sage rounded-xl px-4 py-2.5 text-sm bg-cream outline-none transition-colors"
        />
      </div>

      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-6 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16">

            <p className="text-slateM text-sm">No clients found matching "{search}"</p>
          </div>
        ) : (
          filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className="w-full text-left bg-cream border border-border hover:border-sageMid rounded-[12px] p-5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-xl object-cover object-top bg-sand flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-[600] text-slate group-hover:text-sage transition-colors">{c.name}</p>
                  <p className="text-slateM text-sm">Age {c.age} · {c.preferredLanguage}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {c.concerns.map((con) => (
                      <span key={con} className="text-[10px] font-[500] bg-sageL text-sage px-2 py-0.5 rounded-full">
                        {con}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display text-2xl font-[300] text-sage">{c.totalSessions}</p>
                  <p className="text-slateL text-xs">sessions</p>
                  {c.nextSession && (
                    <p className="text-slateM text-xs mt-1 max-w-[100px] text-right">{c.nextSession}</p>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
