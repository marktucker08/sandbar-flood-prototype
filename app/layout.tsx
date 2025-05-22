import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "@/styles/globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import localFont from "next/font/local";
import { Providers } from "@/components/providers/AuthProviders";
import { SupabaseSessionProvider } from "@/context/SupabaseSessionContext";

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
  title: "Sandbar Flood Insurance",
  description: "Flood insurance quoting and management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${arSans.variable}`}>
      <body>
        <Providers>
          <SupabaseSessionProvider>
            <QuoteProvider>
              {children}
            </QuoteProvider>
          </SupabaseSessionProvider>
        </Providers>
      </body>
    </html>
  );
}
