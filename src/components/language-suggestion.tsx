"use client";

import { useEffect, useState } from "react";
import { languageForCountry, readCountryCookie } from "@/lib/localization";
import { currentBuildLanguage, localizedPath } from "@/lib/site";
import { usePreferences } from "@/lib/preferences-context";

const dismissedKey = "webcad-language-suggestion-dismissed";
const labels = {
  fa: { message: "نسخه فارسی WebCAD را ببینید؟", action: "رفتن به فارسی", dismiss: "فعلاً نه" },
  ru: { message: "Открыть русскую версию WebCAD?", action: "Открыть на русском", dismiss: "Пока нет" },
} as const;

export function LanguageSuggestion() {
  const { setLanguage } = usePreferences();
  const [suggested, setSuggested] = useState<"fa" | "ru" | null>(null);

  useEffect(() => {
    if (currentBuildLanguage !== "en") return;
    if (typeof window === "undefined" || window.sessionStorage.getItem(dismissedKey)) return;
    const language = languageForCountry(readCountryCookie(document.cookie));
    if (language !== "en") queueMicrotask(() => setSuggested(language));
  }, []);

  if (!suggested) return null;
  const copy = labels[suggested];

  return (
    <aside className="language-suggestion" role="status">
      <span>{copy.message}</span>
      <button type="button" onClick={() => {
        setLanguage(suggested);
        window.location.assign(localizedPath(suggested, window.location.pathname));
      }}>{copy.action}</button>
      <button type="button" className="language-suggestion-dismiss" onClick={() => {
        window.sessionStorage.setItem(dismissedKey, "1");
        setSuggested(null);
      }}>{copy.dismiss}</button>
    </aside>
  );
}
