import type { Metadata } from "next";

import { site } from "@/content/site";

export const defaultTitle = `${site.name} | Automotive holding company, Singapore`;

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
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
