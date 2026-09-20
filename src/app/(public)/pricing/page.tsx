"use client";

import Pricing from "@/views/Pricing";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Pricing navigate={navigate} />;
}
