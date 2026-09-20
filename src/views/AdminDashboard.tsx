"use client";

import { adminStats, adminCounselors } from "../data/counselorMock";
import type { Page } from "@/lib/nav";

interface AdminDashboardProps {
  navigate: (page: Page) => void;
}

const metrics = [
  { label: "Total users", value: adminStats.totalUsers.toLocaleString(), sub: adminStats.growthUsers + " this month", color: "text-slate" },
  { label: "Active counselors", value: adminStats.totalCounselors, sub: `${adminStats.pendingVerifications} pending verification`, color: "text-sage" },
  { label: "Sessions completed", value: adminStats.completedSessions.toLocaleString(), sub: adminStats.growthSessions + " this month", color: "text-slate" },
  { label: "Revenue (MTD)", value: "UGX 24.1M", sub: "August 2026", color: "text-terra" },
];

const activityFeed = [
  { time: "2 min ago", text: "New counselor application: Dr. Kenneth Otieno (Trauma Therapy)" },
  { time: "18 min ago", text: "Appointment cancelled: Daniel Kato with Dr. Nakamya, Thu 22 Aug" },
  { time: "1 hour ago", text: "New user registered: fatuma.nakato@email.com" },
  { time: "3 hours ago", text: "Session completed: Sarah Namukasa with Dr. Nakamya" },
  { time: "Yesterday", text: "Counselor verification approved: Ms. Sarah Mwangi (Anxiety)" },
];

export default function AdminDashboard({ navigate }: AdminDashboardProps) {
  const pending = adminCounselors.filter((c) => c.verification === "Pending");

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      {/* Header */}
      <div className="bg-slate px-6 py-8">
        <p className="text-cream/60 text-xs font-[600] uppercase tracking-widest mb-1">Admin</p>
        <h1 className="font-display text-3xl font-[400] text-cream">Platform Overview</h1>
        <p className="text-cream/60 text-sm mt-1">Wednesday, 20 August 2026</p>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-8 space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map(({ label, value, sub, color }) => (
            <div key={label} className="bg-cream border border-border rounded-2xl p-5">
              <p className={`font-display text-3xl font-[300] ${color} mb-1`}>{value}</p>
              <p className="text-slateM text-xs font-[500]">{label}</p>
              <p className="text-slateXL text-xs mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending verifications */}
          {pending.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[600] text-slate flex items-center gap-2">
                  Pending verifications
                  <span className="bg-terra text-cream text-xs font-[700] px-2 py-0.5 rounded-full">{pending.length}</span>
                </h2>
                <button onClick={() => navigate("admin-counselors")} className="text-sage text-sm font-[500] hover:underline">
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {pending.map((c) => (
                  <div key={c.id} className="bg-cream border border-amber/30 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <img src={c.photo} alt={c.name} className="w-10 h-10 rounded-xl object-cover object-top bg-sand flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-[600] text-slate text-sm">{c.name}</p>
                        <p className="text-slateM text-xs">{c.credentials}</p>
                        <p className="text-slateL text-xs">Applied {c.joinedDate}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => navigate("admin-counselors")} className="flex-1 bg-sage hover:bg-sageD text-cream font-[600] py-2 rounded-lg text-sm transition-colors">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity feed */}
          <div>
            <h2 className="font-[600] text-slate mb-4">Recent activity</h2>
            <div className="space-y-3">
              {activityFeed.map(({ time, text }) => (
                <div key={text} className="flex gap-3 text-sm">
                  <span className="text-slateXL text-xs flex-shrink-0 w-20 pt-0.5">{time}</span>
                  <p className="text-slateM leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick nav */}
        <div>
          <h2 className="font-[600] text-slate mb-4">Quick access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Manage counselors", page: "admin-counselors" as Page, badge: `${pending.length} pending` },
              { label: "Manage users", page: "admin-users" as Page, badge: null },
              { label: "Appointments", page: "appointments" as Page, badge: null },
              { label: "Resources", page: "admin-resources" as Page, badge: null },
            ].map(({ label, page, badge }) => (
              <button
                key={label}
                onClick={() => navigate(page)}
                className="bg-sand border border-border hover:border-sageMid rounded-xl p-4 text-left transition-all group"
              >
                <p className="font-[500] text-slate text-sm group-hover:text-sage transition-colors">{label}</p>
                {badge && <p className="text-terra text-xs mt-1 font-[500]">{badge}</p>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
