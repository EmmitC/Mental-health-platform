import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppProvider } from "@/lib/nav";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SereneMind: mental health support", template: "%s | SereneMind" },
  description: "Connect with qualified counselors, access helpful resources, and take small steps toward feeling better.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
