import { Pricing } from "@/components/pricing";
import { ClosingCTA, PageIntro } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Free, Pro and Team plan guidance",
  "Explore Free, Pro and Team workspace guidance, then compare available plans, current prices and limits in Dashboard.",
  "/pricing/"
);
export default function PricingPage() {
  return (
    <>
      <PageIntro labelKey="page.pricing.eyebrow" titleKey="page.pricing.title" descriptionKey="page.pricing.desc" />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
