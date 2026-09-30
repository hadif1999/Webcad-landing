export function publicConfig(
  env = process.env,
  production = env.NODE_ENV === "production"
) {
  function origin(name, fallback) {
    const value = env[name] ?? (production ? undefined : fallback);
    if (!value) throw new Error(`${name} is required for production`);
    let url;
    try {
      url = new URL(value);
    } catch {
      throw new Error(`${name} must be an absolute origin`);
    }
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      value.trim() !== value
    ) {
      throw new Error(
        `${name} must be an HTTP(S) origin without credentials, path, query or fragment`
      );
    }
    if (
      production &&
      (url.protocol !== "https:" ||
        ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
    ) {
      throw new Error(`${name} must use a public HTTPS origin in production`);
    }
    return url.origin;
  }
  const site = origin("LANDING_SITE_URL", "http://localhost:5557");
  const dashboard = origin(
    "LANDING_DASHBOARD_BASE_URL",
    "http://localhost:5556"
  );
  const apiValue = env.LANDING_API_BASE_URL ?? (production ? undefined : "http://localhost:3000/api");
  if (!apiValue) throw new Error("LANDING_API_BASE_URL is required for production");
  let api;
  try { api = new URL(apiValue); } catch { throw new Error("LANDING_API_BASE_URL must be an absolute HTTP(S) URL"); }
  if (!["http:", "https:"].includes(api.protocol) || api.username || api.password || api.search || api.hash || apiValue.trim() !== apiValue || !api.pathname.startsWith("/")) {
    throw new Error("LANDING_API_BASE_URL must be an HTTP(S) URL without credentials, query or fragment");
  }
  if (production && (api.protocol !== "https:" || ["localhost", "127.0.0.1", "[::1]"].includes(api.hostname))) {
    throw new Error("LANDING_API_BASE_URL must use a public HTTPS URL in production");
  }
  const apiBase = api.origin + api.pathname.replace(/\/+$/, "");
  return Object.freeze({
    site,
    dashboard,
    apiBase,
    plans: `${apiBase}/v1/plans`,
    projects: `${dashboard}/dashboard/projects`,
    signIn: `${dashboard}/sign-in`,
    signUp: `${dashboard}/sign-up`,
    subscription: `${dashboard}/dashboard/subscription`,
  });
}
