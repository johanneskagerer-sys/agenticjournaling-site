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
            Join the First Movers
          </Link>
        </div>
      </section>

      <section className="section-weeks">
        <div className="weeks-container">
          <h2 className="weeks-heading">How the cohort works</h2>
          <p className="weeks-sub">
            Once your token arrives, you can explore the app. Shortly after,
            we&apos;ll have our kickoff – I&apos;ll be in touch soon to schedule
            our first session.
          </p>
          <ol className="weeks-list">
            <li className="weeks-item">
              <span className="weeks-number">1</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Kickoff</h3>
                <p className="weeks-desc">
                  What was your first impression? What do you sense it&apos;s
                  about, and how it works? Where could it feel easier or
                  clearer?
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">2</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Going deeper</h3>
                <p className="weeks-desc">
                  What are you starting to see in yourself? What do you find
                  yourself wishing for? And how do the translations feel?
                </p>
              </div>
            </li>
            <li className="weeks-item">
              <span className="weeks-number">3</span>
              <div className="weeks-body">
                <h3 className="weeks-title">Into real life &amp; close</h3>
                <p className="weeks-desc">
                  Where did it meet a real decision? What shifted for you? Where
                  should the method go next?
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
              Join the First Movers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
