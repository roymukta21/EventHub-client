import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventHub — Discover & Book Amazing Events",
  description: "Your AI-powered gateway to the world's most incredible events. Discover, book, and experience extraordinary events near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
