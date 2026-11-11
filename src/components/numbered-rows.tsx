import { BusinessLogo } from "./business-logo";
import styles from "./numbered-rows.module.css";

type Item = {
  title: string;
  text: string;
  note?: string;
  /** A business's slug: its logo is shown in place of the title. */
  logo?: string;
};

type Props = {
  items: Item[];
  /** Heading level of each row title. */
  as?: "h2" | "h3";
};

/** A ruled list: number, title, description. */
export function NumberedRows({ items, as: Heading = "h3" }: Props) {
  return (
    <ol className={styles.rows}>
      {items.map((item, index) => (
        <li key={item.title} className={styles.row} data-reveal>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          {item.logo ? (
            <Heading className={`${styles.title} ${styles.logoTitle}`}>
              <BusinessLogo slug={item.logo} alt={item.title} size="list" />
            </Heading>
          ) : (
            <Heading className={`h3 ${styles.title}`}>{item.title}</Heading>
          )}
          <div className={styles.text}>
            <p>{item.text}</p>
            {item.note ? <p className={styles.note}>{item.note}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
