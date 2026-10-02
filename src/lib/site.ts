import type { Metadata } from "next";
import { publicConfig } from "../../config/public.mjs";
import type { SupportedLanguage } from "./localization";

const config = publicConfig({
  NODE_ENV: process.env.NODE_ENV,
  LANDING_SITE_URL: process.env.LANDING_SITE_URL,
  LANDING_DASHBOARD_BASE_URL: process.env.LANDING_DASHBOARD_BASE_URL,
  LANDING_API_BASE_URL: process.env.LANDING_API_BASE_URL,
});

export const site = {
  site: config.site,
  dashboard: config.dashboard,
  api: config.apiBase,
  plans: config.plans,
  projects: config.projects,
  signIn: config.signIn,
  signUp: config.signUp,
  subscription: config.subscription,
};

export type SeoPage = "home" | "features" | "pricing" | "login";

const buildLanguage = (value: unknown): SupportedLanguage => {
  if (value === "fa" || value === "ru") return value;
  return "en";
};

export const currentBuildLanguage = buildLanguage(process.env.LANDING_BUILD_LANGUAGE);

const localePrefixes: Record<SupportedLanguage, string> = { en: "", fa: "/fa", ru: "/ru" };
const localeOpenGraph: Record<SupportedLanguage, string> = { en: "en_US", fa: "fa_IR", ru: "ru_RU" };

const seoCopy: Record<SupportedLanguage, Record<SeoPage, { title: string; description: string }>> = {
  en: {
    home: { title: "Web-Based CAD Platform | WebCAD", description: "Design with browser-based parametric CAD, AI-assisted modeling, team workbenches and revision history in one web-based CAD platform." },
    features: { title: "Browser CAD and AI-Assisted Design | WebCAD", description: "Explore browser-based parametric modeling, AI-assisted part design, team workbenches and revision history in WebCAD." },
    pricing: { title: "WebCAD Plans for Browser-Based CAD", description: "Review WebCAD workspace plans and compare the capabilities available for browser-based parametric CAD." },
    login: { title: "Sign in | WebCAD", description: "Continue to WebCAD Dashboard to sign in to your account." },
  },
  fa: {
    home: { title: "پلتفرم CAD تحت وب | طراحی پارامتریک در مرورگر | WebCAD", description: "با WebCAD طراحی پارامتریک را در مرورگر انجام دهید؛ از مدل‌سازی با کمک هوش مصنوعی، میزکار تیمی و تاریخچه نسخه‌ها استفاده کنید." },
    features: { title: "CAD در مرورگر و طراحی با کمک هوش مصنوعی | WebCAD", description: "مدل‌سازی پارامتریک در مرورگر، طراحی قطعات با کمک هوش مصنوعی، میزکار تیمی و تاریخچه نسخه‌ها را در WebCAD بررسی کنید." },
    pricing: { title: "طرح‌های WebCAD برای CAD تحت وب", description: "طرح‌های فضای کاری WebCAD و قابلیت‌های مناسب برای طراحی پارامتریک CAD تحت وب را مقایسه کنید." },
    login: { title: "ورود | WebCAD", description: "برای ورود به حساب WebCAD خود از طریق داشبورد ادامه دهید." },
  },
  ru: {
    home: { title: "Веб-платформа CAD | Параметрическое моделирование в браузере | WebCAD", description: "Проектируйте в браузере с параметрическим CAD, ИИ-помощником, командными рабочими пространствами и историей версий в WebCAD." },
    features: { title: "CAD в браузере и проектирование с ИИ | WebCAD", description: "Изучите параметрическое моделирование в браузере, проектирование деталей с ИИ, командные рабочие пространства и историю версий WebCAD." },
    pricing: { title: "Тарифы WebCAD для CAD в браузере", description: "Сравните рабочие пространства WebCAD и возможности тарифов для параметрического CAD в браузере." },
    login: { title: "Вход | WebCAD", description: "Продолжите в WebCAD Dashboard, чтобы войти в свой аккаунт." },
  },
};

const normalizePath = (path: string): string => {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
};

export const localizedPath = (language: SupportedLanguage, path: string): string => {
  const normalized = normalizePath(path);
  const withoutLocale = normalized.replace(/^\/(?:fa|ru)(?=\/|$)/, "") || "/";
  const prefix = localePrefixes[language];
  if (withoutLocale === "/") return prefix ? `${prefix}/` : "/";
  return `${prefix}${withoutLocale}`;
};

export const currentLocalizedPath = (path: string): string => localizedPath(currentBuildLanguage, path);

const alternateLanguageUrls = (path: string) => ({
  en: new URL(localizedPath("en", path), site.site).href,
  fa: new URL(localizedPath("fa", path), site.site).href,
  ru: new URL(localizedPath("ru", path), site.site).href,
  "x-default": new URL(localizedPath("en", path), site.site).href,
});

export const seoEntry = (page: SeoPage) => seoCopy[currentBuildLanguage][page];

export function pageMetadata(page: SeoPage, path: string): Metadata {
  const copy = seoEntry(page);
  const canonical = new URL(currentLocalizedPath(path), site.site).href;
  const ogImage = new URL("/assets/bg_video_poster.jpg", site.site).href;
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical, languages: alternateLanguageUrls(path) },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonical,
      siteName: "WebCAD",
      locale: localeOpenGraph[currentBuildLanguage],
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: copy.title }],
    },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: [ogImage] },
  };
}
