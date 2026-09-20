"use client";

import CounselorAppointments from "@/views/CounselorAppointments";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <CounselorAppointments navigate={navigate} />;
}
