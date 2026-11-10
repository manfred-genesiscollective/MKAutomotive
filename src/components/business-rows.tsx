import Link from "next/link";

import { IN_DEVELOPMENT, businesses } from "@/content/businesses";

import { BusinessLogo } from "./business-logo";
import styles from "./business-rows.module.css";

type Props = {
  /** Heading level of each business name. */
  as?: "h2" | "h3";
  /** Also show a direct link to each business's own website. */
  showSites?: boolean;
};

/** One wide row per business, each leading to that business's page. */
export function BusinessRows({ as: Heading = "h3", showSites = false }: Props) {
  return (
    <ol className={styles.rows}>
      {businesses.map((business) => (
        <li
          key={business.slug}
          className={`${styles.row} arrow-link-host`}
          data-reveal
        >
          <div className={styles.head}>
            <p className="eyebrow">
              {business.stage.number} · {business.stage.label} · {business.category}
            </p>
            {business.status === "coming-soon" ? (
              <span className={styles.badge}>{IN_DEVELOPMENT}</span>
            ) : null}
          </div>

          <div className={styles.grid}>
            <div>
              <Heading className={styles.name}>
                <Link
                  href={`/businesses/${business.slug}`}
                  className={styles.rowLink}
                  prefetch
                >
                  <BusinessLogo slug={business.slug} alt={business.name} size="row" />
                </Link>
              </Heading>
              <p className={styles.tagline}>{business.tagline}</p>
            </div>

            <div className={styles.detail}>
              <p className="body">{business.summary}</p>
              <div className={styles.links}>
                <span className="arrow-link" aria-hidden="true">
                  Learn more <span>→</span>
                </span>
                {showSites && business.url ? (
                  <a
                    href={business.url}
                    className={styles.site}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {business.domain} <span aria-hidden="true">↗</span>
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
