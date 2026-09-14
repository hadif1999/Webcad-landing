import { site } from "@/lib/site";
import { ButtonLink, SectionHeading } from "./layout";
export function Pricing() {
  return (
    <section className="container section">
      <div className="pricing-layout">
        <SectionHeading
          label="Plans & access"
          title="A workspace for your next step."
        >
          Review the current plans and choose the access that fits your work.
        </SectionHeading>
        <article className="panel pricing-card">
          <span className="technical accent">WEBCAD / PLANS</span>
          <h3>Explore your options</h3>
          <p className="muted">
            Current prices, included features and usage limits are available in
            Dashboard. Sign in to review your subscription and available plans.
          </p>
          <ButtonLink href={site.subscription}>View current plans</ButtonLink>
          <p className="caption">
            Plan selection and checkout take place in Dashboard.
          </p>
        </article>
      </div>
    </section>
  );
}
