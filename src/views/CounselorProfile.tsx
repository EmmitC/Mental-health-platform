"use client";

import { useMemo, useState } from "react";
import { counselors } from "../data/mock";
import type { Page } from "@/lib/nav";
import Icon from "../components/Icon";
import { buildDays, calDays, fmtLong, fmtRange, leadingBlanks } from "../data/calendar";
import SegmentedTabs from "../components/SegmentedTabs";

interface CounselorProfileProps {
  navigate: (page: Page, params?: { counselorId?: string }) => void;
  counselorId: string | null;
}

const availTimes = ["09:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

const reviews = [
  { initials: "A.M.", rating: 5, text: "They created such a safe space from our very first session. I felt heard without judgment.", date: "August 2025" },
  { initials: "K.O.", rating: 5, text: "Compassionate, professional, and genuinely helpful. I have grown so much through our sessions.", date: "July 2025" },
  { initials: "R.T.", rating: 4, text: "Very thoughtful approach. She helped me see patterns I had not noticed before.", date: "June 2025" },
];

export default function CounselorProfile({ navigate, counselorId }: CounselorProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const days = useMemo(buildDays, []);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("About");

  const counselor = counselors.find((c) => c.id === counselorId) ?? counselors[0];

  const tabs = ["About", "Qualifications", "Approach", "Availability", "Reviews"];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-sand border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
          <button onClick={() => navigate("counselors")} className="flex items-center gap-2 text-sm text-slateM hover:text-slate mb-6 transition-colors">
            <span>←</span> Back to Counselors
          </button>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex gap-6">
              <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-[12px] overflow-hidden bg-sandDark flex-shrink-0">
                <img src={counselor.photo} alt={counselor.name} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-display text-3xl md:text-4xl font-[400] text-slate">{counselor.name}</h1>
                  <span className="text-xs bg-sageL text-sage font-[600] px-2.5 py-1 rounded-full">✓ Verified</span>
                </div>
                <p className="text-slateM mb-2">{counselor.credentials} · {counselor.title}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className={`text-sm ${i <= Math.round(counselor.rating) ? "text-amber-500" : "text-sandDark"}`}>★</span>
                  ))}
                  <span className="text-slateM text-sm ml-1">{counselor.rating} ({counselor.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-cream border border-border text-slateM px-3 py-1 rounded-full">{counselor.experience} yrs experience</span>
                  <span className="text-xs bg-cream border border-border text-slateM px-3 py-1 rounded-full">{counselor.location}</span>
                  {counselor.sessionTypes.map((s) => (
                    <span key={s} className="text-xs bg-cream border border-border text-slateM px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:ml-auto flex gap-3">
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-[500] transition-all ${saved ? "border-terra bg-terraL text-terra" : "border-border text-slateM hover:bg-sand"}`}
              >
                <Icon name="heart" className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />{saved ? "Saved" : "Save"}
              </button>
              <button
                onClick={() => navigate("booking", { counselorId: counselor.id })}
                className="bg-sage hover:bg-sageD text-cream font-[600] px-6 py-2.5 rounded-xl transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <SegmentedTabs label="Profile sections" className="mb-8" options={tabs} value={activeTab as (typeof tabs)[number]} onChange={setActiveTab} />

            {activeTab === "About" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-[400] text-slate mb-4">About</h2>
                  <p className="text-slateM leading-relaxed">{counselor.bio}</p>
                </div>
                <div>
                  <h3 className="font-[600] text-slate mb-3">Specializes in</h3>
                  <div className="flex flex-wrap gap-2">
                    {counselor.specializations.map((s) => (
                      <span key={s} className="bg-sageL text-sage text-sm font-[500] px-3 py-1.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-[600] text-slate mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {counselor.languages.map((l) => (
                      <span key={l} className="bg-sand text-slateM text-sm font-[500] px-3 py-1.5 rounded-full border border-border">{l}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-[600] text-slate mb-3">Pricing</h3>
                  <p className="text-slateM">From <strong className="text-slate">UGX {counselor.priceUGX.toLocaleString()}</strong> per session</p>
                </div>
              </div>
            )}

            {activeTab === "Qualifications" && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-[400] text-slate mb-6">Qualifications & Training</h2>
                {[
                  { degree: counselor.credentials, institution: "Makerere University", year: "2012" },
                  { degree: "Postgraduate Certificate in CBT", institution: "Uganda Institute of Allied Health", year: "2014" },
                  { degree: "Certified Trauma Practitioner", institution: "EMDR Institute", year: "2018" },
                ].map((q) => (
                  <div key={q.degree} className="flex gap-4 p-5 bg-sand border border-border rounded-xl">
                    <div className="w-10 h-10 bg-sageL rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sage text-sm font-[700]">✓</span>
                    </div>
                    <div>
                      <p className="font-[600] text-slate text-sm">{q.degree}</p>
                      <p className="text-slateM text-sm">{q.institution} · {q.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Approach" && (
              <div>
                <h2 className="font-display text-2xl font-[400] text-slate mb-6">Therapeutic Approach</h2>
                <p className="text-slateM leading-relaxed">{counselor.approach}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {["Cognitive Behavioural Therapy (CBT)", "Acceptance & Commitment Therapy (ACT)", "Mindfulness-Based Approaches", "Person-Centred Therapy"].map((m) => (
                    <div key={m} className="flex items-start gap-2 p-4 bg-sageL rounded-xl">
                      <Icon name="spark" className="mt-0.5 h-4 w-4 text-sage" />
                      <p className="text-sage text-sm font-[500]">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Availability" && (
              <div>
                <h2 className="font-display text-2xl font-[400] text-slate mb-6">Availability</h2>
                <div className="bg-sand rounded-[12px] border border-border p-6 mb-6">
                  <h3 className="font-[600] text-slate mb-5">{fmtRange(days)}</h3>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {calDays.map((d) => (
                      <p key={d} className="text-xs font-[600] text-slateM mb-1">{d}</p>
                    ))}
                    {Array.from({ length: leadingBlanks(days) }, (_, i) => <span key={`b${i}`} />)}
                    {days.map(({ date, unavailable }) => {
                      const isSelected = selectedDate?.getTime() === date.getTime();
                      return (
                        <button
                          key={date.getTime()}
                          onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                          disabled={unavailable}
                          aria-label={`${fmtLong(date)}${unavailable ? ", unavailable" : ""}`}
                          aria-pressed={isSelected}
                          className={`aspect-square rounded-lg text-sm font-[500] transition-all ${
                            isSelected ? "bg-sage text-cream" :
                            unavailable ? "text-slateXL line-through decoration-slateXL/50" :
                            "hover:bg-sageL hover:text-sageD text-slate"
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="font-[600] text-slate mb-3">Available times, {fmtLong(selectedDate)}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {availTimes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2.5 rounded-xl border text-sm font-[500] transition-all ${
                            selectedTime === t ? "border-sage bg-sageL text-sage" : "border-border hover:border-sageMid text-slateM"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {selectedTime && (
                      <button
                        onClick={() => navigate("booking", { counselorId: counselor.id })}
                        className="mt-4 w-full bg-sage hover:bg-sageD text-cream font-[600] py-3 rounded-xl transition-colors"
                      >
                        Book {selectedTime}, {fmtLong(selectedDate)}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "Reviews" && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-center">
                    <p className="font-display text-5xl font-[300] text-slate">{counselor.rating}</p>
                    <div className="flex gap-0.5 justify-center my-1">
                      {[1,2,3,4,5].map((i) => (
                        <span key={i} className="text-amber-500">★</span>
                      ))}
                    </div>
                    <p className="text-slateL text-xs">{counselor.reviewCount} reviews</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <div key={r.initials} className="bg-sand border border-border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-sageL flex items-center justify-center">
                            <span className="text-sage text-xs font-[600]">{r.initials}</span>
                          </div>
                          <span className="text-sm font-[500] text-slateM">Anonymous</span>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((i) => (
                            <span key={i} className={`text-xs ${i <= r.rating ? "text-amber-500" : "text-sandDark"}`}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-slateM text-sm leading-relaxed">{r.text}</p>
                      <p className="text-slateXL text-xs mt-2">{r.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 bg-cream border border-border rounded-[12px] p-6 space-y-4">
              <div className="text-center pb-4 border-b border-border">
                <p className="text-slateL text-sm mb-1">Starting from</p>
                <p className="font-display text-3xl font-[400] text-slate">UGX {counselor.priceUGX.toLocaleString()}</p>
                <p className="text-slateL text-xs">per session · 60 minutes</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slateM">
                  <span className="text-success">●</span>
                  <span>Next available: <strong>{counselor.nextAvailable}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slateM">
                  <span className="text-sageMid">✓</span>
                  <span>Verified credentials</span>
                </div>
                <div className="flex items-center gap-2 text-slateM">
                  <span className="text-sageMid">✓</span>
                  <span>Free cancellation (24h notice)</span>
                </div>
              </div>

              <button
                onClick={() => navigate("booking", { counselorId: counselor.id })}
                className="w-full bg-sage hover:bg-sageD text-cream font-[600] py-3.5 rounded-xl transition-colors"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`w-full border py-3 rounded-xl text-sm font-[500] transition-all ${saved ? "border-terra text-terra bg-terraL" : "border-border text-slateM hover:bg-sand"}`}
              >
                <span className="inline-flex items-center justify-center gap-2"><Icon name="heart" className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />{saved ? "Saved to profile" : "Save counselor"}</span>
              </button>

              <p className="text-xs text-center text-slateL">
                Free to cancel or reschedule up to 24 hours before your session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
