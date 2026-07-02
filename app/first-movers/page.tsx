import type { Metadata } from "next";
import FirstMoversForm from "@/components/FirstMoversForm";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "First Movers",
  description:
    "Join the first cohort of agenticjournaling. Share your details and Johannes will reach out when a spot opens.",
};

export default function FirstMovers() {
  return (
    <>
      <section className="section-fm-hero">
        <FadeIn className="fm-container" duration={1.4}>
          <h1 className="fm-heading">First Movers</h1>
          <p className="fm-intro">
            A small, curated cohort that tries agenticjournaling early —
            shapes it through use, and helps the method find its voice with
            real people.
          </p>
          <p className="fm-note">
            We open the first cohort in early July 2026, as soon as six have
            gathered.
          </p>
          <p className="fm-note">
            From the start, agenticjournaling will be available in English,
            Thai, German, and Chinese.
          </p>
          <p className="fm-sub">
            A few details, and we&apos;ll be in touch.
          </p>
        </FadeIn>
      </section>

      <section className="section-fm-form">
        <FadeIn className="fm-container" delay={0.2}>
          <FirstMoversForm />
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}
