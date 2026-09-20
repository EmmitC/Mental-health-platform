"use client";

import { useState } from "react";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";

interface CounselorCalendarProps {
  navigate: (page: Page) => void;
}

const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DATES = [18, 19, 20, 21, 22]; // Aug 2026 Mon-Fri

type BlockType = "session" | "available" | "break" | "blocked";

interface CalBlock {
  day: number;
  hour: number;
  type: BlockType;
  label?: string;
  client?: string;
}

const initialBlocks: CalBlock[] = [
  { day: 0, hour: 0, type: "session", label: "Sarah N.", client: "Individual Counseling" },
  { day: 0, hour: 2, type: "session", label: "Daniel K.", client: "Follow-up" },
  { day: 0, hour: 3, type: "break", label: "Lunch" },
  { day: 0, hour: 5, type: "session", label: "Grace A.", client: "Individual Counseling" },
  { day: 1, hour: 1, type: "available" },
  { day: 1, hour: 2, type: "available" },
  { day: 1, hour: 3, type: "break", label: "Lunch" },
  { day: 1, hour: 5, type: "available" },
  { day: 2, hour: 0, type: "session", label: "Robert S.", client: "Grief Support" },
  { day: 2, hour: 3, type: "break", label: "Lunch" },
  { day: 2, hour: 6, type: "available" },
  { day: 3, hour: 0, type: "available" },
  { day: 3, hour: 1, type: "session", label: "Amira O.", client: "Stress" },
  { day: 3, hour: 3, type: "break", label: "Lunch" },
  { day: 3, hour: 5, type: "blocked", label: "Personal" },
  { day: 4, hour: 0, type: "available" },
  { day: 4, hour: 1, type: "available" },
  { day: 4, hour: 3, type: "break", label: "Lunch" },
  { day: 4, hour: 6, type: "available" },
  { day: 4, hour: 7, type: "available" },
];

const blockStyles: Record<BlockType, string> = {
  session: "bg-sageL border-l-2 border-sage text-sage",
  available: "bg-sand border border-dashed border-border text-slateL hover:border-sageMid hover:bg-sageL/50 cursor-pointer",
  break: "bg-sandDark/40 text-slateL",
  blocked: "bg-sand border border-borderDark text-slateL",
};

const availabilityDays = [
  { day: "Monday", from: "09:00", to: "17:00", enabled: true },
  { day: "Tuesday", from: "09:00", to: "17:00", enabled: true },
  { day: "Wednesday", from: "09:00", to: "17:00", enabled: true },
  { day: "Thursday", from: "09:00", to: "17:00", enabled: true },
  { day: "Friday", from: "09:00", to: "15:00", enabled: true },
  { day: "Saturday", from: "09:00", to: "12:00", enabled: false },
  { day: "Sunday", from: "09:00", to: "17:00", enabled: false },
];

