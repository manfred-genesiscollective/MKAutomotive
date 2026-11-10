import type { ReactNode } from "react";

import { Dotted } from "./dotted";
import styles from "./page-hero.module.css";

type Props = {
  /** Small label above the headline. */
  eyebrow?: string;
  /** One entry per line. End the last line with a full stop to get the red dot. */
  title: string[];
  /** "home" is the largest; "long" suits headlines of four words or more. */
  size?: "home" | "page" | "long";
  /** Usually the lede. Sits under a hairline below the headline. */
  children?: ReactNode;
  /** Set false on the home page, where the lede has no rule above it. */
  ruled?: boolean;
};

/** The top of every page: label, huge headline, lede. */
export function PageHero({ eyebrow, title, size = "page", children, ruled = true }: Props) {
  const sizeClass =
    size === "home" ? "display" : size === "long" ? "display display--long" : "display display--page";

  return (
    <section className={`forged-reveal ${styles.hero} ${size === "home" ? styles.home : ""}`}>
      <div className="container">
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
    </section>
  );
}
