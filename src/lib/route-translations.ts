import type { SupportedLanguage } from "./localization";

export const routeTranslations = {
  en: {
    loginEyebrow: "Your WebCAD account",
    loginTitle: "Welcome back.",
    loginDescription: "Continue through Dashboard to open your projects, return to your workbenches and manage the plan behind them.",
    loginContinue: "Continue to Dashboard",
    loginCreate: "Create an account",
    notFoundEyebrow: "404 / Page not found",
    notFoundTitle: "Outside the drawing.",
    notFoundDescription: "This page could not be found. Return home to explore WebCAD.",
    notFoundBack: "Back to home",
  },
  fa: {
    loginEyebrow: "حساب WebCAD شما",
    loginTitle: "خوش آمدید.",
    loginDescription: "از طریق داشبورد پروژه‌ها و میزکارهای خود را باز کنید و طرح حساب را مدیریت نمایید.",
    loginContinue: "ادامه به داشبورد",
    loginCreate: "ساخت حساب",
    notFoundEyebrow: "۴۰۴ / صفحه پیدا نشد",
    notFoundTitle: "بیرون از نقشه.",
    notFoundDescription: "این صفحه پیدا نشد. برای جست‌وجوی WebCAD به خانه برگردید.",
    notFoundBack: "بازگشت به خانه",
  },
  ru: {
    loginEyebrow: "Ваш аккаунт WebCAD",
    loginTitle: "С возвращением.",
    loginDescription: "Откройте проекты и рабочие области через Dashboard и управляйте своим тарифом.",
    loginContinue: "Перейти в Dashboard",
    loginCreate: "Создать аккаунт",
    notFoundEyebrow: "404 / Страница не найдена",
    notFoundTitle: "За пределами чертежа.",
    notFoundDescription: "Эта страница не найдена. Вернитесь домой и изучите WebCAD.",
    notFoundBack: "На главную",
  },
} as const satisfies Record<SupportedLanguage, Record<string, string>>;
