import { ButtonLink, ClosingCTA } from "@/components/layout";
import { ProductIllustration } from "@/components/product-illustration";
import { ProductExperience } from "@/components/product-experience";
import { Features, Workflow } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { pageMetadata, site } from "@/lib/site";
export const metadata = pageMetadata(
  "Parametric CAD for work that keeps moving",
  "Build browser-based parametric models with cloud workbenches, durable history and AI-assisted editing.",
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
          Parametric CAD for work
          <br />
          that <span className="accent">keeps moving.</span>
        </h1>
        <p className="hero-description">
          Build precise models in your browser, keep cloud workbenches and
          revision history together, and use AI assistance when the next change
          is easier to describe than assemble.
        </p>
        <div className="button-row">
          <ButtonLink href={site.signUp}>Start designing</ButtonLink>
          <ButtonLink href="/features/" variant="secondary">
            Explore capabilities
          </ButtonLink>
        </div>
        <p className="technical hero-note">SKETCH / MODEL / REFINE</p>
      </section>
      <ProductExperience>
        <ProductIllustration />
      </ProductExperience>
      <Features />
      <Workflow />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
