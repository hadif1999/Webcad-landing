import type { ReactNode } from "react";
import { site } from "@/lib/site";
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
  return (
    <>
      <a href="/features/">Features</a>
      <a href="/pricing/">Pricing</a>
      <a href="#contact">Contact</a>
    </>
  );
}
function MobileNavLinks() {
  return (
    <>
      <a href="/features/">Features</a>
      <a href="/pricing/">Pricing</a>
      <a href="#contact">Contact</a>
      <ButtonLink href={site.projects}>Start designing</ButtonLink>
    </>
  );
}
export function Navigation() {
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
          <ButtonLink href={site.projects}>Start designing</ButtonLink>
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
          </nav>
        </details>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="container footer" id="contact">
      <div>
        <Brand />
        <p>Parametric CAD for connected design work.</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/features/">Features</a>
        <a href="/pricing/">Pricing</a>
        <a href={site.signIn}>Sign in</a>
        <a href={site.projects}>Open your projects</a>
      </nav>
      <div className="footer-contact">
        <p className="technical">Contact</p>
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
  return (
    <section className="container section">
      <div className="cta panel">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Give the next design a place to grow.</h2>
          <p className="muted">
            Create an account, open a workbench and keep the process connected.
          </p>
        </div>
        <ButtonLink href={site.signUp}>Create your account</ButtonLink>
      </div>
    </section>
  );
}
