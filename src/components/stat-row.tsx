import styles from "./stat-row.module.css";

/** Large figures, each with a short red tick and a label. */
export function StatRow({
  items,
  note,
}: {
  items: { value: string; label: string }[];
  note?: string;
}) {
  return (
    <div data-reveal>
      <dl
        className={styles.stats}
        style={{ "--columns": items.length } as React.CSSProperties}
      >
        {items.map((item) => (
          <div key={item.label} className={styles.stat}>
            <dt className={styles.label}>{item.label}</dt>
            <dd className={styles.value}>{item.value}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className={`meta ${styles.note}`}>{note}</p> : null}
    </div>
  );
}
