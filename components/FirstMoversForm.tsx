"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Status = "idle" | "sending" | "sent" | "nudge" | "hiccup";

export default function FirstMoversForm() {
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
        body: JSON.stringify({ firstName, lastName, timeZone, email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reason?: string;
        message?: string;
      };

      if (res.ok && data.ok) {
        setMessage(data.message ?? "Your invitation is on its way — check your inbox.");
        setStatus("sent");
        return;
      }
      if (data.reason === "invalid") {
        setMessage(data.message ?? "Could you check that email address?");
        setStatus("nudge");
        return;
      }
      setMessage(
        data.message ??
          "Something hiccuped on our side. Please write us directly and we'll bring you in.",
      );
      setStatus("hiccup");
    } catch {
      setMessage(
        "Something hiccuped on our side. Please write us directly and we'll bring you in.",
      );
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

  return (
    <form className="fm-form" onSubmit={handleSubmit}>
      <div className="fm-row fm-row-2">
        <label className="fm-field">
          <span className="fm-label">
            First name <span className="fm-required">*</span>
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
            Last name <span className="fm-required">*</span>
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
          Time zone <span className="fm-required">*</span>
        </span>
        <input
          type="text"
          required
          list="fm-timezones"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          placeholder="Start typing — e.g. Berlin"
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
          Email <span className="fm-required">*</span>
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
        {status === "sending" ? "Sending…" : "Send my invitation"}
      </button>
      <p className="fm-help">
        Enter your details and your invitation arrives in your inbox, in a moment.
      </p>

      {status === "nudge" && (
        <p className="fm-nudge" role="status" aria-live="polite">
          {message}
        </p>
      )}

      {status === "hiccup" && (
        <div className="fm-fallback" role="status" aria-live="polite">
          <p className="fm-fallback-lead">
            {message.replace(/\s*Please write us directly.*$/, "")} You can also write
            directly to{" "}
            <a href="mailto:info@agenticjournaling.com" className="fm-fallback-link">
              info@agenticjournaling.com
            </a>{" "}
            with your name and time zone, and we&apos;ll bring you in.
          </p>
        </div>
      )}
    </form>
  );
}
