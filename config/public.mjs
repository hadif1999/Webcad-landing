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
  return Object.freeze({
    site,
    dashboard,
    projects: `${dashboard}/dashboard/projects`,
    signIn: `${dashboard}/sign-in`,
    signUp: `${dashboard}/sign-up`,
    subscription: `${dashboard}/dashboard/subscription`,
  });
}
