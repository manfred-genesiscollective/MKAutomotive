// Draws public/forged-carbon.svg: the chopped-fibre texture behind the
// closing call to action. Run `node scripts/forged-carbon.mjs` to redraw it.
//
// The result is fixed by SEED, so the file only changes when the settings do.
// Every shard is a tint of Forged Carbon (#1B1C1F); no other hue is used.
import { writeFileSync } from "node:fs";

const SEED = 20261110;
const WIDTH = 1600;
const HEIGHT = 720;
const SHARDS = 460;
const TINTS = ["#141517", "#17181a", "#1e1f22", "#202125", "#232428", "#27282c"];

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

const groups = new Map(TINTS.map((tint) => [tint, []]));
for (let i = 0; i < SHARDS; i++) {
  const cx = between(-60, WIDTH + 60);
  const cy = between(-60, HEIGHT + 60);
  const length = between(34, 170);
  const breadth = between(10, 58);
  const angle = between(0, Math.PI);
  const corners = [
    [-length / 2, -breadth / 2],
    [length / 2, -breadth / 2],
    [length / 2, breadth / 2],
    [-length / 2, breadth / 2],
  ]
    // Knock each corner about so no two shards share a silhouette.
    .map(([x, y]) => [x + between(-0.22, 0.22) * length, y + between(-0.35, 0.35) * breadth])
    // Some shards lose a corner and become triangles.
    .filter((_, index) => index !== 3 || random() > 0.3)
    .map(([x, y]) => [
      Math.round(cx + x * Math.cos(angle) - y * Math.sin(angle)),
      Math.round(cy + x * Math.sin(angle) + y * Math.cos(angle)),
    ]);
  const tint = TINTS[Math.floor(random() * TINTS.length)];
  groups.get(tint).push(`M${corners.map((point) => point.join(" ")).join("L")}Z`);
}

const paths = [...groups]
  .map(([tint, shapes]) => `<path fill="${tint}" d="${shapes.join("")}"/>`)
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" preserveAspectRatio="xMidYMid slice"><rect width="${WIDTH}" height="${HEIGHT}" fill="#1b1c1f"/>${paths}</svg>\n`;

writeFileSync(new URL("../public/forged-carbon.svg", import.meta.url), svg);
console.log(`forged-carbon.svg: ${SHARDS} shards, ${(svg.length / 1024).toFixed(1)} kB`);
