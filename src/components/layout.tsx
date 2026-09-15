"use client";

import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { usePreferences } from "@/lib/preferences-context";
import { PreferenceControls } from "./PreferenceControls";

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a href={href} className={`button button-${variant}`}>
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="WebCAD home">
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 2 29 9.5v13L16 30 3 22.5v-13L16 2Z M3 9.5l13 8 13-8M16 17.5V30M9.5 6l13 8v12"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <span>
        WebCAD<span className="brand-dot">.</span>
      </span>
    </a>
  );
}

function DesktopNavLinks() {
  const { t } = usePreferences();
  return (
    <>
      <a href="/features/">{t("nav.features", "Features")}</a>
      <a href="/pricing/">{t("nav.pricing", "Pricing")}</a>
      <a href="#contact">{t("nav.contact", "Contact")}</a>
    </>
  );
}

function MobileNavLinks() {
  const { t } = usePreferences();
  return (
    <>
      <a href="/features/">{t("nav.features", "Features")}</a>
      <a href="/pricing/">{t("nav.pricing", "Pricing")}</a>
      <a href="#contact">{t("nav.contact", "Contact")}</a>
      <ButtonLink href={site.projects}>
        {t("nav.startDesigning", "Start designing")}
      </ButtonLink>
    </>
  );
}

export function Navigation() {
  const { t } = usePreferences();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-left">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <DesktopNavLinks />
          </nav>
        </div>
        <div className="header-actions">
          <PreferenceControls />
          <ButtonLink href={site.projects}>
            {t("nav.startDesigning", "Start designing")}
          </ButtonLink>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Toggle navigation menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav aria-label="Mobile navigation">
            <MobileNavLinks />
            <PreferenceControls className="mobile-preference-controls" />
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = usePreferences();
  return (
    <footer className="container footer" id="contact">
      <div>
        <Brand />
        <p>
          {t(
            "footer.desc",
            "Browser-based parametric CAD with cloud workbenches, durable history and AI-assisted editing."
          )}
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/features/">{t("nav.features", "Features")}</a>
        <a href="/pricing/">{t("nav.pricing", "Pricing")}</a>
        <a href={site.signIn}>{t("nav.signIn", "Sign in")}</a>
        <a href={site.projects}>{t("nav.openProjects", "Open your projects")}</a>
      </nav>
      <div className="footer-contact">
        <p className="technical">{t("nav.contact", "Contact")}</p>
        <a href="mailto:contact@webcad.space">contact@webcad.space</a>
      </div>
    </footer>
  );
}

export function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {children && <p className="muted">{children}</p>}
    </div>
  );
}

export function ClosingCTA() {
  const { t } = usePreferences();
  return (
    <section className="container section">
      <div className="cta panel">
        <div>
          <p className="eyebrow">{t("cta.eyebrow", "Ready when you are")}</p>
          <h2>{t("cta.heading", "Ready to build without installation?")}</h2>
          <p className="muted">
            {t(
              "cta.description",
              "Open WebCAD in any modern browser and start modeling in seconds."
            )}
          </p>
        </div>
        <ButtonLink href={site.signUp}>{t("cta.button", "Create your account")}</ButtonLink>
      </div>
    </section>
  );
}
