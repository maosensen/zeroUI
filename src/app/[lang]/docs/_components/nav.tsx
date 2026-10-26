"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePick } from "@/lib/i18n/client";
import { unlocalize } from "@/lib/i18n/locale";
import { cn } from "@/lib/zero/cn";
import { docsNav } from "../_nav";

/** The docs' page list: a column beside the content, a scrolling row above it on a phone. */
export function DocsNav() {
  const { path } = unlocalize(usePathname());
  const { lang, link, pick } = usePick();
  return (
    <nav
      aria-label={pick({ en: "Docs", zh: "文档" })}
      className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] lg:sticky lg:top-24 lg:grid lg:self-start lg:content-start lg:gap-7 lg:overflow-visible lg:pb-0"
    >
      {docsNav.map(({ group, zh, pages }) => (
        <div key={group} className="grid shrink-0 content-start gap-2">
          <p className="font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]">
            {lang === "zh" ? zh : group}
          </p>
          <ul className="flex gap-4 lg:grid lg:gap-1">
            {pages.map(({ href, title, zh: name }) => {
              const current = path === href;
              return (
                <li key={href}>
                  <Link
                    href={link(href)}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 whitespace-nowrap py-1 font-bold font-zero text-zero-md text-zero-text-2 italic outline-none",
                      "hover:text-zero-text focus-visible:text-zero-focus focus-visible:underline",
                      // the chosen page wears the same slanted mark as a chosen select row
                      "before:h-[0.9em] before:w-[0.4em] before:-skew-x-(--zero-slant) before:bg-transparent",
                      "aria-[current=page]:text-zero-accent aria-[current=page]:before:bg-zero-accent aria-[current=page]:focus-visible:text-zero-focus",
                    )}
                  >
                    {lang === "zh" && name ? name : title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
