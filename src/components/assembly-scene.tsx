"use client";

import { useState, type CSSProperties } from "react";

// Native CSS perspective keeps this small study independent of the Studio renderer.
export function AssemblyScene() {
  const [rotation, setRotation] = useState(-30);
  const [separation, setSeparation] = useState(30);
  return (
    <figure className="container product assembly-study">
      <div className="model-toolbar">
        <span className="technical">WEBCAD / ASSEMBLY STUDY</span>
        <span className="technical muted">BEARING HOUSING — 002</span>
      </div>
      <div className="assembly-layout">
        <div className="assembly-viewport" role="img" aria-label={`Three-dimensional bearing housing with a base, bearing and cover. Rotation ${rotation} degrees; separation ${separation} percent.`}>
          <div className="assembly-camera" style={{ "--rotation": `${rotation}deg`, "--separation": separation / 100 } as CSSProperties} aria-hidden="true">
            <div className="assembly-grid" />
            {["base", "bearing", "cover"].map((part, index) => (
              <div key={part} className={`assembly-part assembly-${part}`} style={{ "--level": index } as CSSProperties}>
                {[0, 1, 2, 3].map((layer) => (
                  <svg key={layer} className="assembly-layer" viewBox="0 0 240 240" style={{ transform: `translateZ(${layer * 3}px)` }}>
                    {part === "bearing" ? (
                      <path fillRule="evenodd" d="M120 35a85 85 0 1 1 0 170 85 85 0 0 1 0-170Zm0 40a45 45 0 1 0 0 90 45 45 0 0 0 0-90Z" />
                    ) : (
                      <path fillRule="evenodd" d="M30 10h180a20 20 0 0 1 20 20v180a20 20 0 0 1-20 20H30a20 20 0 0 1-20-20V30a20 20 0 0 1 20-20Zm90 65a45 45 0 1 0 0 90 45 45 0 0 0 0-90ZM40 30a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm160 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM40 190a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm160 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
                    )}
                  </svg>
                ))}
              </div>
            ))}
            <div className="assembly-axis" />
          </div>
          <span className="technical assembly-label">Z / ASSEMBLY AXIS</span>
        </div>
        <fieldset className="assembly-controls">
          <legend>Inspect the assembly</legend>
          <label htmlFor="assembly-rotation">Rotate <output>{rotation}°</output></label>
          <input id="assembly-rotation" type="range" min="-180" max="180" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} />
          <label htmlFor="assembly-separation">Separate parts <output>{separation}%</output></label>
          <input id="assembly-separation" type="range" min="0" max="100" value={separation} onChange={(event) => setSeparation(Number(event.target.value))} />
          <button className="button button-secondary" onClick={() => { setRotation(-30); setSeparation(30); }}>Reset view</button>
          <ol className="assembly-key muted">
            <li>Mounting base</li>
            <li>Bearing insert</li>
            <li>Retaining cover</li>
          </ol>
        </fieldset>
      </div>
      <figcaption className="model-caption">
        <span><span className="status-dot" />One assembly. Three connected parts.</span>
        <span className="muted">Illustrative model / not a CAD editor</span>
      </figcaption>
    </figure>
  );
}
