import type { ReactNode } from "react";
import { ClientShell } from "@/components/Shells";

export default function Layout({ children }: { children: ReactNode }) {
  return <ClientShell>{children}</ClientShell>;
}
