import { site } from "./site.ts";
import { sharedCookieDomain } from "./localization.ts";

export const THEME_NAMES = Object.freeze(["dark", "light", "warm", "contrast"] as const);
export type ThemeName = (typeof THEME_NAMES)[number];

export const DEFAULT_THEME: ThemeName = "dark";
export const THEME_COOKIE = "webcad-theme";
export const THEME_COOKIE_MAX_AGE = 365 * 24 * 60 * 60;
export const LEGACY_THEME_STORAGE_KEY = "webcad-landing-theme";

export const normalizeTheme = (theme: unknown): ThemeName => {
  if (typeof theme === "string" && (THEME_NAMES as readonly string[]).includes(theme)) {
    return theme as ThemeName;
  }
  return DEFAULT_THEME;
};

const themeCookieValue = (cookie: string): string | null => {
  const prefix = `${THEME_COOKIE}=`;
  for (const part of String(cookie).split(";").map((item) => item.trim())) {
    if (!part.startsWith(prefix)) continue;
    try {
      const theme = decodeURIComponent(part.slice(prefix.length));
      if ((THEME_NAMES as readonly string[]).includes(theme)) return theme;
    } catch {
      // Ignore malformed duplicate cookies and keep looking for a valid value.
    }
  }
  return null;
};

export const readThemeCookie = (cookie = "", fallback = DEFAULT_THEME): ThemeName =>
  normalizeTheme(themeCookieValue(cookie) ?? fallback);

export const themeCookieAttributes = ({
  secure = false,
  domain = "",
  maxAge = THEME_COOKIE_MAX_AGE,
}: {
  secure?: boolean;
  domain?: string;
  maxAge?: number;
} = {}): string =>
  `Max-Age=${maxAge}; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}${
    secure ? "; Secure" : ""
  }`;

export const browserThemeCookieOptions = () => {
  if (typeof window === "undefined") return {};
  let peerHostname = "";
  try {
    peerHostname = new URL(site.dashboard).hostname;
  } catch {
    // Configuration fallback owns malformed URLs.
  }
  return {
    secure: window.location.protocol === "https:",
    domain: sharedCookieDomain(window.location.hostname, peerHostname),
  };
};

export const writeThemeCookie = (
  theme: string,
  {
    secure = false,
    domain = "",
    write = (value: string) => {
      if (typeof document !== "undefined") document.cookie = value;
    },
  }: {
    secure?: boolean;
    domain?: string;
    write?: (value: string) => void;
  } = {}
): ThemeName => {
  const normalized = normalizeTheme(theme);
  write(`${THEME_COOKIE}=; ${themeCookieAttributes({ secure, maxAge: 0 })}`);
  write(
    `${THEME_COOKIE}=${encodeURIComponent(normalized)}; ${themeCookieAttributes({
      secure,
      domain,
    })}`
  );
  return normalized;
};

export const storedTheme = (): ThemeName => {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const cookieTheme = themeCookieValue(document.cookie);
  if (cookieTheme) return normalizeTheme(cookieTheme);
  try {
    const local = localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
    if (local) return normalizeTheme(local);
  } catch {
    // Storage access can fail; cookie remains authority.
  }
  return DEFAULT_THEME;
};

export const applyTheme = (theme: string): ThemeName => {
  const next = normalizeTheme(theme);
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = next;
  }
  writeThemeCookie(next, browserThemeCookieOptions());
  try {
    localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
  } catch {
    // Ignore storage issues.
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("themechange"));
  }
  return next;
};

const applyStoredThemeIfChanged = (): void => {
  if (typeof document === "undefined") return;
  const next = storedTheme();
  if (document.documentElement.dataset.theme === next) return;
  document.documentElement.dataset.theme = next;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("themechange"));
  }
};

/** Keep an already-open page aligned when a sibling tab or window changes the shared cookie. */
export const watchThemeCookie = (): (() => void) => {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};
  const onVisibilityChange = () => {
    if (document.visibilityState !== "hidden") applyStoredThemeIfChanged();
  };
  const onCookieChange = (event: Event) => {
    const cookieEvent = event as { changed?: Array<{ name: string }>; deleted?: Array<{ name: string }> };
    if (
      [...(cookieEvent.changed ?? []), ...(cookieEvent.deleted ?? [])].some(
        ({ name }) => name === THEME_COOKIE
      )
    ) {
      applyStoredThemeIfChanged();
    }
  };

  window.addEventListener("focus", applyStoredThemeIfChanged);
  document.addEventListener("visibilitychange", onVisibilityChange);
  const cookieStoreObj = (window as unknown as { cookieStore?: EventTarget }).cookieStore;
  cookieStoreObj?.addEventListener("change", onCookieChange as EventListener);
  return () => {
    window.removeEventListener("focus", applyStoredThemeIfChanged);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    cookieStoreObj?.removeEventListener("change", onCookieChange as EventListener);
  };
};
