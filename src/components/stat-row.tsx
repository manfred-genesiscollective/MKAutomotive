import styles from "./stat-row.module.css";

/** Large figures, each with a short gold tick and a label. */
export function StatRow({
  items,
}: {
  items: { value: string; label: string; business?: string }[];
}) {
  return (
    <div data-reveal>
      <dl
        className={styles.stats}
        style={{ "--columns": items.length } as React.CSSProperties}
      >
        {items.map((item) => (
          <div key={item.label} className={styles.stat}>
            <dt className={styles.label}>
              {item.label}
              {/* The name keeps its own capitals: export.sg is written in lower case. */}
              {item.business ? <span className={styles.business}>{item.business}</span> : null}
            </dt>
            <dd className={styles.value}>
              <span className={`forged-text ${styles.figure}`}>{item.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
