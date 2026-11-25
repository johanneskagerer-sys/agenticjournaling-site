import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// `dynamic` is route-segment config — Next.js requires it declared literally
// in each app/**/opengraph-image.tsx file, not re-exported from here.
export const alt = "agenticjournaling — Journal · Relate · Integrate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link previews crop the sides: a LinkedIn comment shows ~1.5:1, some feeds a
// square. Everything that carries meaning stays inside the central 630×630
// square (docs/BRIEFING-OG-IMAGE-THUMBNAIL.md §0); the side bands are ground only.
//
// The mark is public/logo.svg scaled 7× (r=4 → 28, centres 12 apart → 84).
// The wordmark is Newsreader at 64 px, ~497 px wide → ~66 px of ground on each
// side inside the square (72 px would leave only ~35).
//
// lib/fonts/newsreader-og.ttf is Newsreader (OFL, lib/fonts/OFL.txt) fixed at
// wght 400 / opsz 72 and cut to the glyphs of "agenticjournaling" (3.4 KB).
// It covers no other characters: changing the wordmark means rebuilding the
// subset (commands in the PR that added it).

const GROUND = "#2F2F2F"; // --ink
const FIGURE = "#FAFAF8"; // --ground

const DOT = 56;
const DOT_GAP = 28;

export default async function Image() {
  const newsreader = await readFile(
    join(process.cwd(), "lib/fonts/newsreader-og.ttf")
  );

  const dot = {
    width: `${DOT}px`,
    height: `${DOT}px`,
    borderRadius: "50%",
    background: FIGURE,
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: GROUND,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", gap: `${DOT_GAP}px`, marginBottom: "56px" }}>
          <div style={dot} />
          <div style={dot} />
          <div style={dot} />
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Newsreader",
            fontSize: "64px",
            fontWeight: 400,
            lineHeight: 1,
            color: FIGURE,
          }}
        >
          agenticjournaling
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Newsreader", data: newsreader, weight: 400, style: "normal" }],
    }
  );
}
