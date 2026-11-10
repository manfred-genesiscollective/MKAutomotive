/**
 * The public address of the site, without a trailing slash.
 *
 * Set NEXT_PUBLIC_SITE_URL to the live domain. On Vercel the production
 * domain is picked up automatically when the variable is not set.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
