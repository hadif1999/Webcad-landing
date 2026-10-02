import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const expectations = {
  fa: { html: 'lang="fa"', text: "فارسی", login: "خوش آمدید." },
  ru: { html: 'lang="ru"', text: "Русский", login: "С возвращением." },
};

for (const [language, expectation] of Object.entries(expectations)) {
  for (const route of ["index.html", "features/index.html", "pricing/index.html", "login/index.html"]) {
    const file = `out/${language}/${route}`;
    assert.ok(existsSync(file), `missing ${language} export: ${route}`);
    const html = readFileSync(file, "utf8");
    for (const [, asset] of html.matchAll(new RegExp(`(?:src|href)="(\\/${language}\\/_next\\/[^"?#]+)[^" ]*"`, "g"))) {
      const target = `out${asset}`;
      assert.ok(existsSync(target), `${language} ${route} references missing shared asset: ${asset}`);
      if (target.endsWith(".css")) {
        for (const [, url] of readFileSync(target, "utf8").matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
          if (url.startsWith("data:")) continue;
          const dependency = url.startsWith("/")
            ? resolve("out", `.${url}`)
            : resolve(dirname(target), url);
          assert.ok(existsSync(dependency), `${language} ${route} references missing CSS asset: ${dependency}`);
        }
      }
    }
    assert.ok(html.includes(expectation.html), `${language} ${route} has wrong html language`);
    assert.ok(html.includes(expectation.text), `${language} ${route} has no localized language label`);
    if (route === "login/index.html") {
      assert.ok(html.includes(expectation.login), `${language} login is not localized`);
    }
  }
}

console.log("Localized exports OK");
