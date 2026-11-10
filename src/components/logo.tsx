import { MK_MARK } from "@/lib/mk-mark";

import styles from "./logo.module.css";

/** The monogram in champagne gold. Purely visual: label the link around it. */
export function Logo({ size = "regular" }: { size?: "regular" | "large" }) {
  return (
    <span className={`${styles.logo} ${size === "large" ? styles.large : ""}`}>
      <svg className={styles.mark} viewBox={MK_MARK.viewBox} aria-hidden="true" focusable="false">
        <path d={MK_MARK.path} fill="currentColor" fillRule="evenodd" />
      </svg>
    </span>
  );
}
