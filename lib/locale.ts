// The site's four languages — same set as the essay (lib/essay.ts) and the
// app (agenticjournaling-app/src/lib/i18n/locale.ts). en is the default and
// lives unprefixed; de/zh/th are prefixed. Adding a fifth locale later = one
// entry here + one dictionary entry in lib/chrome.ts.

export const LOCALES = ["en", "de", "zh", "th"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

// Shared between middleware.ts (sets/reads it) and Nav.tsx (sets it client-side
// on click, ahead of navigation, so an explicit switch is never immediately
// overridden by the previous cookie value on the very next request).
export const LOCALE_COOKIE = "aj_locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // one year

// Switcher labels, exactly as specified in the brief — EN/DE stay as short
// codes, ZH/TH show their own script (unlike the app's picker, which spells
// every locale out in its own language).
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  zh: "中文",
  th: "ไทย",
};

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

// Mirrors agenticjournaling-app's browserDefaultLocale() algorithm — prefix-match
// against our locale set, fall back to en — but fed from the Accept-Language
// header in middleware rather than navigator.languages, since detection here
// happens server-side before any HTML reaches the browser (no flash of the
// wrong language, works with JS disabled, crawler-safe).
export function acceptLanguageDefaultLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const tags = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const tag of tags) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return DEFAULT_LOCALE;
}

// Route keys for the two localized surfaces. Adding a third localized page
// later = one more entry here.
export type RouteKey = "home" | "essay";

const SLUGS: Record<RouteKey, string> = {
  home: "",
  essay: "what-is-agentic-journaling",
};

export function localePath(locale: Locale, route: RouteKey): string {
  const slug = SLUGS[route];
  if (locale === DEFAULT_LOCALE) return slug ? `/${slug}` : "/";
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

const BASE = "https://agenticjournaling.com";

export function hreflangAlternates(route: RouteKey): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE}${localePath(locale, route)}`;
  }
  alternates["x-default"] = `${BASE}${localePath(DEFAULT_LOCALE, route)}`;
  return alternates;
}
