"use client";

import SessionLobby from "@/views/SessionLobby";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <SessionLobby navigate={navigate} />;
}
