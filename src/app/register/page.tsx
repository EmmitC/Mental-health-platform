"use client";

import Auth from "@/views/Auth";
import { useApp } from "@/lib/nav";

export default function Page() {
  const { navigate, signIn } = useApp();
  return <Auth navigate={navigate} onAuthenticate={(role) => signIn(role ?? "client")} initialMode="register" />;
}
