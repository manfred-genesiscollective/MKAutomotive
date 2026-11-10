/**
 * How each business logo is drawn (the artwork is in src/assets/logos). Kept
 * apart from the images so the share images can use it on the server.
 *
 * `scale` evens out their weight: Golden Hour and The Car Lounge are a
 * monogram with their words stacked beside it, narrower than the three
 * wordmarks, so they are drawn a little taller. `flakes` moves the forged
 * texture so that no two logos show the same patch of it.
 */
export const LOGO_STYLE: Record<string, { scale: number; flakes: [number, number] }> = {
  swiftdrive: { scale: 1, flakes: [12, 30] },
  revhub: { scale: 1, flakes: [64, 18] },
  "the-car-lounge": { scale: 1.22, flakes: [38, 72] },
  "golden-hour": { scale: 1.12, flakes: [82, 56] },
  "export-sg": { scale: 1, flakes: [26, 88] },
};

/** How see-through a logo is, so the carbon behind it shows a little. */
export const LOGO_OPACITY = 0.86;

/** How strongly the flakes lighten and darken a logo's colours (large sizes). */
export const LOGO_SHADE = 0.36;

/** The width of one repeat of the flakes, as a multiple of a wordmark's height. */
export const LOGO_FLAKE_TILE = 5;
