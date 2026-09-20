"use client";

import { useState } from "react";
import { appointments, type Appointment } from "../data/mock";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";
import Icon, { type IconName } from "../components/Icon";
import SegmentedTabs from "../components/SegmentedTabs";
import Counter from "../components/animation/Counter";
import { motion } from "motion/react";
import { springs } from "@/lib/motion";

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
        {/* Header: kit "My Conversations"-style summary card */}
        <div className="light-scope mb-6 rounded-[12px] bg-slate p-6 text-cream">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-sm font-[600] opacity-80">Appointments</h1>
              <p className="mt-2 font-display text-6xl font-[700] leading-none"><Counter value={upcomingAppts.length} /></p>
              <p className="mt-2 text-sm opacity-80">upcoming {upcomingAppts.length === 1 ? "session" : "sessions"}</p>
            </div>
            <button
              onClick={() => navigate("counselors")}
              aria-label="Book a new appointment"
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-ember text-slate transition-transform hover:scale-105"
            >
              <Icon name="plus" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-cream/15 pt-4 text-center">
            {[["Past", pastAppts.length], ["Cancelled", cancelledAppts.length], ["Next", upcomingAppts[0]?.time ?? "None"]].map(([label, value]) => (
              <div key={label as string}>
                <p className="font-display text-xl font-[700]">{value}</p>
                <p className="text-xs opacity-75">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <SegmentedTabs
          label="Appointment status"
          className="mb-6"
          options={["Upcoming", "Past", "Cancelled"] as const}
          value={tab}
          onChange={(t) => { setTab(t); setSelected(null); }}
          counts={{ Upcoming: upcomingAppts.length, Past: pastAppts.length, Cancelled: cancelledAppts.length }}
        />

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
            <div className="bg-cream rounded-[12px] p-7 max-w-md w-full shadow-[0_12px_40px_-8px_rgba(60,32,16,0.22)]">
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

const typeTone: Record<string, string> = {
  Video: "bg-sage text-cream",
  Audio: "bg-ember text-slate",
  "In Person": "bg-sun text-slate",
};

function AppointmentCard({
  appointment: a, isSelected, onSelect, onCancel, navigate,
}: {
  appointment: Appointment;
  isSelected: boolean;
  onSelect: () => void;
  onCancel: () => void;
  navigate: (page: Page, params?: { counselorId?: string }) => void;
}) {
  // "Wednesday, August 26" -> Wed / Aug / 26
  const [weekday = "", rest = ""] = a.date.split(", ");
  const [month = "", day = ""] = rest.split(" ");
  const inactive = a.status === "Cancelled" || a.status === "Completed";
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={springs.responsive}
      className={`overflow-hidden rounded-[12px] border transition-colors ${isSelected ? "border-sage bg-sageL/30" : "border-border bg-cream hover:border-sageMid"}`}
    >
      <div className="flex gap-4 p-4 sm:p-5">
        <div className={`light-scope flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-[12px] ${inactive ? "bg-sandDark text-slate" : typeTone[a.sessionType]}`}>
          <span className="text-[11px] font-[700] uppercase tracking-wide opacity-80">{weekday.slice(0, 3)}</span>
          <span className="font-display text-3xl font-[700] leading-none">{day}</span>
          <span className="text-[11px] font-[600] uppercase opacity-80">{month.slice(0, 3)}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-[700] text-slate">{a.counselor.name}</p>
              <p className="text-xs text-slateL">{a.service}</p>
            </div>
            <span className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-[600] ${statusColor[a.status] ?? "bg-sand text-slateM"}`}>
              {a.status}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slateM">
            <span className="inline-flex items-center gap-1.5"><Icon name="clock" className="h-3.5 w-3.5" />{a.time} · {a.duration} min</span>
            <span className="inline-flex items-center gap-1.5"><Icon name={a.sessionType === "Video" ? "video" : a.sessionType === "Audio" ? "audio" : "pin"} className="h-3.5 w-3.5" />{a.sessionType}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-t border-border px-4 py-3 sm:px-5">
        {a.status === "Confirmed" && (
          <button onClick={() => navigate("session-lobby" as Page)} className="flex-1 rounded-full bg-slate py-2.5 text-sm font-[600] text-cream transition-colors hover:bg-slateM">
            Join session
          </button>
        )}
        <button onClick={onSelect} className="flex-1 rounded-full border border-border py-2.5 text-sm font-[500] text-slateM transition-colors hover:bg-sand">
          {isSelected ? "Close" : "Details"}
        </button>
        {a.status === "Confirmed" && (
          <button onClick={onCancel} className="rounded-full border border-border px-4 py-2.5 text-sm text-slateL transition-colors hover:border-crisis/40 hover:bg-crisisL hover:text-crisis">
            Cancel
          </button>
        )}
      </div>
    </motion.div>
  );
}
