import type { ReactNode } from "react";

import { Dotted } from "./dotted";
import styles from "./cta-band.module.css";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  /** Buttons or links. */
  children: ReactNode;
  surface?: "carbon" | "glass";
};

/** The closing call to action on a page. */
export function CtaBand({ eyebrow, title, text, children, surface = "carbon" }: Props) {
  return (
    <section
      className={`section surface-${surface} ${surface === "carbon" ? styles.ruled : ""}`}
    >
      <div className={`container ${styles.band}`} data-reveal>
        <div className={styles.copy}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className={`h2 ${styles.title}`}>
            <Dotted>{title}</Dotted>
          </h2>
          {text ? <p className={`body ${styles.text}`}>{text}</p> : null}
        </div>
        <div className="button-row">{children}</div>
      </div>
    </section>
  );
}
