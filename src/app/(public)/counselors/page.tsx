"use client";

import Counselors from "@/views/Counselors";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Counselors navigate={navigate} />;
}
