import { notFound } from "next/navigation";
import EssayPage from "@/components/EssayPage";
import { essayMetadata } from "@/lib/essay";
import { LOCALES, isLocale, type Locale } from "@/lib/locale";

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
  return essayMetadata(locale);
}

export default async function WhatIsAgenticJournaling({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return <EssayPage locale={locale} />;
}
