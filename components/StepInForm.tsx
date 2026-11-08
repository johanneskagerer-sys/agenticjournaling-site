"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { STEP_IN } from "@/lib/stepIn";
import type { Locale } from "@/lib/locale";

type Status = "idle" | "sending" | "sent" | "nudge" | "hiccup";

const CONTACT = "info@agenticjournaling.com";

export default function StepInForm({ locale }: { locale: Locale }) {
  const t = STEP_IN[locale].form;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const timeZones = useMemo(() => {
    type IntlWithSupported = {
      supportedValuesOf?: (input: "timeZone") => string[];
    };
    const intl = Intl as unknown as IntlWithSupported;
    if (typeof intl.supportedValuesOf === "function") {
      return intl.supportedValuesOf("timeZone");
    }
    return [
      "Europe/Berlin",
      "Europe/London",
      "Europe/Paris",
      "America/New_York",
      "America/Los_Angeles",
      "Asia/Bangkok",
      "Asia/Shanghai",
      "Asia/Tokyo",
      "UTC",
    ];
  }, []);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Set after mount on purpose: reading the browser timezone during render
      // would diverge from the prerendered HTML and cause a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (tz) setTimeZone(tz);
    } catch {
      // fallback: leave empty, user picks
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/first-movers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ firstName, lastName, timeZone, email, locale }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reason?: string;
        message?: string;
      };

      if (res.ok && data.ok) {
        setMessage(data.message ?? t.confirm);
        setStatus("sent");
        return;
      }
      if (data.reason === "invalid") {
        setMessage(data.message ?? t.nudge);
        setStatus("nudge");
        return;
      }
      setMessage(t.hiccup);
      setStatus("hiccup");
    } catch {
      setMessage(t.hiccup);
      setStatus("hiccup");
    }
  }

  // Confirmation replaces the form — the send is done, the page rests.
  if (status === "sent") {
    return (
      <div className="fm-confirm" role="status" aria-live="polite">
        <p className="fm-confirm-lead">{message}</p>
      </div>
    );
  }

  // The fallback names the inbox as a link; the sentence around it comes from
  // the locale with {email} as the seam.
  const [tailBefore, tailAfter] = t.hiccupTail.split("{email}");

  return (
    <form className="fm-form" onSubmit={handleSubmit}>
      <div className="fm-row fm-row-2">
        <label className="fm-field">
          <span className="fm-label">
            {t.firstName} <span className="fm-required">*</span>
          </span>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="fm-input"
          />
        </label>
        <label className="fm-field">
          <span className="fm-label">
            {t.lastName} <span className="fm-required">*</span>
          </span>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="fm-input"
          />
        </label>
      </div>
      <label className="fm-field">
        <span className="fm-label">
          {t.timeZone} <span className="fm-required">*</span>
        </span>
        <input
          type="text"
          required
          list="fm-timezones"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          placeholder={t.tzPlaceholder}
          className="fm-input"
          autoComplete="off"
        />
        <datalist id="fm-timezones">
          {timeZones.map((tz) => (
            <option key={tz} value={tz} />
          ))}
        </datalist>
      </label>
      <label className="fm-field">
        <span className="fm-label">
          {t.email} <span className="fm-required">*</span>
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="fm-input"
        />
      </label>
      <button type="submit" className="fm-submit" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.send}
      </button>
      <p className="fm-help">{t.help}</p>

      {status === "nudge" && (
        <p className="fm-nudge" role="status" aria-live="polite">
          {message}
        </p>
      )}

      {status === "hiccup" && (
        <div className="fm-fallback" role="status" aria-live="polite">
          <p className="fm-fallback-lead">
            {message} {tailBefore}
            <a href={`mailto:${CONTACT}`} className="fm-fallback-link">
              {CONTACT}
            </a>
            {tailAfter}
          </p>
        </div>
      )}
    </form>
  );
}
