import type { Metadata } from "next";
import "./globals.css";
import { Navigation, Footer } from "@/components/layout";
import { PreferencesProvider } from "@/lib/preferences-context";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(site.site),
  title: {
    default: "WebCAD — Parametric CAD in your browser",
    template: "%s | WebCAD",
  },
  description:
    "Browser-based parametric CAD with cloud workbenches, durable history and AI-assisted editing.",
  robots: { index: true, follow: true },
};

const antiFoucScript = `(function(){try{var c=document.cookie;var tm=(c.match(/(?:^|;\\s*)webcad-theme=([^;]+)/)||[])[1];if(tm){var t=decodeURIComponent(tm);if(['dark','light','warm','contrast'].indexOf(t)!==-1){document.documentElement.dataset.theme=t;}}else{var lt=localStorage.getItem('webcad-landing-theme');if(lt&&['dark','light','warm','contrast'].indexOf(lt)!==-1){document.documentElement.dataset.theme=lt;}}var lm=(c.match(/(?:^|;\\s*)webcad-language=([^;]+)/)||[])[1]||(c.match(/(?:^|;\\s*)webcad-studio-language=([^;]+)/)||[])[1];if(lm){var l=decodeURIComponent(lm);if(['en','fa','ru'].indexOf(l)!==-1){document.documentElement.lang=l;document.documentElement.dir=l==='fa'?'rtl':'ltr';}}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFoucScript }} />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <style>{".enhancement-control { display: none !important; }"}</style>
        </noscript>
        <PreferencesProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navigation />
          <main id="main">{children}</main>
          <Footer />
        </PreferencesProvider>
      </body>
    </html>
  );
}
