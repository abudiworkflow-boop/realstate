import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropAI — Intelligent Lead Automation",
  description: "AI-powered lead qualification, smart routing, and instant engagement for Dubai's premier real estate market",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen relative z-10">{children}</body>
    </html>
  );
}
