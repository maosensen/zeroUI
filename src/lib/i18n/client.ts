"use client";

import { useParams } from "next/navigation";
import { type Copy, isLang, type Lang, localize } from "./locale";

/** The page's language in a client component, from the [lang] segment. */
export function useLang(): Lang {
  const { lang } = useParams<{ lang?: string }>();
  return isLang(lang) ? lang : "en";
}

/** Copy and addresses in the page's language, for client components. */
export function usePick() {
  const lang = useLang();
  return {
    lang,
    pick: <T>(copy: Copy<T>): T => copy[lang],
    link: (path: string) => localize(lang, path),
  };
}
