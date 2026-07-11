# Build brief — "Born from" line → Learning to Arrive

**For:** Claude Code, working in the agenticjournaling-site repo.
**Status:** Single phase, ready to build. Written from the live rendered site — confirm in discovery.

## 0. The one inviolable rule
English-facing pages never display the German book title or the ad-hoc translation "On the Way to Arrive." The book is "Learning to Arrive", every reference links to https://learningtoarrive.com in a new tab.

## 1. What exists + locked decisions (do not re-litigate)
Footer currently renders: Born from *On the Way to Arrive* by Johannes Kagerer — title links to https://johanneskagerer.de/unterwegsumanzukommen, name links to https://johanneskagerer.de.
- Title becomes "Learning to Arrive", linking to https://learningtoarrive.com (target="_blank" rel="noopener noreferrer"). "On the Way to Arrive" is not the English edition's real title — readers could think it's a different book.
- Author-name link stays unchanged. "Born from" phrasing stays.

## 4. Phase 1
### 4.0 Discovery (report, then STOP for approval)
- Locate the footer credit line; grep the whole repo (incl. first-movers page) for "On the Way to Arrive", "Unterwegs", "unterwegsumanzukommen" — report every hit.
### 4.y Final copy
Born from [Learning to Arrive](https://learningtoarrive.com) by [Johannes Kagerer](https://johanneskagerer.de) — book link new tab + rel="noopener noreferrer".
### 4.z Guardrails
§0 rule everywhere; extra grep hits: report, don't silently change; do not touch the First Movers flow.
### Acceptance
- [ ] Live footer exactly as §4.y, correct link attributes.
- [ ] Repo-wide grep: zero user-visible "On the Way to Arrive".
- [ ] Verified on PROD.
