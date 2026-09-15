import assert from "node:assert/strict";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE,
  LEGACY_LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  cookieAttributes,
  languageDirection,
  normalizeLanguage,
  readLanguageCookie,
  sharedCookieDomain,
  writeLanguageCookie,
} from "../src/lib/localization.ts";
import { translations } from "../src/lib/translations.ts";

assert.equal(DEFAULT_LANGUAGE, "en");
assert.deepEqual([...SUPPORTED_LANGUAGES], ["en", "fa", "ru"]);
assert.equal(normalizeLanguage("en"), "en");
assert.equal(normalizeLanguage("fa"), "fa");
assert.equal(normalizeLanguage("ru"), "ru");
assert.equal(normalizeLanguage("fa-IR"), "en");
assert.equal(normalizeLanguage("invalid"), "en");

assert.equal(languageDirection("fa"), "rtl");
assert.equal(languageDirection("en"), "ltr");
assert.equal(languageDirection("ru"), "ltr");

assert.equal(sharedCookieDomain("webcad.xyz", "dashboard.webcad.xyz"), "webcad.xyz");
assert.equal(sharedCookieDomain("dashboard.webcad.xyz", "studio.webcad.xyz"), "webcad.xyz");
assert.equal(sharedCookieDomain("localhost", "localhost"), "");
assert.equal(sharedCookieDomain("127.0.0.1", "127.0.0.1"), "");
assert.equal(sharedCookieDomain("webcad.xyz", "studio.example.com"), "");

assert.equal(readLanguageCookie(`${LANGUAGE_COOKIE}=fa`), "fa");
assert.equal(readLanguageCookie(`${LEGACY_LANGUAGE_COOKIE}=ru`), "ru");
assert.equal(readLanguageCookie(""), "en");
assert.equal(cookieAttributes(), "Max-Age=31536000; Path=/; SameSite=Lax");
assert.equal(
  cookieAttributes({ secure: true, domain: "webcad.xyz" }),
  "Max-Age=31536000; Path=/; SameSite=Lax; Domain=webcad.xyz; Secure"
);

const writes = [];
writeLanguageCookie("fa", {
  secure: true,
  domain: "webcad.xyz",
  write: (value) => writes.push(value),
});
assert.deepEqual(writes, [
  `${LEGACY_LANGUAGE_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax; Secure`,
  `${LANGUAGE_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax; Secure`,
  `${LANGUAGE_COOKIE}=fa; Max-Age=31536000; Path=/; SameSite=Lax; Domain=webcad.xyz; Secure`,
]);

const englishKeys = Object.keys(translations.en).sort();
assert.ok(englishKeys.length > 20, "translation dictionary is populated");
for (const language of ["fa", "ru"]) {
  const langKeys = Object.keys(translations[language]).sort();
  assert.deepEqual(langKeys, englishKeys, `keys for ${language} must match english`);
  for (const key of englishKeys) {
    const value = translations[language][key];
    assert.ok(
      typeof value === "string" && value.trim().length > 0,
      `${language}:${key} must be a non-empty string`
    );
  }
}

console.log("landing localization self-check passed");
