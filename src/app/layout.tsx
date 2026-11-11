import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { Analytics } from "@/components/analytics/Analytics";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  }),
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    other: {
      "p:domain_verify": "1b29495953851d4753f9cde0efc7e0be",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      // Browser extensions often mutate <html>/<body> before React hydrates.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[8px] focus:bg-card focus:px-4 focus:py-2 focus:shadow-md"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <AdSenseScript />
        <Analytics />
      </body>
    </html>
  );
}
