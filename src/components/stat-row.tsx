import styles from "./stat-row.module.css";

/** Large figures, each with a short gold tick and a label. */
export function StatRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div data-reveal>
      <dl
        className={styles.stats}
        style={{ "--columns": items.length } as React.CSSProperties}
      >
        {items.map((item) => (
          <div key={item.label} className={styles.stat}>
            <dt className={styles.label}>{item.label}</dt>
            <dd className={styles.value}>
              <span className={`forged-text ${styles.figure}`}>{item.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
