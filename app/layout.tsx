import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hybrid.harryludemann.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hybrid Calculator — Fuel Savings",
  description:
    "Compare hybrid vs petrol running costs. See annual fuel savings, 5-year net savings, and how long until the hybrid pays for itself.",
  keywords: [
    "hybrid calculator",
    "fuel savings",
    "hybrid vs petrol",
    "break-even calculator",
    "car running costs",
  ],
  openGraph: {
    title: "Hybrid Calculator",
    description:
      "Work out whether a hybrid saves you money — fuel costs, break-even, and 5-year savings.",
    type: "website",
    locale: "en_NZ",
    siteName: "Hybrid Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hybrid Calculator",
    description:
      "Compare hybrid vs petrol fuel costs and see when the hybrid pays off.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-950 text-slate-100">{children}</body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
