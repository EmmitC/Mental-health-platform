"use client";

import Profile from "@/views/Profile";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Profile navigate={navigate} />;
}
