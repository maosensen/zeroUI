import Link from "next/link";
import type { ReactNode } from "react";
import { AccentPicker } from "@/components/zero/accent-picker";
import { link, pick } from "@/lib/i18n/server";
import { LangSwitch } from "./lang-switch";

const navLink =
  "font-bold font-zero text-zero-sm text-zero-text-2 italic sm:text-zero-md outline-none hover:text-zero-text focus-visible:text-zero-focus";

/** The black bar across the top of every public page. `end` holds what sits at its right. */
export function SiteHeader({ end }: { end?: ReactNode }) {
  return (
    <header className="sticky top-0 z-zero-sticky flex h-16 items-center gap-4 bg-zero-void px-4 sm:gap-8 sm:px-8">
      <Link
        href={link("/")}
        className="rotate-(--zero-tilt) font-black font-zero text-zero-xl italic outline-none focus-visible:text-zero-focus"
      >
        zzz<span className="text-zero-accent">UI</span>
      </Link>
      <nav
        aria-label={pick({ en: "Site", zh: "站点" })}
        className="flex gap-4 sm:gap-6"
      >
        <Link href={link("/docs")} className={navLink}>
          {pick({ en: "Docs", zh: "文档" })}
        </Link>
        <Link href={link("/docs/button")} className={navLink}>
          {pick({ en: "Components", zh: "组件" })}
        </Link>
        <Link
          href={link("/docs/blocks")}
          className={`${navLink} max-sm:hidden`}
        >
          {pick({ en: "Blocks", zh: "区块" })}
        </Link>
        <Link href={link("/examples")} className={`${navLink} max-sm:hidden`}>
          {pick({ en: "Examples", zh: "示例" })}
        </Link>
        <Link href={link("/docs/icons")} className={`${navLink} max-sm:hidden`}>
          {pick({ en: "Icons", zh: "图标" })}
        </Link>
      </nav>
      <div className="ms-auto flex items-center gap-4 sm:gap-6">
        <LangSwitch className={navLink} />
        {/* on a phone the swatch alone is the button: the chevron would push the bar off the screen */}
        <AccentPicker className="max-sm:[&>svg]:hidden" />
        {end ? <div className="max-sm:hidden">{end}</div> : null}
      </div>
    </header>
  );
}
