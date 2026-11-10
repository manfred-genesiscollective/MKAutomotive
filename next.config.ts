import type { NextConfig } from "next";

import { isIndexable } from "./src/lib/site-url";

/*
 * Content-Security-Policy. Every page is prerendered, so there is no
 * per-request nonce to give the framework's inline scripts and the inline
 * structured data: they are allowed with 'unsafe-inline'. Everything else
 * must come from this site itself. Nothing may frame the site, and forms may
 * only post back to it.
 *
 * Adding a third-party script, font, image host or embed later means adding
 * its origin here, or the browser will refuse it.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Until the site has its own domain, nothing on it should be listed by
  // search engines: this covers images and files, which have no page to mark.
  ...(isIndexable() ? [] : [{ key: "X-Robots-Tag", value: "noindex" }]),
  // The development server needs eval and a websocket for live reloading,
  // so these two are for production only.
  ...(process.env.NODE_ENV === "production"
    ? [
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
        // No includeSubDomains: the site's own domain may have subdomains
        // that are not on HTTPS, and this header would lock visitors out of
        // them for two years.
        { key: "Strict-Transport-Security", value: "max-age=63072000" },
      ]
    : []),
];

const nextConfig: NextConfig = {
  // Every page on this site is static. Cache Components prerenders them at
  // build time; the root layout's `ensureStatic` export keeps it that way.
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
