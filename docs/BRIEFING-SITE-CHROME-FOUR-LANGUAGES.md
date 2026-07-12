# BRIEFING-SITE-CHROME-FOUR-LANGUAGES — Site chrome speaks all four languages

Supersedes the BRIEFING-SITE-LANGUAGE block (drafted against the app repo, never committed). This is the essay roadmap's Phase 2, plus the homepage-embedded First Movers content.

## Grounding (from Discovery, 2026-07-12 — treat as verified)
- Site lives in ~/agenticjournaling-site: own remote, own Next.js app, flat docs/, its own brief conventions (issue step dropped).
- Essay already ships four locales: en unprefixed, /de /zh /th prefixed, force-static, hreflang via Next metadata, JSON-LD. Architecture is settled — extend it; v1's route-vs-toggle question is withdrawn.
- Site typography is Newsreader everywhere, including Nav.tsx. The switcher uses the existing type system; the site keeps its single typeface.
- Reference for default-language logic: app-dev/src/lib/i18n/locale.ts → browserDefaultLocale().

## Build (single pass — no second gate)
1. Extend the per-locale route pattern to the homepage: / (en), /de, /zh, /th. Localize nav, hero, "What is agentic journaling?", the First Movers block incl. FirstMoversForm (all visible states: labels, placeholders, buttons, confirmation), and footer.
2. Language control in the nav: quiet text control "EN · DE · 中文 · ไทย", present on first render on every localized page (homepage and essay). Switching keeps the visitor on the current page in the new language. Site tokens, existing typeface.
3. Head per locale: <html lang>, localized title + meta description, hreflang across all four + x-default=en — on homepage and essay alike.
4. First visit honors the browser language (port browserDefaultLocale(): prefix-match navigator.languages against {en,de,zh,th}, fallback en). An explicit switch persists and wins on return visits. Direct links to /de /zh /th are always respected as-is. Mechanism (middleware vs first-paint redirect on /) is your call, consistent with the hybrid deployment and force-static — document it in the PR.
5. Proper names stay in every locale: agenticjournaling, First Movers, Learning to Arrive, Kickoff.
6. Structure: a future fifth locale = one dictionary/content file + one switcher entry.

## Copy
DE (approved — use verbatim; where the shipped essay already fixed a term, the essay's wording wins; note it in the PR):
- Lead paragraph: "Wo deine inneren Anteile Handlungsraum haben — sie begegnen dem, was du schreibst, sprechen mit eigener Stimme und treten in Beziehung zu dir — damit du sehen, würdigen und integrieren kannst, was in dir lebt."
- "Built to be inhabited, not subscribed to." → "Gebaut, um bewohnt zu werden — ein Zuhause statt eines Abos."
- "What is agentic journaling?" → "Was ist agentic journaling?"
- "Join the First Movers" → "Werde Teil der First Movers"
- "How the cohort works" → "So funktioniert die Kohorte"
- Token line: "Sobald dein Token ankommt, kannst du die App erkunden. Kurz darauf folgt unser Kickoff – ich melde mich bald bei dir, um unsere erste Session zu planen."
- Station 1 "Kickoff" → "Kickoff" · body: "Was war dein erster Eindruck? Worum geht es deinem Gefühl nach — und wie funktioniert es? Wo könnte es sich leichter oder klarer anfühlen?"
- Station 2 "Going deeper" → "Tiefer gehen" · body: "Was beginnst du in dir zu sehen? Was wünschst du dir? Und wie fühlen sich die Übersetzungen an?"
- Station 3 "Into real life & close" → "Ins echte Leben & Abschluss" · body: "Wo hat es eine echte Entscheidung berührt? Was hat sich für dich verändert? Wohin darf die Methode als Nächstes gehen?"
- "Born from Learning to Arrive" → "Entstanden aus Learning to Arrive"
- © line unchanged.

Triad "Journal · Relate · Integrate": direct lookup — mirror the essay's shipped per-locale wording (commit "triad wording listen → relate (all four languages)"). Where essay and app dictionaries diverge on shared terms, the site follows its essay; list divergences in the PR for a follow-up.

ZH/TH chrome strings: translate following the essay's zh/th register, with the app's zh/th dictionaries as reference for shared terms.

## Out of scope
Email templates · app changes · standalone routes beyond homepage + essay (a separate first-movers route, if one exists, holds for the next slice — the homepage-embedded block ships localized so every shipped surface reads fully in one language).

## Acceptance
- /, /de, /zh, /th each render the full homepage in one language, form states included.
- Nav + footer localized on homepage and essay; switcher on all localized pages, preserving the current page across locales.
- <html lang>, title, meta, hreflang (four + x-default) correct per locale on every localized page.
- de/zh/th browser on first visit lands in its language; an explicit choice persists across visits.
- Typography and design otherwise unchanged; zero new font imports.

## Verification (Claude drives the preview, adversarial first)
th-browser first visit → Thai homepage · switch to DE on the essay → same essay in German → reload persists · direct /zh link under an en browser stays Chinese · DOM check of lang/hreflang/title/meta in all four · full read of all four homepages for stray-language strings · DE form pass incl. confirmation.

## Amendment 1 — Discovery response (GO)
1. Repo/branch: ~/agenticjournaling-site, feat/chrome-four-languages off the main line. Flat docs/, site conventions apply.
2. Locale set: all four — chrome in two of four would seat zh/th essay readers in foreign chrome.
3. Architecture: settled by the shipped essay pattern; extend it. v1's choose-step withdrawn.
4. First Movers: homepage-embedded content and form in scope; a standalone route waits for the next slice.
5. Triad: essay's shipped wording per locale via direct lookup; site↔app divergences listed in the PR.
GO — build straight through, document mechanism choices in the PR.
