import { Resend } from "resend";
import {
  renderInvitation,
  FIRST_MOVERS_TOKEN,
  TOKEN_PLACEHOLDER,
} from "./invitation";

// Node runtime: the Resend SDK sends the mail server-side, from info@.
// The signing key is never here — this route only mails ONE shared token.
export const runtime = "nodejs";

const FROM = "agenticjournaling <info@agenticjournaling.com>";
const RECORD_BCC = "info@agenticjournaling.com"; // inbox stays the roster of record

// Basic shape check — a real address has one @, a dot in the domain, no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  firstName?: string;
  lastName?: string;
  timeZone?: string;
  email?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json(400, { ok: false, reason: "invalid", message: nudge });
  }

  const firstName = (body.firstName ?? "").trim();
  const email = (body.email ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const timeZone = (body.timeZone ?? "").trim();

  if (!firstName || !EMAIL_RE.test(email)) {
    return json(400, { ok: false, reason: "invalid", message: nudge });
  }

  // Misconfiguration is a server fault, never the person's — fail calm, log loud.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || FIRST_MOVERS_TOKEN === TOKEN_PLACEHOLDER) {
    console.error(
      "[first-movers] not configured:",
      !apiKey ? "RESEND_API_KEY missing" : "FIRST_MOVERS_TOKEN still placeholder",
    );
    return json(500, { ok: false, reason: "unconfigured", message: warmHiccup });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      bcc: RECORD_BCC,
      subject: `Your agenticjournaling invitation, ${firstName.replace(/[\r\n]+/g, " ")}`,
      html: renderInvitation(firstName),
    });

    if (error) {
      console.error("[first-movers] resend error:", error, {
        lastName,
        timeZone,
      });
      return json(502, { ok: false, reason: "send-failed", message: warmHiccup });
    }

    // The roster: the BCC lands in info@ for every send. lastName / timeZone ride
    // along in logs so nothing the person offered is dropped.
    console.log("[first-movers] invited:", { firstName, lastName, timeZone, email });
    return json(200, { ok: true, message: confirm });
  } catch (err) {
    console.error("[first-movers] unexpected:", err);
    return json(502, { ok: false, reason: "send-failed", message: warmHiccup });
  }
}

// Warm, affirmative copy — no numbers, no shaming, on-brand.
const confirm = "Your invitation is on its way — check your inbox.";
const nudge = "Could you check that email address? Then we'll send it right over.";
const warmHiccup =
  "Something hiccuped on our side. Please write us directly at info@agenticjournaling.com and we'll bring you in.";

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}
