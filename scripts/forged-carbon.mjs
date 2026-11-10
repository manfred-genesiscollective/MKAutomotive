// Draws the two forged textures the site is built on. Run
// `node scripts/forged-carbon.mjs` to redraw them.
//
//   src/assets/forged-carbon.svg   the dark surface behind every page
//   src/assets/forged-metal.svg    the same flakes in polished metal, used
//                                  to fill the large headings
//
// Forged carbon is chopped carbon fibre pressed in resin: overlapping flakes,
// each catching the light differently. This draws those flakes as a square
// tile whose edges wrap, so it repeats without a seam.
//
// Every carbon flake is a tint of Forged Carbon (#1B1C1F) and the tints
// average back to that colour. The result is fixed by SEED: the files only
// change when the settings do.
import { writeFileSync } from "node:fs";

const SEED = 20261110;
const TILE = 1000;
const FLAKES = 1500;
const PASSES = 8;

// Flakes come in three sizes: mostly small chips, some medium, a few large.
// [share, min length, max length, min breadth, max breadth]
const SIZES = [
  [0.58, 26, 70, 12, 30],
  [0.32, 60, 120, 20, 46],
  [0.1, 110, 170, 30, 58],
];

// Grey levels (the red channel; green is +1 and blue +4, like the brand
// colour) with how often each is used. Weighted mean: 27, the brand value.
const LEVELS = [
  [13, 0.08],
  [17, 0.14],
  [21, 0.18],
  [25, 0.18],
  [29, 0.15],
  [34, 0.12],
  [40, 0.08],
  [48, 0.05],
  [58, 0.02],
];

// Small seeded generator (mulberry32) so the drawing is repeatable.
let state = SEED;
function random() {
  state |= 0;
  state = (state + 0x6d2b79f5) | 0;
  let t = Math.imul(state ^ (state >>> 15), 1 | state);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const between = (min, max) => min + random() * (max - min);

function pickLevel() {
  let roll = random();
  for (const [level, weight] of LEVELS) {
    if ((roll -= weight) <= 0) return level;
  }
  return LEVELS[LEVELS.length - 1][0];
}

const toHex = (channels) =>
  "#" + channels.map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");

/** A carbon tint: green is +1 and blue +4, as in the brand colour. */
const hex = (level) => toHex([level, level + 1, level + 4]);

/**
 * The same flake in polished metal: dark carbon becomes bright metal and the
 * rare bright flakes become its shadows. Never darker than 140, so lettering
 * filled with it keeps at least 3:1 contrast against the carbon behind it.
 */
const metal = (level) => {
  const tone = Math.max(140, Math.min(255, Math.round(262 - (level - 9) * 2.1)));
  return toHex([tone, tone - 1, tone - 5]);
};

/** Corner points for one flake, turned and placed. */
function place(points, cx, cy, angle) {
  return points.map(([x, y]) => [
    cx + x * Math.cos(angle) - y * Math.sin(angle),
    cy + x * Math.sin(angle) + y * Math.cos(angle),
  ]);
}

/** Every copy of a shape needed for the tile to wrap at its edges. */
function wrapped(points) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const copies = [];
  for (const dx of [-TILE, 0, TILE]) {
    for (const dy of [-TILE, 0, TILE]) {
      if (Math.max(...xs) + dx < 0 || Math.min(...xs) + dx > TILE) continue;
      if (Math.max(...ys) + dy < 0 || Math.min(...ys) + dy > TILE) continue;
      copies.push(
        "M" + points.map(([x, y]) => `${Math.round(x + dx)} ${Math.round(y + dy)}`).join("L") + "Z",
      );
    }
  }
  return copies.join("");
}

// Flakes are drawn in several passes so light and dark ones overlap each
// other in both directions, as they do in the real material.
const passes = Array.from({ length: PASSES }, () => new Map());

for (let i = 0; i < FLAKES; i++) {
  const pass = passes[i % PASSES];
  const cx = between(0, TILE);
  const cy = between(0, TILE);
  let roll = random();
  const size = SIZES.find(([share]) => (roll -= share) <= 0) ?? SIZES[0];
  const length = between(size[1], size[2]);
  const breadth = between(size[3], size[4]);
  const angle = between(0, Math.PI);

  // A strip of fibre, cut roughly: knock each corner about a little.
  let corners = [
    [-length / 2, -breadth / 2],
    [length / 2, -breadth / 2],
    [length / 2, breadth / 2],
    [-length / 2, breadth / 2],
  ].map(([x, y]) => [x + between(-0.16, 0.16) * length, y + between(-0.28, 0.28) * breadth]);
  // Some of the smaller flakes lose a corner and become triangles.
  if (length < 100 && random() < 0.2) corners = corners.slice(0, 3);

  const level = pickLevel();
  if (!pass.has(level)) pass.set(level, []);
  pass.get(level).push(wrapped(place(corners, cx, cy, angle)));

  // Fibres run along the flake, so one long edge often catches the light:
  // a narrow sliver in a slightly lighter or darker tone.
  if (corners.length === 4 && random() < 0.45) {
    const share = between(0.22, 0.45);
    const [a, b, c, d] = corners;
    const mix = (p, q) => [p[0] + (q[0] - p[0]) * share, p[1] + (q[1] - p[1]) * share];
    const sliver = [a, b, mix(b, c), mix(a, d)];
    const tone = Math.max(9, level + (random() < 0.6 ? 6 : -5));
    if (!pass.has(tone)) pass.set(tone, []);
    pass.get(tone).push(wrapped(place(sliver, cx, cy, angle)));
  }
}

/** One tile, with every flake coloured by `colour(level)`. */
function draw(colour, ground) {
  const paths = passes
    .map((pass) =>
      [...pass].map(([level, shapes]) => `<path fill="${colour(level)}" d="${shapes.join("")}"/>`).join(""),
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}" viewBox="0 0 ${TILE} ${TILE}"><rect width="${TILE}" height="${TILE}" fill="${ground}"/>${paths}</svg>\n`;
}

const files = [
  ["forged-carbon.svg", draw(hex, "#1b1c1f")],
  ["forged-metal.svg", draw(metal, "#d9d8d3")],
];
for (const [name, svg] of files) {
  writeFileSync(new URL(`../src/assets/${name}`, import.meta.url), svg);
  console.log(`${name}: ${FLAKES} flakes, ${(svg.length / 1024).toFixed(1)} kB`);
}
