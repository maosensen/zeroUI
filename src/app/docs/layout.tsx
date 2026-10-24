import type { Metadata } from "next";
import Link from "next/link";
import { DocsNav } from "./_components/nav";

export const metadata: Metadata = {
  title: { default: "Docs", template: "%s · zeroUI" },
};

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="min-h-svh bg-zero-ground bg-(image:--zero-hatch)">
      <header className="sticky top-0 z-zero-sticky flex h-16 items-center gap-8 bg-zero-void px-4 sm:px-8">
        <Link
          href="/"
          className="rotate-(--zero-tilt) font-black font-zero text-zero-xl italic outline-none focus-visible:text-zero-focus"
        >
          zero<span className="text-zero-accent">UI</span>
        </Link>
        <Link
          href="/docs"
          className="font-bold font-zero text-zero-md text-zero-text-2 italic outline-none hover:text-zero-text focus-visible:text-zero-focus"
        >
          Docs
        </Link>
      </header>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14 lg:py-12">
        <DocsNav />
        <main className="grid min-w-0 content-start gap-14">{children}</main>
      </div>
    </div>
  );
}
