import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StepInForm from "@/components/StepInForm";
import Footer from "@/components/Footer";
import { STEP_IN } from "@/lib/stepIn";
import { LOCALES, isLocale, localePath, hreflangAlternates, type Locale } from "@/lib/locale";

// The way in — one page, four locales (docs/BRIEFING-STEP-IN-FOUR-LANGUAGES.md).
// The form posts the locale along, so the invitation mail speaks it too.

export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = STEP_IN[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `https://agenticjournaling.com${localePath(locale, "stepin")}`,
      languages: hreflangAlternates("stepin"),
    },
  };
}

export default async function StepIn({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = STEP_IN[locale];

  return (
    <>
      <section className="section-fm-hero">
        <div className="fm-container settle">
          <h1 className="fm-heading">{t.heading}</h1>
          <p className="fm-intro">{t.intro}</p>
          <h2 className="fm-inside-heading">{t.insideHeading}</h2>
          <ul className="fm-inside">
            {t.inside.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="fm-note">{t.note}</p>
          <p className="fm-sub">{t.sub}</p>
        </div>
      </section>

      <section className="section-fm-form">
        <div className="fm-container">
          <p className="fm-intro">{t.formIntro}</p>
          <StepInForm locale={locale} />
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
