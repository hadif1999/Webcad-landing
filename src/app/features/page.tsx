import { Features, Workflow } from "@/components/features";
import { ProductIllustration } from "@/components/product-illustration";
import { ClosingCTA, PageIntro } from "@/components/layout";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Browser CAD, AI copilot, teams and revision history",
  "Explore browser parametric modeling, an AI copilot for parts, team collaboration, workbench revision history and portable design data.",
  "/features/"
);
export default function FeaturesPage() {
  return (
    <>
      <PageIntro labelKey="page.features.eyebrow" titleKey="page.features.title" descriptionKey="page.features.desc" />
      <Features variant="details" />
      <ProductIllustration />
      <Workflow />
      <ClosingCTA />
    </>
  );
}
