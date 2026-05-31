import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/AppContext";

export const metadata: Metadata = {
  title: "Culturo — Cultural intelligence for closing deals in China",
  description:
    "Culturo gives business teams fast, practical cultural intelligence for negotiations, partnerships, and client communication in China.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans text-[var(--color-ink)]">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
