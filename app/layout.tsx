import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const workSans = Work_Sans({ 
  subsets: ["latin"], 
  variable: "--font-work-sans",
  display: "swap",
});

const arSans = localFont({
  src: "./fonts/AROneSans-VariableFont_ARRR,wght.ttf",
  variable: "--font-ar-sans",
  display: "swap",
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
