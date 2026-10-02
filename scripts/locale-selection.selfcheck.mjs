import assert from "node:assert/strict";
import { languageForCountry } from "../src/lib/localization.ts";

assert.equal(languageForCountry("IR"), "fa");
assert.equal(languageForCountry("ru"), "ru");
assert.equal(languageForCountry("US"), "en");
assert.equal(languageForCountry(undefined), "en");
assert.equal(languageForCountry(""), "en");

console.log("Locale country selection OK");
