import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppProvider } from "@/lib/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SereneMind: mental health support", template: "%s | SereneMind" },
  description: "Connect with qualified counselors, access helpful resources, and take small steps toward feeling better.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
