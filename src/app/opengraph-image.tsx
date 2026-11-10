import { site } from "@/content/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ lines: ["The whole life", "of a car."], emblem: true });
}
