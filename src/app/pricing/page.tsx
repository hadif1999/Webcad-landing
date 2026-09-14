import { Pricing } from "@/components/pricing";
import { ClosingCTA } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Pricing",
  "Find current WebCAD plans, prices and subscription options in Dashboard.",
  "/pricing/"
);
export default function PricingPage() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">Pricing</p>
        <h1>
          Make room for
          <br />
          <span className="accent">your next idea.</span>
        </h1>
        <p className="hero-description">
          Choose your plan with the current features, prices and limits in view.
        </p>
      </section>
      <Pricing />
      <ClosingCTA />
    </>
  );
}
