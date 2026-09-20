"use client";

import Dashboard from "@/views/Dashboard";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Dashboard navigate={navigate} />;
}
