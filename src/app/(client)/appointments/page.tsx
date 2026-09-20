"use client";

import Appointments from "@/views/Appointments";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Appointments navigate={navigate} />;
}
