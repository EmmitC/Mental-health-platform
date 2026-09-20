"use client";

import { useParams } from "next/navigation";
import Booking from "@/views/Booking";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string[] }>();
  return <Booking navigate={navigate} counselorId={id?.[0] ?? null} />;
}
