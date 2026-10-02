import { Hero } from "@/components/hero";
import { Features, Workflow } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { ClosingCTA } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
import { PlaceholderProof } from "@/components/placeholder-proof";
import { SeoStructuredData } from "@/components/seo-structured-data";

export const metadata = pageMetadata(
  "home",
  "/"
);

export default function Home() {
  return (
    <>
      <SeoStructuredData page="home" />
      <Hero />
      <Features />
      <PlaceholderProof />
      <Workflow />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
