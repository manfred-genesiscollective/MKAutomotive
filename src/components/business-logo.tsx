import Image, { type StaticImageData } from "next/image";

import exportSg from "@/assets/logos/export-sg.svg";
import geneos from "@/assets/logos/geneos.svg";
import goldenHour from "@/assets/logos/golden-hour.svg";
import revhub from "@/assets/logos/revhub.svg";
import swiftdrive from "@/assets/logos/swiftdrive.svg";
import theCarLounge from "@/assets/logos/the-car-lounge.svg";

import { LOGO_STYLE } from "@/lib/business-logos";

import styles from "./business-logo.module.css";

/*
 * Each business's own logo, traced from the artwork the group supplied and
 * kept in its own colours (src/assets/logos). Golden Hour's and The Car
 * Lounge's words are stacked to the right of their monograms, one word to a
 * line, as GeneOS's are in its own artwork, whose G is redrawn as exact
 * geometry.
 * Two colours differ from the artwork: Golden Hour's words take the
 * monogram's orange (they were black) and the "Drive" of SwiftDrive is white
 * instead of navy. Black and navy would disappear on the carbon.
 */
const IMAGES: Record<string, StaticImageData> = {
  swiftdrive,
  revhub,
  "the-car-lounge": theCarLounge,
  "golden-hour": goldenHour,
  "export-sg": exportSg,
  geneos,
};

type Props = {
  /** The business, by its slug. */
  slug: string;
  /** Read out in place of the picture: the business's name. */
  alt: string;
  /** How large to draw it. The sizes are in business-logo.module.css. */
  size: "hero" | "wall" | "list" | "neighbour";
  /** The largest thing on the first screen: fetch it first. */
  priority?: boolean;
};

/** A business's logo in its own colours, with the site's forged finish. */
export function BusinessLogo({ slug, alt, size, priority = false }: Props) {
  const image = IMAGES[slug];
  const style = LOGO_STYLE[slug];
  // A business without its logo artwork yet: its name, set in the site's
  // own headline face with the forged finish, at the size a logo would be.
  if (!image || !style) {
    return (
      <span className={`${styles.word} ${styles[size]}`}>
        <span className="forged-text">{alt}</span>
      </span>
    );
  }
  return (
    <span
      className={`${styles.logo} ${styles[size]}`}
      style={
        {
          "--logo": `url("${image.src}")`,
          "--scale": style.scale,
          "--flakes": `${style.flakes[0]}% ${style.flakes[1]}%`,
        } as React.CSSProperties
      }
    >
      <Image
        src={image}
        alt={alt}
        unoptimized
        loading="eager"
        fetchPriority={priority ? "high" : undefined}
        draggable={false}
        className={styles.image}
      />
    </span>
  );
}
