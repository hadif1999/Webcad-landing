"use client";

import { useState, type ComponentType, type ReactNode } from "react";

export function ProductExperience({ children }: { children: ReactNode }) {
  const [Scene, setScene] = useState<ComponentType | null>(null);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function toggleScene() {
    if (Scene) {
      setActive(!active);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      const sceneModule = await import("./assembly-scene");
      setScene(() => sceneModule.AssemblyScene);
      setActive(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section aria-label="Interactive engineering study">
      <div id="product-study" aria-busy={loading}>
        {active && Scene ? <Scene /> : children}
      </div>
      <div className="container experience-actions">
        <button
          className="button button-secondary enhancement-control"
          onClick={toggleScene}
          disabled={loading}
          aria-pressed={active}
          aria-controls="product-study"
        >
          {loading
            ? "Loading 3D study…"
            : active
              ? "Return to illustration"
              : "Explore the 3D assembly"}
        </button>
        <p className="caption" role="status">
          {error
            ? "The 3D study could not load. The illustration is still available; try again."
            : "Illustrative engineering study. Rotate and separate the parts at your own pace."}
        </p>
      </div>
    </section>
  );
}
