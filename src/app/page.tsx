import { ButtonLink, ClosingCTA } from "@/components/layout";
import { ProductIllustration } from "@/components/product-illustration";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { pageMetadata, site } from "@/lib/site";
export const metadata = pageMetadata(
  "Parametric CAD in your browser",
  "Design with parametric modeling, cloud workbenches, revision history and AI-assisted editing.",
  "/"
);
export default function Home() {
  return (
    <>
      <section className="container hero">
        <p className="eyebrow">
          <span className="status-dot" /> CAD, connected
        </p>
        <h1>
          Precision starts
          <br />
          with <span className="accent">an idea.</span>
        </h1>
        <p className="hero-description">
          Shape it in your browser. Build parametric models, organize cloud
          workbenches and refine your designs with AI-assisted editing.
        </p>
        <div className="button-row">
          <ButtonLink href={site.signUp}>Start designing</ButtonLink>
          <ButtonLink href="/features/" variant="secondary">
            Explore WebCAD
          </ButtonLink>
        </div>
        <p className="technical hero-note">SKETCH / MODEL / REFINE</p>
      </section>
      <ProductIllustration />
      <Features />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
