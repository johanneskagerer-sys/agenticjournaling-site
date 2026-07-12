import type { Metadata } from "next";
import FirstMoversForm from "@/components/FirstMoversForm";
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
        <div className="fm-container settle">
          <h1 className="fm-heading">First Movers</h1>
          <p className="fm-intro">
            A small, curated cohort — the first to live with agenticjournaling,
            shape it through use, and help the method find its voice with real
            people.
          </p>
          <p className="fm-note">
            We open the first cohort in early July 2026.
          </p>
          <p className="fm-note">
            From the start, agenticjournaling will be available in English,
            Chinese, German, and Thai.
          </p>
          <p className="fm-sub">
            A few details, and we&apos;ll be in touch.
          </p>
        </div>
      </section>

      <section className="section-fm-form">
        <div className="fm-container">
          <p className="fm-intro">
            Be part of shaping how it finds its voice.
          </p>
          <FirstMoversForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
