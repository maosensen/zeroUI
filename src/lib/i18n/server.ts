import { cache } from "react";
import { type Copy, isLang, type Lang, localize } from "./locale";

/*
 * The language of the page being rendered, for server components. Every layout and page under
 * [lang] calls setLang with its param first (layouts and pages render apart, so each one must);
 * components below them read it with getLang, pick and href instead of having it passed down.
 * The store is React's per-request cache, so two pages rendered at once do not share it.
 */

const store = cache(() => ({ lang: "en" as Lang }));

export function setLang(lang: Lang) {
  store().lang = lang;
}

export const getLang = (): Lang => store().lang;

/** The copy for the page's language: `pick({ en: "Install", zh: "安装" })`. */
export const pick = <T>(copy: Copy<T>): T => copy[getLang()];

/** A site address in the page's language. */
export const link = (path: string) => localize(getLang(), path);

/** What a page or layout under [lang] receives. */
export type LangProps = { params: Promise<{ lang: string }> };

/** The first line of every page and layout under [lang]: read the language and keep it. */
export async function enter(params: LangProps["params"]): Promise<Lang> {
  const { lang } = await params;
  const known = isLang(lang) ? lang : "en";
  setLang(known);
  return known;
}
