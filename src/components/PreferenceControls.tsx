"use client";

import React from "react";
import { usePreferences } from "@/lib/preferences-context";
import type { SupportedLanguage } from "@/lib/localization";

export function PreferenceControls({ className = "" }: { className?: string }) {
  const { language, setLanguage, theme, toggleTheme, t } = usePreferences();

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

      <button
        type="button"
        className="pref-theme-button"
        title={t("preferences.themeToggle")}
        aria-label={t("preferences.themeToggle")}
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          <svg
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
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
