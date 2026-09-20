"use client";

import Wellness from "@/views/Wellness";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Wellness navigate={navigate} />;
}
