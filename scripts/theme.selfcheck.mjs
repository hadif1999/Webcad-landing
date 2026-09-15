/* global globalThis */
import assert from "node:assert/strict";

import {
  DEFAULT_THEME,
  THEME_NAMES,
  LEGACY_THEME_STORAGE_KEY,
  THEME_COOKIE,
  THEME_COOKIE_MAX_AGE,
  normalizeTheme,
  readThemeCookie,
  storedTheme,
  themeCookieAttributes,
  writeThemeCookie,
} from "../src/lib/theme.ts";

assert.equal(DEFAULT_THEME, "dark");
assert.deepEqual([...THEME_NAMES], ["dark", "light", "warm", "contrast"]);
assert.equal(normalizeTheme("dark"), "dark");
assert.equal(normalizeTheme("light"), "light");
assert.equal(normalizeTheme("warm"), "warm");
assert.equal(normalizeTheme("contrast"), "contrast");
assert.equal(normalizeTheme("invalid"), "dark");

assert.equal(readThemeCookie(`${THEME_COOKIE}=dark`), "dark");
assert.equal(readThemeCookie(`${THEME_COOKIE}=light`), "light");
assert.equal(readThemeCookie(`other=x; ${THEME_COOKIE}=contrast`), "contrast");
assert.equal(readThemeCookie(`${THEME_COOKIE}=invalid`), "dark");
assert.equal(readThemeCookie(""), "dark");
assert.equal(readThemeCookie("", "light"), "light");

assert.equal(THEME_COOKIE_MAX_AGE, 31536000);
assert.equal(LEGACY_THEME_STORAGE_KEY, "webcad-landing-theme");
assert.equal(themeCookieAttributes(), "Max-Age=31536000; Path=/; SameSite=Lax");
assert.equal(
  themeCookieAttributes({ secure: true, domain: "webcad.xyz" }),
  "Max-Age=31536000; Path=/; SameSite=Lax; Domain=webcad.xyz; Secure"
);

const writes = [];
writeThemeCookie("light", {
  secure: true,
  domain: "webcad.xyz",
  write: (value) => writes.push(value),
});
assert.deepEqual(writes, [
  `${THEME_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax; Secure`,
  `${THEME_COOKIE}=light; Max-Age=31536000; Path=/; SameSite=Lax; Domain=webcad.xyz; Secure`,
]);

globalThis.document = { cookie: `${THEME_COOKIE}=light` };
globalThis.localStorage = { getItem: () => "dark" };
assert.equal(storedTheme(), "light", "the shared cookie must take precedence");
document.cookie = "";
assert.equal(storedTheme(), "dark", "the legacy preference migrates when no cookie exists");
delete globalThis.document;
delete globalThis.localStorage;

console.log("landing theme self-check passed");
