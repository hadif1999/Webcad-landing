"use client";

import { site } from "@/lib/site";
import { entitlementCategories } from "@/lib/marketing";
import { useEffect, useState } from "react";
import { usePreferences } from "@/lib/preferences-context";
import { ButtonLink, SectionHeading } from "./layout";

export function Pricing() {
  const { t } = usePreferences();

  return (
    <section className="container section" aria-label={t("pricing.eyebrow")}>
      <SectionHeading label={t("pricing.eyebrow")} title={t("pricing.heading")}>
        {t("pricing.guidance")}
      </SectionHeading>
      <LivePlans />
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
          {plans.map((plan, index) => <LivePlanCard key={plan.id} plan={plan} language={language} index={index} />)}
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

const planEmojis = ["🌱", "⚡", "🛠️", "🚀", "👑", "✨"];
const factEmojis = ["🗂️", "🧩", "✨", "🕘", "👥"];

function LivePlanCard({ plan, language, index }: { plan: PublicPlan; language: string; index: number }) {
  const { t } = usePreferences();
  const price = new Intl.NumberFormat(language === "fa" ? "fa-IR" : language === "ru" ? "ru-RU" : "en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(plan.priceUsdCents / 100);
  const period = plan.durationMonths === 1 ? t("pricing.perMonth") : t("pricing.perMonths").replace("{months}", String(plan.durationMonths));
  return (
    <article className="panel live-plan-card">
      <div className="live-plan-card-top">
        <span className="live-plan-icon" aria-hidden="true">{planEmojis[index % planEmojis.length]}</span>
      </div>
      <h4>{plan.title}</h4>
      <p className="muted live-plan-description">{plan.description}</p>
      <p className="live-plan-price"><strong>{price}</strong> <span className="muted">{period}</span></p>
      <ul className="live-plan-facts">
        <li><span className="live-plan-fact-icon" aria-hidden="true">{factEmojis[0]}</span><strong>{plan.maxProjects}</strong> {t("pricing.liveProjects")}</li>
        <li><span className="live-plan-fact-icon" aria-hidden="true">{factEmojis[1]}</span><strong>{plan.maxWorkbenchesPerProject}</strong> {t("pricing.liveWorkbenches")}</li>
        <li><span className="live-plan-fact-icon" aria-hidden="true">{factEmojis[2]}</span><strong>{plan.maxAiPrompts}</strong> {t("pricing.liveAi")}</li>
        <li><span className="live-plan-fact-icon" aria-hidden="true">{factEmojis[3]}</span><strong>{plan.maxRevisions}</strong> {t("pricing.liveRevisions")}</li>
        <li><span className="live-plan-fact-icon" aria-hidden="true">{factEmojis[4]}</span><strong>{plan.teamModeAllowed ? "✓" : "—"}</strong> {t("pricing.liveTeam")} · {plan.teamModeAllowed ? t("pricing.liveTeamYes") : t("pricing.liveTeamNo")}</li>
      </ul>
      <ButtonLink href={`${site.subscription}?plan=${encodeURIComponent(plan.id)}`}>{t("pricing.tierCta")}</ButtonLink>
    </article>
  );
}
