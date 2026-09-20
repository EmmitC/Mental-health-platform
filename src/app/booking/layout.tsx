import type { ReactNode } from "react";
import { BookingShell } from "@/components/Shells";

export default function Layout({ children }: { children: ReactNode }) {
  return <BookingShell>{children}</BookingShell>;
}
