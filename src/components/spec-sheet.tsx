import styles from "./spec-sheet.module.css";

type Props = {
  title: string;
  status: { label: string; live: boolean };
  rows: { label: string; value: string; href?: string }[];
};

/** A compact data sheet: label on the left, fact on the right. */
export function SpecSheet({ title, status, rows }: Props) {
  return (
    <div className={styles.sheet}>
      <div className={styles.head}>
        <p className="meta">{title}</p>
        <p className={styles.status}>
          <span className={status.live ? styles.live : styles.pending} aria-hidden="true" />
          {status.label}
        </p>
      </div>
      <dl className={styles.rows}>
        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <dt className="meta">{row.label}</dt>
            <dd className={styles.value}>
              {row.href ? (
                <a
                  href={row.href}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.value} <span aria-hidden="true">↗</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
