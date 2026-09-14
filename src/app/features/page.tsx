import { Features } from "@/components/features";
import { ProductIllustration } from "@/components/product-illustration";
import { ClosingCTA } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Features",
  "Explore parametric modeling, cloud workbenches, revision history and AI-assisted editing in WebCAD.",
  "/features/"
);
export default function FeaturesPage() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">The WebCAD workspace</p>
        <h1>
          Built around
          <br />
          <span className="accent">your design.</span>
        </h1>
        <p className="hero-description">
          Move from sketches to solids, with your model and its history in one
          workbench.
        </p>
      </section>
      <Features />
      <ProductIllustration />
      <ClosingCTA />
    </>
  );
}
