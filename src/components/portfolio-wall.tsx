import Link from "next/link";

import { IN_DEVELOPMENT, businesses } from "@/content/businesses";

import { BusinessLogo } from "./business-logo";
import styles from "./portfolio-wall.module.css";

/** Keeps hyphenated words such as "door-to-door" whole when the line wraps. */
function keepHyphenatedWords(text: string) {
  return text.split(/(\S*-\S*)/).map((part, index) =>
    part.includes("-") ? (
      <span key={index} className={styles.whole}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

type Props = {
  /** Heading level of each business name, to fit the page around it. */
  as?: "h2" | "h3";
};

/**
 * The portfolio as a wall of logos: one tile per business on a glass panel
 * ruled by hairlines, three across (two on phones, four once there are
 * twelve or more). Each tile leads to the business's page. A new business
 * in src/content/businesses.ts is a new tile; nothing here changes.
 */
export function PortfolioWall({ as: Heading = "h3" }: Props) {
  return (
    <ul className={`surface-glass ${styles.wall}`} role="list">
      {businesses.map((business) => (
        <li key={business.slug} className={styles.tile} data-reveal>
          <Heading className={styles.name}>
            <Link href={`/businesses/${business.slug}`} className={styles.link} prefetch>
              <span className={styles.slot}>
                <span className={styles.mark}>
                  <BusinessLogo slug={business.slug} alt={business.name} size="wall" />
                </span>
              </span>
            </Link>
          </Heading>
          <p className={styles.line}>{keepHyphenatedWords(business.tagline)}</p>
          <p className={styles.category}>{business.category}</p>
          <svg className={styles.go} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M2.5 8h10M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <p className={styles.foot}>
            {business.status === "live" ? (
              <span className={styles.site}>{business.domain}</span>
            ) : (
              <span className={styles.badge}>{IN_DEVELOPMENT}</span>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
