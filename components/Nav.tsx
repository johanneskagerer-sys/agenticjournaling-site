"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localePath,
  type Locale,
  type RouteKey,
} from "@/lib/locale";

// Which of the two localized surfaces the visitor is currently on, so the
// switcher keeps them on the same page in the new language instead of
// bouncing to the homepage. Anything else (currently just /first-movers,
// which isn't localized yet) falls back to "home".
function currentRoute(pathname: string): RouteKey {
  const match = pathname.match(/^\/(de|zh|th)(\/.*)?$/);
  const withoutLocale = match ? match[2] ?? "/" : pathname;
  return withoutLocale.startsWith("/what-is-agentic-journaling") ? "essay" : "home";
}

// Set the cookie before the click's navigation lands, so middleware sees the
// new choice on the very next request instead of the previous locale (which
// would otherwise bounce an "EN" click on a /de page straight back to /de).
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}`;
}

export default function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const route = currentRoute(pathname);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img
          src="/logo.svg"
          width={44}
          height={44}
          alt="agenticjournaling"
          className="logo-img"
        />
        <Link href={localePath(locale, "home")} className="logo-font">
          agenticjournaling
        </Link>
        <div className="nav-menu">
          <div className="lang-switcher" aria-label="Language">
            {LOCALES.map((l, i) => (
              <Fragment key={l}>
                {i > 0 && <span className="lang-dot"> · </span>}
                {l === locale ? (
                  <span className="lang-current" aria-current="true">
                    {LOCALE_LABELS[l]}
                  </span>
                ) : (
                  <Link
                    href={localePath(l, route)}
                    hrefLang={l}
                    className="lang-link"
                    onClick={() => rememberLocale(l)}
                  >
                    {LOCALE_LABELS[l]}
                  </Link>
                )}
              </Fragment>
            ))}
          </div>
          <a
            href="mailto:info@agenticjournaling.com"
            className="mail-icon-link"
            aria-label="Email"
          >
            <img
              src="/mail.svg"
              width={20}
              height={20}
              alt="send mail"
              className="mail-icon"
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
