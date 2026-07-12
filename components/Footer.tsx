import { CHROME } from "@/lib/chrome";
import type { Locale } from "@/lib/locale";

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  return (
    <footer className="footer-simple">
      <div className="footer-links">
        <span>
          {CHROME[locale].footerBornFrom}{" "}
          <a
            href="https://learningtoarrive.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>Learning to Arrive</em>
          </a>
        </span>
      </div>
      <p>
        &copy; 2026{" "}
        <a href="https://johanneskagerer.de" target="_blank" rel="noopener">
          Johannes Kagerer
        </a>
      </p>
    </footer>
  );
}
