"use client";

import { useState } from "react";
import type { Page } from "@/lib/nav";

interface SidebarProps {
  navigate: (page: Page) => void;
  currentPage: Page;
  onLogout: () => void;
}

const navItems = [
  { label: "Dashboard", page: "dashboard" as Page, icon: HomeIcon },
  { label: "Appointments", page: "appointments" as Page, icon: CalIcon },
  { label: "Messages", page: "messages" as Page, icon: MsgIcon, badge: 1 },
  { label: "Wellness", page: "wellness" as Page, icon: HeartIcon },
  { label: "Resources", page: "resources" as Page, icon: BookIcon },
  { label: "Notifications", page: "notifications" as Page, icon: BellIcon, badge: 2 },
  { label: "Profile", page: "profile" as Page, icon: UserIcon },
];

export default function Sidebar({ navigate, currentPage, onLogout }: SidebarProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = currentPage === "resources" || currentPage === "notifications" || currentPage === "profile";
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-cream border-r border-border sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 border-b border-border">
          <button onClick={() => navigate("home")} className="font-display text-xl font-[500] text-slate">
            Serene<span className="text-sage">Mind</span>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, page, icon: Icon, badge }) => {
            const active = currentPage === page;
            return (
              <button
                key={label}
                onClick={() => navigate(page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[500] transition-all ${
                  active
                    ? "bg-sageL text-sage"
                    : "text-slateM hover:bg-sand hover:text-slate"
                }`}
              >
                <Icon active={active} />
                <span>{label}</span>
                {badge && (
                  <span className="ml-auto bg-terra text-cream text-xs font-[600] px-1.5 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <button
            onClick={() => navigate("crisis")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[500] text-crisis hover:bg-crisisL transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-crisis animate-pulse flex-shrink-0"></span>
            Crisis Support
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[500] text-slateL hover:bg-sand hover:text-slateM transition-all"
          >
            <LogOutIcon />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      {moreOpen && <div className="lg:hidden fixed inset-0 z-30" onClick={() => setMoreOpen(false)} aria-hidden="true" />}
      {moreOpen && (
        <div className="lg:hidden fixed bottom-[68px] right-3 z-40 w-56 rounded-[12px] border border-border bg-cream p-2 shadow-[0_12px_40px_-8px_rgba(60,32,16,0.22)] page-enter">
          {[
            { label: "Profile", page: "profile" as Page, icon: UserIcon },
            { label: "Resources", page: "resources" as Page, icon: BookIcon },
            { label: "Notifications", page: "notifications" as Page, icon: BellIcon, badge: 2 },
          ].map(({ label, page, icon: Icon, badge }) => (
            <button key={label} onClick={() => { setMoreOpen(false); navigate(page); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-[500] text-slate hover:bg-sand">
              <Icon active={currentPage === page} />
              {label}
              {badge ? <span className="ml-auto rounded-full bg-terra px-1.5 py-0.5 text-xs font-[600] text-cream">{badge}</span> : null}
            </button>
          ))}
          <button onClick={() => { setMoreOpen(false); navigate("crisis"); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-[500] text-crisis hover:bg-crisisL">
            <span className="ml-1.5 mr-1 h-2 w-2 rounded-full bg-crisis"></span>
            Crisis Support
          </button>
          <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-[500] text-slateM hover:bg-sand">
            <LogOutIcon />
            Sign Out
          </button>
        </div>
      )}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream border-t border-border px-2 py-2 flex items-center justify-around" aria-label="Main">
        {[
          { label: "Home", page: "dashboard" as Page, icon: HomeIcon },
          { label: "Appts", page: "appointments" as Page, icon: CalIcon },
          { label: "Wellness", page: "wellness" as Page, icon: HeartIcon },
          { label: "Messages", page: "messages" as Page, icon: MsgIcon, badge: true },
        ].map(({ label, page, icon: Icon, badge }) => {
          const active = currentPage === page;
          return (
            <button
              key={label}
              onClick={() => { setMoreOpen(false); navigate(page); }}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${
                active ? "text-sage" : "text-slateL"
              }`}
            >
              <Icon active={active} />
              {badge && <span className="absolute right-2 top-0 h-2 w-2 rounded-full bg-terra" aria-label="unread"></span>}
              <span className="text-[10px] font-[500]">{label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setMoreOpen(!moreOpen)}
          aria-expanded={moreOpen}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${moreActive || moreOpen ? "text-sage" : "text-slateL"}`}
        >
          <UserIcon active={moreActive || moreOpen} />
          <span className="text-[10px] font-[500]">More</span>
        </button>
      </nav>
    </>
  );
}

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-sage" : "text-slateL"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function CalIcon({ active }: { active?: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-sage" : "text-slateL"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function MsgIcon({ active }: { active?: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-sage" : "text-slateL"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
function HeartIcon({ active }: { active?: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-sage" : "text-slateL"}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}
function BookIcon({ active }: { active?: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-sage" : "text-slateL"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
function BellIcon({ active }: { active?: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-sage" : "text-slateL"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}
function UserIcon({ active }: { active?: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-sage" : "text-slateL"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
function LogOutIcon() {
  return (
    <svg className="w-5 h-5 text-slateL" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}
