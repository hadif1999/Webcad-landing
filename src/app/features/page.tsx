import { Features, Workflow } from "@/components/features";
import { ProductIllustration } from "@/components/product-illustration";
import { ClosingCTA } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Features",
  "Explore WebCAD parametric modeling, cloud workbenches, durable history, AI-assisted editing and team projects.",
  "/features/"
);
export default function FeaturesPage() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">The WebCAD workspace</p>
        <h1>
          Six capabilities.
          <br />
          <span className="accent">One design context.</span>
        </h1>
        <p className="hero-description">
          Move from sketches to solids while the model, its project, its history
          and its assisted changes stay connected.
        </p>
      </section>
      <Features variant="details" />
      <ProductIllustration />
      <Workflow />
      <ClosingCTA />
    </>
  );
}
