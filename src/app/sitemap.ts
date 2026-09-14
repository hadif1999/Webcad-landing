import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/features/", "/pricing/"].map((path) => ({
    url: new URL(path, site.site).href,
  }));
}
