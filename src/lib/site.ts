import type { Metadata } from "next";
import { publicConfig } from "../../config/public.mjs";
export const site = publicConfig();
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
    openGraph: {
      title: `${title} | WebCAD`,
      description,
      url,
      siteName: "WebCAD",
      type: "website",
    },
  };
}
