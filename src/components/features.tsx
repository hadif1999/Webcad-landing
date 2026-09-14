import { SectionHeading } from "./layout";
const features = [
  [
    "01",
    "Parametric modeling",
    "Build with sketches, parameters and an ordered feature history. Refine dimensions as your design takes shape.",
  ],
  [
    "02",
    "Cloud workbenches",
    "Organize designs in projects and open your workbenches through your account.",
  ],
  [
    "03",
    "Revision history",
    "Bookmark a version of your workbench and return to it as your design evolves.",
  ],
  [
    "04",
    "AI-assisted editing",
    "Describe a change in your workbench and work with the assistant to develop your model.",
  ],
];
export function Features() {
  return (
    <section className="container section" aria-label="WebCAD features">
      <SectionHeading
        label="Built for the process"
        title="Keep the design moving."
      />
      <div className="feature-grid">
        {features.map(([number, title, text]) => (
          <article className="panel feature-card" key={number}>
            <span className="technical accent">{number} /</span>
            <h3>{title}</h3>
            <p className="muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
