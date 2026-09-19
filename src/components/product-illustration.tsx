export function ProductIllustration() {
  return (
    <figure className="container product">
      <div className="model-toolbar">
        <span className="technical">WEBCAD → PARAMETRIC WORKBENCH</span>
        <span className="technical muted">DESIGN STUDY — 001</span>
      </div>
      <div className="model-stage">
        <aside aria-label="Illustrated feature history">
          <p className="technical muted">FEATURE HISTORY</p>
          <ol>
            <li>Sketch</li>
            <li>Extrude</li>
            <li>Fillet</li>
          </ol>
        </aside>
        <svg
          viewBox="0 0 760 440"
          role="img"
          aria-labelledby="model-title model-description"
        >
          <title id="model-title">Isometric mechanical bracket</title>
          <desc id="model-description">
            A technical illustration of a machined bracket, its circular opening
            and construction lines.
          </desc>
          <defs>
            <linearGradient id="top" x2="0.8" y2="1">
              <stop stopColor="#5b7999" />
              <stop offset="1" stopColor="#273b52" />
            </linearGradient>
            <linearGradient id="side" x2="1" y2="1">
              <stop stopColor="#24394e" />
              <stop offset="1" stopColor="#142030" />
            </linearGradient>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="matrix(1 .5 -1 .5 380 20)"
            >
              <path
                d="M40 0H0V40"
                fill="none"
                stroke="#26354a"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="760" height="440" fill="url(#grid)" />
          <g stroke="#72c9ef" strokeWidth="1.5" strokeLinejoin="round">
            <path d="m220 255 225-120 125 67-224 122Z" fill="url(#top)" />
            <path d="m220 255 126 69v38l-126-69Z" fill="url(#side)" />
            <path d="m346 324 224-122v39L346 362Z" fill="#1b2e42" />
            <path d="m360 182 62-33V70l-62 33Z" fill="#243b53" />
            <path d="m360 103 62-33 95 51-62 33Z" fill="url(#top)" />
            <path d="m360 103 95 51v106l-95-51Z" fill="url(#side)" />
            <ellipse
              cx="407"
              cy="181"
              rx="24"
              ry="35"
              transform="rotate(-28 407 181)"
              fill="#0b1420"
            />
            <ellipse cx="305" cy="258" rx="19" ry="10" fill="#0b1420" />
            <ellipse cx="498" cy="225" rx="19" ry="10" fill="#0b1420" />
          </g>
          <g stroke="#4ac5dd" strokeDasharray="5 6" fill="none" opacity=".65">
            <path d="M175 315 343 407l280-153M175 270v67M343 365v56M602 220v51M407 45v255M315 133l228 122" />
          </g>
          <g fill="#8edcf1" fontFamily="monospace" fontSize="12">
            <text x="467" y="343">
              PARAMETRIC SOLID
            </text>
            <text x="125" y="359">
              X
            </text>
            <text x="632" y="277">
              Y
            </text>
            <text x="415" y="43">
              Z
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="model-caption">
        <span>
          <span className="status-dot" />
          Sketch → solid → refinement
        </span>
        <span className="muted">Illustrative model</span>
      </figcaption>
    </figure>
  );
}
