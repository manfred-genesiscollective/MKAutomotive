import { IN_DEVELOPMENT, businesses, getBusiness } from "@/content/businesses";
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
  // No image for an address that is not a business: drawing one would let
  // anyone make the server render and store pictures for made-up addresses.
  if (!business) return new Response("Not found", { status: 404 });
  return renderOgImage({
    eyebrow: `${business.stage.number} · ${business.stage.label}${business.status === "live" ? "" : ` · ${IN_DEVELOPMENT}`}`,
    lines: [business.name],
    subtitle: business.tagline,
  });
}
