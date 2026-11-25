# Build brief — Link-preview image that survives small thumbnails

**For:** the implementing agent, working in `agenticjournaling-site`.
**From:** Product (Johannes), written 25 Nov 2026 after reading the repo on `dev` (`1562fd2`).
**Status:** Single phase, ready to build. This is a **redesign of existing code**, not new work. One file holds the whole change: `lib/opengraph-image.tsx`.

---

## 0. Context + the one inviolable rule

When someone pastes agenticjournaling.com into LinkedIn, it shows the site's Open Graph image. In a **comment**, LinkedIn shows that image as a small thumbnail (about 280×190 px on an iPhone, roughly 1.5:1) and **crops the sides**. Johannes commented with the link on 23 Nov 2026. The thumbnail showed "urnal · Relate · Integra" on a pale grey that disappears against LinkedIn's grey, and the domain line was too small to read.

**Inviolable rule:** everything that carries meaning sits inside the **central 630×630 square** of the 1200×630 canvas and can still be read at 280 px wide. The outer 285 px on each side are background only. That way a 1.91:1 card, a 1.5:1 comment crop and a 1:1 square crop all show the complete image.

Brand voice holds: quiet, warm, no hype. Nothing is added that isn't already part of the brand (no slogans, no badges, no "beta" sticker).

## 1. What already exists

- `lib/opengraph-image.tsx` renders the image with `next/og` `ImageResponse`, 1200×630, PNG. It draws three columns, each a dot above a word ("Journal", "Relate", "Integrate", Georgia 96 px), with "·" separators and "agenticjournaling.com" in 28 px italic below, on `#FAFAF8`. The triad is about 1040 px wide, so any crop narrower than the full card cuts into it.
- `app/(locale)/[locale]/opengraph-image.tsx` re-exports from the lib file and declares `dynamic = "force-static"`. It does not change. All four locales share the one image.
- The `alt` export ("agenticjournaling — Journal · Relate · Integrate") feeds `og:image:alt` / `twitter:image:alt` and stays as it is. `og:title` already carries the triad as the card's text, next to the image.
- Brand mark: three dots in a row. See `public/logo.svg` (dots `#6B6560`) and `app/icon.svg` (dots `#2F2F2F` on `#FAFAF8`, r=4 at 10/22/34 on a 44 grid).
- Tokens (`design/tokens.css`, read-only here): `--ground #FAFAF8`, `--ink #2F2F2F`, `--ink-soft #6B6560`, `--line #EDE8E0`, `--accent #b47a5a`, `--font-serif 'Newsreader', Georgia, serif`.

### Locked decisions (do not re-litigate)

1. **Drop the triad words from the image.** The card title already shows "Journal · Relate · Integrate" right next to the thumbnail, so repeating it inside the image was the main reason the content had to be so wide.
2. **The image is the mark plus the name:** the three dots (the logo geometry, scaled up), with **"agenticjournaling"** under them as a wordmark. No domain line, because LinkedIn prints the domain under the title anyway.
3. **Dark ground for contrast:** background `--ink #2F2F2F`, dots and wordmark in `--ground #FAFAF8`. Pale-on-pale was the second failure, since LinkedIn and most feeds are light grey or white. A dark tile stands out in light mode and stays calm in dark mode. Colours come only from existing tokens.
4. **Proportions:** dots about 56 px in diameter with about 44 px gaps (the logo's ratio), wordmark about 72 px serif. The whole lockup is at most about 560 px wide and centred. Use exact values as long as the rule in §0 holds.
5. **Font:** Newsreader if it can be loaded into `ImageResponse` cleanly (a static TTF/OTF read at build time). Otherwise stay on Georgia. Report which in discovery; don't add a runtime fetch to a font CDN.

## 2. Phase 1 — spec

### 2.0 Discovery (do first, report back in words, then STOP)
- Read `node_modules/next/dist/docs/` on `ImageResponse` / metadata image files for this Next.js version (font loading in particular).
- Confirm the two files above are the only Open Graph and Twitter image sources on `dev` (no `twitter-image.*`, no hard-coded `og:image` in a layout or `generateMetadata`).
- Say whether Newsreader can be bundled (see decision 5), and what that adds in file size.
- Note: branch `fix/opengraph-image-orphaned-by-root-split` exists on origin. Check whether it touches these files and whether it is already contained in `dev`. If it isn't, report it and don't merge it on your own.
- Report the plan, then wait for approval.

### 2.1 Build
- Rewrite the JSX in `lib/opengraph-image.tsx` according to the locked decisions. Keep the exports `alt`, `size`, `contentType` and `default` unchanged.
- Work on `fix/og-image-thumbnail` off `dev` and open a PR into `dev`.

### 2.2 Guardrails
- Meaning stays inside the central 630×630 (§0). Nothing goes in the side 285 px bands.
- Only existing token colours. `design/tokens.css` is not touched.
- No new copy beyond "agenticjournaling". No numbers, no "beta", no claims.
- No commit or push to `master`. Promotion happens only on Johannes' explicit go.

### Acceptance criteria
- [ ] `npm run build` green, `npm run lint` clean.
- [ ] The rendered PNG is taken from the local build (`npm run build && npm start`, then fetch `/en/opengraph-image…`, or read the file from `.next`) and attached to the PR as an image.
- [ ] The same PNG is attached in three crops: the full 1200×630, a **centred 1.5:1** crop scaled to 280 px wide, and a **centred 1:1** crop scaled to 190 px. The full mark and the full wordmark must be visible and readable in all three.
- [ ] Wordmark contrast on the ground is at least 4.5:1. `#FAFAF8` on `#2F2F2F` is well above that; state the figure.
- [ ] The image route resolves for `/`, `/de`, `/zh`, `/th` (same image), checked in the local build.
- [ ] After Johannes promotes: one check that `og:image` on agenticjournaling.com serves the new PNG, then re-scrape with LinkedIn Post Inspector (linkedin.com/post-inspector) so new shares pick it up. Comments already posted may keep the old preview; that is expected.

## 3. Open questions for Johannes (flag, don't decide)
- ~~Light vs. dark ground~~ LOCKED dark, see §1.3. Reverse only if he prefers the accent `#b47a5a` as the ground; same layout, swap one value.
- Should the X/Twitter card get its own `twitter-image` later? Not needed now: `summary_large_image` uses the same file.
