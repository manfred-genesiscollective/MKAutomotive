import type { MetadataRoute } from "next";

import { getSiteUrl, isIndexable } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Crawlers are let in either way. Before launch every page carries a
  // "noindex" mark, and a crawler has to be able to read a page to see it.
  const rules = { userAgent: "*", allow: "/" };
  return isIndexable() ? { rules, sitemap: `${getSiteUrl()}/sitemap.xml` } : { rules };
}
