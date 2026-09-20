"use client";

import { useState } from "react";
import { appointments, type Appointment } from "../data/mock";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";
import Icon, { type IconName } from "../components/Icon";

interface AppointmentsProps {
  navigate: (page: Page, params?: { counselorId?: string }) => void;
}

const statusColor: Record<string, string> = {
  Confirmed: "bg-sageL text-sage",
  Pending: "bg-amberL text-amber",
  Completed: "bg-sand text-slateM",
  Cancelled: "bg-crisisL text-crisis",
  "In Progress": "bg-sageL text-sage",
};

export default function Appointments({ navigate }: AppointmentsProps) {
  const [tab, setTab] = useState<"Upcoming" | "Past" | "Cancelled">("Upcoming");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [cancelModal, setCancelModal] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const [cancelledIds, setCancelledIds] = useState<string[]>([]);
  const appts = appointments.map((a) => (cancelledIds.includes(a.id) ? { ...a, status: "Cancelled" as const } : a));

  const upcomingAppts = appts.filter((a) => a.status === "Confirmed" || a.status === "Pending" || a.status === "In Progress");
  const pastAppts = appts.filter((a) => a.status === "Completed");
  const cancelledAppts = appts.filter((a) => a.status === "Cancelled");

  const displayAppts = tab === "Upcoming" ? upcomingAppts : tab === "Past" ? pastAppts : cancelledAppts;

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="max-w-4xl mx-auto px-5 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-[400] text-slate">Appointments</h1>
          <button
            onClick={() => navigate("counselors")}
            className="bg-sage hover:bg-sageD text-cream font-[600] px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            + Book New
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-6">
          {(["Upcoming", "Past", "Cancelled"] as const).map((t) => {
            const count = t === "Upcoming" ? upcomingAppts.length : t === "Past" ? pastAppts.length : cancelledAppts.length;
            return (
              <button
                key={t}
                onClick={() => { setTab(t); setSelected(null); }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-[500] border-b-2 -mb-px transition-all ${
                  tab === t ? "border-sage text-sage" : "border-transparent text-slateM hover:text-slate"
                }`}
              >
                {t}
                {count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t ? "bg-sageL text-sage" : "bg-sand text-slateL"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {displayAppts.length === 0 ? (
          <div className="text-center py-20">
            <p className="w-8 h-px bg-border mx-auto mb-4"></p>
            <h3 className="font-display text-xl font-[400] text-slate mb-2">
              {tab === "Upcoming" ? "No upcoming appointments" :
               tab === "Past" ? "No past sessions" :
               "No cancelled appointments"}
            </h3>
            <p className="text-slateM text-sm mb-6">
              {tab === "Upcoming" ? "Ready to connect with a counselor?" : ""}
            </p>
            {tab === "Upcoming" && (
              <button onClick={() => navigate("counselors")} className="bg-sage text-cream font-[600] px-6 py-3 rounded-xl text-sm hover:bg-sageD transition-colors">
                Find a Counselor
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {displayAppts.map((a) => (
              <AppointmentCard
                key={a.id}
                appointment={a}
                isSelected={selected?.id === a.id}
                onSelect={() => setSelected(selected?.id === a.id ? null : a)}
                onCancel={() => setCancelModal(a)}
                navigate={navigate}
              />
            ))}
          </div>
        )}

        {/* Detail Drawer */}
        {selected && (
          <>
          <div className="fixed inset-0 z-40 bg-slate/30" onClick={() => setSelected(null)} aria-hidden="true" />
          <div role="dialog" aria-label="Appointment details" className="fixed inset-y-0 right-0 w-full max-w-md bg-cream shadow-[0_12px_40px_-8px_rgba(60,32,16,0.22)] z-50 overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-2xl font-[400] text-slate">Appointment Details</h2>
              <button onClick={() => setSelected(null)} aria-label="Close" className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-sand text-slateM"><Icon name="x" className="h-4 w-4" /></button>
            </div>
            <div className="p-6 flex-1">
              <div className="flex items-center gap-4 mb-6">
                <img src={selected.counselor.photo} alt={selected.counselor.name} className="w-16 h-16 rounded-xl object-cover object-top bg-sand" />
                <div>
                  <p className="font-display text-xl font-[400] text-slate">{selected.counselor.name}</p>
                  <p className="text-slateL text-sm">{selected.counselor.credentials}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-8">
                {[
                  ["Service", selected.service],
                  ["Date", selected.date],
                  ["Time", selected.time],
                  ["Duration", `${selected.duration} minutes`],
                  ["Session Type", selected.sessionType],
                  ["Payment", selected.paymentStatus],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border">
                    <span className="text-slateM">{label}</span>
                    <span className="font-[500] text-slate">{value}</span>
                  </div>
                ))}
              </div>

              {selected.status === "Confirmed" && (
                <div className="bg-amberL border border-amber/20 rounded-xl p-4 mb-6">
                  <p className="text-amber text-xs font-[600] mb-1">Cancellation Policy</p>
                  <p className="text-slateM text-xs">Free cancellation up to 24 hours before your session. After that, a 50% cancellation fee applies.</p>
                </div>
              )}

              <div className="space-y-3">
                {selected.status === "Confirmed" && (
                  <button onClick={() => navigate("session-lobby" as Page)} className="w-full bg-sage hover:bg-sageD text-cream font-[600] py-3 rounded-xl transition-colors">
                    Join Session
                  </button>
                )}
                {selected.status === "Confirmed" && (
                  <>
                    <button onClick={() => toast("Reschedule request started")} className="w-full border border-border py-3 rounded-xl text-sm font-[500] text-slateM hover:bg-sand transition-all">
                      Reschedule</button>
                    <button
                      onClick={() => { setSelected(null); setCancelModal(selected); }}
                      className="w-full border border-crisis/30 text-crisis py-3 rounded-xl text-sm font-[500] hover:bg-crisisL transition-all"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
                <button onClick={() => toast("Added to your calendar")} className="w-full flex items-center justify-center gap-2 border border-border py-3 rounded-xl text-sm font-[500] text-slateM hover:bg-sand transition-all">
                  Add to Calendar</button>
              </div>
            </div>
          </div>
          </>
        )}

        {/* Cancel Modal */}
        {cancelModal && (
          <div className="fixed inset-0 bg-slate/40 backdrop-blur-sm z-50 flex items-center justify-center p-5">
            <div className="bg-cream rounded-2xl p-7 max-w-md w-full shadow-[0_12px_40px_-8px_rgba(60,32,16,0.22)]">
              <h2 className="font-display text-2xl font-[400] text-slate mb-2">Cancel Appointment?</h2>
              <p className="text-slateM text-sm mb-5">
                Are you sure you want to cancel your{" "}
                <strong className="text-slate">{cancelModal.date} · {cancelModal.time}</strong> appointment with {cancelModal.counselor.name}?
              </p>

              <div className="bg-amberL border border-amber/20 rounded-xl p-4 mb-5">
                <p className="text-amber text-xs font-[600] mb-1">Cancellation Policy</p>
                <p className="text-slateM text-xs">Free cancellation up to 24 hours before your session. A 50% fee may apply after that.</p>
              </div>

              <div className="mb-5">
                <p className="text-sm font-[500] text-slate mb-2">Reason for cancelling (optional):</p>
                {["Scheduling conflict", "Financial reasons", "Found another counselor", "No longer need the appointment", "Other"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setCancelReason(r)}
                    className={`block w-full text-left text-sm px-4 py-2.5 mb-1.5 rounded-xl border transition-all ${
                      cancelReason === r ? "border-sage bg-sageL text-sage font-[500]" : "border-border text-slateM hover:border-sageMid"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setCancelModal(null)} className="flex-1 border border-border py-3 rounded-xl text-sm font-[600] text-slateM hover:bg-sand transition-all">
                  Keep Appointment
                </button>
                <button
                  onClick={() => {
                    setCancelledIds((ids) => [...ids, cancelModal.id]);
                    setCancelModal(null);
                    setCancelReason("");
                    setSelected(null);
                    toast("Appointment cancelled");
                  }}
                  className="flex-1 bg-crisis hover:bg-crisisD text-cream py-3 rounded-xl text-sm font-[600] transition-colors"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AppointmentCard({
  appointment: a, isSelected, onSelect, onCancel, navigate,
}: {
  appointment: Appointment;
  isSelected: boolean;
  onSelect: () => void;
  onCancel: () => void;
  navigate: (page: Page, params?: { counselorId?: string }) => void;
}) {
  return (
    <div className={`bg-cream border rounded-2xl overflow-hidden transition-all ${isSelected ? "border-sage bg-sageL/20" : "border-border hover:border-sageMid"}`}>
      <div className="p-5 flex items-start gap-4">
        <img src={a.counselor.photo} alt={a.counselor.name} className="w-12 h-12 rounded-xl object-cover object-top bg-sand flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-[600] text-slate">{a.counselor.name}</p>
              <p className="text-slateL text-xs">{a.service}</p>
            </div>
            <span className={`text-xs font-[600] px-2.5 py-1 rounded-full flex-shrink-0 ${statusColor[a.status] ?? "bg-sand text-slateM"}`}>
              {a.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-slateM">
            <span>{a.date}</span>
            <span>·</span>
            <span>{a.time}</span>
            <span>·</span>
            <span>{a.duration} min</span>
            <span>·</span>
            <span>{a.sessionType}</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 flex gap-2">
        {a.status === "Confirmed" && (
          <button onClick={() => navigate("session-lobby" as Page)} className="flex-1 bg-sage hover:bg-sageD text-cream font-[600] py-2 rounded-lg text-sm transition-colors">
            Join Session
          </button>
        )}
        <button onClick={onSelect} className="flex-1 border border-border py-2 rounded-lg text-sm font-[500] text-slateM hover:bg-sand transition-all">
          {isSelected ? "Close" : "View Details"}
        </button>
        {a.status === "Confirmed" && (
          <button onClick={onCancel} className="px-3 py-2 border border-border rounded-lg text-xs text-slateL hover:border-crisis/30 hover:text-crisis hover:bg-crisisL transition-all">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
