import type { ReactNode } from "react";

import { Dotted } from "./dotted";
import styles from "./page-hero.module.css";

type Props = {
  /** Small label above the headline. */
  eyebrow?: string;
  /** One entry per line. End the last line with a full stop to get the gold dot. */
  title: string[];
  /** "home" is the largest. */
  size?: "home" | "page";
  /** Usually the lede. Sits under a hairline below the headline. */
  children?: ReactNode;
  /** Set false on the home page, where the lede has no rule above it. */
  ruled?: boolean;
  /** Show the MK monogram, cut from forged metal, on the right. */
  emblem?: boolean;
};

/** The top of every page: label, huge headline, lede. */
export function PageHero({
  eyebrow,
  title,
  size = "page",
  children,
  ruled = true,
  emblem = false,
}: Props) {
  const sizeClass = size === "home" ? "display" : "display display--page";

  return (
    <section className={`${styles.hero} ${size === "home" ? styles.home : ""}`}>
      <div className={`container ${emblem ? styles.split : ""}`}>
        <div className={styles.copy}>
          {eyebrow ? (
            <p className={`eyebrow fade-in ${styles.eyebrow}`} style={{ "--delay": "0.04s" } as React.CSSProperties}>
              {eyebrow}
            </p>
          ) : null}
          <h1 className={sizeClass}>
            {title.map((line, index) => (
              <span key={line} className="line" style={{ "--i": index } as React.CSSProperties}>
                <span>
                  <Dotted>{line}</Dotted>
                  {index < title.length - 1 ? " " : null}
                </span>
              </span>
            ))}
          </h1>
          {children ? (
            <div className={`fade-in ${styles.body} ${ruled ? styles.ruled : ""}`}>{children}</div>
          ) : null}
        </div>
        {emblem ? (
          // Decoration only: the header already carries the logo as a link.
          <div
            className={`fade-in ${styles.emblem}`}
            style={{ "--delay": "0.3s" } as React.CSSProperties}
            aria-hidden="true"
          >
            <span className={styles.mark} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
