import { CHROME } from "@/lib/chrome";
import { STEP_IN, fill } from "@/lib/stepIn";
import type { Locale } from "@/lib/locale";

// The approved invitation email (design asset, unchanged in look), now in four
// locales: every string comes from lib/stepIn.ts (mail block) and the three
// listening stations from lib/chrome.ts, so the mail and the site never drift
// (docs/BRIEFING-STEP-IN-FOUR-LANGUAGES.md).
//
// The "Step in" deep-link carries ONE shared token (historically "first-movers").
// Per the token design, a token that can't be issued on the server is signed
// offline once by Johannes and set as FIRST_MOVERS_TOKEN in Vercel — never in
// the repo. To mint:
//   cd ~/agenticjournaling && node scripts/sign-token.mjs sign --id first-movers --days 200
export const FIRST_MOVERS_TOKEN =
  process.env.FIRST_MOVERS_TOKEN ?? "REPLACE_WITH_FIRST_MOVERS_TOKEN";

export const TOKEN_PLACEHOLDER = "REPLACE_WITH_FIRST_MOVERS_TOKEN";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const SERIF = "font-family:Georgia,'Times New Roman',serif;";
const SANS = "font-family:Arial,Helvetica,sans-serif;";

export function renderInvitation(name: string, locale: Locale = "en"): string {
  const m = STEP_IN[locale].mail;
  const stations = CHROME[locale].stations;
  const stepInHref = `https://app.agenticjournaling.com/?token=${FIRST_MOVERS_TOKEN}`;

  const stationRows = stations
    .map(
      (s, i) => `
              <div style="padding-bottom:${i === stations.length - 1 ? "6px" : "20px"};">
                <div style="${SERIF} font-size:16px; color:#36302b; padding-bottom:5px;"><span style="color:#9c6a4d;">${i + 1}</span> &middot; ${esc(s.title)}</div>
                <div style="font-size:13px; line-height:20px; color:#6f6c66;">${esc(s.body)}</div>
              </div>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(m.title)}</title>
</head>
<body style="margin:0; padding:0; background-color:#f7f5f2;">

  <!-- preheader (hidden) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    ${esc(m.preheader)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f2;">
    <tr>
      <td align="center" style="padding:28px 12px;">

        <!-- card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#FCFBF8; border:1px solid #ece7e0; border-radius:10px; overflow:hidden;">

          <!-- banner -->
          <tr>
            <td align="center" style="background-color:#f0e7dd; padding:26px 24px 22px 24px;">
              <div style="${SERIF} font-size:18px; letter-spacing:3px; color:#36302b;">&bull;&bull;&bull;</div>
              <div style="${SERIF} font-size:23px; padding-top:6px;"><a href="https://agenticjournaling.com" target="_blank" style="color:#36302b; text-decoration:none;">agenticjournaling</a></div>
              <div style="${SERIF} font-style:italic; font-size:14px; color:#6f6c66; padding-top:8px;">${esc(m.tagline)}</div>
            </td>
          </tr>

          <!-- body -->
          <tr>
            <td align="center" style="padding:36px 44px 8px 44px; ${SANS}">

              <div style="${SERIF} font-size:22px; color:#36302b; padding-bottom:20px;">${esc(fill(m.hi, { name: name.trim() }))}</div>

              <div style="font-size:15px; line-height:24px; color:#55504a; padding-bottom:18px;">
                ${esc(m.body1).replace("agenticjournaling", "<strong>agenticjournaling</strong>")}
              </div>

              <div style="font-size:15px; line-height:24px; color:#55504a; padding-bottom:26px;">
                ${esc(m.body2)}
              </div>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 6px auto;">
                <tr>
                  <td align="center" bgcolor="#9c6a4d" style="border-radius:25px;">
                    <a href="${stepInHref}" target="_blank"
                       style="display:inline-block; padding:14px 36px; ${SANS} font-size:15px; font-weight:bold; color:#FCFBF8; text-decoration:none; border-radius:25px;">
                      ${esc(m.cta)}
                    </a>
                  </td>
                </tr>
              </table>

              <div style="${SANS} font-size:12.5px; color:#8a857e; padding-top:2px;">${esc(m.device)}</div>

            </td>
          </tr>

          <!-- what's next -->
          <tr>
            <td align="center" style="padding:34px 44px 0 44px; ${SANS}">
              <div style="${SERIF} font-size:19px; color:#36302b; padding-bottom:10px;">${esc(m.nextHeading)}</div>
              <div style="font-size:14.5px; line-height:22px; color:#55504a; padding-bottom:24px;">
                ${esc(m.nextBody)}
              </div>
            </td>
          </tr>

          <!-- three things -->
          <tr>
            <td align="center" style="padding:0 44px; ${SANS}">${stationRows}
            </td>
          </tr>

          <!-- your language -->
          <tr>
            <td align="center" style="padding:28px 44px 0 44px; ${SANS}">
              <div style="font-size:14px; font-weight:bold; color:#9c6a4d; padding-bottom:6px;">${esc(m.languagesHeading)}</div>
              <div style="font-size:13.5px; line-height:21px; color:#55504a;">
                ${esc(m.languages)}
              </div>
            </td>
          </tr>

          <!-- sign-off -->
          <tr>
            <td align="center" style="padding:30px 44px 0 44px; ${SANS}">
              <div style="font-size:14.5px; color:#36302b;">${esc(m.signoff)}</div>
              <div style="${SERIF} font-size:17px; color:#36302b; padding-top:2px;">Johannes</div>
            </td>
          </tr>

          <!-- divider -->
          <tr>
            <td style="padding:26px 60px 0 60px;">
              <div style="border-top:1px solid #ebe5de; line-height:1px; font-size:1px;">&nbsp;</div>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td align="center" style="padding:22px 44px 34px 44px; ${SANS}">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 10px auto;">
                <tr>
                  <td align="center" bgcolor="#f0e7dd" style="border-radius:12px; padding:10px 14px;">
                    <img src="https://authenticarriving.com/logo.png" width="44" alt="Authentic Arriving" style="display:block; width:44px; height:auto; border:0;">
                  </td>
                </tr>
              </table>
              <div style="${SANS} font-size:11.5px; color:#8a857e; padding-bottom:3px;">${esc(m.madeBy)}</div>
              <div style="${SERIF} font-size:15px; padding-bottom:8px;"><a href="https://authenticarriving.com/" target="_blank" style="color:#36302b; text-decoration:none;">Authentic Arriving</a></div>
              <div style="padding-bottom:8px;">
                <a href="mailto:info@agenticjournaling.com" style="color:#9c6a4d; text-decoration:none; font-size:15px;">&#9993;</a>
              </div>
            </td>
          </tr>

        </table>
        <!-- /card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
