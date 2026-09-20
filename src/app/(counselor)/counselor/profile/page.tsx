"use client";

import CounselorProfileEdit from "@/views/CounselorProfileEdit";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <CounselorProfileEdit navigate={navigate} />;
}
