import Link from "next/link";

import { IN_DEVELOPMENT, businesses } from "@/content/businesses";

import { BusinessLogo } from "./business-logo";
import styles from "./lifecycle-rail.module.css";

type Props = {
  /** Show the ten-year COE scale above the stages. */
  scale?: boolean;
};

const DURING = "Ten-year Certificate of Entitlement";
const AFTER = "When it runs out";

/**
 * The five stages in the life of a car, each leading to the business that
 * looks after it. Doubles as a one-click directory.
 */
export function LifecycleRail({ scale = false }: Props) {
  const firstAfter = businesses.findIndex((business) => business.stage.afterCoe);
  const during = firstAfter === -1 ? businesses.length : firstAfter;
  const showScale = scale && during > 0 && during < businesses.length;

  return (
    <nav className={styles.rail} aria-label="Businesses, in the order of a car's life">
      {showScale ? (
        // Wide screens: one scale across the top. Narrow screens use the
        // captions inside the list instead, so only one of the two is ever shown.
        <div
          className={styles.scale}
          style={{ "--columns": businesses.length } as React.CSSProperties}
        >
          <p className={styles.phase} style={{ gridColumn: `1 / span ${during}` }}>
            <span>{DURING}</span>
          </p>
          <p className={styles.phase} style={{ gridColumn: `${during + 1} / -1` }}>
            <span>{AFTER}</span>
          </p>
        </div>
      ) : null}

      <ol
        className={styles.list}
        style={{ "--columns": businesses.length } as React.CSSProperties}
      >
        {businesses.map((business, index) => (
          <li
            key={business.slug}
            className={`${styles.item} ${business.status === "coming-soon" ? styles.soon : ""}`}
          >
            {showScale && index === 0 ? <p className={styles.caption}>{DURING}</p> : null}
            {showScale && index === during ? <p className={styles.caption}>{AFTER}</p> : null}
            <Link
              href={`/businesses/${business.slug}`}
              className={styles.stop}
              prefetch
            >
              <span className={styles.node} aria-hidden="true" />
              <span className={styles.stage}>
                {business.stage.number} <span>{business.stage.label}</span>
              </span>
              <span className={styles.name}>
                <BusinessLogo slug={business.slug} alt={business.name} size="rail" />
              </span>
              <span className={styles.category}>
                {business.status === "live" ? business.category : IN_DEVELOPMENT}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
