# Build brief — "What is Agentic Journaling" in four languages

**For:** Claude Code, working in the agenticjournaling-site repo.
**Status:** Phase 1, ready to build. PREREQUISITE: the born-from-line PR must be merged to master first (both touch the homepage); branch after.
**Content:** Four author-approved essays in docs/content/ (en/de/zh/th) — the source of truth. Note: the DE file deliberately uses en dashes ("–") per the German typography standing rule; this is approved.

## 0. Context + the one inviolable rule
This essay plants the flag on the term Johannes coined. **The essay texts are author-approved verbatim — implement without rewording a single sentence. "Agentic Journaling" is never translated in any locale. Every locale page carries correct hreflang links to all siblings.**

## 1. Locked decisions (do not re-litigate)
- Four locales: en (default, unprefixed), de, zh (simplified), th.
- Same slug all locales: what-is-agentic-journaling; locale prefix per APP convention (see §4.0).
- Book links per the one-title-per-language rule: de → Unterwegs um anzukommen → johanneskagerer.de/unterwegsumanzukommen; en/zh/th → Learning to Arrive → learningtoarrive.com. All external links new tab + rel="noopener noreferrer". (Already correct inside the content files — preserve.)
- One quiet link to the EN essay from the homepage (placement: propose in discovery; do not redesign anything).
- JSON-LD Article per page: inLanguage per locale, author Johannes Kagerer, datePublished today.
- Title tags / meta descriptions:
  en: "What is Agentic Journaling? — a definition | agenticjournaling" / "Agentic journaling inverts the AI journal: the agency belongs to your inner parts, not the software. A definition from the practice's origin."
  de: "Was ist Agentic Journaling? — eine Definition | agenticjournaling" / "Agentic Journaling kehrt das KI-Journal um: Die Agency gehört deinen inneren Anteilen, nicht der Software. Eine Definition vom Ursprung der Praxis."
  zh: "什么是 Agentic Journaling？——一个定义 | agenticjournaling" / "Agentic Journaling 反转了 AI 日记：能动性属于你的内在部分，而不是软件。来自这一练习源头的定义。"
  th: "Agentic Journaling คืออะไร — คำนิยาม | agenticjournaling" / "Agentic Journaling พลิกมุมมองบันทึก AI: ความเป็นผู้กระทำเป็นของส่วนต่าง ๆ ภายในตัวคุณ ไม่ใช่ของซอฟต์แวร์"

## 4. Phase 1
### 4.0 Discovery (report, then STOP for approval)
- Read the i18n implementation in ~/agenticjournaling-app: locale codes, routing pattern, language switcher, where strings live. The site MIRRORS the app's conventions. If the app's mechanism doesn't map to static marketing pages, fall back to path prefixes /de /zh /th and say so explicitly.
- Survey this repo: rendering approach for essay pages (page.tsx per locale vs. md/mdx pipeline) — propose the smallest one that fits the existing architecture and design tokens.
- Confirm sitemap mechanism; the four pages must be included.
### 4.z Guardrails (restate before every commit)
- Verbatim content (§0). No summaries, no "improvements"; typographic quotes and the DE en dashes preserved.
- Design: existing tokens only, a reading-measure treatment consistent with the site; no new raw colors.
- Do not touch the First Movers flow.
### Acceptance (done when…)
- [ ] Four pages live on PROD, content verbatim (spot-check one paragraph per locale against docs/content/).
- [ ] hreflang cross-links between all four validate; sitemap includes all four.
- [ ] "Agentic Journaling" untranslated everywhere; book links per locale rule with correct new-tab attributes.
- [ ] Homepage link to the EN essay present.
- [ ] Verified on PROD, on a phone, in all four locales.

## 5. Later phases (do not build)
Phase 2: site chrome (nav/footer/homepage) in four languages. Phase 3: first-movers page + rest.
