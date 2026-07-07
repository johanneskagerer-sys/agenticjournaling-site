// The approved First Movers invitation email (design asset, unchanged in look).
// The route interpolates the recipient's first name; everything else is static.
//
// The "Step in" deep-link carries ONE shared First Movers token. Per the token
// design (agenticjournaling/scripts/sign-token.mjs) the private key never leaves
// Johannes's machine, so nothing is minted on the server — this is a single token
// he signs offline once and drops in here (or, preferred, sets as FIRST_MOVERS_TOKEN
// in the Vercel env so re-mints need no code change).
//
//   node scripts/sign-token.mjs sign --id first-movers --days 200
//
export const FIRST_MOVERS_TOKEN =
  process.env.FIRST_MOVERS_TOKEN ?? "REPLACE_WITH_FIRST_MOVERS_TOKEN";

export const TOKEN_PLACEHOLDER = "REPLACE_WITH_FIRST_MOVERS_TOKEN";

/** Minimal HTML escape for values interpolated into the email body. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderInvitation(firstName: string): string {
  const name = esc(firstName.trim());
  const stepInHref = `https://app.agenticjournaling.com/?token=${FIRST_MOVERS_TOKEN}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Your agenticjournaling invitation</title>
</head>
<body style="margin:0; padding:0; background-color:#f7f5f2;">

  <!-- preheader (hidden) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    The beta is open — step in, in your language.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f2;">
    <tr>
      <td align="center" style="padding:28px 12px;">

        <!-- card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#FCFBF8; border:1px solid #ece7e0; border-radius:10px; overflow:hidden;">

          <!-- banner -->
          <tr>
            <td align="center" style="background-color:#f0e7dd; padding:26px 24px 22px 24px;">
              <div style="font-family:Georgia,'Times New Roman',serif; font-size:18px; letter-spacing:3px; color:#36302b;">&bull;&bull;&bull;</div>
              <div style="font-family:Georgia,'Times New Roman',serif; font-size:23px; padding-top:6px;"><a href="https://agenticjournaling.com" target="_blank" style="color:#36302b; text-decoration:none;">agenticjournaling</a></div>
              <div style="font-family:Georgia,'Times New Roman',serif; font-style:italic; font-size:14px; color:#6f6c66; padding-top:8px;">Meet yourself &mdash; lead your way home.</div>
            </td>
          </tr>

          <!-- body -->
          <tr>
            <td align="center" style="padding:36px 44px 8px 44px; font-family:Arial,Helvetica,sans-serif;">

              <div style="font-family:Georgia,'Times New Roman',serif; font-size:22px; color:#36302b; padding-bottom:20px;">Hi ${name},</div>

              <div style="font-size:15px; line-height:24px; color:#55504a; padding-bottom:18px;">
                You signed up as one of our First Movers &mdash; I&rsquo;m glad you&rsquo;re here.
                The beta of <strong>agenticjournaling</strong> is ready, and it&rsquo;s yours to explore.
              </div>

              <div style="font-size:15px; line-height:24px; color:#55504a; padding-bottom:26px;">
                It&rsquo;s a quiet, private place to meet the parts of you that carry the day,
                in your own words and at your own pace. Everything stays in your hands.
              </div>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 6px auto;">
                <tr>
                  <td align="center" bgcolor="#9c6a4d" style="border-radius:25px;">
                    <a href="${stepInHref}" target="_blank"
                       style="display:inline-block; padding:14px 36px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:bold; color:#FCFBF8; text-decoration:none; border-radius:25px;">
                      Step in
                    </a>
                  </td>
                </tr>
              </table>

              <div style="font-family:Arial,Helvetica,sans-serif; font-size:12.5px; color:#8a857e; padding-top:2px;">Best experienced on desktop and tablet.</div>

            </td>
          </tr>

          <!-- what's next -->
          <tr>
            <td align="center" style="padding:34px 44px 0 44px; font-family:Arial,Helvetica,sans-serif;">
              <div style="font-family:Georgia,'Times New Roman',serif; font-size:19px; color:#36302b; padding-bottom:10px;">What&rsquo;s next?</div>
              <div style="font-size:14.5px; line-height:22px; color:#55504a; padding-bottom:24px;">
                Start exploring and I will be in touch soon to schedule the first session.
              </div>
            </td>
          </tr>

          <!-- sessions -->
          <tr>
            <td align="center" style="padding:0 44px; font-family:Arial,Helvetica,sans-serif;">

              <div style="padding-bottom:20px;">
                <div style="font-family:Georgia,'Times New Roman',serif; font-size:16px; color:#36302b; padding-bottom:5px;"><span style="color:#9c6a4d;">1</span> &middot; Kickoff</div>
                <div style="font-size:13px; line-height:20px; color:#6f6c66;">What was your first impression? What do you sense it&rsquo;s about, and how it works? Where could it feel easier or clearer?</div>
              </div>

              <div style="padding-bottom:20px;">
                <div style="font-family:Georgia,'Times New Roman',serif; font-size:16px; color:#36302b; padding-bottom:5px;"><span style="color:#9c6a4d;">2</span> &middot; Going deeper</div>
                <div style="font-size:13px; line-height:20px; color:#6f6c66;">What are you starting to see in yourself? What do you find yourself wishing for? And how do the translations feel?</div>
              </div>

              <div style="padding-bottom:6px;">
                <div style="font-family:Georgia,'Times New Roman',serif; font-size:16px; color:#36302b; padding-bottom:5px;"><span style="color:#9c6a4d;">3</span> &middot; Into real life &amp; close</div>
                <div style="font-size:13px; line-height:20px; color:#6f6c66;">Where did it meet a real decision? What shifted for you? Where should the method go next?</div>
              </div>

            </td>
          </tr>

          <!-- gentle ask -->
          <tr>
            <td align="center" style="padding:28px 44px 0 44px; font-family:Arial,Helvetica,sans-serif;">
              <div style="font-size:14px; font-weight:bold; color:#9c6a4d; padding-bottom:6px;">Gentle ask</div>
              <div style="font-size:13.5px; line-height:21px; color:#55504a;">
                Start in English, then switch to your mother tongue, if available in settings (Thai, German, Chinese).
              </div>
            </td>
          </tr>

          <!-- sign-off -->
          <tr>
            <td align="center" style="padding:30px 44px 0 44px; font-family:Arial,Helvetica,sans-serif;">
              <div style="font-size:14.5px; color:#36302b;">With compassion,</div>
              <div style="font-family:Georgia,'Times New Roman',serif; font-size:17px; color:#36302b; padding-top:2px;">Johannes</div>
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
            <td align="center" style="padding:22px 44px 34px 44px; font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 10px auto;">
                <tr>
                  <td align="center" bgcolor="#f0e7dd" style="border-radius:12px; padding:10px 14px;">
                    <img src="https://authenticarriving.com/logo.png" width="44" alt="Authentic Arriving" style="display:block; width:44px; height:auto; border:0;">
                  </td>
                </tr>
              </table>
              <div style="font-family:Arial,Helvetica,sans-serif; font-size:11.5px; color:#8a857e; padding-bottom:3px;">work in progress by</div>
              <div style="font-family:Georgia,'Times New Roman',serif; font-size:15px; padding-bottom:8px;"><a href="https://authenticarriving.com/" target="_blank" style="color:#36302b; text-decoration:none;">Authentic Arriving</a></div>
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
