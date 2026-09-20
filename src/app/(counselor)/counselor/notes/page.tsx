"use client";

import CounselorNotes from "@/views/CounselorNotes";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <CounselorNotes navigate={navigate} />;
}
