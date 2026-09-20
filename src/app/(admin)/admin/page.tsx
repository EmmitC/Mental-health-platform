"use client";

import AdminDashboard from "@/views/AdminDashboard";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <AdminDashboard navigate={navigate} />;
}
