import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/lib/locale";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://agenticjournaling.com";
  const lastModified = new Date();

  const homeEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${base}${localePath(locale, "home")}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
  }));

  const essayEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${base}${localePath(locale, "essay")}`,
    lastModified,
    changeFrequency: "yearly",
    priority: locale === "en" ? 0.7 : 0.6,
  }));

  return [
    ...homeEntries,
    {
      url: `${base}/first-movers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...essayEntries,
  ];
}
