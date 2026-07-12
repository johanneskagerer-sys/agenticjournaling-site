import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  isLocale,
  acceptLanguageDefaultLocale,
  type Locale,
} from "@/lib/locale";

// Locale routing for the homepage + essay (see
// docs/BRIEFING-SITE-CHROME-FOUR-LANGUAGES.md §4). Every locale, including
// en, is now served from app/(locale)/[locale]/ — there is no literal page
// at "/" or "/what-is-agentic-journaling" any more. This proxy (formerly
// "middleware" — renamed per Next.js 16 convention):
//  - resolves the visitor's locale (cookie, else Accept-Language, else en)
//  - for non-en: redirects "/" and "/what-is-agentic-journaling" to their
//    prefixed URL (a real, bookmarkable, crawlable address — the same pattern
//    /de /zh /th already use for the essay)
//  - for en: rewrites internally to /en... so the router resolves the page,
//    while the browser keeps the clean, unprefixed URL
//  - remembers the resolved locale in a cookie so it wins on return visits
//  - visiting a prefixed URL directly (switcher click or a shared link)
//    always refreshes the cookie to match — "direct links are always
//    respected as-is"

const ESSAY_SLUG = "what-is-agentic-journaling";

function localeFromFirstSegment(pathname: string): Locale | null {
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // "/en" isn't a canonical URL — en lives unprefixed. Redirect to the clean
  // path and remember the explicit choice.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    const res = NextResponse.redirect(url, 307);
    res.cookies.set(LOCALE_COOKIE, "en", { path: "/", maxAge: LOCALE_COOKIE_MAX_AGE });
    return res;
  }

  const pathLocale = localeFromFirstSegment(pathname);

  // Explicit non-en visit (switcher click or a direct /de /zh /th link) —
  // always respected as-is; just remember it for next time.
  if (pathLocale) {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, pathLocale, {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE,
    });
    return res;
  }

  // Unprefixed request ("/" or "/what-is-agentic-journaling") — resolve from
  // the cookie, else Accept-Language.
  if (pathname === "/" || pathname === `/${ESSAY_SLUG}`) {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const locale: Locale = isLocale(cookieLocale)
      ? cookieLocale
      : acceptLanguageDefaultLocale(request.headers.get("accept-language"));

    if (locale !== DEFAULT_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/" ? `/${locale}` : `/${locale}/${ESSAY_SLUG}`;
      const res = NextResponse.redirect(url, 307);
      res.cookies.set(LOCALE_COOKIE, locale, {
        path: "/",
        maxAge: LOCALE_COOKIE_MAX_AGE,
      });
      return res;
    }

    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en/${ESSAY_SLUG}`;
    const res = NextResponse.rewrite(url);
    if (!isLocale(cookieLocale)) {
      res.cookies.set(LOCALE_COOKIE, "en", { path: "/", maxAge: LOCALE_COOKIE_MAX_AGE });
    }
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
