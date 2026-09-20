"use client";

import Home from "@/views/Home";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Home navigate={navigate} />;
}
