import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { publicConfig } from "../config/public.mjs";
import { gzipSync } from "node:zlib";
const site = publicConfig(process.env, true);
const initialScripts = new Set();
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
  assert.ok(html.includes(`href="${site.projects}"`), `projects: ${route}`);
  assert.ok(html.includes('name="twitter:card"'), `social metadata: ${route}`);
  const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"?#]+\.js)"/g)].map((match) => match[1]))];
  let scriptBytes = 0;
  for (const script of scripts) {
    assert.ok(script.startsWith("/_next/"), `unexpected external script: ${script}`);
    const content = readFileSync(`out${script}`);
    scriptBytes += gzipSync(content).length;
    initialScripts.add(script);
    assert.ok(!content.includes("assembly-study"), "3D scene loaded before interaction");
  }
  assert.ok(scriptBytes < 225 * 1024, `initial JS budget exceeded: ${route}: ${scriptBytes}`);
  console.log(`${route || "/"}: ${(scriptBytes / 1024).toFixed(1)} KiB gzip initial JS`);
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

const home = readFileSync("out/index.html", "utf8");
assert.ok(home.includes("Isometric mechanical bracket"), "missing static 3D fallback");
assert.ok(home.includes("Explore the 3D assembly"), "missing 3D entry control");
assert.ok(home.includes("<noscript>"), "missing no-JavaScript control fallback");
assert.ok(!home.includes("assembly-study"), "interactive scene should be deferred");
assert.ok(readFileSync("out/login/index.html", "utf8").includes('content="noindex, follow"'));
const sitemap = readFileSync("out/sitemap.xml", "utf8");
for (const route of ["/", "/features/", "/pricing/"]) {
  assert.ok(sitemap.includes(`<loc>${site.site}${route}</loc>`), `sitemap: ${route}`);
}
assert.ok(!sitemap.includes("/login/"), "handoff page must not appear in sitemap");
assert.ok(readFileSync("out/robots.txt", "utf8").includes(`Sitemap: ${site.site}/sitemap.xml`));
let deferredScene = false;
let cssBytes = 0;
let fontBytes = 0;
for (const entry of readdirSync("out/_next/static", { recursive: true })) {
  const file = `out/_next/static/${entry}`;
  if (file.endsWith(".js") && readFileSync(file, "utf8").includes("assembly-study")) {
    assert.ok(!initialScripts.has(file.slice(3)), "scene must stay in a deferred chunk");
    assert.ok(gzipSync(readFileSync(file)).length < 12 * 1024, "3D chunk exceeds 12 KiB gzip");
    deferredScene = true;
  }
  if (file.endsWith(".css")) cssBytes += gzipSync(readFileSync(file)).length;
  if (/\.woff2?$/.test(file)) fontBytes += readFileSync(file).length;
}
assert.ok(deferredScene, "missing on-demand 3D chunk");
assert.ok(cssBytes < 30 * 1024, `CSS budget exceeded: ${cssBytes}`);
assert.ok(fontBytes < 100 * 1024, `font budget exceeded: ${fontBytes}`);
console.log(`Deferred 3D, SEO and asset budgets OK (CSS ${(cssBytes / 1024).toFixed(1)} KiB gzip; fonts ${(fontBytes / 1024).toFixed(1)} KiB)`);
