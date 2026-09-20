"use client";

import { useState } from "react";
import type { Page } from "@/lib/nav";

interface NotificationsProps {
  navigate: (page: Page) => void;
}

type NotifType = "appointment" | "message" | "wellness" | "system";

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  action?: { label: string; page: Page };
}

const initialNotifications: Notif[] = [
  {
    id: "n1",
    type: "appointment",
    title: "Appointment tomorrow",
    body: "Your session with Dr. Grace Nakamya is at 10:00 AM tomorrow. Check your connection beforehand.",
    time: "2 hours ago",
    read: false,
    action: { label: "View appointment", page: "appointments" },
  },
  {
    id: "n2",
    type: "message",
    title: "New message from Mr. Ochieng",
    body: "\"I have reviewed the notes from our last session. Looking forward to continuing tomorrow.\"",
    time: "Yesterday, 3:15 PM",
    read: false,
    action: { label: "View message", page: "messages" },
  },
  {
    id: "n3",
    type: "wellness",
    title: "Weekly check-in reminder",
    body: "You have not logged your mood this week. Taking 2 minutes now helps you spot patterns over time.",
    time: "Yesterday, 9:00 AM",
    read: true,
    action: { label: "Check in now", page: "wellness" },
  },
  {
    id: "n4",
    type: "appointment",
    title: "Appointment confirmed",
    body: "Your booking with Dr. Amina Hassan on Thursday, 9:00 AM has been confirmed. You will receive a reminder the day before.",
    time: "2 days ago",
    read: true,
    action: { label: "View appointment", page: "appointments" },
  },
  {
    id: "n5",
    type: "system",
    title: "Privacy settings updated",
    body: "Your communication consent was updated on 18 August. If you did not make this change, please contact support.",
    time: "3 days ago",
    read: true,
    action: { label: "Review privacy settings", page: "profile" },
  },
  {
    id: "n6",
    type: "wellness",
    title: "Goal streak: 5 days",
    body: "You have logged your \"Improve Sleep\" goal 5 days in a row. Keep going.",
    time: "4 days ago",
    read: true,
    action: { label: "View goals", page: "wellness" },
  },
  {
    id: "n7",
    type: "system",
    title: "Welcome to SereneMind",
    body: "Your account is set up. Browse counselors, complete your wellness check-in, or explore the resource library.",
    time: "1 week ago",
    read: true,
  },
];

const typeConfig: Record<NotifType, { label: string; bg: string; dot: string }> = {
  appointment: { label: "Appointment", bg: "bg-sageL", dot: "bg-sage" },
  message: { label: "Message", bg: "bg-terraL", dot: "bg-terra" },
  wellness: { label: "Wellness", bg: "bg-amberL", dot: "bg-amber" },
  system: { label: "System", bg: "bg-sand", dot: "bg-slateL" },
};

const prefCategories = [
  { key: "appointment", label: "Appointment reminders", desc: "Upcoming session reminders, confirmations, and rescheduling notices." },
  { key: "message", label: "New messages", desc: "Notifications when your counselor sends you a message." },
  { key: "wellness", label: "Wellness reminders", desc: "Mood check-in prompts, goal reminders, and assessment nudges." },
  { key: "system", label: "Account and security", desc: "Password changes, privacy updates, and billing notifications." },
];

export default function Notifications({ navigate }: NotificationsProps) {
  const [notifs, setNotifs] = useState<Notif[]>(initialNotifications);
  const [tab, setTab] = useState<"All" | "Unread">("All");
  const [prefs, setPrefs] = useState({ appointment: true, message: true, wellness: true, system: true });

  const displayed = tab === "Unread" ? notifs.filter((n) => !n.read) : notifs;
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: string) => setNotifs((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="max-w-2xl mx-auto px-5 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display text-3xl md:text-4xl font-[400] text-slate">Notifications</h1>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-sage text-sm font-[500] hover:underline">
              Mark all read
            </button>
          )}
        </div>
        <p className="text-slateM text-sm mb-8">
          {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
        </p>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-6">
          {(["All", "Unread"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-[500] border-b-2 -mb-px transition-all ${
                tab === t ? "border-sage text-sage" : "border-transparent text-slateM hover:text-slate"
              }`}
            >
              {t}
              {t === "Unread" && unreadCount > 0 && (
                <span className="ml-2 bg-terra text-cream text-[10px] font-[700] px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notification list */}
        {displayed.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-display text-xl font-[400] text-slate mb-2">
              {tab === "Unread" ? "No unread notifications" : "No notifications yet"}
            </h3>
            <p className="text-slateM text-sm">Check back after your first session or check-in.</p>
          </div>
        ) : (
          <div className="space-y-2 mb-12">
            {displayed.map((n) => {
              const cfg = typeConfig[n.type];
              return (
                <div
                  key={n.id}
                  className={`rounded-2xl border p-5 transition-all ${
                    n.read ? "bg-cream border-border" : "bg-sageL/30 border-sageMid"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.read ? "bg-sandDark" : cfg.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-[600] px-2 py-0.5 rounded-full ${cfg.bg} text-slateM`}>
                          {cfg.label}
                        </span>
                        <span className="text-slateXL text-xs">{n.time}</span>
                      </div>
                      <p className="font-[600] text-slate text-sm mb-1">{n.title}</p>
                      <p className="text-slateM text-sm leading-relaxed">{n.body}</p>
                      {n.action && (
                        <button
                          onClick={() => { markRead(n.id); navigate(n.action!.page); }}
                          className="mt-3 text-sage text-xs font-[600] hover:underline"
                        >
                          {n.action.label} →
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => deleteNotif(n.id)}
                      className="text-slateXL hover:text-slateM flex-shrink-0 transition-colors text-lg leading-none"
                      aria-label="Dismiss notification"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Preferences */}
        <div className="border-t border-border pt-8">
          <h2 className="font-[600] text-slate mb-1">Notification preferences</h2>
          <p className="text-slateM text-sm mb-6">Choose which types of notifications you receive.</p>
          <div className="space-y-4">
            {prefCategories.map(({ key, label, desc }) => {
              const k = key as keyof typeof prefs;
              return (
                <div key={key} className="flex items-start gap-4 py-3 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="font-[500] text-slate text-sm">{label}</p>
                    <p className="text-slateL text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                  <button
                    onClick={() => setPrefs((p) => ({ ...p, [k]: !p[k] }))}
                    role="switch"
                    aria-checked={prefs[k]}
                    className={`flex-shrink-0 mt-0.5 w-10 h-6 rounded-full transition-colors relative ${
                      prefs[k] ? "bg-sage" : "bg-sandDark"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-cream rounded-full shadow transition-all ${
                        prefs[k] ? "left-5" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
