import { Features, Workflow } from "@/components/features";
import { ProductIllustration } from "@/components/product-illustration";
import { ClosingCTA, PageIntro } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
import { SeoStructuredData } from "@/components/seo-structured-data";
export const metadata = pageMetadata(
  "features",
  "/features/"
);
export default function FeaturesPage() {
  return (
    <>
      <SeoStructuredData page="features" />
      <PageIntro labelKey="page.features.eyebrow" titleKey="page.features.title" descriptionKey="page.features.desc" />
      <Features variant="details" />
      <ProductIllustration />
      <Workflow />
      <ClosingCTA />
    </>
  );
}
