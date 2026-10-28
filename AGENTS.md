# agenticjournaling.com — how we work

Marketing site for the agenticjournaling app (the app itself lives in `~/agenticjournaling/app`).
Next.js 16 (App Router), React 19, four locales (`/`, `/de`, `/zh`, `/th`). Vercel project
`agenticjournaling-site`. Lifecycle: the light variant in `~/.claude/LIFECYCLE.md` ("Arrive").

This Next.js version may differ from your training data — read the relevant guide in
`node_modules/next/dist/docs/` before writing framework code.

## Branches and deployment
- **`master` is production.** Vercel auto-deploys it to https://agenticjournaling.com.
- **Work on `dev` or a feature branch off it** (`feat/<slug>`, `fix/<slug>`), merged into `dev`.
  Never commit or push straight to `master`.
- **Promote = merge `dev` into `master`**, commit subject `promote: <what ships>` — only on
  Johannes' explicit go, given in this conversation.
- Rollback is one click in the Vercel dashboard. Never force-push `master`.

## Briefs
Substantive changes arrive as a brief in `docs/` (`BRIEFING-*.md` / `brief-*.md`). Given a brief:
read it and this file in full → run its discovery step and report back in words → wait for
approval → implement to its acceptance criteria. If discovery finds something the brief didn't
anticipate, report it and wait. Briefs stay in `docs/` after shipping.

## Verify before promote
- `npm run build` green and `npm run lint` clean.
- Essay text is author-approved and must stay verbatim: run `node scripts/check-essay-verbatim.mjs`
  (exit 0) whenever the essay, `lib/essayMarkdown.mjs` or `docs/content/` changes.
- Check all four locales, not just `/`.
- Previews are SSO-gated (deployment protection), so `curl` and fetchers hit the auth wall. Verify
  the preview by rendering the same commit locally (`npm run build && npm start`, or read
  `.next/server/app/<route>.html`); verify prod directly on agenticjournaling.com after promote —
  one check, no polling.

## Guardrails
- `design/tokens.css` is a byte-identical copy of the canon in the `johanneskagerer.de` repo —
  never edit it here; re-sync from the canon.
- Shared stylesheets: a change is checked on every page that imports it; a green build proves
  nothing about CSS.
- Images and logos are placed as delivered (only resized). No invented testimonials, no tracking
  or analytics without asking.
- Copy: English deliverables in app voice; zh/th strings need a native read before they count as done.
