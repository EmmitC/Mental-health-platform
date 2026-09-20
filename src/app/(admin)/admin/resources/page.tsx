"use client";

import AdminResources from "@/views/AdminResources";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <AdminResources navigate={navigate} />;
}
