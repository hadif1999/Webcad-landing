"use client";

import { SectionHeading } from "./layout";
import { capabilities, workflow } from "@/lib/marketing";
import { usePreferences } from "@/lib/preferences-context";

export function Features({
  variant = "overview",
}: {
  variant?: "overview" | "details";
}) {
  const { t } = usePreferences();
  const detailed = variant === "details";
  return (
    <section className="container section" aria-label="WebCAD features">
      <SectionHeading
        label={detailed ? t("features.eyebrow", "Six capabilities") : "Built for the process"}
        title={detailed ? "One model. A complete working context." : "Keep the design moving."}
      >
        {detailed
          ? "WebCAD connects modeling, durable cloud work and assisted editing without turning the landing into a second product interface."
          : "From the first sketch to the version you return to, each capability supports the same workbench."}
      </SectionHeading>
      <div className={`feature-grid${detailed ? " feature-grid-detailed" : ""}`}>
        {capabilities.map((capability) => (
          <article className="panel feature-card" key={capability.number}>
            <div className="feature-card-label">
              <span className="technical accent">{capability.number} /</span>
              <span className="technical muted">{capability.label}</span>
            </div>
            <h3>{capability.title}</h3>
            <p className="muted">{capability.summary}</p>
            {detailed && (
              <p className="capability-detail">{capability.detail}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function Workflow() {
  const { t } = usePreferences();
  return (
    <section className="container section" aria-label="WebCAD modeling workflow">
      <div className="workflow-layout">
        <SectionHeading
          label={t("workflow.eyebrow", "A continuous workflow")}
          title="Move forward without losing context."
        >
          The workbench keeps modeling, assistance and history centered on the
          design rather than on disconnected files.
        </SectionHeading>
        <ol className="workflow-grid">
          {workflow.map((step) => (
            <li className="panel workflow-step" key={step.number}>
              <span className="technical accent">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p className="muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
