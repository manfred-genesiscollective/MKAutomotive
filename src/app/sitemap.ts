import type { MetadataRoute } from "next";

import { businesses } from "@/content/businesses";
import { getSiteUrl } from "@/lib/site-url";

const PAGES = [
  { path: "/", priority: 1 },
  { path: "/businesses", priority: 0.9 },
  { path: "/about", priority: 0.8 },
  { path: "/partners", priority: 0.8 },
  { path: "/careers", priority: 0.8 },
  { path: "/investors", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    ...PAGES.map((page) => ({
      url: `${base}${page.path}`,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...businesses.map((business) => ({
      url: `${base}/businesses/${business.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
