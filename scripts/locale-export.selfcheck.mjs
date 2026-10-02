import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const expectations = {
  fa: { html: 'lang="fa"', text: "فارسی", login: "خوش آمدید." },
  ru: { html: 'lang="ru"', text: "Русский", login: "С возвращением." },
};

for (const [language, expectation] of Object.entries(expectations)) {
  for (const route of ["index.html", "features/index.html", "pricing/index.html", "login/index.html"]) {
    const file = `out/locales/${language}/${route}`;
    assert.ok(existsSync(file), `missing ${language} export: ${route}`);
    const html = readFileSync(file, "utf8");
    assert.ok(html.includes(expectation.html), `${language} ${route} has wrong html language`);
    assert.ok(html.includes(expectation.text), `${language} ${route} has no localized language label`);
    if (route === "login/index.html") {
      assert.ok(html.includes(expectation.login), `${language} login is not localized`);
    }
  }
}

console.log("Localized exports OK");
