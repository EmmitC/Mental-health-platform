"use client";

import { useState } from "react";
import { counselors, type Counselor } from "../data/mock";
import type { Page } from "@/lib/nav";
import Icon, { type IconName } from "../components/Icon";

interface CounselorsProps {
  navigate: (page: Page, params?: { counselorId?: string }) => void;
}

const specializations = ["Anxiety", "Depression", "Stress", "Relationships", "Grief", "Trauma", "Couples", "Family", "Youth", "Work", "Burnout", "Sleep"];
const languages = ["English", "Luganda", "Swahili", "Arabic", "Runyankore", "Luo"];
const sessionTypes = ["Video", "Audio", "In Person"];

export default function Counselors({ navigate }: CounselorsProps) {
  const [search, setSearch] = useState("");
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [sort, setSort] = useState("Recommended");
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleArr = <T,>(arr: T[], setArr: (v: T[]) => void, val: T) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const filtered = counselors.filter((c) => {
    const matchSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchSpecs = selectedSpecs.length === 0 || selectedSpecs.some((s) => c.specializations.includes(s));
    const matchLangs = selectedLangs.length === 0 || selectedLangs.some((l) => c.languages.includes(l));
    const matchSessions = selectedSessions.length === 0 || selectedSessions.some((s) => c.sessionTypes.includes(s as Counselor["sessionTypes"][0]));
    return matchSearch && matchSpecs && matchLangs && matchSessions;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Experience") return b.experience - a.experience;
    if (sort === "Price") return a.priceUGX - b.priceUGX;
    if (sort === "Rating") return b.rating - a.rating;
    return 0;
  });

  const activeFilters = selectedSpecs.length + selectedLangs.length + selectedSessions.length;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-sand border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
          <h1 className="font-display text-4xl md:text-5xl font-[400] text-slate mb-2">
            Find a <em>counselor</em>
          </h1>
          <p className="text-slateM text-lg">Browse qualified professionals and find a good fit for you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slateL" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or specialization..."
              className="w-full pl-11 pr-4 py-3 border border-border rounded-full bg-sand text-sm focus:border-sage outline-none transition-colors"
            />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm font-[500] transition-all ${
              activeFilters > 0 ? "border-sage bg-sageL text-sage" : "border-border text-slateM hover:bg-sand"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {activeFilters > 0 && <span className="bg-sage text-cream text-xs px-1.5 py-0.5 rounded-full">{activeFilters}</span>}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 border border-border rounded-xl text-sm bg-cream text-slateM focus:border-sage outline-none"
          >
            {["Recommended", "Rating", "Experience", "Price"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Filters Panel */}
        {filterOpen && (
          <div className="bg-sand border border-border rounded-[12px] p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FilterGroup label="Specialization" items={specializations} selected={selectedSpecs} onToggle={(v) => toggleArr(selectedSpecs, setSelectedSpecs, v)} />
            <FilterGroup label="Language" items={languages} selected={selectedLangs} onToggle={(v) => toggleArr(selectedLangs, setSelectedLangs, v)} />
            <FilterGroup label="Session Type" items={sessionTypes} selected={selectedSessions} onToggle={(v) => toggleArr(selectedSessions, setSelectedSessions, v)} />
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-slateL mb-6">
          {sorted.length} counselor{sorted.length !== 1 ? "s" : ""} available
        </p>

        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sand text-slateL"><Icon name="search" className="h-6 w-6" /></div>
            <h3 className="font-display text-xl font-[400] text-slate mb-2">No counselors found</h3>
            <p className="text-slateM text-sm mb-6">Try adjusting your search or filters.</p>
            <button onClick={() => { setSearch(""); setSelectedSpecs([]); setSelectedLangs([]); setSelectedSessions([]); }} className="text-sage font-[500] text-sm hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sorted.map((c) => (
              <CounselorCard key={c.id} counselor={c} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, items, selected, onToggle }: { label: string; items: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="text-xs font-[600] text-slateM uppercase tracking-widest mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onToggle(item)}
            className={`px-3 py-1.5 rounded-full text-xs font-[500] border transition-all ${
              selected.includes(item)
                ? "border-sage bg-sage text-cream"
                : "border-border bg-cream text-slateM hover:border-sageMid"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function CounselorCard({ counselor: c, navigate }: { counselor: Counselor; navigate: (page: Page, params?: { counselorId?: string }) => void }) {
  return (
    <div className="bg-cream border border-border hover:border-sageMid rounded-[12px] overflow-hidden transition-all group">
      <div className="flex gap-4 p-5">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-sand flex-shrink-0">
          <img src={c.photo} alt={c.name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-[400] text-slate leading-tight">{c.name}</h3>
              <p className="text-slateL text-xs mt-0.5">{c.credentials}</p>
            </div>
            {!c.available && (
              <span className="text-xs bg-amberL text-amber px-2 py-1 rounded-full font-[500] flex-shrink-0">Waitlist</span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2">
            {[1,2,3,4,5].map((i) => (
              <span key={i} className={`text-xs ${i <= Math.round(c.rating) ? "text-amber-500" : "text-sandDark"}`}>★</span>
            ))}
            <span className="text-slateL text-xs ml-1">{c.rating} ({c.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-2">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {c.specializations.slice(0, 3).map((s) => (
            <span key={s} className="bg-sageL text-sage text-xs font-[500] px-2 py-0.5 rounded-full">{s}</span>
          ))}
          {c.specializations.length > 3 && (
            <span className="bg-sand text-slateL text-xs px-2 py-0.5 rounded-full">+{c.specializations.length - 3}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-slateM mb-4">
          <div>
            <span className="text-slateXL block">Languages</span>
            {c.languages.join(" · ")}
          </div>
          <div>
            <span className="text-slateXL block">Session</span>
            {c.sessionTypes.join(" · ")}
          </div>
          <div>
            <span className="text-slateXL block">Experience</span>
            {c.experience} years
          </div>
          <div>
            <span className="text-slateXL block">From</span>
            <span className="font-[600]">UGX {c.priceUGX.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-xs text-slateL mb-4">
          <span className={`font-[500] ${c.available ? "text-success" : "text-amber"}`}>●</span>{" "}
          {c.available ? `Next available: ${c.nextAvailable}` : "Currently on waitlist"}
        </p>
      </div>

      <div className="flex gap-2 px-5 pb-5">
        <button
          onClick={() => navigate("counselor-profile", { counselorId: c.id })}
          className="flex-1 text-sm font-[500] text-sage border border-sageMid py-2.5 rounded-xl hover:bg-sageL transition-all"
        >
          View Profile
        </button>
        <button
          onClick={() => navigate("booking", { counselorId: c.id })}
          disabled={!c.available}
          className="flex-1 text-sm font-[600] text-cream bg-sage hover:bg-sageD py-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
