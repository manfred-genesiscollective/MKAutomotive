import { businesses, getBusiness } from "@/content/businesses";
import { site } from "@/content/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `A business of ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return businesses.map((business) => ({ slug: business.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) {
    return renderOgImage({ lines: ["The whole life", "of a car."], emblem: true });
  }
  return renderOgImage({
    eyebrow: `${business.stage.number} · ${business.stage.label}`,
    lines: [business.name],
    subtitle: business.tagline,
  });
}
