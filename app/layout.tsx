import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "@/styles/globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import localFont from "next/font/local";
import { Providers } from "@/components/providers/AuthProviders";

const inter = Inter({ subsets: ["latin"] });

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
  title: "Sandbar Flood Insurance",
  description: "Flood insurance quoting and management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${workSans.variable} ${arSans.variable}`}>
        <Providers>
          <QuoteProvider>
            {children}
          </QuoteProvider>
        </Providers>
      </body>
    </html>
  );
}
