import type { Metadata } from "next";
import { publicConfig } from "../../config/public.mjs";
export const site = publicConfig({
  NODE_ENV: process.env.NODE_ENV,
  LANDING_SITE_URL: process.env.LANDING_SITE_URL,
  LANDING_DASHBOARD_BASE_URL: process.env.LANDING_DASHBOARD_BASE_URL,
  LANDING_API_BASE_URL: process.env.LANDING_API_BASE_URL,
});
export function pageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const url = new URL(path, site.site).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    twitter: {
      card: "summary",
      title: `${title} | WebCAD`,
      description,
    },
    openGraph: {
      title: `${title} | WebCAD`,
      description,
      url,
      siteName: "WebCAD",
      type: "website",
    },
  };
}
