/**
 * The site's two languages and how an address carries them. English is the default and keeps
 * its addresses (/docs/button); Chinese lives under /zh (/zh/docs/button). The pages are in
 * src/app/[lang]/: next.config rewrites an address without a prefix to /en/…, and /en/… goes
 * back to the bare address. No imports here, so client components can use it too.
 */

export const LANGS = ["en", "zh"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (value: unknown): value is Lang =>
  (LANGS as readonly unknown[]).includes(value);

/** For <html lang>, hreflang and Open Graph: the Chinese is simplified. */
export const HTML_LANG: Record<Lang, string> = { en: "en", zh: "zh-CN" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", zh: "zh_CN" };

/** Each language's own name, as the switcher shows it. */
export const LANG_NAME: Record<Lang, string> = { en: "English", zh: "中文" };

/** A site address in a language: `localize("zh", "/docs")` is /zh/docs, the home page /zh. */
export function localize(lang: Lang, path: string) {
  if (lang === "en" || !path.startsWith("/")) return path;
  return path === "/" ? "/zh" : `/zh${path}`;
}

/** The language an address is in, and the address without its prefix. */
export function unlocalize(pathname: string): { lang: Lang; path: string } {
  const match = /^\/zh(?=\/|$)/.exec(pathname);
  if (!match) return { lang: "en", path: pathname || "/" };
  return { lang: "zh", path: pathname.slice(match[0].length) || "/" };
}

/** One piece of copy in both languages; `pick` and `usePick` choose. */
export type Copy<T> = Record<Lang, T>;
