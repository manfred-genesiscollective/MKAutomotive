import type { ReactNode } from "react";

import styles from "./label-rows.module.css";

/** Rows with a small label on the left and prose on the right. */
export function LabelRows({ rows }: { rows: { label: string; content: ReactNode }[] }) {
  return (
    <div className={styles.rows}>
      {rows.map((row) => (
        <section key={row.label} className={styles.row} data-reveal>
          <h2 className={`eyebrow ${styles.label}`}>{row.label}</h2>
          <div className={styles.content}>{row.content}</div>
        </section>
      ))}
    </div>
  );
}
