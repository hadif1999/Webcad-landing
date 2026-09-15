"use client";

import { site } from "@/lib/site";
import { entitlementCategories } from "@/lib/marketing";
import { usePreferences } from "@/lib/preferences-context";
import { ButtonLink, SectionHeading } from "./layout";

export function Pricing() {
  const { t } = usePreferences();

  return (
    <section className="container section" aria-label="WebCAD plans and access">
      <div className="pricing-layout">
        <SectionHeading
          label={t("pricing.eyebrow", "Plans & access")}
          title={t("pricing.heading", "Choose the capacity your work needs.")}
        >
          {t("pricing.catalogueDesc", "Plans scale the workspace around the same design process. Dashboard is the source of truth for current names, prices and limits.")}
        </SectionHeading>
        <article className="panel pricing-card">
          <span className="technical accent">{t("pricing.catalogueLabel", "CURRENT CATALOGUE / DASHBOARD")}</span>
          <h3>{t("pricing.comparePlans", "Compare current plans")}</h3>
          <p className="muted">
            {t("pricing.catalogueDesc", "Sign in to see the live catalogue, review your subscription and choose an available upgrade with its current terms in view.")}
          </p>
          <ButtonLink href={site.subscription}>
            {t("pricing.seeDashboard", "See current plans in Dashboard")}
          </ButtonLink>
          <p className="caption">
            {t("pricing.planCaption", "Plan selection and checkout take place in Dashboard.")}
          </p>
        </article>
      </div>
      <ul className="entitlement-grid" aria-label={t("pricing.entitlementLabel", "Plan entitlement categories")}>
        {entitlementCategories.map((category) => (
          <li className="panel entitlement-card" key={category.title}>
            <h3>{category.title}</h3>
            <p className="muted">{category.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
