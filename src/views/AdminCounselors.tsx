"use client";

import { useState } from "react";
import { adminCounselors, type AdminCounselorRecord } from "../data/counselorMock";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";

interface AdminCounselorsProps {
  navigate: (page: Page) => void;
}

const verificationBadge: Record<AdminCounselorRecord["verification"], string> = {
  Verified: "bg-successL text-success",
  Pending: "bg-amberL text-amber",
  Rejected: "bg-crisisL text-crisis",
};
const statusBadge: Record<AdminCounselorRecord["status"], string> = {
  Active: "bg-sageL text-sage",
  Inactive: "bg-sand text-slateM",
  Suspended: "bg-crisisL text-crisis",
};

export default function AdminCounselors({ navigate: _navigate }: AdminCounselorsProps) {
  const [counselors, setCounselors] = useState(adminCounselors);
  const [filterVerify, setFilterVerify] = useState<"All" | "Pending" | "Verified" | "Rejected">("All");
  const [actionTarget, setActionTarget] = useState<string | null>(null);

  const filtered = filterVerify === "All" ? counselors : counselors.filter((c) => c.verification === filterVerify);

  const approveCounselor = (id: string) =>
    setCounselors((prev) => prev.map((c) => c.id === id ? { ...c, verification: "Verified" as const, status: "Active" as const } : c));
  const rejectCounselor = (id: string) =>
    setCounselors((prev) => prev.map((c) => c.id === id ? { ...c, verification: "Rejected" as const } : c));
  const suspendCounselor = (id: string) =>
    setCounselors((prev) => prev.map((c) => c.id === id ? { ...c, status: "Suspended" as const } : c));

  const pendingCount = counselors.filter((c) => c.verification === "Pending").length;

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="px-5 lg:px-8 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-[400] text-slate">Counselors</h1>
            {pendingCount > 0 && (
              <p className="text-terra text-sm font-[500] mt-0.5">{pendingCount} pending verification</p>
            )}
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mt-4">
          {(["All", "Pending", "Verified", "Rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterVerify(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-[500] transition-all ${
                filterVerify === f ? "bg-sage text-cream" : "bg-sand border border-border text-slateM hover:border-sageMid"
              }`}
            >
              {f}
              {f === "Pending" && pendingCount > 0 && (
                <span className="ml-1.5 bg-terra text-cream text-[10px] font-[700] px-1 py-0.5 rounded-full">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-6 space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className={`bg-cream rounded-[12px] border p-5 ${c.verification === "Pending" ? "border-amber/40 bg-amberL/10" : "border-border"}`}>
            <div className="flex items-start gap-4">
              <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-xl object-cover object-top bg-sand flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 justify-between">
                  <div>
                    <p className="font-[600] text-slate">{c.name}</p>
                    <p className="text-slateM text-sm">{c.credentials}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {c.specializations.map((s) => (
                        <span key={s} className="text-[10px] text-sage bg-sageL px-2 py-0.5 rounded-full font-[500]">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className={`text-xs font-[500] px-2.5 py-1 rounded-full ${verificationBadge[c.verification]}`}>
                      {c.verification}
                    </span>
                    <span className={`text-xs font-[500] px-2.5 py-1 rounded-full ${statusBadge[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slateL">
                  <span>{c.totalSessions} sessions</span>
                  <span>·</span>
                  <span>Joined {c.joinedDate}</span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.verification === "Pending" && (
                    <>
                      <button
                        onClick={() => approveCounselor(c.id)}
                        className="bg-sage hover:bg-sageD text-cream font-[600] px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectCounselor(c.id)}
                        className="border border-crisis/30 text-crisis font-[500] px-4 py-2 rounded-lg text-sm hover:bg-crisisL transition-all"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {c.verification === "Verified" && c.status === "Active" && (
                    <button
                      onClick={() => setActionTarget(actionTarget === c.id ? null : c.id)}
                      className="border border-border text-slateM font-[500] px-4 py-2 rounded-lg text-sm hover:bg-sand transition-all"
                    >
                      More actions
                    </button>
                  )}
                  {actionTarget === c.id && (
                    <div className="w-full flex gap-2">
                      <button
                        onClick={() => { suspendCounselor(c.id); setActionTarget(null); }}
                        className="border border-amber/30 text-amber font-[500] px-4 py-2 rounded-lg text-sm hover:bg-amberL transition-all"
                      >
                        Suspend
                      </button>
                      <button onClick={() => toast("Opening counselor profile")} className="border border-border text-slateM font-[500] px-4 py-2 rounded-lg text-sm hover:bg-sand transition-all">
                        View profile</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">✓</p>
            <p className="text-slateM text-sm">No counselors match this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