export default function CounselorCalendar({ navigate: _navigate }: CounselorCalendarProps) {
  const [view, setView] = useState<"week" | "availability">("week");

  const getBlock = (day: number, hourIndex: number) =>
    initialBlocks.find((b) => b.day === day && b.hour === hourIndex);

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      {/* Header */}
      <div className="px-5 lg:px-8 py-6 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-[400] text-slate">Calendar</h1>
          <p className="text-slateM text-sm mt-0.5">Week of 18 August 2026</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("week")}
            className={`px-4 py-2 rounded-lg text-sm font-[500] transition-all ${view === "week" ? "bg-sage text-cream" : "border border-border text-slateM hover:bg-sand"}`}
          >
            Week view
          </button>
          <button
            onClick={() => setView("availability")}
            className={`px-4 py-2 rounded-lg text-sm font-[500] transition-all ${view === "availability" ? "bg-sage text-cream" : "border border-border text-slateM hover:bg-sand"}`}
          >
            Availability
          </button>
        </div>
      </div>

      {view === "week" ? (
        <div className="px-5 lg:px-8 py-6 overflow-x-auto">
          {/* Legend */}
          <div className="flex gap-4 mb-6 text-xs">
            {[
              { type: "session", label: "Session" },
              { type: "available", label: "Available" },
              { type: "break", label: "Break" },
              { type: "blocked", label: "Blocked" },
            ].map(({ type, label }) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${type === "session" ? "bg-sageL border-l-2 border-sage" : type === "available" ? "bg-sand border border-border" : type === "break" ? "bg-sandDark/40" : "bg-sand border border-borderDark"}`} />
                <span className="text-slateM">{label}</span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="min-w-[640px]">
            {/* Day header */}
            <div className="grid grid-cols-[4rem_repeat(5,1fr)] gap-px mb-1">
              <div />
              {DAYS.map((d, i) => (
                <div key={d} className={`text-center py-2 rounded-lg ${DATES[i] === 20 ? "bg-sage text-cream" : ""}`}>
                  <p className={`text-xs font-[600] ${DATES[i] === 20 ? "text-cream" : "text-slateL"}`}>{d}</p>
                  <p className={`font-display text-xl font-[300] ${DATES[i] === 20 ? "text-cream" : "text-slate"}`}>{DATES[i]}</p>
                </div>
              ))}
            </div>

            {/* Hour rows */}
            <div className="space-y-0.5">
              {HOURS.map((h, hi) => (
                <div key={h} className="grid grid-cols-[4rem_repeat(5,1fr)] gap-px">
                  <div className="text-right pr-3 pt-1.5">
                    <span className="text-xs text-slateXL">{h}</span>
                  </div>
                  {DAYS.map((_, di) => {
                    const block = getBlock(di, hi);
                    if (!block) {
                      return <div key={di} className="h-12 rounded-sm bg-cream/50 border border-border/30" />;
                    }
                    return (
                      <div
                        key={di}
                        className={`h-12 rounded-lg px-2 py-1.5 text-xs ${blockStyles[block.type]}`}
                      >
                        {block.label && <p className="font-[600] truncate">{block.label}</p>}
                        {block.client && <p className="truncate opacity-70">{block.client}</p>}
                        {block.type === "available" && <p className="text-center pt-1">+</p>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-5 lg:px-8 py-8">
          <div className="mb-6">
            <h2 className="font-[600] text-slate mb-1">Weekly availability</h2>
            <p className="text-slateM text-sm">Set the hours you are available for bookings each week. These repeat automatically.</p>
          </div>

          <div className="space-y-3">
            {availabilityDays.map(({ day, from, to, enabled }) => (
              <div key={day} className={`flex items-center gap-4 p-4 border rounded-xl transition-all ${enabled ? "bg-cream border-border" : "bg-sand/50 border-border"}`}>
                <div className="w-24 flex-shrink-0">
                  <p className={`font-[500] text-sm ${enabled ? "text-slate" : "text-slateL"}`}>{day}</p>
                </div>
                {enabled ? (
                  <div className="flex items-center gap-2 flex-1">
                    <select defaultValue={from} className="border border-border rounded-lg px-3 py-2 text-sm bg-cream text-slate outline-none">
                      {["08:00","09:00","10:00","11:00","12:00"].map((h) => <option key={h}>{h}</option>)}
                    </select>
                    <span className="text-slateL text-sm">to</span>
                    <select defaultValue={to} className="border border-border rounded-lg px-3 py-2 text-sm bg-cream text-slate outline-none">
                      {["13:00","14:00","15:00","16:00","17:00","18:00"].map((h) => <option key={h}>{h}</option>)}
                    </select>
                  </div>
                ) : (
                  <p className="text-slateL text-sm flex-1">Unavailable</p>
                )}
                <div className={`w-10 h-6 rounded-full relative flex-shrink-0 cursor-pointer ${enabled ? "bg-sage" : "bg-sandDark"}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-cream rounded-full shadow transition-all ${enabled ? "left-5" : "left-1"}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-sand border border-border rounded-[12px]">
            <h3 className="font-[600] text-slate mb-2">Lunch break</h3>
            <p className="text-slateM text-sm mb-3">Automatically block a time each day for a break.</p>
            <div className="flex items-center gap-2">
              <select defaultValue="12:00" className="border border-border rounded-lg px-3 py-2 text-sm bg-cream outline-none">
                {["11:00","11:30","12:00","12:30","13:00"].map((h) => <option key={h}>{h}</option>)}
              </select>
              <span className="text-slateL text-sm">to</span>
              <select defaultValue="13:00" className="border border-border rounded-lg px-3 py-2 text-sm bg-cream outline-none">
                {["12:00","12:30","13:00","13:30","14:00"].map((h) => <option key={h}>{h}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button onClick={() => toast("Availability saved")} className="bg-sage hover:bg-sageD text-cream font-[600] px-6 py-3 rounded-xl text-sm transition-colors">
              Save availability</button>
          </div>
        </div>
      )}
    </div>
  );
}
