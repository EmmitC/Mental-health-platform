"use client";

import Notifications from "@/views/Notifications";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Notifications navigate={navigate} />;
}
