import { Resend } from "resend";
import {
  renderInvitation,
  FIRST_MOVERS_TOKEN,
  TOKEN_PLACEHOLDER,
} from "./invitation";
import { STEP_IN, fill } from "@/lib/stepIn";
import { isLocale, type Locale } from "@/lib/locale";

// Node runtime: the Resend SDK sends the mail server-side, from info@.
// The signing key is never here — this route only mails ONE shared token.
// The route keeps its historical path ("first-movers") so nothing deployed is
// re-keyed; the page that posts here is /step-in, in four locales, and the
// mail answers in the locale the person wrote from.
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
  locale?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }
  const locale: Locale = isLocale(body.locale) ? body.locale : "en";
  const t = STEP_IN[locale].form;
  const warmHiccup = `${t.hiccup} ${fill(t.hiccupTail, { email: RECORD_BCC })}`;

  const firstName = (body.firstName ?? "").trim();
  const email = (body.email ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const timeZone = (body.timeZone ?? "").trim();

  if (!firstName || !EMAIL_RE.test(email)) {
    return json(400, { ok: false, reason: "invalid", message: t.nudge });
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
    const safeName = firstName.replace(/[\r\n]+/g, " ");
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      bcc: RECORD_BCC,
      subject: fill(STEP_IN[locale].mail.subject, { name: safeName }),
      html: renderInvitation(firstName, locale),
    });

    if (error) {
      console.error("[first-movers] resend error:", error, { lastName, timeZone, locale });
      return json(502, { ok: false, reason: "send-failed", message: warmHiccup });
    }

    // The roster: the BCC lands in info@ for every send. lastName / timeZone /
    // locale ride along in logs so nothing the person offered is dropped.
    console.log("[first-movers] invited:", { firstName, lastName, timeZone, email, locale });
    return json(200, { ok: true, message: t.confirm });
  } catch (err) {
    console.error("[first-movers] unexpected:", err);
    return json(502, { ok: false, reason: "send-failed", message: warmHiccup });
  }
}

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}
