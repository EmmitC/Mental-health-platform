"use client";

import CounselorCalendar from "@/views/CounselorCalendar";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <CounselorCalendar navigate={navigate} />;
}
