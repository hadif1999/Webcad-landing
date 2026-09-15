"use client";

import React from "react";
import { usePreferences } from "@/lib/preferences-context";
import type { SupportedLanguage } from "@/lib/localization";
import type { ThemeName } from "@/lib/theme";

export function PreferenceControls({ className = "" }: { className?: string }) {
  const { language, setLanguage, theme, setTheme, t } = usePreferences();

  return (
    <div className={`preference-controls ${className}`}>
      <label className="pref-lang-label">
        <svg
          className="pref-icon pref-lang-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <select
          className="pref-lang-select"
          value={language}
          aria-label={t("preferences.language")}
          onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
        >
          <option value="en">English (EN)</option>
          <option value="fa">فارسی (FA)</option>
          <option value="ru">Русский (RU)</option>
        </select>
      </label>

      <label className="pref-theme-label">
        <svg
          className="pref-icon pref-theme-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20" />
          <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.15" />
        </svg>
        <select
          className="pref-theme-select"
          value={theme}
          aria-label={t("preferences.themeToggle")}
          onChange={(e) => setTheme(e.target.value as ThemeName)}
        >
          <option value="dark">{t("preferences.dark", "Dark")}</option>
          <option value="light">{t("preferences.light", "Light")}</option>
          <option value="warm">{t("preferences.warm", "Warm")}</option>
          <option value="contrast">{t("preferences.contrast", "Contrast")}</option>
        </select>
      </label>
    </div>
  );
}
