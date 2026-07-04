import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "agenticjournaling — Journal · Listen · Integrate",
  description:
    "An AI-supported journaling practice where your inner parts speak in their own voice — helping you see, value, and integrate what lives inside you.",
};

export default function AgenticJournaling() {
  return (
    <>
      <section className="section-hero section-hero-aj">
        <div className="hero-container settle">
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
        </div>
      </section>

      <section className="section-weeks">
        <div className="weeks-container">
          <h2 className="weeks-heading">How the cohort works</h2>
          <p className="weeks-sub">
            One kickoff to get you running, then we meet weekly — less a
            lesson each time, more a return to share what changed.
          </p>
          <ol className="weeks-list">
            <li className="weeks-item">
              <span className="weeks-number">1</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Kickoff</h3>
                <p className="weeks-desc">
                  The whole idea, and how it works. We set up together — an API
                  key, a folder, a few minutes — and sit with a first session.
                  You leave using it.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">2</span>
              <div className="weeks-body">
                <h3 className="weeks-title">What&apos;s showing up</h3>
                <p className="weeks-desc">
                  You&apos;ve been journaling on your own. We share the first
                  patterns, the parts you&apos;re noticing — and what the method
                  should do better.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">3</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Going deeper</h3>
                <p className="weeks-desc">
                  Letting parts speak, and witnessing each other&apos;s
                  committees.
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">4</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Into real life &amp; close</h3>
                <p className="weeks-desc">
                  Carrying it into a real decision — what shifted, how it stays
                  alive, and where your experience says the method goes next.
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
        </div>
      </section>

      <Footer />
    </>
  );
}
