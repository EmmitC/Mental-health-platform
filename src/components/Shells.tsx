"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import CounselorSidebar from "@/components/CounselorSidebar";
import AdminSidebar from "@/components/AdminSidebar";
import Icon from "@/components/Icon";
import { homeFor, pathFor, useApp, useCurrentPage, type UserRole } from "@/lib/nav";

export function PublicShell({ children }: { children: ReactNode }) {
  const { role, navigate, signOut } = useApp();
  const page = useCurrentPage();
  return (
    <div className="flex flex-col min-h-screen">
      <Nav
        navigate={navigate}
        currentPage={page}
        isAuthenticated={role !== null}
        onLogin={() => navigate("login")}
        onLogout={signOut}
      />
      <main className="flex-1">{children}</main>
      {page !== "crisis" && <Footer navigate={navigate} />}
    </div>
  );
}

/** Blocks a portal until the visitor holds the right role, redirecting otherwise. */
function useGate(required: UserRole) {
  const { role, ready, leaving } = useApp();
  const router = useRouter();
  const allowed = role === required;
  useEffect(() => {
    if (!ready || allowed || leaving.current) return;
    router.replace(role ? pathFor(homeFor(role)) : "/login");
  }, [ready, allowed, role, router, leaving]);
  return allowed;
}

export function ClientShell({ children }: { children: ReactNode }) {
  const { navigate, signOut } = useApp();
  const page = useCurrentPage();
  if (!useGate("client")) return null;
  return (
    <div className="flex min-h-screen">
      <Sidebar navigate={navigate} currentPage={page} onLogout={signOut} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

export function CounselorShell({ children }: { children: ReactNode }) {
  const { navigate, signOut } = useApp();
  const page = useCurrentPage();
  if (!useGate("counselor")) return null;
  return (
    <div className="flex min-h-screen">
      <CounselorSidebar navigate={navigate} currentPage={page} onLogout={signOut} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const { navigate, signOut } = useApp();
  const page = useCurrentPage();
  if (!useGate("admin")) return null;
  return (
    <div className="flex min-h-screen">
      <AdminSidebar navigate={navigate} currentPage={page} onLogout={signOut} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

export function BookingShell({ children }: { children: ReactNode }) {
  const { role, ready, navigate, leaving } = useApp();
  const router = useRouter();
  useEffect(() => {
    if (ready && !role && !leaving.current) router.replace(`/login?next=${encodeURIComponent(window.location.pathname)}`);
  }, [ready, role, router, leaving]);
  if (!role) return null;
  return (
    <div>
      <div className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="font-display text-lg font-[500] text-slate">
            Serene<span className="text-sage">Mind</span>
          </button>
          <button
            onClick={() => navigate(homeFor(role))}
            className="flex items-center gap-1.5 text-sm text-slateM hover:text-slate transition-colors"
          >
            <Icon name="x" className="h-4 w-4" />
            Cancel booking
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
