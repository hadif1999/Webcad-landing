import { Hero } from "@/components/hero";
import { Features, Workflow } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { ClosingCTA } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
import { PlaceholderProof } from "@/components/placeholder-proof";

export const metadata = pageMetadata(
  "Parametric CAD in your browser",
  "Design parts in your browser with an AI copilot, team projects and revision history for each workbench.",
  "/"
);

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <PlaceholderProof />
      <Workflow />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
