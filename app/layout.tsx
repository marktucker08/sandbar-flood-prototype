import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { Providers } from "@/components/providers/AuthProviders";

const workSans = Work_Sans({ 
  subsets: ["latin"], 
  variable: "--font-work-sans",
  display: "swap",
});

const arSans = localFont({
  src: "../public/fonts/AROneSans-VariableFont_ARRR,wght.ttf",
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
        <Providers>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
