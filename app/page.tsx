import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "agenticjournaling — Journal · Listen · Integrate",
  description:
    "Journal · Listen · Integrate. Where your inner parts have agency — they listen along with what you journal, speak in their own voice, and help you to see, value and integrate what lives inside you.",
};

export default function AgenticJournaling() {
  return (
    <>
      <section className="section-hero section-hero-aj">
        <FadeIn className="hero-container" duration={1.4}>
          <h1 className="heading-main">
            Journal<span className="dot"> · </span>Listen
            <span className="dot"> · </span>Integrate
          </h1>
          <p className="paragraph-main">
            Where your inner parts have agency — they listen along with what
            you journal, speak in their own voice, and help you to see, value
            and integrate what lives inside you.
          </p>
          <p className="paragraph-sub">
            Built to be inhabited, not subscribed to.
          </p>
          <Link
            href="/first-movers"
            target="_blank"
            rel="noopener"
            className="cta-button"
          >
            Join the First Movers <span className="cta-arrow">→</span>
          </Link>
        </FadeIn>
      </section>

      <section className="section-weeks">
        <FadeIn className="weeks-container" delay={0.2}>
          <h2 className="weeks-heading">What eight weeks look like</h2>
          <p className="weeks-sub">
            We connect weekly. From getting setup to a practice that stays
            with you.
          </p>
          <ol className="weeks-list">
            <li className="weeks-item">
              <span className="weeks-number">1</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Arrive</h3>
                <p className="weeks-desc">
                  What this is, how we&apos;ll work, getting to know each other.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">2</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Set up</h3>
                <p className="weeks-desc">
                  Claude on your machine, and a gentle AI intro.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">3</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Try it</h3>
                <p className="weeks-desc">
                  First journaling session, sitting with the tool.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">4</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Notice</h3>
                <p className="weeks-desc">
                  Sharing what came up, patterns already visible.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">5</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Meet your parts</h3>
                <p className="weeks-desc">
                  Naming the voices that showed up, giving each room.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">6</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Let parts speak</h3>
                <p className="weeks-desc">
                  Part-to-part dialogue, witnessing others&apos; committees.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">7</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Integrate</h3>
                <p className="weeks-desc">
                  Carrying the practice into a real week, a real decision.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">8</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Close</h3>
                <p className="weeks-desc">
                  What shifted, how this stays alive after the cohort.
                </p>
              </div>
            </li>
          </ol>
          <div className="weeks-cta">
            <Link
              href="/first-movers"
              target="_blank"
              rel="noopener"
              className="cta-button"
            >
              Join the First Movers <span className="cta-arrow">→</span>
            </Link>
          </div>
        </FadeIn>
      </section>

      <footer className="footer-simple">
        <p>&copy; 2026 Johannes Kagerer</p>
      </footer>
    </>
  );
}
