"use client";

import { ButtonLink } from "@/components/layout";
import { usePreferences } from "@/lib/preferences-context";
import { routeTranslations } from "@/lib/route-translations";

export function LocalizedLogin({ signIn, signUp }: { signIn: string; signUp: string }) {
  const { language } = usePreferences();
  const copy = routeTranslations[language];
  return (
    <section className="container page-intro">
      <p className="eyebrow">{copy.loginEyebrow}</p>
      <h1>{copy.loginTitle}</h1>
      <p className="hero-description">{copy.loginDescription}</p>
      <div className="button-row">
        <ButtonLink href={signIn}>{copy.loginContinue}</ButtonLink>
        <ButtonLink href={signUp} variant="secondary">{copy.loginCreate}</ButtonLink>
      </div>
    </section>
  );
}
