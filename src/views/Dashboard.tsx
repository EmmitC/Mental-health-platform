"use client";

import { useState } from "react";
import { appointments, resources, wellnessGoals, moodHistory } from "../data/mock";
import type { Page } from "@/lib/nav";
import Icon, { MoodFace } from "../components/Icon";
import ProgressRing from "../components/animation/ProgressRing";
import Counter from "../components/animation/Counter";
import { toast } from "../components/Toast";

interface DashboardProps {
  navigate: (page: Page, params?: { counselorId?: string }) => void;
}

const moodLabels = ["Very low", "Low", "Okay", "Good", "Great"];

export default function Dashboard({ navigate }: DashboardProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const upcoming = appointments.filter((a) => a.status === "Confirmed")[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-slateL text-sm mb-1">{greeting}</p>
          <h1 className="font-display text-3xl md:text-4xl font-[400] text-slate">Sarah</h1>
        </div>

        {/* Check-in card */}
        {!checkedIn ? (
          <div className="light-scope bg-ember rounded-[12px] p-6 mb-6">
            <h2 className="font-display text-2xl font-[700] text-slate mb-1">How are you feeling today?</h2>
            <p className="text-slate text-sm mb-5">A quick check-in helps you track your wellbeing over time.</p>
            <div className="flex gap-3 mb-5">
              {moodLabels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMood(i)}
                  aria-label={label}
                  aria-pressed={selectedMood === i}
                  className={`p-2 rounded-xl transition-all ${
                    selectedMood === i ? "bg-cream/70 scale-110" : "text-slate/70 hover:bg-cream/40 hover:text-slate"
                  }`}
                >
                  <MoodFace level={i} className="h-9 w-9" filled={selectedMood === i} />
                </button>
              ))}
            </div>
            {selectedMood !== null && (
              <button
                onClick={() => setCheckedIn(true)}
                className="bg-slate hover:bg-slateM text-cream font-[600] px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Log Check-in
              </button>
            )}
          </div>
        ) : (
          <div className="bg-sageL border border-sageMid rounded-[12px] p-5 mb-6 flex items-center gap-3">
            <Icon name="check" className="h-6 w-6 text-sage" />
            <div>
              <p className="font-[600] text-sage text-sm">Check-in logged</p>
              <p className="text-sage/70 text-xs">Great job taking a moment for yourself today.</p>
            </div>
          </div>
        )}

        {/* Metrics: kit-style colour-blocked cards */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="light-scope flex flex-col justify-between rounded-[12px] bg-sage p-5 text-cream">
            <p className="text-sm font-[600]">Wellbeing score</p>
            <div className="my-4">
              <ProgressRing value={80} size={88} stroke={9}>
                <span className="font-display text-2xl font-[700]"><Counter value={80} /></span>
              </ProgressRing>
            </div>
            <p className="text-xs font-[500] opacity-90">Healthy, up 8 this month</p>
          </div>
          <div className="light-scope flex flex-col justify-between rounded-[12px] bg-slate p-5 text-cream">
            <p className="text-sm font-[600]">Check-in streak</p>
            <p className="my-4 font-display text-5xl font-[700] leading-none"><Counter value={7} /></p>
            <p className="text-xs font-[500] opacity-80">days in a row. Keep it up.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Upcoming Appointment */}
          <div className="lg:col-span-2">
            <div className="bg-cream border border-border rounded-[12px] p-6 mb-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[600] text-slate">Upcoming Appointment</h2>
                <button onClick={() => navigate("appointments")} className="text-sage text-xs font-[500] hover:underline">View all</button>
              </div>
              {upcoming ? (
                <div className="flex gap-4">
                  <img src={upcoming.counselor.photo} alt={upcoming.counselor.name} className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0 bg-sand" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="font-[600] text-slate">{upcoming.counselor.name}</p>
                        <p className="text-slateL text-xs">{upcoming.service}</p>
                      </div>
                      <span className="bg-sageL text-sage text-xs font-[600] px-2 py-0.5 rounded-full">{upcoming.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-slateM">
                      <span>{upcoming.date}</span>
                      <span>·</span>
                      <span>{upcoming.time}</span>
                      <span>·</span>
                      <span>{upcoming.sessionType}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => navigate("appointments")}
                        className="flex-1 text-sm font-[600] text-cream bg-sage hover:bg-sageD py-2 rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                      <button onClick={() => toast("Reschedule request started")} className="px-3 py-2 border border-border rounded-lg text-xs text-slateM hover:bg-sand transition-all">
                        Reschedule</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="font-[500] text-slate text-sm mb-1">No upcoming appointments</p>
                  <p className="text-slateM text-xs mb-4">Ready to connect with a counselor?</p>
                  <button onClick={() => navigate("counselors")} className="bg-sage text-cream font-[600] px-5 py-2.5 rounded-xl text-sm hover:bg-sageD transition-colors">
                    Find a Counselor
                  </button>
                </div>
              )}
            </div>

            {/* Mood Chart */}
            <div className="light-scope bg-sun rounded-[12px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[700] text-slate">Your Week</h2>
                <button onClick={() => navigate("wellness")} className="text-slate text-xs font-[600] underline">View wellness</button>
              </div>
              <div className="flex gap-2 h-28" role="img" aria-label={`Mood this week, scored 1 to 5: ${moodHistory.map((m) => `${m.day} ${m.score}`).join(", ")}`}>
                <div className="flex flex-col justify-between pb-5 text-[10px] text-slateM tabular-nums" aria-hidden="true">
                  <span>5</span><span>3</span><span>1</span>
                </div>
                {moodHistory.map(({ day, score }) => (
                  <div key={day} className="flex-1 h-full flex flex-col items-center gap-1">
                    <div className="flex-1 w-full flex items-end">
                      <div
                        className="w-full rounded-t-md bg-slate/85 transition-all"
                        style={{ height: `${(score / 5) * 100}%` }}
                        title={`${day}: ${score} of 5`}
                      ></div>
                    </div>
                    <span className="text-[10px] text-slateM">{day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-6 border-t border-slate/25 pt-4">
                <div>
                  <p className="font-display text-xl font-[300] text-slate">3</p>
                  <p className="text-xs text-slate/80">Check-ins this week</p>
                </div>
                <div>
                  <p className="font-display text-xl font-[300] text-slate">7</p>
                  <p className="text-xs text-slate/80">Day streak</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Wellness Goals */}
            <div className="bg-cream border border-border rounded-[12px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[600] text-slate">My Goals</h2>
                <button onClick={() => navigate("wellness")} className="text-sage text-xs font-[500] hover:underline">Manage</button>
              </div>
              <div className="space-y-4">
                {wellnessGoals.map(({ id, title, progress, streak }) => (
                  <div key={id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-[500] text-slate">{title}</p>
                      <span className="text-xs text-slateL">{progress}%</span>
                    </div>
                    <div className="h-2 bg-sand rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sage rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slateL mt-1">{streak}-day streak</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Resource */}
            <div className="bg-cream border border-border rounded-[12px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[600] text-slate">For You</h2>
                <button onClick={() => navigate("resources")} className="text-sage text-xs font-[500] hover:underline">All resources</button>
              </div>
              {resources.slice(0, 2).map((r) => (
                <button
                  key={r.id}
                  onClick={() => navigate("resources")}
                  className="block w-full text-left p-3 rounded-xl hover:bg-sand transition-all mb-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-sandDark flex-shrink-0">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-[500] text-slate leading-tight">{r.title}</p>
                      <p className="text-xs text-slateL mt-0.5">{r.readTime}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
