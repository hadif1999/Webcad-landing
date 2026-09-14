import type { Metadata } from "next";
import "./globals.css";
import { Navigation, Footer } from "@/components/layout";
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
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{".enhancement-control { display: none !important; }"}</style>
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
