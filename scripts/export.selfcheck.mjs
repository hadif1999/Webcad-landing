import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { publicConfig } from "../config/public.mjs";
const site = publicConfig(process.env, true);
for (const [route, texts] of [
  ["", ["Parametric CAD for work", "A continuous workflow"]],
  ["features/", ["Six capabilities", "Portable design data"]],
  ["pricing/", ["Plans that match", "Plan entitlement categories"]],
  ["login/", ["Welcome back", "Continue to Dashboard"]],
]) {
  const html = readFileSync(`out/${route}index.html`, "utf8");
  for (const text of texts) {
    assert.ok(html.includes(text), `missing useful HTML: ${route} / ${text}`);
  }
  assert.ok(
    html.includes(`href="${site.site}/${route}"`),
    `canonical: ${route}`
  );
  assert.ok(html.includes(`href="${site.signIn}"`), `sign in: ${route}`);
  assert.ok(html.includes(`href="${site.signUp}"`), `sign up: ${route}`);
  for (const match of html.matchAll(
    /(?:src|href)="(\/_next\/[^"?#]+)[^" ]*"/g
  )) {
    assert.ok(existsSync(`out${match[1]}`), `missing asset ${match[1]}`);
  }
  assert.ok(
    !html.includes("PRIVATE_CONFIG_SENTINEL"),
    "private environment leaked"
  );
}
assert.ok(
  readFileSync("out/pricing/index.html", "utf8").includes(
    `href="${site.subscription}"`
  )
);
assert.ok(
  readFileSync("out/pricing/index.html", "utf8").includes(
    "See current plans in Dashboard"
  )
);
assert.ok(readFileSync("out/404.html", "utf8").includes("Page not found"));
assert.ok(existsSync("out/sw.js"));
console.log("Static routes, canonical URLs, CTAs, assets and 404 OK");

for (const entry of readdirSync("out", { recursive: true })) {
  const file = `out/${entry}`;
  if (!/\.(html|js|css|txt|json)$/.test(file)) continue;
  const content = readFileSync(file, "utf8");
  assert.ok(
    !content.includes("PRIVATE_CONFIG_SENTINEL"),
    `private config leaked into ${file}`
  );
  if (file.endsWith(".css")) {
    for (const match of content.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
      const url = match[1];
      if (url.startsWith("data:")) continue;
      const target = url.startsWith("/")
        ? resolve("out", `.${url}`)
        : resolve(dirname(file), url);
      assert.ok(existsSync(target), `missing CSS/font asset ${target}`);
    }
  }
}
console.log("CSS/font assets and private-config exclusion OK");
