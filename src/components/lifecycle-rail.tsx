import Link from "next/link";

import { businesses } from "@/content/businesses";

import styles from "./lifecycle-rail.module.css";

type Props = {
  /** Slug of the business whose page is being shown, if any. */
  current?: string;
  /** Show the ten-year COE scale above the stages. */
  scale?: boolean;
};

const DURING = "Ten-year Certificate of Entitlement";
const AFTER = "When it runs out";

/**
 * The five stages in the life of a car, each leading to the business that
 * looks after it. Doubles as a one-click directory.
 */
export function LifecycleRail({ current, scale = false }: Props) {
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
              aria-current={current === business.slug ? "page" : undefined}
            >
              <span className={styles.node} aria-hidden="true" />
              <span className={styles.stage}>
                {business.stage.number} <span>{business.stage.label}</span>
              </span>
              <span className={styles.name}>{business.name}</span>
              <span className={styles.category}>
                {business.status === "coming-soon" ? "Coming soon" : business.category}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
