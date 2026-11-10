import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { businesses } from "@/content/businesses";

/**
 * The image shown when a page is shared on social media or in a chat app.
 * Drawn in code so it always matches the site: carbon, pearl and one red dot.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const CARBON = "#1b1c1f";
const PEARL = "#eeece6";
const ROSSO = "#d40000";
const MUTED = "#9a9996";

const assets = join(process.cwd(), "src/assets");
const [semiBold, medium, mono, texture] = await Promise.all([
  readFile(join(assets, "fonts/Geist-SemiBold.ttf")),
  readFile(join(assets, "fonts/Geist-Medium.ttf")),
  readFile(join(assets, "fonts/GeistMono-Regular.ttf")),
  readFile(join(assets, "forged-carbon.svg")),
]);
const textureUrl = `data:image/svg+xml;base64,${texture.toString("base64")}`;

const MK =
  "M15.2 71H0V0h20.3l18.1 51.7L56.4 0h20.3v71H61.5V25L44.8 70.8h-13L15.2 25v46ZM103.7 71H88.5V0h15.2v31l25.8-31h17.7l-26.1 31.3L148.8 71h-17.3l-20.4-29.5-7.4 8.6V71Z";

type Options = {
  /** Small label above the headline, for example "01 · Drive". */
  eyebrow?: string;
  /** Headline lines. A final full stop is drawn in red. */
  lines: string[];
  /** One line under the headline. */
  subtitle?: string;
};

export function renderOgImage({ eyebrow, lines, subtitle }: Options) {
  const headlineSize = lines.length > 1 ? 132 : 124;

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
          padding: "64px 72px",
          background: CARBON,
          color: PEARL,
          fontFamily: "Geist",
        }}
      >
        {/* The forged-carbon surface, with the brand colour laid over it
            more heavily on the left, where the words are. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- drawn into an image, not a page */}
        <img
          src={textureUrl}
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
              "linear-gradient(90deg, rgba(27,28,31,0.62) 0%, rgba(27,28,31,0.5) 55%, rgba(27,28,31,0.12) 100%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="84" height="32" viewBox="0 0 186 71">
            <path d={MK} fill={PEARL} />
            <path d="M160 71h11.5L186 0h-11.5L160 71Z" fill={ROSSO} />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: -0.4 }}>
            Automotive Group
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 26,
                fontFamily: "Geist Mono",
                fontSize: 22,
                letterSpacing: 2.4,
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              <div style={{ width: 28, height: 4, background: ROSSO }} />
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
                  fontSize: headlineSize,
                  fontWeight: 600,
                  letterSpacing: headlineSize * -0.048,
                  lineHeight: 1,
                }}
              >
                {dotted ? line.slice(0, -1) : line}
                {dotted ? <span style={{ color: ROSSO }}>.</span> : null}
              </div>
            );
          })}
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 30,
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
          <div style={{ display: "flex", gap: 34 }}>
            {businesses.map((business) => (
              <div key={business.slug} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 8, height: 8, background: ROSSO }} />
                {business.stage.label}
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>Singapore</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: semiBold, style: "normal", weight: 600 },
        { name: "Geist", data: medium, style: "normal", weight: 500 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
