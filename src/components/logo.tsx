import styles from "./logo.module.css";

/*
 * "MK" drawn from the outlines of Geist Bold, so the mark does not depend on
 * a font being loaded, followed by one slanted Rosso Corsa stripe.
 */
const MK =
  "M15.2 71H0V0h20.3l18.1 51.7L56.4 0h20.3v71H61.5V25L44.8 70.8h-13L15.2 25v46ZM103.7 71H88.5V0h15.2v31l25.8-31h17.7l-26.1 31.3L148.8 71h-17.3l-20.4-29.5-7.4 8.6V71Z";
const STRIPE = "M160 71h11.5L186 0h-11.5L160 71Z";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 186 71"
      aria-hidden="true"
      focusable="false"
    >
      <path d={MK} fill="currentColor" />
      <path d={STRIPE} fill="var(--rosso)" />
    </svg>
  );
}

/** The mark with "Automotive Group" beside it. Purely visual: label the link. */
export function Logo({ size = "regular" }: { size?: "regular" | "large" }) {
  return (
    <span className={`${styles.logo} ${size === "large" ? styles.large : ""}`}>
      <LogoMark className={styles.mark} />
      <span className={styles.word}>Automotive Group</span>
    </span>
  );
}
