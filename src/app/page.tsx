import { Hero } from "@/components/hero";
import { Features, Workflow } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { ClosingCTA } from "@/components/layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Parametric CAD for work that keeps moving",
  "Build browser-based parametric models with cloud workbenches, durable history and AI-assisted editing.",
  "/"
);

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Workflow />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
