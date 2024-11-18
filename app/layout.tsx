import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Inter } from 'next/font/google';
import Providers from "@/components/Providers";

const myFont = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: "--my-font-family",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased min-h-screen relative`}
      >
        {/* Background wrapper with responsive images */}
        <div 
          className="fixed inset-0 z-[-1] bg-black"
          style={{
            backgroundImage: `
              image-set(
                url('/jj.jpg') 1x,
                url('/jj.jpg') 2x,
                url('/jj.jpg') 3x
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
              srcSet="/backgrounds/Chargebee-mobile.jpg"
            />
            <source
              media="(max-width: 1024px)"
              srcSet="/backgrounds/Chargebee-tablet.jpg"
            />
            <img
              src="/jj.jpg"
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
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <EdgeStoreProvider>
              {/* Semi-transparent overlay and content */}
              <div className="relative min-h-screen bg-black/30">
                <Navbar />
                {children}
              </div>
            </EdgeStoreProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}