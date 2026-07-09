import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sarthakmadan.dev"),
  title: "Sarthak Madan | Full-Stack Developer",
  description:
    "Portfolio of Sarthak Madan — CSE student and full-stack developer building thoughtful, AI-powered web products.",
  keywords: [
    "Sarthak Madan",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Software Engineer",
  ],
  openGraph: {
    title: "Sarthak Madan | Full-Stack Developer",
    description: "Building reliable web products where thoughtful engineering meets useful AI.",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} ${geistMono.variable}`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
