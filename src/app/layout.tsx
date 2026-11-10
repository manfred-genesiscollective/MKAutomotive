import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { defaultTitle } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

// Saira: headings, names, figures, navigation and buttons. Both files are
// variable, so every weight comes from one download per style.
const saira = localFont({
  src: [
    { path: "../assets/fonts/Saira-Variable.woff2", weight: "100 900", style: "normal" },
    { path: "../assets/fonts/Saira-Italic-Variable.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-saira",
  display: "swap",
});

// Every page is prerendered. If a page ever starts to depend on request-time
// data, the build fails instead of quietly turning the page dynamic.
export const ensureStatic = "navigation";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#121315",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-SG" className={`${GeistSans.variable} ${GeistMono.variable} ${saira.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {/* Focusable so the skip link moves keyboard focus here, not just the scroll position. */}
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
