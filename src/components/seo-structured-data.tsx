import { currentBuildLanguage, currentLocalizedPath, site, type SeoPage } from "@/lib/site";

const jsonLd = (value: unknown) => ({
  type: "application/ld+json",
  dangerouslySetInnerHTML: { __html: JSON.stringify(value) },
});

export function SeoStructuredData({ page }: { page: SeoPage }) {
  const pagePath = page === "home" ? "/" : `/${page}/`;
  const pageUrl = new URL(currentLocalizedPath(pagePath), site.site).href;
  const breadcrumbNames = {
    en: { features: "Features", pricing: "Pricing" },
    fa: { features: "قابلیت‌ها", pricing: "قیمت‌گذاری" },
    ru: { features: "Возможности", pricing: "Тарифы" },
  }[currentBuildLanguage];
  const data: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site.site}/#organization`,
      name: "WebCAD",
      url: site.site,
      email: "contact@webcad.space",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.site}/#website`,
      name: "WebCAD",
      url: site.site,
      inLanguage: currentBuildLanguage,
      publisher: { "@id": `${site.site}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "WebCAD",
      url: pageUrl,
      applicationCategory: "DesignApplication",
      operatingSystem: "Web Browser",
      inLanguage: currentBuildLanguage,
    },
  ];

  if (page !== "home") {
    data.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "WebCAD", item: new URL(currentLocalizedPath("/"), site.site).href },
        { "@type": "ListItem", position: 2, name: page === "features" ? breadcrumbNames.features : breadcrumbNames.pricing, item: pageUrl },
      ],
    });
  }

  return <script {...jsonLd(data)} />;
}
