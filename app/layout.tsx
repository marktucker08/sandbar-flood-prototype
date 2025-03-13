import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@icon/themify-icons/themify-icons.css";
import localFont from "next/font/local";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const arSans = localFont( {
  src: [
    {
      path: "./fonts/AROneSans-VariableFont_ARRR,wght.ttf",
      weight: '900',
      style: "normal",
    },
    {
      path: "./fonts/AROneSans-VariableFont_ARRR,wght.ttf",
      weight: '800',
      style: "normal",
    },
    {
      path: "./fonts/AROneSans-VariableFont_ARRR,wght.ttf",
      weight: '700',
      style: "normal",
    },
    {
      path: "./fonts/AROneSans-VariableFont_ARRR,wght.ttf",
      weight: '600',
      style: "normal",
    },
    {
      path: "./fonts/AROneSans-VariableFont_ARRR,wght.ttf",
      weight: '500',
      style: "normal",
    },
    {
      path: "./fonts/AROneSans-VariableFont_ARRR,wght.ttf",
      weight: '400',
      style: "normal",
    },
    {
      path: "./fonts/AROneSans-VariableFont_ARRR,wght.ttf",
      weight: '200',
      style: "normal",
    },
    {
      path: "./fonts/AROneSans-VariableFont_ARRR,wght.ttf",
      weight: '100',
      style: "normal",
    },
  ],
  variable: "--font-ar-sans",
});

export const metadata: Metadata = {
  title: "Sandbar Flood",
  description: "Flood Insurance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={arSans.variable}
      >
        {children}
      </body>
    </html>
  );
}
