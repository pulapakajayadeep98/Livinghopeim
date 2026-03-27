import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://livinghopein.org"),
  title: "Living Hope Organisation | Vijayawada Church",
  description:
    "Living Hope Organisation is a spirit-filled church in Vijayawada offering Sunday worship, Bible study, prayer meetings, Christian fellowship, and spiritual growth.",
  keywords: [
    "Living Hope",
    "Living Hope Organisation",
    "Living Hope Church",
    "Living Hope Vijayawada",
    "Vijayawada church",
    "church in Vijayawada",
    "Christian church Vijayawada",
    "Bible study Vijayawada",
    "prayer meetings Vijayawada",
    "Sunday worship Vijayawada",
    "spirit-filled church Vijayawada",
    "Christian fellowship Vijayawada",
    "Jesus church Vijayawada",
    "church near me Vijayawada"
  ],
  authors: [{ name: "Living Hope Organisation" }],
  creator: "Living Hope Organisation",
  publisher: "Living Hope Organisation",
  applicationName: "Living Hope Organisation",
  alternates: {
    canonical: "https://livinghopein.org/",
  },
  icons: {
    icon: "/vercel.svg", // replace this with your real favicon later
  },
  openGraph: {
    title: "Living Hope Organisation | Vijayawada Church",
    description:
      "Join Living Hope Organisation in Vijayawada for Sunday worship, Bible study, prayer meetings, and Christian fellowship.",
    url: "https://livinghopein.org/",
    siteName: "Living Hope Organisation",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Hope Organisation | Vijayawada Church",
    description:
      "Spirit-filled church in Vijayawada with worship, Bible study, and prayer meetings.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} antialiased bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
