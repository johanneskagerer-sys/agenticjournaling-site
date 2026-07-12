# BRIEFING-TRIAD-RENAME-SITE — Journal · Relate · Integrate on agenticjournaling.com

**Date:** 2026-07-12
**Author:** Miriam (PO chat)
**Status:** Ready for discovery
**Repo:** `agenticjournaling-site` — companion to app BRIEFING-TRIAD-RENAME (app repo, Issue #727)

---

## 1. Intent

The app adopts **Journal · Relate · Integrate** (app brief GO'd, Amendment 1). The marketing site carries the old triad in four places and must speak the same language on the day the app change goes live.

**Language scope:** the site is English-only today — no locale routes, `html lang="en"`. The four-language promise appears only as a copy line on /first-movers. This brief is therefore an EN-only change; localizing the site is a separate future decision.

## 2. Locked changes

PO-verified occurrence map; Code confirms in discovery and flags anything beyond it:

1. **`app/layout.tsx` (~line 17)** — metadata default title becomes
   `agenticjournaling — Journal · Relate · Integrate`
2. **`app/page.tsx` (~line 6)** — page metadata title: same new string.
3. **`app/page.tsx` (~lines 17–18)** — hero eyebrow: `Journal · Relate · Integrate`, dot-span markup pattern unchanged.
4. **`app/page.tsx` (~lines 21–23)** — hero intro currently enacts the old triad ("they listen along with what you journal … integrate what lives inside you"). New copy, locked:
   > Where your inner parts have agency — they meet what you journal, speak in their own voice, and come into relationship with you — helping you see, value and integrate what lives inside you.
   The sentence must keep enacting all three verbs (journal → relate → integrate); wording above is PO-authored, byte-exact.
5. **`app/opengraph-image.tsx`** — the J·L·I mark becomes J·R·I: `alt` string updates to the new triad; the middle word block `Listen` → `Relate`; one-dot-per-word composition unchanged.

## 3. Untouched by decision

- /first-movers page, invitation email (`app/api/first-movers/`), Nav, Footer — verified triad-free.
- The four-language availability line on /first-movers.
- All "Born from …" credit lines and external links.

## 4. Discovery (required before build)

1. Re-run the occurrence sweep across the repo for `Listen` as a triad word (case-sensitive check of `app/`, `components/`, `public/`, `design/`) — confirm the map above is complete; `docs/` copy canon files may also carry the triad: list them and update in the same pass so the canon matches the site.
2. Confirm the OG image renders correctly with the longer middle word (Relate = 6 chars vs Listen = 6 — same length, expect no layout shift; verify anyway in the preview).
3. Confirm no cached/static OG artifacts in `public/` carry the old mark.

## 5. Acceptance criteria

- [ ] Browser-tab title, page metadata, hero eyebrow, hero intro, and OG image (alt + rendered words) all carry Journal · Relate · Integrate; the word Listen appears nowhere as a triad element.
- [ ] Hero intro is byte-exact to the locked copy in 2.4.
- [ ] OG image composition (one dot per word, tokens, layout) is visually unchanged apart from the word swap — verify the rendered image in the preview.
- [ ] First-movers page and invitation email are byte-identical to before.
- [ ] All copy stays affirmative and warm.

## 6. Release coupling

Ship in the same window as the app change: promote this site change when the app's dev→master promotion for BRIEFING-TRIAD-RENAME happens, so site and app never disagree on the triad in production.

## 7. Verification plan (release gate)

PO drives the Vercel preview: page title in the tab, hero eyebrow + intro, OG image via the preview's `/opengraph-image` route, /first-movers unchanged, and a link-unfurl sanity check after production deploy.

---

## Discovery Report

*2026-07-12 · run on `feat/triad-rename` @ 3990fa8 (origin/master). Every claim read in source.*

### §4.1 — Occurrence sweep: the map is complete, two flags

Case-sensitive `Listen` across `app/`, `components/`, `public/`: **exactly the five locked occurrences, nothing beyond**:

| # | Location | Found |
|---|---|---|
| 2.1 | `app/layout.tsx:17` | `default: "agenticjournaling — Journal · Listen · Integrate"` ✓ |
| 2.2 | `app/page.tsx:6` | metadata title, same string ✓ |
| 2.3 | `app/page.tsx:17–18` | `Journal<span className="dot"> · </span>Listen<span className="dot"> · </span>Integrate` ✓ |
| 2.4 | `app/page.tsx:21–23` | "they listen along with what you journal … integrate what lives inside you" ✓ |
| 2.5 | `app/opengraph-image.tsx:4` (alt) + `:71` (word block `Listen`) ✓ |

**Flag 1 — naming precision:** 2.3 is the main `<h1 className="heading-main">`, not an eyebrow. Same change, correct element named here for the record.

**Flag 2 — docs canon:** the only `docs/` hit besides this brief is `BRIEFING-HERO-NAVBAR-CLEARANCE.md:41`, where the old h1 is quoted inside a **historical acceptance criterion** of a shipped brief. That is a record of a past change, not living copy canon — updating it would falsify the archive. **Recommendation: leave historical briefs untouched.** There are no living copy-canon files carrying the triad. (`design/` holds only `tokens.css` — swept, clean.)

Also verified: the `description` metadata (layout.tsx + page.tsx) carries no triad word — stays; /first-movers, the invitation email, Nav and Footer are triad-free, matching §3.

### §4.2 — OG image composition

`opengraph-image.tsx` renders three flex columns, each `dotStyle` above `wordStyle`, with `·` separators — the one-dot-per-word mark. `Relate` and `Listen` are both six characters and the flex layout auto-sizes regardless; no layout shift expected. Rendered check happens on the Vercel preview per §7.

### §4.3 — Static artifacts

`public/` holds only `logo.svg` and `mail.svg` — no cached OG images, nothing carries the old mark.

### Build note

Branched off `master` (not `dev`) as instructed — this keeps the triad rename independent of the unpromoted four-language essay currently sitting on `dev`, which matches the §6 release coupling (this ships with the app's triad promote, the essay ships on its own clock). At merge time the two will meet in `dev`/`master` without conflict (disjoint files).

**Ready to read. Holding for GO before build.**
