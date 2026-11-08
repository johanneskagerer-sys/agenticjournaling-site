# BRIEFING — Step in and have a seat

**Date:** 2026-11-08 · **Tier:** Standard (copy + one route rename, no data) · **Estimate (Claude, before build):** 1 session, ~40 min.

## The one rule
agenticjournaling is a live product. The site never calls it a test, beta, pilot or cohort, and never calls the people in it testers. The relationship is a gift with a wish in return: Johannes carries the costs for now and would love to hear what it does for people.

## Owner's words
- „Ich möchte agenticjournaling nicht mehr als Test App bezeichnen mit Kohorte und so, sondern als reales Produkt."
- „Step in and have a seat. Es geht ja wirklich um das Platznehmen."
- „I am still covering costs and ideally get some feedback in return in this early stage."

## What changes
- `/first-movers` → `/step-in` (permanent redirect kept for old links). Heading „Step in and have a seat"; intro carries cost + feedback wish; note names *a key of your own* (BYOK) as the way to carry one's own cost.
- Homepage: CTA „Step in" (DE „Tritt ein"), section „What I’d love to hear" with three listening stations (First impressions · Going deeper · Into real life) replacing „How the cohort works" / Kickoff.
- Invitation email: „agenticjournaling is ready", „You asked to step in", conversation offered at the person's pace, same three stations, footer „made by".
- Unchanged: `/api/first-movers`, `FIRST_MOVERS_TOKEN`, the shared token id — nothing deployed is re-keyed; existing deep links keep working.
- DE strings in `lib/chrome.ts` are Claude's rendering, proof-read three times, for Johannes' eye before promote; zh/th drafted in the same register.

## Data and state
None. No stored data, no external side effect beyond the redirect.

## Discovery (done 2026-11-08, in words)
Live site read on agenticjournaling.com (/, /de, /first-movers): „Join the First Movers", „How the cohort works", meta „Join the first cohort"; email preheader „The beta is open". `~/agenticjournaling-landing` has no commits or remote — not deployed, untouched.

## Acceptance
- `npm run build`, `npm run lint`, `node scripts/check-essay-verbatim.mjs` green.
- `.next/server/app/step-in.html` and the four home locales carry no „cohort", „beta", „First Movers", „Kickoff".
- `/first-movers` answers 308 → `/step-in` locally.
- After the owner's promote: one read of agenticjournaling.com, /de, /step-in, /first-movers.

## Approved
2026-11-08 — Johannes: „Ich überlasse das dir, du wirst die richtige Entscheidung treffen." (decision: cost/feedback line on the public page and in the mail).
