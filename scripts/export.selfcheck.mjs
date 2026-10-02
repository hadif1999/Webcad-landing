import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { publicConfig } from "../config/public.mjs";
import { gzipSync } from "node:zlib";
const site = publicConfig(process.env, true);
const clientScripts = readdirSync("out/_next/static/chunks", { recursive: true })
  .filter((entry) => entry.endsWith(".js"))
  .map((entry) => readFileSync(`out/_next/static/chunks/${entry}`, "utf8"));
assert.ok(
  clientScripts.some((script) => script.includes(`LANDING_API_BASE_URL:"${site.apiBase}"`)),
  "client bundle must inline the configured public API base URL"
);
const initialScripts = new Set();
for (const [route, texts] of [
  ["", ["Parametric CAD,", "your browser.", "From sketch to next revision"]],
  ["features/", ["Six capabilities", "Keep your design yours."]],
  ["pricing/", ["Start free. Find room to grow.", "Plan entitlement categories"]],
  ["login/", ["Welcome back", "Continue to Dashboard"]],
]) {
  const html = readFileSync(`out/${route}index.html`, "utf8");
  for (const text of texts) {
    assert.ok(html.includes(text), `missing useful HTML: ${route} / ${text}`);
  }
  if (route === "" || route === "pricing/") {
    const staticHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.ok(staticHtml.includes('class="panel live-plan-skeleton"'), `missing backend-plan loading UI: ${route}`);
    assert.ok(!staticHtml.includes('class="panel tier-card'), `static tier cards must stay disabled: ${route}`);
    assert.ok(!staticHtml.includes('class="container section proof"'), "placeholder proof must stay disabled");
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
const pricingHtml = readFileSync("out/pricing/index.html", "utf8");
assert.equal((pricingHtml.match(/class="tier-card/g) ?? []).length, 0, "static tier cards must not ship");
assert.equal((pricingHtml.match(/class="tier-grid/g) ?? []).length, 0, "static tier grid must not ship");
assert.ok(
  readFileSync("out/pricing/index.html", "utf8").includes(
    "See current plans in Dashboard"
  )
);
assert.ok(readFileSync("out/404.html", "utf8").includes("Page not found"));
assert.ok(existsSync("out/sw.js"));
assert.ok(existsSync("out/assets/bg_video.mp4"), "missing exported bg_video.mp4");
assert.ok(existsSync("out/assets/bg_video_poster.jpg"), "missing exported bg_video_poster.jpg");
console.log("Static routes, canonical URLs, CTAs, assets, video media and 404 OK");

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
assert.ok(home.includes("<noscript>"), "missing no-JavaScript control fallback");
const features = readFileSync("out/features/index.html", "utf8");
assert.ok(features.includes("Isometric mechanical bracket"), "missing static 3D fallback on features");
assert.ok(readFileSync("out/login/index.html", "utf8").includes('content="noindex, follow"'));
const sitemap = readFileSync("out/sitemap.xml", "utf8");
const publicRoutes = ["/", "/features/", "/pricing/"];
for (const language of ["en", "fa", "ru"]) {
  for (const route of publicRoutes) {
    const publicPath = language === "en" ? route : `/${language}${route}`;
    assert.ok(sitemap.includes(`<loc>${site.site}${publicPath}</loc>`), `sitemap: ${publicPath}`);
  }
}
assert.ok(!sitemap.includes("/login/"), "handoff page must not appear in sitemap");
assert.ok(readFileSync("out/robots.txt", "utf8").includes(`Sitemap: ${site.site}/sitemap.xml`));
assert.equal((sitemap.match(/<loc>/g) ?? []).length, 9, "sitemap must contain every public locale route");

for (const language of ["fa", "ru"]) {
  for (const route of publicRoutes) {
    const file = `out/${language}${route}index.html`;
    const html = readFileSync(file, "utf8");
    const publicPath = `/${language}${route}`;
    assert.ok(html.includes(`<html lang="${language}"`), `locale html language: ${file}`);
    assert.ok(html.includes('<meta name="enamad" content="68196663"'), `Enamad ownership: ${file}`);
    if (route === "/" || route === "/pricing/") {
      assert.ok(html.includes('class="panel live-plan-skeleton"'), `missing localized backend-plan loading UI: ${file}`);
      assert.ok(!html.includes('class="panel tier-card'), `obsolete static plan cards: ${file}`);
    }
    assert.ok(html.includes(`rel="canonical" href="${site.site}${publicPath}"`), `locale canonical: ${file}`);
    for (const alternate of ["en", "fa", "ru"]) {
      const alternatePath = alternate === "en" ? route : `/${alternate}${route}`;
      assert.ok(html.includes(`hrefLang="${alternate}" href="${site.site}${alternatePath}"`), `hreflang: ${file}/${alternate}`);
    }
    assert.ok(html.includes(`hrefLang="x-default" href="${site.site}${route}"`), `x-default: ${file}`);
    assert.ok(html.includes('application/ld+json'), `structured data: ${file}`);
    assert.ok(html.includes('property="og:image"'), `social image: ${file}`);
    assert.ok(!html.includes('href="/features/"'), `locale feature links must remain localized: ${file}`);
    assert.ok(!html.includes('href="/pricing/"'), `locale pricing links must remain localized: ${file}`);
  }
}
let cssBytes = 0;
let fontBytes = 0;
for (const entry of readdirSync("out/_next/static", { recursive: true })) {
  const file = `out/_next/static/${entry}`;
  if (file.endsWith(".css")) cssBytes += gzipSync(readFileSync(file)).length;
  if (/\.woff2?$/.test(file)) fontBytes += readFileSync(file).length;
}
assert.ok(cssBytes < 30 * 1024, `CSS budget exceeded: ${cssBytes}`);
assert.ok(fontBytes < 100 * 1024, `font budget exceeded: ${fontBytes}`);
console.log(`SEO and asset budgets OK (CSS ${(cssBytes / 1024).toFixed(1)} KiB gzip; fonts ${(fontBytes / 1024).toFixed(1)} KiB)`);
