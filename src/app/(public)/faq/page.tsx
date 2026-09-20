"use client";

import FAQ from "@/views/FAQ";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <FAQ navigate={navigate} />;
}
