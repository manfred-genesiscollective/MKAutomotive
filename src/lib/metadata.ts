import type { Metadata } from "next";

import { site } from "@/content/site";

export const defaultTitle = `${site.name} | Automotive holding company, Singapore`;

/**
 * The group's share image (src/app/opengraph-image.tsx). A page that sets
 * its own openGraph block replaces the inherited one, image included, so a
 * page without an image of its own has to name the group's again.
 *
 * A page that does have its own image file (the home page and each business
 * page have an opengraph-image.tsx beside them) must NOT name one here: an
 * image named in this object wins over the file.
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
  ownImage = false,
}: {
  /** Leave out on the home page to use the site's default title. */
  title?: string;
  description: string;
  path: string;
  /** Set when the page has its own opengraph-image file beside it. */
  ownImage?: boolean;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : defaultTitle;
  const images = ownImage ? {} : { images: [shareImage] };
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
      ...images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...images,
    },
  };
}
