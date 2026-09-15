import { ButtonLink, ClosingCTA } from "@/components/layout";
import { Features, Workflow } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { pageMetadata, site } from "@/lib/site";
export const metadata = pageMetadata(
  "Parametric CAD for work that keeps moving",
  "Build browser-based parametric models with cloud workbenches, durable history and AI-assisted editing.",
  "/"
);
export default function Home() {
  return (
    <>
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
              <span className="status-dot" /> CAD, connected
            </p>
            <span className="technical hero-engine-tag">BROWSER B-REP ENGINE</span>
          </div>
          <h1 className="hero-title">
            Parametric CAD for work
            <br />
            that <span className="accent">keeps moving.</span>
          </h1>
          <p className="hero-description">
            Build precise models in your browser, keep cloud workbenches and
            revision history together, and use AI assistance when the next change
            is easier to describe than assemble.
          </p>
          <div className="button-row">
            <ButtonLink href={site.signUp}>Start designing</ButtonLink>
            <ButtonLink href="/features/" variant="secondary">
              Explore capabilities
            </ButtonLink>
          </div>

          <div className="hero-specs-strip technical" aria-label="Core modeling workflow">
            <span className="hero-spec-item">SKETCH</span>
            <span className="hero-spec-divider">/</span>
            <span className="hero-spec-item">MODEL</span>
            <span className="hero-spec-divider">/</span>
            <span className="hero-spec-item">REFINE</span>
            <span className="hero-spec-divider">/</span>
            <span className="hero-spec-item">PARAMETRIC HISTORY</span>
          </div>
        </section>
      </div>
      <Features />
      <Workflow />
      <Pricing />
      <ClosingCTA />
    </>
  );
}
