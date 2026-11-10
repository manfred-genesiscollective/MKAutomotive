import type { ReactNode } from "react";

import { Dotted } from "./dotted";
import styles from "./section-heading.module.css";

type Props = {
  eyebrow?: string;
  title: string;
  /** Use "small" for sections lower in a page's hierarchy. */
  size?: "regular" | "small";
  children?: ReactNode;
};

/** Label, heading and optional intro at the top of a section. */
export function SectionHeading({ eyebrow, title, size = "regular", children }: Props) {
  return (
    <div className={styles.heading} data-reveal>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className={size === "small" ? "h2 h2--sm" : "h2"}>
        <Dotted>{title}</Dotted>
      </h2>
      {children ? <div className={styles.intro}>{children}</div> : null}
    </div>
  );
}
