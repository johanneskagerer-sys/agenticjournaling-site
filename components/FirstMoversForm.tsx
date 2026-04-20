"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

export default function FirstMoversForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [email, setEmail] = useState("");

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
      if (tz) setTimeZone(tz);
    } catch {
      // fallback: leave empty, user picks
    }
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(
      "First Mover — interested in agenticjournaling"
    );
    const body = encodeURIComponent(
      `Name:       ${firstName} ${lastName}
Time zone:  ${timeZone}
Email:      ${email}

`
    );
    window.location.href = `mailto:info@agenticjournaling.com?subject=${subject}&body=${body}`;
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
      <button type="submit" className="fm-submit">
        Compose my message →
      </button>
      <p className="fm-help">
        This opens your mail client with your details attached. Write a line
        or two about why you&apos;re drawn to this, then send.
      </p>
    </form>
  );
}
