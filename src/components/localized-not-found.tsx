"use client";

import { ButtonLink } from "@/components/layout";
import { usePreferences } from "@/lib/preferences-context";
import { routeTranslations } from "@/lib/route-translations";

export function LocalizedNotFound() {
  const { language } = usePreferences();
  const copy = routeTranslations[language];
  return (
    <section className="container page-intro">
      <p className="eyebrow">{copy.notFoundEyebrow}</p>
      <h1>{copy.notFoundTitle}</h1>
      <p className="hero-description">{copy.notFoundDescription}</p>
      <ButtonLink href="/">{copy.notFoundBack}</ButtonLink>
    </section>
  );
}
