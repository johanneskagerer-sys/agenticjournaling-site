# Deploy notes — First Movers auto-send

What ships in this branch: the First Movers form now POSTs to a serverless route
(`app/api/first-movers/route.ts`) which emails the approved invitation via Resend,
from **info@agenticjournaling.com**, and BCCs info@ so the inbox stays the roster.
The site is no longer a static export (see `next.config.ts`).

Three one-time setup steps are Johannes's — the code is inert until they're done.

## 1. Mint the shared token (offline, on your Mac)

The private signing key never leaves your machine. Mint ONE shared token:

```bash
cd ~/agenticjournaling
node scripts/sign-token.mjs sign --id first-movers --days 200
```

`--days 200` clears the program's end (the current per-person tokens expire 2026-09-01;
200 days from July lands past year-end). Copy the printed token.

## 2. Set env vars in Vercel (Project → Settings → Environment Variables)

| Name | Value | Notes |
|---|---|---|
| `RESEND_API_KEY` | from resend.com | Secret. Production (and Preview, to test). |
| `FIRST_MOVERS_TOKEN` | the token from step 1 | Not secret (it rides every invite email), but env keeps it swappable on re-mint. |

Redeploy after setting them. The route refuses to send (calm 500, no email) while
either is missing — it never sends a broken link.

## 3. Verify the domain in Resend, then add DNS at United Domains

Add `agenticjournaling.com` in the Resend dashboard. Resend shows the exact records —
copy them verbatim into the United Domains DNS panel. They will look like:

- **MX** on the send subdomain (e.g. `send`) → `feedback-smtp.<region>.amazonses.com` (priority 10)
- **SPF** (TXT) on `send` → `v=spf1 include:amazonses.com ~all`
- **DKIM** (TXT) → selector `resend._domainkey` (or as shown) → the long `p=…` key from the dashboard
- **DMARC** (TXT) on `_dmarc` → start at `v=DMARC1; p=none;` (monitor), tighten later

Use the values Resend generates for *your* domain/region — the above is the shape, not
the literal record. Deliverability stays poor until Resend marks the domain **Verified**.

## Test on the Preview URL before promoting

On the branch's Vercel Preview, submit the form with your own address:
- Invitation arrives within a few seconds, `firstname` correct in greeting + subject.
- "Step in" enters the app in one click (shared token live).
- The BCC copy lands in info@ (→ your Gmail) as the record.
- A bad email → gentle inline nudge, no send. A send failure → warm fallback to info@.

Only then promote dev/branch → master (master = prod, agenticjournaling.com).
