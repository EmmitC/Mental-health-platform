"use client";

import { useState } from "react";
import {
  counselorStats,
  pendingRequests,
  todaySchedule,
  sessionNotes,
  type PendingRequest,
} from "../data/counselorMock";
import type { Page } from "@/lib/nav";

interface CounselorDashboardProps {
  navigate: (page: Page) => void;
}

const statusColor: Record<string, string> = {
  Completed: "text-success bg-successL",
  Upcoming: "text-sage bg-sageL",
  "In Progress": "text-amber bg-amberL",
  Cancelled: "text-slateL bg-sand",
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function CounselorDashboard({ navigate }: CounselorDashboardProps) {
  const [requests, setRequests] = useState(pendingRequests);

  const accept = (id: string) => setRequests((r) => r.filter((x) => x.id !== id));
  const decline = (id: string) => setRequests((r) => r.filter((x) => x.id !== id));

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      {/* Header */}
      <div className="bg-slate px-6 py-8 lg:py-10">
        <p className="text-cream/50 text-sm mb-1">{getGreeting()}</p>
        <h1 className="font-display text-3xl font-[400] text-cream">Dr. Grace Nakamya</h1>
        <p className="text-cream/50 text-sm mt-1">Wednesday, 20 August 2026</p>
      </div>

      <div className="max-w-4xl mx-auto px-5 lg:px-8 py-8 space-y-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Today's sessions", value: counselorStats.todaySessions, color: "text-sage" },
            { label: "Pending requests", value: requests.length, color: "text-terra" },
            { label: "Unread messages", value: counselorStats.unreadMessages, color: "text-amber" },
            { label: "This week", value: `${counselorStats.weekSessions} sessions`, color: "text-slate" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-cream border border-border rounded-2xl p-5">
              <p className={`font-display text-3xl font-[300] ${color} mb-1`}>{value}</p>
              <p className="text-slateM text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Pending requests */}
        {requests.length > 0 && (
          <div>
            <h2 className="font-[600] text-slate mb-4 flex items-center gap-2">
              Pending appointment requests
              <span className="bg-terra text-cream text-xs font-[700] px-2 py-0.5 rounded-full">{requests.length}</span>
            </h2>
            <div className="space-y-3">
              {requests.map((r: PendingRequest) => (
                <div key={r.id} className="bg-cream border border-border rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <img src={r.clientPhoto} alt={r.clientName} className="w-12 h-12 rounded-xl object-cover object-top bg-sand flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-[600] text-slate">{r.clientName}</p>
                          <p className="text-slateL text-xs mt-0.5">{r.requestedAt}</p>
                        </div>
                        <span className="text-xs font-[500] text-sage bg-sageL px-2.5 py-1 rounded-full flex-shrink-0">
                          {r.sessionType}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-slateL text-xs">Service</p>
                          <p className="text-slate font-[500] text-sm">{r.service}</p>
                        </div>
                        <div>
                          <p className="text-slateL text-xs">Requested time</p>
                          <p className="text-slate font-[500] text-sm">{r.requestedDate}, {r.requestedTime}</p>
                        </div>
                      </div>
                      {r.note && (
                        <p className="mt-3 text-slateM text-sm italic border-l-2 border-border pl-3 leading-relaxed">
                          "{r.note}"
                        </p>
                      )}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => accept(r.id)}
                          className="flex-1 bg-sage hover:bg-sageD text-cream font-[600] py-2.5 rounded-lg text-sm transition-colors"
                        >
                          Accept request
                        </button>
                        <button
                          onClick={() => decline(r.id)}
                          className="flex-1 border border-border hover:border-borderDark text-slateM font-[500] py-2.5 rounded-lg text-sm transition-all"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Today's schedule */}
        <div>
          <h2 className="font-[600] text-slate mb-4">Today's schedule</h2>
          <div className="space-y-3">
            {todaySchedule.map((s) => (
              <div key={s.id} className="bg-cream border border-border rounded-2xl p-5 flex items-center gap-4">
                <div className="text-center w-16 flex-shrink-0">
                  <p className="font-[600] text-slate text-sm">{s.time}</p>
                  <p className="text-slateL text-xs">{s.duration}</p>
                </div>
                <div className="w-px h-10 bg-border flex-shrink-0" />
                <img src={s.clientPhoto} alt={s.clientName} className="w-10 h-10 rounded-xl object-cover object-top bg-sand flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-[600] text-slate text-sm">{s.clientName}</p>
                  <p className="text-slateM text-xs">{s.service} · {s.sessionType}</p>
                </div>
                <span className={`text-xs font-[500] px-2.5 py-1 rounded-full flex-shrink-0 ${statusColor[s.status]}`}>
                  {s.status}
                </span>
                {s.status === "Upcoming" && (
                  <button
                    onClick={() => navigate("session-lobby")}
                    className="flex-shrink-0 bg-sage hover:bg-sageD text-cream font-[600] text-xs px-3 py-2 rounded-lg transition-colors"
                  >
                    Join
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent notes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[600] text-slate">Recent session notes</h2>
            <button
              onClick={() => navigate("counselor-notes")}
              className="text-sage text-sm font-[500] hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-2">
            {sessionNotes.slice(0, 3).map((n) => (
              <button
                key={n.id}
                onClick={() => navigate("counselor-notes")}
                className="w-full text-left bg-cream border border-border hover:border-sageMid rounded-xl p-4 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-[500] text-slate text-sm group-hover:text-sage transition-colors">{n.clientName}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-[600] px-2 py-0.5 rounded-full ${n.status === "Draft" ? "bg-amberL text-amber" : "bg-sageL text-sage"}`}>
                      {n.status}
                    </span>
                    <span className="text-slateL text-xs">{n.date}</span>
                  </div>
                </div>
                <p className="text-slateM text-xs leading-relaxed line-clamp-1">{n.preview}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "View calendar", page: "counselor-calendar" as Page },
            { label: "All appointments", page: "counselor-appointments" as Page },
            { label: "My clients", page: "counselor-clients" as Page },
            { label: "My profile", page: "counselor-profile-edit" as Page },
          ].map(({ label, page }) => (
            <button
              key={label}
              onClick={() => navigate(page)}
              className="bg-sand border border-border hover:border-sageMid text-slateM text-sm font-[500] px-4 py-3 rounded-xl transition-all text-left hover:text-sage"
            >
              {label} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
