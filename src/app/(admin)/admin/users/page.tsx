"use client";

import AdminUsers from "@/views/AdminUsers";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <AdminUsers navigate={navigate} />;
}
