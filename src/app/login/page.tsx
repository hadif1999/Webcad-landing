import { pageMetadata, site } from "@/lib/site";
import { LocalizedLogin } from "@/components/localized-login";
export const metadata = {
  ...pageMetadata(
    "login",
    "/login/"
  ),
  robots: { index: false, follow: true },
};
export default function LoginPage() {
  return <LocalizedLogin signIn={site.signIn} signUp={site.signUp} />;
}
