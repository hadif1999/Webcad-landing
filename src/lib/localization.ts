import { site } from "./site.ts";

export const SUPPORTED_LANGUAGES = Object.freeze(["en", "fa", "ru"] as const);
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
export const LANGUAGE_COOKIE = "webcad-language";
export const LEGACY_LANGUAGE_COOKIE = "webcad-studio-language";
export const LANGUAGE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

let lastLocalLanguageWrite = 0;
export const markLocalLanguageWrite = () => {
  lastLocalLanguageWrite = Date.now();
};

const broadcastPreference = (type: "theme" | "language", value: string) => {
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;
  try {
    const ch = new BroadcastChannel("webcad_preferences");
    ch.postMessage({ type, value });
    ch.close();
  } catch {
    // Ignore BroadcastChannel errors in restricted contexts.
  }
};

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
  // Find longest common suffix of domain labels
  const common: string[] = [];
  let i = own.length - 1;
  let j = peer.length - 1;
  while (i >= 0 && j >= 0 && own[i] === peer[j]) {
    common.unshift(own[i]);
    i--;
    j--;
  }
  if (common.length >= 2) {
    return common.join(".");
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
  const matches: string[] = [];
  for (const part of cookie.split(";").map((item) => item.trim())) {
    if (!part.startsWith(prefix)) continue;
    try {
      const language = decodeURIComponent(part.slice(prefix.length));
      if ((SUPPORTED_LANGUAGES as readonly string[]).includes(language)) matches.push(language);
    } catch {
      // Ignore malformed duplicate cookies.
    }
  }
  return matches.length > 0 ? matches[matches.length - 1] : null;
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
  markLocalLanguageWrite();
  const normalized = normalizeLanguage(language);
  write(`${LEGACY_LANGUAGE_COOKIE}=; ${cookieAttributes({ secure, maxAge: 0 })}`);
  write(`${LANGUAGE_COOKIE}=; ${cookieAttributes({ secure, maxAge: 0 })}`);
  write(
    `${LANGUAGE_COOKIE}=${encodeURIComponent(normalized)}; ${cookieAttributes({
      secure,
      domain,
    })}`
  );
  broadcastPreference("language", normalized);
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
  broadcastPreference("language", next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("languagechange"));
  }
  return next;
};

const applyStoredLanguageIfChanged = (explicitLanguage?: string): void => {
  if (typeof document === "undefined") return;
  const next = explicitLanguage ? normalizeLanguage(explicitLanguage) : storedLanguage();
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
    if (Date.now() - lastLocalLanguageWrite < 300) return;
    const cookieEvent = event as { changed?: Array<{ name: string }>; deleted?: Array<{ name: string }> };
    if (
      [...(cookieEvent.changed ?? []), ...(cookieEvent.deleted ?? [])].some(
        ({ name }) => name === LANGUAGE_COOKIE || name === LEGACY_LANGUAGE_COOKIE
      )
    ) {
      applyStoredLanguageIfChanged();
    }
  };

  let channel: BroadcastChannel | null = null;
  try {
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel("webcad_preferences");
      (channel as unknown as { unref?: () => void })?.unref?.();
      channel.onmessage = (event) => {
        if (event.data?.type === "language" && typeof event.data.value === "string") {
          applyStoredLanguageIfChanged(event.data.value);
        }
      };
    }
  } catch {
    // Ignore BroadcastChannel errors in unsupported contexts.
  }

  const onFocus = () => applyStoredLanguageIfChanged();
  window.addEventListener?.("focus", onFocus);
  document.addEventListener?.("visibilitychange", onVisibilityChange);
  const cookieStoreObj = (window as unknown as { cookieStore?: EventTarget }).cookieStore;
  cookieStoreObj?.addEventListener?.("change", onCookieChange as EventListener);
  return () => {
    window.removeEventListener?.("focus", onFocus);
    document.removeEventListener?.("visibilitychange", onVisibilityChange);
    cookieStoreObj?.removeEventListener?.("change", onCookieChange as EventListener);
    try {
      channel?.close();
    } catch {
      // Ignore
    }
  };
};
