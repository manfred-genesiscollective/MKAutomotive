import styles from "./logo.module.css";

/*
 * The MK monogram: an M whose right half carries the arm and leg of a K.
 * One path, so it can be filled with a colour, or used as a mask over a
 * texture (see src/assets/mk-mark.svg, which holds the same outline).
 */
const MARK =
  "M0 0 319 319 638 0V743H542V385L317 610 430 743H322L222 630V743H132V250L95 213V743H0ZM222 340 319 437 542 214V275L222 595Z";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 638 743"
      aria-hidden="true"
      focusable="false"
    >
      <path d={MARK} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** The monogram in champagne gold. Purely visual: label the link around it. */
export function Logo({ size = "regular" }: { size?: "regular" | "large" }) {
  return (
    <span className={`${styles.logo} ${size === "large" ? styles.large : ""}`}>
      <LogoMark className={styles.mark} />
    </span>
  );
}
