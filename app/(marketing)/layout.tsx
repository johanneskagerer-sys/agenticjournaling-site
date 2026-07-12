import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import Nav from "@/components/Nav";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://agenticjournaling.com"),
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
      </body>
    </html>
  );
}
