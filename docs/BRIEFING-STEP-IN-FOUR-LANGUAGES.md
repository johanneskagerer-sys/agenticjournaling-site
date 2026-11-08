# BRIEFING — Step in, in four languages

**Date:** 2026-11-08 · **Tier:** Standard (localized route, API accepts a locale, four mail templates; no stored data) · **Estimate (Claude, before build):** 1 session, ~90 min.

## The one rule
Everything a person meets on the way in speaks their language: the step-in page, the form, the confirmation, the invitation mail. One source per string (`lib/chrome.ts`), no copy that exists in English only.

## Owner's words
„Schau bitte auch sonst noch auf die anderen Seiten, was ist agenticjournaling etc., ob wir da mit den neuesten Produktentwicklungen etwas verbessern sollten, und dann muss auch noch die Mail angepasst werden. Und das immer in allen Sprachen. Auch die Anpassungen auf der Webseite müssen in allen Sprachen stattfinden."

## What exists (discovery, 2026-11-08)
- `/step-in` lives in the unlocalized `(marketing)` root layout, `lang="en"`, English only; the form posts to `/api/first-movers`, which mails one English template.
- The essay (four locales, author-approved verbatim, guarded by `scripts/check-essay-verbatim.mjs`) ends with „a small First Movers cohort is walking the first steps together — human-led, three sessions, unhurried" in all four languages — the last cohort sentence on the site.
- The mail's „Gentle ask" (start in English, then switch) was a comparison request from the July invitations.
- Product since the essay was written: a key of your own (BYOK), the map of parts and how they relate, the protecting part asked first, earlier writing brought in and searchable, a room that rests and recovers instead of failing — none of it named on the site.

## What changes
1. **Route:** `/step-in` moves under `app/(locale)/[locale]/step-in/` (`/step-in`, `/de/step-in`, `/zh/step-in`, `/th/step-in`); `RouteKey` gains `stepin`; proxy treats `/step-in` like the essay (cookie, then Accept-Language; `/en/step-in` → `/step-in`); Nav switcher keeps the person on step-in; sitemap + hreflang per locale. The `(marketing)` root layout goes (no page left in it); `/first-movers` keeps redirecting to `/step-in`.
2. **Page copy, four locales** in `lib/chrome.ts` (`stepIn` block): heading „Step in and have a seat", intro with his line, a short **What's inside** list naming the product as it is today (the room · your parts and how they relate · your earlier writing, brought in and searchable · a key of your own or mine · everything on your device), form labels, button, help, confirmation and error lines.
3. **Mail, four locales:** `renderInvitation(name, locale)`; subject per locale; stations reuse `CHROME[locale].stations`; the „Gentle ask" becomes „The app speaks English, German, Chinese and Thai – choose yours in settings"; footer „made by". Look unchanged.
4. **API:** body gains `locale` (validated with `isLocale`, else `en`); response messages per locale.
5. **Essay, four locales:** the one cohort sentence becomes an invitation to step in, linking `https://agenticjournaling.com/step-in`. Everything else verbatim. Owner's eye before promote (his authored text).

## Data and state
None stored. External side effect unchanged in kind (one mail per submit), now in the person's language.

## Acceptance
- `npm run build`, `npm run lint`, `node scripts/check-essay-verbatim.mjs` green (link assertion follows the new href).
- Built HTML of `/step-in`, `/de/step-in`, `/zh/step-in`, `/th/step-in` carries the heading, his line and the What's-inside list in that language; no „cohort / Kohorte / beta / First Movers / Kickoff" on any built page.
- Local server: `/first-movers` → 308 `/step-in`; `/en/step-in` → 307 `/step-in`; `/step-in` with `Accept-Language: de` → 307 `/de/step-in`.
- `renderInvitation` rendered for all four locales (node script) carries the locale's strings and the token link; no English leaks into DE/ZH/TH.
- After the owner's promote: one read of `/step-in`, `/de/step-in`, `/de/what-is-agentic-journaling`.

## Approved
Build go: the owner's request above (2026-11-08). DE/ZH/TH strings and the essay sentence are Claude's rendering for his eye before promote.
