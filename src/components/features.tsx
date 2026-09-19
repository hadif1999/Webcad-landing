"use client";

import type { ReactNode } from "react";
import { SectionHeading } from "./layout";
import { capabilities, workflow, type IconKey } from "@/lib/marketing";
import { usePreferences } from "@/lib/preferences-context";

const icons: Record<IconKey, ReactNode> = {
  browser: <><path d="M3 5.5h18v13H3z" /><path d="M3 9h18M7 15h5" /></>,
  copilot: <><path d="M12 3v3M5.6 6.1l2.1 2.1M3 12h3M18.3 8.2l2.1-2.1M18 12h3" /><path d="M8 15.5a5 5 0 1 1 8 0l-1 1.5H9zM10 20h4" /></>,
  team: <><circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2.5" /><path d="M3.5 19c.6-3 2.4-4.5 5.5-4.5s4.9 1.5 5.5 4.5M15 15c2.7-.1 4.4 1.2 5 4" /></>,
  history: <><path d="M4 12a8 8 0 1 0 2.3-5.7" /><path d="M4 5v5h5M12 7v5l3 2" /></>,
  workbench: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" /></>,
  portable: <><path d="M5 4h10l4 4v12H5zM15 4v5h4M8 14h8M8 17h5" /></>,
};

const workflowIcons: Record<string, ReactNode> = {
  sketch: <><path d="m5 19 9.5-9.5" /><path d="m13 6 5 5M4 20l4-1 9-9-3-3-9 9z" /></>,
  build: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></>,
  refine: <><path d="M4 18h16M6 14l3-3 3 2 5-6" /><path d="M17 7h2v2" /></>,
  revisit: <><path d="M4 12a8 8 0 1 0 2.3-5.7" /><path d="M4 5v5h5M12 7v5l3 2" /></>,
};

function CapabilityIcon({ icon }: { icon: IconKey }) {
  return <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[icon]}</svg>;
}

export function Features({ variant = "overview" }: { variant?: "overview" | "details" }) {
  const { t } = usePreferences();
  const detailed = variant === "details";
  return (
    <section className="container section" aria-label={t("features.eyebrow")}>
      <SectionHeading
        label={t(detailed ? "features.eyebrow" : "features.overviewEyebrow")}
        title={t(detailed ? "features.detailsHeading" : "features.overviewHeading")}
      >
        {t(detailed ? "features.detailsDesc" : "features.overviewDesc")}
      </SectionHeading>
      <div className={`feature-grid${detailed ? " feature-grid-detailed" : ""}`}>
        {capabilities.map((capability, index) => (
          <article className={`panel feature-card${index < 4 ? " feature-card-spotlight" : " feature-card-compact"}`} key={capability.id}>
            <div className="feature-card-label"><span className="feature-number">{capability.number}</span><span className="feature-tag">{t(capability.labelKey)}</span></div>
            <div className="feature-card-header">
              <CapabilityIcon icon={capability.icon} />
              <h3>{t(capability.titleKey)}</h3>
            </div>
            <p className="muted">{t(capability.summaryKey)}</p>
            {detailed && <p className="capability-detail">{t(capability.detailKey)}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export function Workflow() {
  const { t } = usePreferences();
  return (
    <section className="container section" aria-label={t("workflow.eyebrow")}>
      <div className="workflow-layout">
        <SectionHeading label={t("workflow.eyebrow")} title={t("workflow.heading")}>{t("workflow.desc")}</SectionHeading>
        <ol className="workflow-grid">
          {workflow.map((step) => <li className="panel workflow-step" key={step.id}><span className="workflow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{workflowIcons[step.id]}</svg></span><div><span className="workflow-number">{step.number}</span><h3>{t(step.titleKey)}</h3><p className="muted">{t(step.descriptionKey)}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}
