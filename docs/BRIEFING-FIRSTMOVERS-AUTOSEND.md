# Briefing — Auto-send the invitation when a First Mover signs up

## Why
Today a signup means: update Excel by hand, run a mail merge. Automate it — the moment someone submits the First Movers form (name + email), the invitation email goes out to them automatically. No Excel, no merge. The invitation is already tokenless (the shared First Movers token rides the "Step in" deep-link), so only `firstname` + `email` are needed.

## Discovery first (browser bridge was down when writing — verify before building, assert nothing)
- `components/FirstMoversForm.tsx` — read the submit handler: what does it POST, and where? An existing API route? A Google Sheet / webhook? Nothing yet?
- `app/first-movers/` — any existing route / handler / page.
- Search the repo for an existing `app/api/*` route and for any current storage of signups (Sheet, table, Airtable, etc.), and whether any email is sent today.
- Report the discovery map (current submit target, current storage, current email — if any) before writing code.

## Change
1. The form posts `{ firstname, email }` to a route handler — new `app/api/first-movers/route.ts`, or extend the existing one if discovery finds it. Validate: non-empty `firstname`, basic email shape. Affirmative validation copy only.
2. The route sends the invitation from **info@agenticjournaling.com**:
   - Subject: `Your agenticjournaling invitation, {firstname}`
   - Body: the approved invitation HTML (design asset `agenticjournaling-invitation.html`, shipped with this brief) with `{{firstname}}` interpolated. The "Step in" link already carries the shared token — nothing per-person.
3. Record the signup via whatever discovery finds already in place (append the row). If nothing exists, write to a simple store (a Google Sheet append or a lightweight table) so Johannes keeps his list.
4. On success the form shows a warm confirmation in place — e.g. "Your invitation is on its way — check your inbox." Calm, affirmative, on-brand. A repeat email gets the same calm confirmation (no error-shaming).

## Decision (one)
Email transport:
- **A — Resend (recommended):** Vercel-native, reliable transactional delivery; sends from info@agenticjournaling.com after verifying the domain (SPF/DKIM/DMARC DNS records) and setting `RESEND_API_KEY`. Best deliverability for automated mail.
- **B — SMTP via United Domains (nodemailer):** reuse the info@ mailbox, UD SMTP creds in env. Works, but serverless SMTP is slower and UD may rate-limit.
Default assumed: **A**. If Johannes prefers B, Code swaps only the send step.

## Acceptance criteria
- Submitting the form sends the invitation to the given address within a few seconds, from info@agenticjournaling.com.
- Email renders (warm card, logo tile, deep-link); `firstname` correct in greeting + subject; "Step in" enters in one click (gate is live on production).
- Invalid email → calm inline nudge, no send; valid → warm confirmation.
- The signup is recorded (per discovery's store). No numbers, scores, or streaks anywhere; all copy affirmative.
- Secrets only in env (`RESEND_API_KEY` etc.), never committed. Code documents the exact SPF/DKIM/DMARC records Johannes must add in the DNS panel (one-time).

## Out of scope
The app, the gate, the email's visual design, the shared token value.

## Design asset (ships with this brief)
`agenticjournaling-invitation.html` — the email body template. Code interpolates `{{firstname}}`; everything else is static (deep-link, logo, footer already correct).

## Amendment 1 — GO (post-discovery)

Discovery accepted; it overturns the brief's premises. Corrections binding:
- Form is a `mailto:` (no POST/backend); site is a static export; tokens are per-person, ECDSA-signed, minted OFFLINE — the private key never touches a server, by design. No auto-minting on the server, ever.

Approved path (shared-token model — Johannes already chose one shared token):
1. Johannes mints ONE shared token offline: `sign-token.mjs sign --id first-movers --days 200` (past program end; also fixes the 2026-09-01 expiry). Private key stays on his Mac. He gives the token value; it is baked into the invitation template's "Step in" deep-link, replacing the reused tester-02.
2. Drop `output: "export"` → hybrid. Pages stay static; add ONE serverless route in this repo (`app/api/first-movers/route.ts`).
3. Form POSTs `{ firstname, email }` (+ last / tz for the roster) to that route. The route interpolates `{{firstname}}` into the approved invitation HTML and sends via **Resend** from info@agenticjournaling.com, with **BCC info@** so the inbox remains the record. No new storage infra.
4. No private key on any server. `RESEND_API_KEY` in Vercel env only. Code documents the exact SPF/DKIM/DMARC records for the DNS panel.

Acceptance criteria unchanged, plus: the "Step in" link uses the shared `first-movers` token; BCC to info@ lands for every send; no key or secret is committed.
