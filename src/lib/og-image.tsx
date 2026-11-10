import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { businesses } from "@/content/businesses";
import { site } from "@/content/site";

import { MK_MARK } from "./mk-mark";

/**
 * The image shown when a page is shared on social media or in a chat app.
 * Drawn in code so it always matches the site: forged carbon, forged-metal
 * lettering, the gold monogram and one gold dot.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const CARBON = "#1b1c1f";
const PEARL = "#eeece6";
const GOLD = "#bd9c66";
const MUTED = "#9a9996";

const assets = join(process.cwd(), "src/assets");
const [display, medium, mono, carbon, metal] = await Promise.all([
  readFile(join(assets, "fonts/Saira-ExtraBoldItalic.woff")),
  readFile(join(assets, "fonts/Geist-Medium.ttf")),
  readFile(join(assets, "fonts/GeistMono-Regular.ttf")),
  readFile(join(assets, "forged-carbon.svg")),
  readFile(join(assets, "forged-metal.svg"), "utf8"),
]);

const svgUrl = (svg: string | Buffer) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

const carbonUrl = svgUrl(carbon);
const metalUrl = svgUrl(metal);

/** The monogram cut from forged metal: the texture, clipped to the mark. */
const emblemUrl = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MK_MARK.viewBox}">` +
    `<defs><clipPath id="mark"><path clip-rule="evenodd" d="${MK_MARK.path}"/></clipPath></defs>` +
    `<g clip-path="url(#mark)"><g transform="translate(-150 -90) scale(0.94)">` +
    metal.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "") +
    `</g></g></svg>`,
);

type Options = {
  /** Small label above the headline, for example "01 · Drive". */
  eyebrow?: string;
  /** Headline lines. A final full stop is drawn in gold. */
  lines: string[];
  /** One line under the headline. */
  subtitle?: string;
  /** Show the forged monogram on the right. Needs a short headline. */
  emblem?: boolean;
};

/**
 * Roughly how wide a line is in Saira ExtraBold Italic, in em. Counting
 * characters is not enough: capitals are much wider than small letters. The
 * figures err on the wide side, so a headline sized from them fits.
 */
function emWidth(line: string): number {
  let width = 0;
  for (const character of line) {
    if (/[MW]/.test(character)) width += 0.95;
    else if (/[A-Z0-9&]/.test(character)) width += 0.64;
    else if (/[iljft.,:;'’! ]/.test(character)) width += 0.36;
    else if (/[mw]/.test(character)) width += 0.8;
    else width += 0.56;
  }
  return width;
}

export function renderOgImage({ eyebrow, lines, subtitle, emblem = false }: Options) {
  // Keep the headline on one line inside the width that is free: all of it,
  // or what the emblem leaves.
  const room = emblem ? 720 : 1040;
  const headlineSize = Math.round(Math.min(124, room / Math.max(...lines.map(emWidth))));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "60px 72px",
          background: CARBON,
          color: PEARL,
          fontFamily: "Geist",
        }}
      >
        {/* The forged-carbon surface, with the brand colour laid over it
            more heavily on the left, where the words are. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- drawn into an image, not a page */}
        <img
          src={carbonUrl}
          alt=""
          width={1200}
          height={1200}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(12,13,16,0.8) 0%, rgba(12,13,16,0.7) 55%, rgba(12,13,16,0.5) 100%)",
          }}
        />
        {/* One soft reflection, as on the site's glass. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "linear-gradient(116deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.07) 55%, rgba(255,255,255,0) 70%)",
          }}
        />

        {emblem ? (
          // eslint-disable-next-line @next/next/no-img-element -- drawn into an image, not a page
          <img
            src={emblemUrl}
            alt=""
            width={270}
            height={314}
            style={{ position: "absolute", top: 130, right: 72, opacity: 0.74 }}
          />
        ) : null}

        <svg width="55" height="64" viewBox={MK_MARK.viewBox}>
          <path d={MK_MARK.path} fill={GOLD} fillRule="evenodd" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 22,
                fontFamily: "Geist Mono",
                fontSize: 22,
                letterSpacing: 2.4,
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              <div style={{ width: 28, height: 4, background: GOLD }} />
              {eyebrow}
            </div>
          ) : null}
          {lines.map((line, index) => {
            const dotted = index === lines.length - 1 && line.endsWith(".");
            return (
              <div
                key={line}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  fontFamily: "Saira",
                  fontStyle: "italic",
                  fontWeight: 800,
                  fontSize: headlineSize,
                  letterSpacing: headlineSize * -0.018,
                  lineHeight: 1.02,
                }}
              >
                {/* Forged-metal lettering: the texture shows through the letters. */}
                <span
                  style={{
                    paddingRight: headlineSize * 0.1,
                    marginRight: headlineSize * -0.1,
                    backgroundColor: "#d9d8d3",
                    backgroundImage: `url(${metalUrl})`,
                    backgroundSize: `${headlineSize * 3.75}px ${headlineSize * 3.75}px`,
                    backgroundPosition: `${headlineSize * 0.27}px ${headlineSize * (0.2 - index * 1.02)}px`,
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {dotted ? line.slice(0, -1) : line}
                </span>
                {dotted ? <span style={{ color: GOLD }}>.</span> : null}
              </div>
            );
          })}
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 26,
                maxWidth: 940,
                fontSize: 36,
                fontWeight: 500,
                letterSpacing: -0.8,
                lineHeight: 1.25,
                color: "#c0beba",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 26,
            borderTop: "1px solid rgba(238, 236, 230, 0.2)",
            fontFamily: "Geist Mono",
            fontSize: 19,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", gap: 30 }}>
            {businesses.map((business) => (
              <div key={business.slug} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 8, height: 8, background: GOLD }} />
                {business.stage.label}
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>{site.name}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Saira", data: display, style: "italic", weight: 800 },
        { name: "Geist", data: medium, style: "normal", weight: 500 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
