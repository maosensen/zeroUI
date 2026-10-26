"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HTML_LANG,
  LANG_NAME,
  LANGS,
  localize,
  unlocalize,
} from "@/lib/i18n/locale";

/** The same page in the other language, named in that language. */
export function LangSwitch({ className }: { className?: string }) {
  const { lang, path } = unlocalize(usePathname());
  const other = LANGS.find((l) => l !== lang) ?? "en";
  return (
    <Link
      href={localize(other, path)}
      hrefLang={HTML_LANG[other]}
      lang={HTML_LANG[other]}
      className={className}
    >
      {LANG_NAME[other]}
    </Link>
  );
}
