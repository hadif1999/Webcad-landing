import { ButtonLink } from "@/components/layout";
export default function NotFound() {
  return (
    <section className="container page-intro">
      <p className="eyebrow">404 / Page not found</p>
      <h1>Outside the drawing.</h1>
      <p className="hero-description">
        This page could not be found. Return home to explore WebCAD.
      </p>
      <ButtonLink href="/">Back to home</ButtonLink>
    </section>
  );
}
