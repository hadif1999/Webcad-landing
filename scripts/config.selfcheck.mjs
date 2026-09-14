import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import { publicConfig } from "../config/public.mjs";
const good = {
  LANDING_SITE_URL: "https://example.com",
  LANDING_DASHBOARD_BASE_URL: "https://dashboard.example.com",
};
assert.equal(publicConfig({}, false).signIn, "http://localhost:5556/sign-in");
const actual = publicConfig(good, true);
assert.equal(actual.signUp, "https://dashboard.example.com/sign-up");
assert.equal(actual.projects, "https://dashboard.example.com/dashboard/projects");
assert.equal(
  actual.subscription,
  "https://dashboard.example.com/dashboard/subscription"
);
for (const key of Object.keys(good)) {
  for (const value of [
    "",
    "http://example.com",
    "https://user:pass@example.com",
    "https://example.com/path",
    "https://example.com/?x=1",
    "https://example.com/#x",
    "javascript:alert(1)",
    "https://localhost",
    "https://127.0.0.1",
    " https://example.com",
  ]) {
    assert.throws(
      () => publicConfig({ ...good, [key]: value }, true),
      undefined,
      `${key}: ${value}`
    );
  }
  assert.throws(() => publicConfig({ ...good, [key]: undefined }, true));
}
assert.deepEqual(Object.keys(actual).sort(), [
  "dashboard",
  "projects",
  "signIn",
  "signUp",
  "site",
  "subscription",
]);
console.log("Public origin and CTA configuration OK");

const events = new Map();
const calls = [];
vm.runInNewContext(
  readFileSync(new URL("../public/sw.js", import.meta.url), "utf8"),
  {
    caches: {
      keys: async () => ["old-dashboard-cache"],
      delete: async (key) => calls.push(key),
    },
    self: {
      addEventListener: (name, handler) => events.set(name, handler),
      skipWaiting: () => calls.push("skip"),
      clients: {
        claim: async () => calls.push("claim"),
        matchAll: async () => [
          {
            url: "https://example.com/dashboard?next=a",
            navigate: async (url) => calls.push(url),
          },
        ],
      },
      registration: { unregister: async () => calls.push("unregister") },
    },
  }
);
events.get("install")();
let activation;
events.get("activate")({
  waitUntil: (work) => {
    activation = work;
  },
});
await activation;
assert.deepEqual(calls, [
  "skip",
  "old-dashboard-cache",
  "claim",
  "unregister",
  "https://example.com/dashboard?next=a",
]);
assert.equal(
  events.has("fetch"),
  false,
  "cleanup worker must not intercept navigation"
);
console.log("Former apex Dashboard worker cleanup OK");
