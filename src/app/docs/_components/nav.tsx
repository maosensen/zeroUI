"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/zero/cn";
import { docsNav } from "../_nav";

/** The docs' page list: a column beside the content, a scrolling row above it on a phone. */
export function DocsNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Docs"
      className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] lg:sticky lg:top-24 lg:grid lg:self-start lg:content-start lg:gap-7 lg:overflow-visible lg:pb-0"
    >
      {docsNav.map(({ group, pages }) => (
        <div key={group} className="grid shrink-0 content-start gap-2">
          <p className="font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]">
            {group}
          </p>
          <ul className="flex gap-4 lg:grid lg:gap-1">
            {pages.map(({ href, title }) => {
              const current = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 whitespace-nowrap py-1 font-bold font-zero text-zero-md text-zero-text-2 italic outline-none",
                      "hover:text-zero-text focus-visible:text-zero-focus focus-visible:underline",
                      // the chosen page wears the same slanted mark as a chosen select row
                      "before:h-[0.9em] before:w-[0.4em] before:-skew-x-(--zero-slant) before:bg-transparent",
                      "aria-[current=page]:text-zero-accent aria-[current=page]:before:bg-zero-accent",
                    )}
                  >
                    {title}
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
