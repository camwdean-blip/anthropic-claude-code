import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The AI Playbook | Stop Being Confused by AI. Start Using It.",
  description:
    "A practical crash course on using AI in your personal life, at work, and for fun. Learn ChatGPT, Claude, Midjourney, and more — no tech background needed.",
  openGraph: {
    title: "The AI Playbook | Your Crash Course to Using AI Every Day",
    description:
      "Finally understand AI and actually use it. Personal life, work, and fun — all covered. Full playbook for just $29.99.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
