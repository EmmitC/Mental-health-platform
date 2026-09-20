"use client";

import Resources from "@/views/Resources";
import { useNavigate } from "@/lib/nav";

export default function Page() {
  const navigate = useNavigate();
  return <Resources navigate={navigate} />;
}
