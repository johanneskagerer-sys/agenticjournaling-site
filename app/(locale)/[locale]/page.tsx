import Link from "next/link";
import Footer from "@/components/Footer";
import { CHROME, homeMetadata } from "@/lib/chrome";
import { LOCALES, isLocale, localePath, type Locale } from "@/lib/locale";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return homeMetadata(locale);
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = CHROME[locale];
  const essayHref = localePath(locale, "essay");

  return (
    <>
      <section className="section-hero section-hero-aj">
        <div className="hero-container settle">
          <h1 className="heading-main">
            {t.triad[0]}
            <span className="dot"> · </span>
            {t.triad[1]}
            <span className="dot"> · </span>
            {t.triad[2]}
          </h1>
          <p className="paragraph-main">{t.lead}</p>
          <p className="paragraph-sub">{t.subline}</p>
          <p className="hero-essay-link">
            <Link href={essayHref}>{t.essayLink}</Link>
          </p>
          <Link
            href="/first-movers"
            target="_blank"
            rel="noopener"
            className="cta-button"
          >
            {t.cta}
          </Link>
        </div>
      </section>

      <section className="section-weeks">
        <div className="weeks-container">
          <h2 className="weeks-heading">{t.weeksHeading}</h2>
          <p className="weeks-sub">{t.weeksSub}</p>
          <ol className="weeks-list">
            {t.stations.map((station, i) => (
              <li className="weeks-item" key={station.title + i}>
                <span className="weeks-number">{i + 1}</span>
                <div className="weeks-body">
                  <h3 className="weeks-title">{station.title}</h3>
                  <p className="weeks-desc">{station.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="weeks-cta">
            <Link
              href="/first-movers"
              target="_blank"
              rel="noopener"
              className="cta-button"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
