"use client";

import { ButtonLink } from "@/components/layout";
import { site } from "@/lib/site";
import { usePreferences } from "@/lib/preferences-context";

export function Hero() {
  const { t } = usePreferences();

  return (
    <div className="hero-wrapper">
      <div className="hero-video-stage" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          tabIndex={-1}
          poster="/assets/bg_video_poster.jpg"
          className="hero-bg-video"
          preload="auto"
        >
          <source src="/assets/bg_video.mp4" type="video/mp4" />
        </video>
        {/* Directional scrim: dense top and bottom for legibility, open through the middle. */}
        <div className="hero-video-scrim" />
        <div className="hero-video-grid" />
        <div className="hero-ambient-glow" />
      </div>
      <section className="container hero">
        <div className="hero-badge-row">
          <p className="eyebrow hero-pill">
            <span className="status-dot" /> {t("hero.badge")}
          </p>
          <span className="technical hero-engine-tag">
            {t("hero.engineTag")}
          </span>
        </div>
        <h1 className="hero-title">
          {t("hero.title")}{" "}
          <br className="hero-title-break" />
          {t("hero.titleBreak")}{" "}
          <span className="accent">{t("hero.titleAccent")}</span>
        </h1>
        <p className="hero-description">
          {t("hero.description")}
        </p>
        <div className="button-row">
          <ButtonLink href={site.signUp}>
            {t("hero.startDesigning")}
          </ButtonLink>
          <ButtonLink href="/features/" variant="secondary">
            {t("hero.exploreCapabilities")}
          </ButtonLink>
        </div>

        <div
          className="hero-specs-strip technical"
          aria-label={t("a11y.workflow")}
        >
          <span className="hero-spec-item">{t("hero.specSketch")}</span>
          <span className="hero-spec-divider">/</span>
          <span className="hero-spec-item">{t("hero.specModel")}</span>
          <span className="hero-spec-divider">/</span>
          <span className="hero-spec-item">{t("hero.specRefine")}</span>
          <span className="hero-spec-divider">/</span>
          <span className="hero-spec-item">{t("hero.specHistory")}</span>
        </div>
      </section>
    </div>
  );
}
