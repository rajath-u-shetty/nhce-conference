import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Inter } from 'next/font/google';
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

const myFont = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: "--my-font-family",
});

export const metadata: Metadata = {
  title: "tapas25",
  description: "NHCE Papers Summit 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased bg-black relative`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <EdgeStoreProvider>
              <Toaster />
              <Navbar />
              {children}
              <Analytics />
            </EdgeStoreProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
