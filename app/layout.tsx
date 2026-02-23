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
  title: "L H E International Ministries | Vijayawada Church",
  description:
    "Spirit-filled church in Vijayawada. Sunday worship, Bible study & prayer meetings.",
     icons: {
    icon: "/vercel.svg", // place your svg inside public folder
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
