# Briefing — Cohort section: four stations → three

## Why
The First Movers beta invitation now describes **three** sessions, not four. Align the website's "How the cohort works" section so both surfaces tell the same story.

## Source (verified — read live)
File: `app/page.tsx`.
Section `<div className="weeks-container">`. Intro `<p className="weeks-sub">`. Station list `<ol className="weeks-list">`, four `<li className="weeks-item">`:
- Station 1 · Kickoff
- Station 2 · What's showing up
- Station 3 · Going deeper
- Station 4 · Into real life & close

## Change (end state = 3 stations, numbered 1 · 2 · 3)

1. **Remove** Station 2 "What's showing up" entirely.

2. **Station 3 "Going deeper" becomes the new Station 2.** Set its `weeks-number` to `2`. Replace the `weeks-desc` with the merged copy (absorbs the removed station's "first patterns" content):
   > You've been journaling on your own. We look at the first patterns together, let your parts speak, and see where the method can grow.

   Rationale: "let your parts speak" replaces "witnessing each other's committees"; "grow" replaces "do better" — affirmative, and identical to the invitation email's merged session.

3. **Station 4 "Into real life & close" becomes the new Station 3.** Change its `weeks-number` from `4` to `3`. Copy unchanged.

4. **Station 1 "Kickoff" — update the desc to the keyless version** (already locked in the email; the app now starts with no API key or folder):
   > The whole idea, and how it works. We sit together for a first session — and you leave already using it.

Keep the intro `weeks-sub` line as is.

## Discovery needed — do NOT assume
`app/globals.css` was last touched by the commit "Weeks section recomposed: a path with four stations." The `.weeks-list` layout may hardcode a **four-track grid**. Before finishing, read `.weeks-list` and any `weeks-*` rules in `app/globals.css` and adjust the track count 4→3 so three stations sit evenly and centered, preserving the mobile single-column stack. Symptom to avoid: a dangling empty fourth column or an off-center row.

## Acceptance criteria
- Exactly three `.weeks-item` render, numbered 1 · 2 · 3.
- At standard desktop width the three stations sit evenly and centered — no empty fourth track; on mobile they stack in one column.
- All copy affirmative (no "do better"); no numbers, scores, or streaks introduced.
- Wording matches the invitation email's three sessions (Kickoff / Going deeper / Into real life & close).

## Out of scope
Hero, nav, footer, tokens, the CTA button. This is the weeks section's text + its grid track count only.
