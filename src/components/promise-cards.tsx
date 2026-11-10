import styles from "./promise-cards.module.css";

/** Small cards for a business's promises to its customers. */
export function PromiseCards({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul
      className={styles.cards}
      // Six cards read best as three across, four as four across.
      style={{ "--columns": items.length % 3 === 0 ? 3 : 4 } as React.CSSProperties}
    >
      {items.map((item) => (
        <li key={item.title} className={styles.card} data-reveal>
          <span className={styles.tick} aria-hidden="true" />
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.text}>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
