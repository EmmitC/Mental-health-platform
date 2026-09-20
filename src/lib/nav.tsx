"use client";

import { MotionConfig } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import ToastHost from "@/components/Toast";

export type UserRole = "client" | "counselor" | "admin";

export type Page =
  | "home" | "about" | "faq" | "pricing" | "contact"
  | "counselors" | "counselor-profile" | "booking"
  | "login" | "register"
  | "dashboard" | "appointments" | "wellness" | "resources" | "messages" | "profile" | "notifications"
  | "session-lobby" | "crisis"
  | "counselor-dashboard" | "counselor-calendar" | "counselor-appointments"
  | "counselor-clients" | "counselor-notes" | "counselor-profile-edit"
  | "admin-dashboard" | "admin-counselors" | "admin-users" | "admin-resources";

/** Page id -> URL. Dynamic pages take the counselor id as a trailing segment. */
export const PATHS: Record<Page, string> = {
  home: "/",
  about: "/about",
  faq: "/faq",
  pricing: "/pricing",
  contact: "/contact",
  counselors: "/counselors",
  "counselor-profile": "/counselors",
  booking: "/booking",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  appointments: "/appointments",
  wellness: "/wellness",
  resources: "/resources",
  messages: "/messages",
  profile: "/profile",
  notifications: "/notifications",
  "session-lobby": "/session-lobby",
  crisis: "/crisis",
  "counselor-dashboard": "/counselor",
  "counselor-calendar": "/counselor/calendar",
  "counselor-appointments": "/counselor/appointments",
  "counselor-clients": "/counselor/clients",
  "counselor-notes": "/counselor/notes",
  "counselor-profile-edit": "/counselor/profile",
  "admin-dashboard": "/admin",
  "admin-counselors": "/admin/counselors",
  "admin-users": "/admin/users",
  "admin-resources": "/admin/resources",
};

const DEFAULT_COUNSELOR = "c1";

export function pathFor(page: Page, counselorId?: string) {
  if (page === "counselor-profile" || page === "booking") {
    return `${PATHS[page]}/${counselorId ?? DEFAULT_COUNSELOR}`;
  }
  return PATHS[page];
}

/** Reverse lookup, used for active-nav state. */
export function pageFromPath(pathname: string): Page {
  if (pathname.startsWith("/counselors/")) return "counselor-profile";
  if (pathname.startsWith("/booking")) return "booking";
  const hit = (Object.entries(PATHS) as [Page, string][])
    .filter(([p, path]) => p !== "counselor-profile" && p !== "booking" && path === pathname)
    .map(([p]) => p)[0];
  return hit ?? "home";
}

export const homeFor = (role: UserRole): Page =>
  role === "counselor" ? "counselor-dashboard" : role === "admin" ? "admin-dashboard" : "dashboard";

export type NavigateFn = (page: Page, params?: { counselorId?: string }) => void;

const REQUIRES: Partial<Record<Page, UserRole>> = {
  dashboard: "client", appointments: "client", wellness: "client", messages: "client",
  profile: "client", notifications: "client",
  "counselor-dashboard": "counselor", "counselor-calendar": "counselor", "counselor-appointments": "counselor",
  "counselor-clients": "counselor", "counselor-notes": "counselor", "counselor-profile-edit": "counselor",
  "admin-dashboard": "admin", "admin-counselors": "admin", "admin-users": "admin", "admin-resources": "admin",
};

interface AppContextValue {
  role: UserRole | null;
  ready: boolean;
  navigate: NavigateFn;
  signIn: (role: UserRole) => void;
  signOut: () => void;
  /** True while a deliberate sign-out redirect is in flight, so route guards stand down. */
  leaving: { current: boolean };
}

const AppContext = createContext<AppContextValue | null>(null);
const STORAGE_KEY = "serenemind-role";

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [role, setRole] = useState<UserRole | null>(null);
  const [ready, setReady] = useState(false);
  const leaving = useRef(false);

  // Restore the demo session after hydration (sessionStorage is client-only).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved === "client" || saved === "counselor" || saved === "admin") setRole(saved);
    } catch {}
    setReady(true);
  }, []);

  const navigate = useCallback<NavigateFn>(
    (page, params) => {
      const path = pathFor(page, params?.counselorId);
      const needed = REQUIRES[page];
      if (!role && (needed || page === "booking")) {
        // Remember the destination so sign-in can resume it.
        router.push(`/login?next=${encodeURIComponent(path)}`);
        return;
      }
      if (role && needed && needed !== role) {
        router.push(pathFor(homeFor(role)));
        return;
      }
      router.push(path);
    },
    [role, router],
  );

  const signIn = useCallback(
    (next: UserRole) => {
      leaving.current = false;
      setRole(next);
      try { sessionStorage.setItem(STORAGE_KEY, next); } catch {}
      const wanted = new URLSearchParams(window.location.search).get("next");
      const resume = next === "client" && wanted?.startsWith("/booking") ? wanted : null;
      router.push(resume ?? pathFor(homeFor(next)));
    },
    [router],
  );

  const signOut = useCallback(() => {
    leaving.current = true;
    router.push("/");
    setRole(null);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
  }, [router]);

  const value = useMemo(() => ({ role, ready, navigate, signIn, signOut, leaving }), [role, ready, navigate, signIn, signOut]);

  return (
    <AppContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        {children}
        <ToastHost />
      </MotionConfig>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

export const useNavigate = () => useApp().navigate;
export const useCurrentPage = () => pageFromPath(usePathname());
