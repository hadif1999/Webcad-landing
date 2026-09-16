"use client";

import React, {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANGUAGE,
  storedLanguage,
  applyLanguage,
  watchLanguageCookie,
  type SupportedLanguage,
} from "./localization.ts";
import {
  DEFAULT_THEME,
  storedTheme,
  applyTheme,
  watchThemeCookie,
  type ThemeName,
} from "./theme.ts";
import { translations, type TranslationKey } from "./translations.ts";

interface PreferencesContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
  t: (key: TranslationKey, fallback?: string) => string;
}

const PreferencesContext = createContext<PreferencesContextValue>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggleTheme: () => {},
  t: (key: TranslationKey, fallback?: string) => translations.en[key] ?? fallback ?? key,
});

const subscribeLanguage = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("languagechange", callback);
  return () => {
    window.removeEventListener("languagechange", callback);
  };
};

const getLanguageSnapshot = () => storedLanguage();
const getServerLanguageSnapshot = () => DEFAULT_LANGUAGE;

const subscribeTheme = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("themechange", callback);
  return () => {
    window.removeEventListener("themechange", callback);
  };
};

const getThemeSnapshot = () => storedTheme();
const getServerThemeSnapshot = () => DEFAULT_THEME;

export function PreferencesProvider({ children }: { children: ReactNode }) {
  React.useEffect(() => {
    const unwatchTheme = watchThemeCookie();
    const unwatchLang = watchLanguageCookie();
    return () => {
      unwatchTheme();
      unwatchLang();
    };
  }, []);

  const language = useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot
  );

  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const setLanguage = useCallback((next: SupportedLanguage) => {
    applyLanguage(next);
  }, []);

  const setTheme = useCallback((next: ThemeName) => {
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = typeof document !== "undefined" && document.documentElement.dataset.theme
      ? (document.documentElement.dataset.theme as ThemeName)
      : theme;
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  }, [theme]);

  const t = useCallback(
    (key: TranslationKey, fallback?: string): string => {
      return (
        translations[language]?.[key] ??
        translations.en[key] ??
        fallback ??
        key
      );
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      setTheme,
      toggleTheme,
      t,
    }),
    [language, setLanguage, theme, setTheme, toggleTheme, t]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => useContext(PreferencesContext);
