import { site } from "./site.ts";

export const SUPPORTED_LANGUAGES = Object.freeze(["en", "fa", "ru"] as const);
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
export const LANGUAGE_COOKIE = "webcad-language";
export const LEGACY_LANGUAGE_COOKIE = "webcad-studio-language";
export const LANGUAGE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

export const normalizeLanguage = (language: unknown): SupportedLanguage => {
  if (typeof language === "string" && (SUPPORTED_LANGUAGES as readonly string[]).includes(language)) {
    return language as SupportedLanguage;
  }
  return DEFAULT_LANGUAGE;
};

export const languageDirection = (language: string): "rtl" | "ltr" =>
  normalizeLanguage(language) === "fa" ? "rtl" : "ltr";

/** Parent domain shared by configured Landing apex and Dashboard/Studio sibling hosts. */
export const sharedCookieDomain = (hostname?: string, peerHostname?: string): string => {
  const own = String(hostname ?? "").toLowerCase().split(".").filter(Boolean);
  const peer = String(peerHostname ?? "").toLowerCase().split(".").filter(Boolean);
  if (own.length === 0 || peer.length === 0) return "";
  const ownStr = own.join(".");
  const peerStr = peer.join(".");
  if (ownStr === "localhost" || ownStr === "127.0.0.1" || peerStr === "localhost" || peerStr === "127.0.0.1") {
    return "";
  }
  if (peerStr.endsWith(`.${ownStr}`)) return ownStr;
  if (ownStr.endsWith(`.${peerStr}`)) return peerStr;
  if (own.length >= 2 && peer.length >= 2) {
    const ownDomain = own.slice(-2).join(".");
    const peerDomain = peer.slice(-2).join(".");
    if (ownDomain === peerDomain) return ownDomain;
  }
  return "";
};

export const cookieAttributes = ({
  secure = false,
  domain = "",
  maxAge = LANGUAGE_COOKIE_MAX_AGE,
}: {
  secure?: boolean;
  domain?: string;
  maxAge?: number;
} = {}): string =>
  `Max-Age=${maxAge}; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}${
    secure ? "; Secure" : ""
  }`;

const cookieValue = (cookie: string, name: string): string | null => {
  const prefix = `${name}=`;
  for (const part of cookie.split(";").map((item) => item.trim())) {
    if (!part.startsWith(prefix)) continue;
    try {
      const language = decodeURIComponent(part.slice(prefix.length));
      if ((SUPPORTED_LANGUAGES as readonly string[]).includes(language)) return language;
    } catch {
      // Ignore malformed duplicate cookies.
    }
  }
  return null;
};

export const readLanguageCookie = (cookie = ""): SupportedLanguage =>
  normalizeLanguage(
    cookieValue(cookie, LANGUAGE_COOKIE) ??
      cookieValue(cookie, LEGACY_LANGUAGE_COOKIE) ??
      DEFAULT_LANGUAGE
  );

export const browserLanguageCookieOptions = () => {
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

export const writeLanguageCookie = (
  language: string,
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
): SupportedLanguage => {
  const normalized = normalizeLanguage(language);
  write(`${LEGACY_LANGUAGE_COOKIE}=; ${cookieAttributes({ secure, maxAge: 0 })}`);
  write(`${LANGUAGE_COOKIE}=; ${cookieAttributes({ secure, maxAge: 0 })}`);
  write(
    `${LANGUAGE_COOKIE}=${encodeURIComponent(normalized)}; ${cookieAttributes({
      secure,
      domain,
    })}`
  );
  return normalized;
};

export const storedLanguage = (): SupportedLanguage => {
  if (typeof document === "undefined") return DEFAULT_LANGUAGE;
  return readLanguageCookie(document.cookie);
};

export const applyLanguage = (language: string): SupportedLanguage => {
  const next = normalizeLanguage(language);
  if (typeof document !== "undefined") {
    document.documentElement.lang = next;
    document.documentElement.dir = languageDirection(next);
  }
  writeLanguageCookie(next, browserLanguageCookieOptions());
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("languagechange"));
  }
  return next;
};

const applyStoredLanguageIfChanged = (): void => {
  if (typeof document === "undefined") return;
  const next = storedLanguage();
  if (document.documentElement.lang === next) return;
  document.documentElement.lang = next;
  document.documentElement.dir = languageDirection(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("languagechange"));
  }
};

export const watchLanguageCookie = (): (() => void) => {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};
  const onVisibilityChange = () => {
    if (document.visibilityState !== "hidden") applyStoredLanguageIfChanged();
  };
  const onCookieChange = (event: Event) => {
    const cookieEvent = event as { changed?: Array<{ name: string }>; deleted?: Array<{ name: string }> };
    if (
      [...(cookieEvent.changed ?? []), ...(cookieEvent.deleted ?? [])].some(
        ({ name }) => name === LANGUAGE_COOKIE || name === LEGACY_LANGUAGE_COOKIE
      )
    ) {
      applyStoredLanguageIfChanged();
    }
  };

  window.addEventListener("focus", applyStoredLanguageIfChanged);
  document.addEventListener("visibilitychange", onVisibilityChange);
  const cookieStoreObj = (window as unknown as { cookieStore?: EventTarget }).cookieStore;
  cookieStoreObj?.addEventListener("change", onCookieChange as EventListener);
  return () => {
    window.removeEventListener("focus", applyStoredLanguageIfChanged);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    cookieStoreObj?.removeEventListener("change", onCookieChange as EventListener);
  };
};
