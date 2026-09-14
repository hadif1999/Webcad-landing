import { Pricing } from "@/components/pricing";
import { ClosingCTA } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Pricing",
  "Understand what WebCAD plans scale, then compare current prices and limits in Dashboard.",
  "/pricing/"
);
export default function PricingPage() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">Pricing</p>
        <h1>
          Plans that match
          <br />
          <span className="accent">the way you work.</span>
        </h1>
        <p className="hero-description">
          Compare the workspace capacity each plan controls, then review the
          live catalogue and your current subscription in Dashboard.
        </p>
      </section>
      <Pricing />
      <ClosingCTA />
    </>
  );
}
