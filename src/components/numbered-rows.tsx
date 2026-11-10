import styles from "./numbered-rows.module.css";

type Item = { title: string; text: string; note?: string };

type Props = {
  items: Item[];
  /** Heading level of each row title. */
  as?: "h2" | "h3" | "h4";
  /** Replaces the running number, for example a stage number. */
  labels?: string[];
};

/** A ruled list: number, title, description. */
export function NumberedRows({ items, as: Heading = "h3", labels }: Props) {
  return (
    <ol className={styles.rows}>
      {items.map((item, index) => (
        <li key={item.title} className={styles.row} data-reveal>
          <span className={styles.number}>
            {labels?.[index] ?? String(index + 1).padStart(2, "0")}
          </span>
          <Heading className={`h3 ${styles.title}`}>{item.title}</Heading>
          <div className={styles.text}>
            <p>{item.text}</p>
            {item.note ? <p className={styles.note}>{item.note}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
