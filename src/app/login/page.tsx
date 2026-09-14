import { ButtonLink } from "@/components/layout";
import { pageMetadata, site } from "@/lib/site";
export const metadata = pageMetadata(
  "Sign in",
  "Continue to WebCAD Dashboard to sign in to your account.",
  "/login/"
);
export default function LoginPage() {
  return (
    <section className="container page-intro">
      <p className="eyebrow">Your WebCAD account</p>
      <h1>Welcome back.</h1>
      <p className="hero-description">
        Sign in through Dashboard to open your projects, manage your account and
        continue designing.
      </p>
      <div className="button-row">
        <ButtonLink href={site.signIn}>Continue to Dashboard</ButtonLink>
        <ButtonLink href={site.signUp} variant="secondary">
          Create an account
        </ButtonLink>
      </div>
    </section>
  );
}
