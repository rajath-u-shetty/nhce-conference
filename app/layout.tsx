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
        className={`${myFont.className} antialiased bg-black min-h-screen relative`}
      >
        {/* Background wrapper with responsive images */}
        <div
          className="fixed inset-0 z-[-1] bg-black "
          style={{
            backgroundImage: `
              image-set(
                url('/techno.jpg') 1x,
                url('/techno.jpg') 2x,
                url('/techno.jpg') 3x
              )`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Responsive background images using picture element */}
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/techno.jpg"
            />
            <source
              media="(max-width: 1024px)"
              srcSet="/techno.jpg"
            />
            <img
              src="/techno.jpg"
              alt="Background"
              className="object-cover w-full h-full"
              loading="eager"
            // priority="true"
            />
          </picture>
        </div>

        <Providers>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <EdgeStoreProvider>
              {/* Semi-transparent overlay and content */}
              <div className="relative min-h-screen bg-black/30">
                {/* Optional semi-transparent overlay */}
                <div className="min-h-screen w-full bg-black/30">
                  <Toaster />
                  <Navbar />
                  {children}
                  <Analytics/>
                </div>
              </div>
            </EdgeStoreProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
