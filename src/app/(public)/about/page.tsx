"use client";

import About from "@/views/About";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <About navigate={navigate} />;
}
