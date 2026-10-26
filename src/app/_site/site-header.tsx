import Link from "next/link";
import type { ReactNode } from "react";
import { AccentPicker } from "@/components/zero/accent-picker";

const navLink =
  "font-bold font-zero text-zero-sm text-zero-text-2 italic sm:text-zero-md outline-none hover:text-zero-text focus-visible:text-zero-focus";

/** The black bar across the top of every public page. `end` holds what sits at its right. */
export function SiteHeader({ end }: { end?: ReactNode }) {
  return (
    <header className="sticky top-0 z-zero-sticky flex h-16 items-center gap-4 bg-zero-void px-4 sm:gap-8 sm:px-8">
      <Link
        href="/"
        className="rotate-(--zero-tilt) font-black font-zero text-zero-xl italic outline-none focus-visible:text-zero-focus"
      >
        zzz<span className="text-zero-accent">UI</span>
      </Link>
      <nav aria-label="Site" className="flex gap-4 sm:gap-6">
        <Link href="/docs" className={navLink}>
          Docs
        </Link>
        <Link href="/docs/button" className={navLink}>
          Components
        </Link>
        <Link href="/docs/blocks" className={navLink}>
          Blocks
        </Link>
        <Link href="/examples" className={`${navLink} max-sm:hidden`}>
          Examples
        </Link>
        <Link href="/docs/icons" className={`${navLink} max-sm:hidden`}>
          Icons
        </Link>
      </nav>
      <div className="ms-auto flex items-center gap-6">
        {/* on a phone the swatch alone is the button: the chevron would push the bar off the screen */}
        <AccentPicker className="max-sm:[&>svg]:hidden" />
        {end ? <div className="max-sm:hidden">{end}</div> : null}
      </div>
    </header>
  );
}
