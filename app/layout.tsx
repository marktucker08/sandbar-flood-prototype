import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import "@icon/themify-icons/themify-icons.css";
import localFont from "next/font/local";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });

const arSans = localFont({
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
  title: "SandBar Flood Insurance",
  description: "Your one stop solution for all things flood insurance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${arSans.variable}`}>
        
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
