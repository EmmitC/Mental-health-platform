"use client";

import { useState } from "react";
import { todaySchedule, pendingRequests } from "../data/counselorMock";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";

interface CounselorAppointmentsProps {
  navigate: (page: Page) => void;
}

type TabKey = "Upcoming" | "Pending" | "Past";

const upcomingAppointments = [
  ...todaySchedule.filter((s) => s.status === "Upcoming"),
  {
    id: "ua1",
    clientName: "Amira Osman",
    clientPhoto: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face&auto=format",
    service: "Stress Management",
    time: "Thu, 22 Aug — 3:00 PM",
    duration: "50 min",
    sessionType: "Audio" as const,
    status: "Upcoming" as const,
  },
  {
    id: "ua2",
    clientName: "James Mutesasira",
    clientPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format",
    service: "Individual Counseling",
    time: "Thu, 22 Aug — 4:30 PM",
    duration: "50 min",
    sessionType: "Video" as const,
    status: "Upcoming" as const,
  },
];

const pastAppointments = [
  {
    id: "p1",
    clientName: "Robert Ssali",
    clientPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format",
    service: "Grief Support",
    time: "Mon, 18 Aug — 11:00 AM",
    duration: "50 min",
    sessionType: "Video" as const,
    status: "Completed" as const,
  },
  {
    id: "p2",
    clientName: "Sarah Namukasa",
    clientPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&auto=format",
    service: "Individual Counseling",
    time: "Today, 10:00 AM",
    duration: "50 min",
    sessionType: "Video" as const,
    status: "Completed" as const,
  },
];

const statusBadge: Record<string, string> = {
  Upcoming: "bg-sageL text-sage",
  Completed: "bg-successL text-success",
  Cancelled: "bg-sand text-slateL",
  Pending: "bg-amberL text-amber",
};

export default function CounselorAppointments({ navigate }: CounselorAppointmentsProps) {
  const [tab, setTab] = useState<TabKey>("Upcoming");
  const [reqs, setReqs] = useState(pendingRequests);

  const counts: Record<TabKey, number> = {
    Upcoming: upcomingAppointments.length,
    Pending: reqs.length,
    Past: pastAppointments.length,
  };

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="px-5 lg:px-8 py-6 border-b border-border">
        <h1 className="font-display text-2xl md:text-3xl font-[400] text-slate">Appointments</h1>
      </div>

      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-6">
          {(["Upcoming", "Pending", "Past"] as TabKey[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-[500] border-b-2 -mb-px transition-all flex items-center gap-2 ${
                tab === t ? "border-sage text-sage" : "border-transparent text-slateM hover:text-slate"
              }`}
            >
              {t}
              {counts[t] > 0 && (
                <span className={`text-[10px] font-[700] px-1.5 py-0.5 rounded-full ${t === "Pending" ? "bg-terra text-cream" : "bg-sand text-slateM"}`}>
                  {counts[t]}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "Upcoming" && (
          <div className="space-y-3">
            {upcomingAppointments.map((a) => (
              <div key={a.id} className="bg-cream border border-border rounded-2xl p-5">
                <div className="flex items-center gap-4">
                  <img src={a.clientPhoto} alt={a.clientName} className="w-12 h-12 rounded-xl object-cover object-top bg-sand flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-[600] text-slate">{a.clientName}</p>
                        <p className="text-slateM text-sm">{a.service}</p>
                      </div>
                      <span className={`text-xs font-[500] px-2.5 py-1 rounded-full flex-shrink-0 ${statusBadge[a.status]}`}>
                        {a.status}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slateL">
                      <span>{a.time}</span>
                      <span>·</span>
                      <span>{a.duration}</span>
                      <span>·</span>
                      <span>{a.sessionType}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate("session-lobby")}
                    className="flex-1 bg-sage hover:bg-sageD text-cream font-[600] py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Join session
                  </button>
                  <button onClick={() => toast("Reschedule request started")} className="px-4 border border-border hover:border-borderDark text-slateM font-[500] py-2.5 rounded-lg text-sm transition-all">
                    Reschedule</button>
                  <button onClick={() => toast("Appointment cancellation requested")} className="px-4 border border-border hover:border-crisis text-slateM hover:text-crisis font-[500] py-2.5 rounded-lg text-sm transition-all">
                    Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Pending" && (
          <div className="space-y-3">
            {reqs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">✓</p>
                <h3 className="font-display text-xl font-[400] text-slate mb-2">All requests handled</h3>
                <p className="text-slateM text-sm">No pending appointment requests.</p>
              </div>
            ) : (
              reqs.map((r) => (
                <div key={r.id} className="bg-cream border border-amber/30 bg-amberL/20 rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <img src={r.clientPhoto} alt={r.clientName} className="w-12 h-12 rounded-xl object-cover object-top bg-sand flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-[600] text-slate">{r.clientName}</p>
                      <p className="text-slateM text-sm">{r.service}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-slateL mt-1">
                        <span>{r.requestedDate}, {r.requestedTime}</span>
                        <span>·</span>
                        <span>{r.sessionType}</span>
                      </div>
                      {r.note && (
                        <p className="mt-2 text-slateM text-sm italic line-clamp-2">"{r.note}"</p>
                      )}
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => setReqs((p) => p.filter((x) => x.id !== r.id))}
                          className="flex-1 bg-sage hover:bg-sageD text-cream font-[600] py-2 rounded-lg text-sm transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => setReqs((p) => p.filter((x) => x.id !== r.id))}
                          className="flex-1 border border-border text-slateM font-[500] py-2 rounded-lg text-sm hover:bg-sand transition-all"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "Past" && (
          <div className="space-y-3">
            {pastAppointments.map((a) => (
              <div key={a.id} className="bg-cream border border-border rounded-2xl p-5">
                <div className="flex items-center gap-4">
                  <img src={a.clientPhoto} alt={a.clientName} className="w-12 h-12 rounded-xl object-cover object-top bg-sand flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-[600] text-slate">{a.clientName}</p>
                        <p className="text-slateM text-sm">{a.service}</p>
                      </div>
                      <span className={`text-xs font-[500] px-2.5 py-1 rounded-full flex-shrink-0 ${statusBadge[a.status]}`}>
                        {a.status}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-slateL">
                      <span>{a.time}</span>
                      <span>·</span>
                      <span>{a.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => navigate("counselor-notes")}
                    className="text-sm font-[500] text-sage hover:underline"
                  >
                    View session notes →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
