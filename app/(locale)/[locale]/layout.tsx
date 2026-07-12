import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import { LOCALES, isLocale } from "@/lib/locale";
// Both root layouts must import BOTH stylesheets — tokens.css carries every
// design variable; globals.css only consumes them.
import "../../../design/tokens.css";
import "../../globals.css";

// One of two root layouts (Next.js "multiple root layouts" via route groups —
// see docs/BRIEFING-SITE-CHROME-FOUR-LANGUAGES.md). This one owns every
// localized page (homepage, essay) and sets <html lang> per locale — the
// thing a single shared root layout structurally cannot do. The other root,
// app/(marketing)/layout.tsx, keeps today's fixed lang="en" for pages that
// aren't localized yet (/first-movers).

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agenticjournaling.com"),
  title: {
    default: "agenticjournaling — Journal · Relate · Integrate",
    template: "%s | agenticjournaling",
  },
  openGraph: {
    siteName: "agenticjournaling",
    type: "website",
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} data-room="product" className={newsreader.variable}>
      <body>
        <Nav locale={locale} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
