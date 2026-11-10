import Link from "next/link";

import { businesses } from "@/content/businesses";

import styles from "./lifecycle-rail.module.css";

/**
 * The five stages in the life of a car, each leading to the business that
 * looks after it. Doubles as a one-click directory.
 */
export function LifecycleRail({ current }: { current?: string }) {
  return (
    <nav className={styles.rail} aria-label="Businesses, in the order of a car's life">
      <ol className={styles.list}>
        {businesses.map((business) => (
          <li key={business.slug} className={styles.item}>
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
