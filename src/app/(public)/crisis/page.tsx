"use client";

import Crisis from "@/views/Crisis";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Crisis navigate={navigate} />;
}
