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

  if (process.env.NODE_ENV === "production" && !warned) {
    warned = true;
    console.warn(
      "[site] NEXT_PUBLIC_SITE_URL is not set, so canonical links, the sitemap, robots.txt and share images point at http://localhost:3000. Set it to the live address before publishing.",
    );
  }
  return "http://localhost:3000";
}
