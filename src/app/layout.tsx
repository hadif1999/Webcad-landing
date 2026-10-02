import type { Metadata } from "next";
import "./globals.css";
import { Navigation, Footer } from "@/components/layout";
import { PreferencesProvider } from "@/lib/preferences-context";
import { seoEntry, site } from "@/lib/site";
import { normalizeLanguage } from "@/lib/localization";
import { LanguageSuggestion } from "@/components/language-suggestion";
const rootSeo = seoEntry("home");
export const metadata: Metadata = {
  metadataBase: new URL(site.site),
  title: {
    default: rootSeo.title,
    template: "%s | WebCAD",
  },
  description: rootSeo.description,
  robots: { index: true, follow: true },
};

const antiFoucScript = `(function(){try{var c=document.cookie;var tm=(c.match(/(?:^|;\\s*)webcad-theme=([^;]+)/)||[])[1];if(tm){var t=decodeURIComponent(tm);if(['dark','light'].indexOf(t)!==-1){document.documentElement.dataset.theme=t;}}else{var lt=localStorage.getItem('webcad-landing-theme');if(lt&&['dark','light'].indexOf(lt)!==-1){document.documentElement.dataset.theme=lt;}}var p=window.location.pathname;var hasRouteLocale=/^\\/(fa|ru)(?:\\/|$)/.test(p);var lm=(c.match(/(?:^|;\\s*)webcad-language=([^;]+)/)||[])[1]||(c.match(/(?:^|;\\s*)webcad-studio-language=([^;]+)/)||[])[1];if(!hasRouteLocale&&lm){var l=decodeURIComponent(lm);if(['en','fa','ru'].indexOf(l)!==-1){document.documentElement.lang=l;document.documentElement.dir=l==='fa'?'rtl':'ltr';}}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const initialLanguage = normalizeLanguage(process.env.LANDING_BUILD_LANGUAGE);
  return (
    <html lang={initialLanguage} dir={initialLanguage === "fa" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <meta name="enamad" content="68196663" />
        <script dangerouslySetInnerHTML={{ __html: antiFoucScript }} />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <style>{".enhancement-control { display: none !important; }"}</style>
        </noscript>
        <PreferencesProvider initialLanguage={initialLanguage}>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navigation />
          <LanguageSuggestion />
          <main id="main">{children}</main>
          <Footer />
        </PreferencesProvider>
      </body>
    </html>
  );
}
