"use client";

import { site } from "@/lib/site";
import { entitlementCategories, tiers } from "@/lib/marketing";
import { usePreferences } from "@/lib/preferences-context";
import { ButtonLink, SectionHeading } from "./layout";

const tierIcons = {
  free: <><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="8" /></>,
  pro: <><path d="m12 3 2.2 5.1L20 10l-4.2 3.7 1.2 5.8-5-3-5 3 1.2-5.8L4 10l5.8-1.9z" /></>,
  team: <><circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2.5" /><path d="M3.5 19c.6-3 2.4-4.5 5.5-4.5s4.9 1.5 5.5 4.5M15 15c2.7-.1 4.4 1.2 5 4" /></>,
} as const;

export function Pricing() {
  const { t } = usePreferences();

  return (
    <section className="container section" aria-label={t("pricing.eyebrow")}>
      <SectionHeading label={t("pricing.eyebrow")} title={t("pricing.heading")}>
        {t("pricing.guidance")}
      </SectionHeading>
      <div className="tier-grid">
        {tiers.map((tier) => (
          <article className={`panel tier-card${tier.id === "pro" ? " tier-card-recommended" : ""}`} key={tier.id}>
            <div className="tier-heading">
              <div className="tier-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{tierIcons[tier.id]}</svg></div>
              <h3>{t(tier.nameKey)}</h3>
              {tier.id === "pro" && <p className="technical accent">{t("pricing.recommended")}</p>}
              <p className="muted">{t(tier.positioningKey)}</p>
            </div>
            <p className="technical muted">{t("pricing.checklist")}</p>
            <ul className="tier-checklist" aria-label={t("pricing.checklist")}>
              {entitlementCategories.map((category) => (
                <li key={category.id}>
                  <span className="tier-check" aria-hidden="true">→</span>
                  <div>
                    <strong>{t(category.titleKey)}</strong>
                    <p className="muted">{t(category.id === "projects" ? tier.projectsKey : category.id === "workbenches" ? tier.workbenchesKey : category.id === "ai" ? "pricing.rows.ai" : category.id === "revisions" ? "pricing.rows.revisions" : "pricing.rows.team")}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ButtonLink href={site.subscription} variant={tier.id === "pro" ? "primary" : "secondary"}>
              {t("pricing.tierCta")}
            </ButtonLink>
          </article>
        ))}
      </div>
      <div className="pricing-layout">
        <p className="muted">{t("pricing.catalogueDesc")}</p>
        <article className="panel pricing-card">
          <span className="technical accent">{t("pricing.catalogueLabel")}</span>
          <h3>{t("pricing.comparePlans")}</h3>
          <p className="muted">
            {t("pricing.handoffDesc")}
          </p>
          <ButtonLink href={site.subscription}>
            {t("pricing.seeDashboard")}
          </ButtonLink>
          <p className="caption">
            {t("pricing.planCaption")}
          </p>
        </article>
      </div>
      <ul className="entitlement-grid" aria-label={t("pricing.entitlementLabel")}>
        {entitlementCategories.map((category) => (
          <li className="panel entitlement-card" key={category.id}>
            <h3>{t(category.titleKey)}</h3>
            <p className="muted">{t(category.descriptionKey)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
