"use client";

import Messages from "@/views/Messages";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Messages navigate={navigate} />;
}
