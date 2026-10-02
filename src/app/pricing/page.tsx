import { Pricing } from "@/components/pricing";
import { ClosingCTA, PageIntro } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
import { SeoStructuredData } from "@/components/seo-structured-data";
export const metadata = pageMetadata(
  "pricing",
  "/pricing/"
);
export default function PricingPage() {
  return (
    <>
      <SeoStructuredData page="pricing" />
      <PageIntro labelKey="page.pricing.eyebrow" titleKey="page.pricing.title" descriptionKey="page.pricing.desc" />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
