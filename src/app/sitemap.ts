import type { MetadataRoute } from "next";
import { localizedPath, site } from "@/lib/site";
import type { SupportedLanguage } from "@/lib/localization";

export const dynamic = "force-static";

const routes = ["/", "/features/", "/pricing/"] as const;
const languages: SupportedLanguage[] = ["en", "fa", "ru"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    languages.map((language) => {
      const url = new URL(localizedPath(language, route), site.site).href;
      return {
        url,
        alternates: {
          languages: Object.fromEntries(
            languages.map((alternate) => [
              alternate,
              new URL(localizedPath(alternate, route), site.site).href,
            ])
          ),
        },
      };
    })
  );
}
