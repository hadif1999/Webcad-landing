"use client";

import { site } from "@/lib/site";
import { entitlementCategories, tiers } from "@/lib/marketing";
import { useEffect, useState } from "react";
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
      <LivePlans />
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

type PublicPlan = {
  id: string;
  title: string;
  description: string;
  priceUsdCents: number;
  durationMonths: number;
  maxProjects: number;
  maxWorkbenchesPerProject: number;
  maxAiPrompts: number;
  maxRevisions: number;
  teamModeAllowed: boolean;
};

function LivePlans() {
  const { language, t } = usePreferences();
  const [plans, setPlans] = useState<PublicPlan[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPublicPlans().then(setPlans).catch(() => setError(true));
  }, []);

  const retry = () => {
    setError(false);
    fetchPublicPlans().then(setPlans).catch(() => setError(true));
  };

  return (
    <section className="live-plans" aria-live="polite" aria-label={t("pricing.liveHeading")}>
      <div className="section-heading live-plans-heading">
        <p className="eyebrow">{t("pricing.liveEyebrow")}</p>
        <h3>{t("pricing.liveHeading")}</h3>
        <p className="muted">{t("pricing.liveDesc")}</p>
      </div>
      {error ? (
        <div className="live-plans-message panel">
          <p>{t("pricing.liveError")}</p>
          <button className="button button-secondary" type="button" onClick={retry}>{t("pricing.liveRetry")}</button>
        </div>
      ) : plans === null ? (
        <div className="live-plans-grid" aria-busy="true">
          {[1, 2, 3].map((item) => <div className="panel live-plan-skeleton" key={item} />)}
          <p className="sr-only">{t("pricing.liveLoading")}</p>
        </div>
      ) : plans.length === 0 ? (
        <div className="live-plans-message panel"><p>{t("pricing.liveEmpty")}</p></div>
      ) : (
        <div className="live-plans-grid">
          {plans.map((plan) => <LivePlanCard key={plan.id} plan={plan} language={language} />)}
        </div>
      )}
    </section>
  );
}

function fetchPublicPlans(): Promise<PublicPlan[]> {
  return fetch(site.plans, { headers: { Accept: "application/json" } })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("plans")))
    .then((value: unknown) => {
      if (!Array.isArray(value)) throw new Error("plans");
      return value as PublicPlan[];
    });
}

function LivePlanCard({ plan, language }: { plan: PublicPlan; language: string }) {
  const { t } = usePreferences();
  const price = new Intl.NumberFormat(language === "fa" ? "fa-IR" : language === "ru" ? "ru-RU" : "en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(plan.priceUsdCents / 100);
  const period = plan.durationMonths === 1 ? t("pricing.perMonth") : t("pricing.perMonths").replace("{months}", String(plan.durationMonths));
  return (
    <article className="panel live-plan-card">
      <div className="live-plan-card-top"><span className="technical accent">{plan.id.toUpperCase()}</span><span className="live-plan-dot" aria-hidden="true" /></div>
      <h4>{plan.title}</h4>
      <p className="muted live-plan-description">{plan.description}</p>
      <p className="live-plan-price"><strong>{price}</strong> <span className="muted">{period}</span></p>
      <ul className="live-plan-facts">
        <li><span>{plan.maxProjects}</span> {t("pricing.liveProjects")}</li>
        <li><span>{plan.maxWorkbenchesPerProject}</span> {t("pricing.liveWorkbenches")}</li>
        <li><span>{plan.maxAiPrompts}</span> {t("pricing.liveAi")}</li>
        <li><span>{plan.maxRevisions}</span> {t("pricing.liveRevisions")}</li>
        <li><span>{plan.teamModeAllowed ? "✓" : "—"}</span> {t("pricing.liveTeam")} · {plan.teamModeAllowed ? t("pricing.liveTeamYes") : t("pricing.liveTeamNo")}</li>
      </ul>
      <ButtonLink href={`${site.subscription}?plan=${encodeURIComponent(plan.id)}`}>{t("pricing.tierCta")}</ButtonLink>
    </article>
  );
}
