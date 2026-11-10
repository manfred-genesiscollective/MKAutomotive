let warned = false;

/**
 * The public address of the site, without a trailing slash.
 *
 * Set NEXT_PUBLIC_SITE_URL to the live domain. On Vercel the production
 * domain is picked up automatically when the variable is not set.
 *
 * Canonical links, the sitemap, robots.txt and share images are all built
 * from this, so a production build made without either variable says so
 * loudly instead of quietly publishing a localhost address.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    // "example.sg" is a common slip: treat it as https://example.sg.
    const withScheme = /^https?:\/\//i.test(explicit) ? explicit : `https://${explicit}`;
    return withScheme.replace(/\/+$/, "");
  }

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;

  // Say so once, during a production build: that is when the address is
  // written into the pages.
  if (process.env.NEXT_PHASE === "phase-production-build" && !warned) {
    warned = true;
    console.warn(
      "[site] NEXT_PUBLIC_SITE_URL is not set, so canonical links, the sitemap, robots.txt and share images point at http://localhost:3000. Set it to the live address before publishing.",
    );
  }
  return "http://localhost:3000";
}

/**
 * Whether search engines may list the site.
 *
 * Not while it lives on an address Vercel gave it (something.vercel.app) or
 * on a developer's machine: only once it has a domain of its own. A site
 * that is still being reviewed therefore stays out of search results, and
 * becomes listable by itself the first time it is built after its own
 * domain is connected. Nobody has to remember a switch.
 */
export function isIndexable(): boolean {
  try {
    const { hostname } = new URL(getSiteUrl());
    return hostname !== "localhost" && !hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}
