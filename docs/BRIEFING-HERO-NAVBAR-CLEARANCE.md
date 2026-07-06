# BRIEFING — Hero heading clipped under fixed navbar (mobile)

Branch: feat/hero-navbar-clearance (off master)
File:   app/globals.css

## Root cause (verified from source on master)
- `.navbar` is `position:fixed; top:0; left:0; right:0; min-height:56px` with NO
  content offset anywhere (no `padding-top` on body/main, no `scroll-padding-top`).
- The generic `.section-hero` centers content (`justify-content:center`,
  `min-height:60vh`, `padding: var(--space-9) 0 var(--space-8)`). `--space-9` floors
  at 64px, so a plain hero clears the 56px navbar even on a phone.
- `.section-hero.section-hero-aj` OVERRIDES that to `justify-content:flex-start` and
  `padding: var(--space-8) 0 var(--space-7)`. Pinning to the top with only `--space-8`
  of clearance is what breaks: `--space-8 = clamp(3rem, 2rem + 4vw, 5rem)` = ~48px at
  phone width (48→80). 48px < 56px navbar => the h1 cap top renders beneath the bar
  and is clipped. Desktop escapes only because `--space-8` grows to 80px there.

## Change (app/globals.css only — do NOT touch design/tokens.css, it's a verbatim canon copy)
1. Add a site-local token in the existing `:root` block (line ~8, the one that only
   holds `--font-serif`):
     --navbar-h: 56px;

2. In `.section-hero.section-hero-aj` (line ~111), change ONLY the top padding so it
   clears the navbar + iOS safe area WITHOUT shrinking the desktop rhythm. Use `max()`
   so desktop keeps its current 80px and mobile is lifted to a clearing value:
     padding: max(
                var(--space-8),
                calc(var(--navbar-h) + env(safe-area-inset-top, 0px) + var(--space-3))
              ) 0 var(--space-7);
   - Desktop: max(80px, 68px) = 80px  -> unchanged.
   - Phone:   max(48px, 68px) = 68px  -> clears the 56px bar with a 12px gap.
   Keep bottom padding `var(--space-7)` and keep `justify-content: flex-start`.
   (A plain calc without max() would drop desktop from 80px to 68px — a 12px shift that
   fails acceptance #2 below. That's why max() is required, not a bare calc.)

3. Add to the EXISTING `html { … }` rule (line ~17, already has overflow-y/scroll-behavior):
     scroll-padding-top: var(--navbar-h);

## Acceptance
- iPhone Safari (real device) AND <=767px emulation: full
  "Journal . Listen . Integrate" h1 including cap tops visible on first render,
  clear of the navbar hairline, no scroll.
- Desktop hero spacing visually unchanged (<=2px shift). The max() form makes this exact.
- No new numbers/scores. Warm spacing preserved.

## Verification (before promote)
Drive the Vercel dev preview at iPhone width + a real-device check (site has no local
dev server — push to dev, use the Vercel cloud preview + curl + open), then promote
dev -> master. master = prod (agenticjournaling.com).
