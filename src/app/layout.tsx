import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { preload } from "react-dom";

import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { defaultTitle } from "@/lib/metadata";
import { getSiteUrl, isIndexable } from "@/lib/site-url";

import forgedMetal from "@/assets/forged-metal.svg";

import "./globals.css";

/*
 * Three typefaces, all served from this site (see src/assets/fonts/README.md).
 *
 * Geist: paragraphs. One variable file covers every weight.
 * Geist Mono: small labels, in one weight.
 * Saira: headings, names, figures, navigation and buttons. Both files are
 * variable, so every weight comes from one download per style.
 */
const geist = localFont({
  src: "../assets/fonts/Geist-Variable-latin.woff2",
  weight: "100 900",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "../assets/fonts/GeistMono-Regular-latin.woff2",
  weight: "400",
  variable: "--font-geist-mono",
  display: "swap",
  // The stand-in metrics are worked out for a proportional face, which a
  // monospaced one is not.
  adjustFontFallback: false,
});

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
  // Until the site has its own domain, ask search engines not to list it.
  ...(isIndexable() ? {} : { robots: { index: false } }),
};

export const viewport: Viewport = {
  themeColor: "#121315",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // The texture that fills the headline is named only in the stylesheet, so
  // the browser would not start fetching it until the styles had arrived,
  // and the largest thing on the first screen would be the last to finish.
  preload(forgedMetal.src, { as: "image", fetchPriority: "high" });

  return (
    <html lang="en-SG" className={`${geist.variable} ${geistMono.variable} ${saira.variable}`}>
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
