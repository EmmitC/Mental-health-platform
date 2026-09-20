"use client";

import type { Page } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";

interface AdminSidebarProps {
  navigate: (page: Page) => void;
  currentPage: Page;
  onLogout: () => void;
}

const navItems = [
  { label: "Overview", page: "admin-dashboard" as Page, icon: HomeIcon },
  { label: "Counselors", page: "admin-counselors" as Page, icon: PeopleIcon, badge: 4 },
  { label: "Users", page: "admin-users" as Page, icon: UserIcon },
  { label: "Resources", page: "admin-resources" as Page, icon: BookIcon },
];

export default function AdminSidebar({ navigate, currentPage, onLogout }: AdminSidebarProps) {
  return (
    <>
      <aside className="light-scope hidden lg:flex flex-col w-60 min-h-screen bg-slate sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 border-b border-cream/10">
          <button onClick={() => navigate("home")} className="font-display text-xl font-[500] text-cream">
            Serene<span className="text-sageMid">Mind</span>
          </button>
          <p className="text-cream/60 text-xs mt-1 font-[500] tracking-wide">Admin console</p>
        </div>

        <nav className="flex-1 p-4 space-y-0.5">
          {navItems.map(({ label, page, icon: Icon, badge }) => {
            const active = currentPage === page;
            return (
              <button
                key={label}
                onClick={() => navigate(page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[500] transition-all ${
                  active ? "bg-cream/10 text-cream" : "text-cream/50 hover:bg-cream/5 hover:text-cream/80"
                }`}
              >
                <Icon />
                <span>{label}</span>
                {badge !== undefined && (
                  <span className="ml-auto bg-terra text-cream text-xs font-[600] px-1.5 py-0.5 rounded-full">{badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cream/10 space-y-0.5">
          <button
            onClick={() => navigate("crisis")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[500] text-crisis hover:bg-crisis/10 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-crisis animate-pulse flex-shrink-0" />
            Crisis
          </button>
          <ThemeToggle labelled onDark />
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[500] text-cream/60 hover:text-cream/70 hover:bg-cream/5 transition-all"
          >
            <LogOutIcon />
            Sign Out
          </button>
        </div>
      </aside>

      <nav className="light-scope lg:hidden fixed bottom-3 left-3 right-3 z-40 rounded-full bg-slate border border-cream/10 px-2 py-1.5 flex items-center justify-around">
        {navItems.map(({ label, page, icon: Icon }) => {
          const active = currentPage === page;
          return (
            <button key={label} onClick={() => navigate(page)} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${active ? "text-sageMid" : "text-cream/60"}`}>
              <Icon />
              <span className="text-[10px] font-[500]">{label}</span>
            </button>
          );
        })}
        <ThemeToggle onDark tab />
        <button onClick={onLogout} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-cream/60">
          <LogOutIcon />
          <span className="text-[10px] font-[500]">Sign out</span>
        </button>
      </nav>
    </>
  );
}

function HomeIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>; }
function PeopleIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
function UserIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>; }
function CalIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>; }
function BookIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>; }
function LogOutIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>; }
