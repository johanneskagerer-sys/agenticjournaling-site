"use client";

import { useEffect, useRef } from "react";
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
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // <details> gives open/close and keyboard toggling natively; we only add
  // the two behaviors it lacks — close on outside click and on Escape.
  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      const d = detailsRef.current;
      if (d?.open && !d.contains(e.target as Node)) d.open = false;
    }
    function onKeyDown(e: KeyboardEvent) {
      const d = detailsRef.current;
      if (e.key === "Escape" && d?.open) d.open = false;
    }
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

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
          <details className="lang-switcher" ref={detailsRef}>
            <summary
              className="lang-current"
              aria-label={`Language: ${LOCALE_LABELS[locale]}`}
            >
              {LOCALE_LABELS[locale]}
            </summary>
            <div className="lang-menu">
              {LOCALES.filter((l) => l !== locale).map((l) => (
                // Plain <a>, not <Link>: Link prefetches the target with the
                // OLD locale cookie still set and caches the resulting
                // redirect — clicking EN on /de could bounce straight back
                // to German. A full request runs after rememberLocale().
                <a
                  key={l}
                  href={localePath(l, route)}
                  hrefLang={l}
                  className="lang-link"
                  onClick={() => rememberLocale(l)}
                >
                  {LOCALE_LABELS[l]}
                </a>
              ))}
            </div>
          </details>
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
