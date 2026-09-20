"use client";

import { useParams } from "next/navigation";
import CounselorProfile from "@/views/CounselorProfile";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  return <CounselorProfile navigate={navigate} counselorId={id ?? null} />;
}
