"use client";

import Contact from "@/views/Contact";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Contact navigate={navigate} />;
}
