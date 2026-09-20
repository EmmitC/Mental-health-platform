import type { ReactNode } from "react";
import { CounselorShell } from "@/components/Shells";

export default function Layout({ children }: { children: ReactNode }) {
  return <CounselorShell>{children}</CounselorShell>;
}
