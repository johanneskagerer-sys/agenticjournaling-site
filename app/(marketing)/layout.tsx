import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
// Both root layouts must import BOTH stylesheets — tokens.css carries every
// design variable; globals.css only consumes them.
import "../../design/tokens.css";
import "../globals.css";

// Second root layout (see app/(locale)/[locale]/layout.tsx for why there are
// two). Pages here aren't localized yet — /first-movers holds for the next
// slice per BRIEFING-SITE-CHROME-FOUR-LANGUAGES.md Amendment 1 — so lang
// stays fixed at "en", exactly as on today's site.

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Verbatim the old single root layout's metadata — pages here are untouched
// by the locale work and must keep their exact head output.
export const metadata: Metadata = {
  metadataBase: new URL("https://agenticjournaling.com"),
  title: {
    default: "agenticjournaling — Journal · Relate · Integrate",
    template: "%s | agenticjournaling",
  },
  description:
    "An AI-supported journaling practice where your inner parts speak in their own voice — helping you see, value, and integrate what lives inside you.",
  openGraph: {
    siteName: "agenticjournaling",
    type: "website",
    locale: "en_US",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-room="product" className={newsreader.variable}>
      <body>
        <Nav locale="en" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
