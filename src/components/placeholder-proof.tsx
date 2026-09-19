"use client";

import { usePreferences } from "@/lib/preferences-context";
import { SectionHeading } from "./layout";

// Local preview only. Replace every slot with authorized proof before publication.
// Flip this single flag to preview the layout; keep false in production commits.
const SHOW_PLACEHOLDER_PROOF = false;

export function PlaceholderProof() {
  const { t } = usePreferences();
  if (!SHOW_PLACEHOLDER_PROOF) return null;

  return (
    <section className="container section proof" aria-label={t("proof.badge")}>
      <p className="proof-badge technical">{t("proof.badge")}</p>
      <SectionHeading label={t("proof.eyebrow")} title={t("proof.heading")} />
      <div className="proof-grid">
        {(["proof.quote1", "proof.quote2", "proof.quote3"] as const).map((key) => (
          <div className="panel proof-slot" key={key}>{t(key)}</div>
        ))}
      </div>
      <div className="proof-logos" aria-hidden="true">
        {[1, 2, 3, 4].map((slot) => <span key={slot}>{t("proof.logo")}</span>)}
      </div>
    </section>
  );
}
