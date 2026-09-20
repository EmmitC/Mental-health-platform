"use client";

import CounselorClients from "@/views/CounselorClients";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <CounselorClients navigate={navigate} />;
}
