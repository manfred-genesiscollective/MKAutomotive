import type { Metadata } from "next";

import { site } from "@/content/site";

export const defaultTitle = `${site.name} | Automotive holding company, Singapore`;

/**
 * The group's share image (src/app/opengraph-image.tsx). A page that sets
 * its own openGraph block replaces the inherited one, image included, so
 * every page has to name the image again. The home page and the business
 * pages still show their own: an image file beside a page takes priority.
 */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.tagline}`,
};

/**
 * Metadata for one page: title, description, canonical address and the
 * matching social-sharing tags. `path` is the page's address, such as "/about".
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Leave out on the home page to use the site's default title. */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : defaultTitle;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_SG",
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}
