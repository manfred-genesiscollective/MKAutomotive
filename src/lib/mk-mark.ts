/**
 * The outline of the MK monogram: an M whose right half carries the arm and
 * leg of a K. One path, filled with the even-odd rule.
 *
 * Used by the logo (src/components/logo.tsx) and the share images
 * (src/lib/og-image.tsx). Two files hold their own copy because they cannot
 * import this one: src/assets/mk-mark.svg (the shape of the forged emblem)
 * and src/app/icon.svg (the browser icon).
 */
export const MK_MARK = {
  viewBox: "0 0 638 743",
  width: 638,
  height: 743,
  path: "M0 0 319 319 638 0V743H542V385L317 610 430 743H322L222 630V743H132V250L95 213V743H0ZM222 340 319 437 542 214V275L222 595Z",
} as const;
