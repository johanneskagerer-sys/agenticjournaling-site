import type { Metadata } from "next";
import StepInForm from "@/components/StepInForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Step in",
  description:
    "agenticjournaling is a young, private journaling practice – yours to use, in your language. Share your details and your invitation arrives in your inbox.",
};

export default function StepIn() {
  return (
    <>
      <section className="section-fm-hero">
        <div className="fm-container settle">
          <h1 className="fm-heading">Step in and have a seat</h1>
          <p className="fm-intro">
            agenticjournaling is young, and it&rsquo;s yours to use &ndash; in your
            language, at your own pace. I carry the costs for now and I am curious
            what it does for people &ndash; for people like you.
          </p>
          <p className="fm-note">
            Available in English, Chinese, German, and Thai. The model is on me
            for now &ndash; if you&rsquo;d rather carry your own, there&rsquo;s a key
            of your own in settings.
          </p>
          <p className="fm-sub">
            A few details, and your invitation is on its way.
          </p>
        </div>
      </section>

      <section className="section-fm-form">
        <div className="fm-container">
          <p className="fm-intro">
            Have a seat &ndash; and tell me, when you like, what you notice.
          </p>
          <StepInForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
