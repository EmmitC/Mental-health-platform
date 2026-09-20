"use client";

import AdminCounselors from "@/views/AdminCounselors";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <AdminCounselors navigate={navigate} />;
}
