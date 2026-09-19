import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { publicConfig } from "../config/public.mjs";
import { gzipSync } from "node:zlib";
const site = publicConfig(process.env, true);
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
    for (const tier of ["Free", "Pro", "Team"]) {
      assert.ok(staticHtml.includes(`<h3>${tier}</h3>`), `missing rendered tier ${tier}: ${route}`);
    }
    assert.equal((staticHtml.match(/class="panel tier-card/g) ?? []).length, 3, `tier count: ${route}`);
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
for (const route of ["/", "/features/", "/pricing/"]) {
  assert.ok(sitemap.includes(`<loc>${site.site}${route}</loc>`), `sitemap: ${route}`);
}
assert.ok(!sitemap.includes("/login/"), "handoff page must not appear in sitemap");
assert.ok(readFileSync("out/robots.txt", "utf8").includes(`Sitemap: ${site.site}/sitemap.xml`));
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
