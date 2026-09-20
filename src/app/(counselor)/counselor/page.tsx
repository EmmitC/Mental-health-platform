"use client";

import CounselorDashboard from "@/views/CounselorDashboard";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <CounselorDashboard navigate={navigate} />;
}
