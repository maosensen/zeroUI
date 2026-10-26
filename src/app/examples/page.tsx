import Link from "next/link";
import { SiteHeader } from "@/app/_site/site-header";
import { ArrowRightIcon } from "@/components/zero/icons/arrow-right";
import { JsonLd } from "@/lib/seo/json-ld";
import { exampleGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";

export const metadata = pageMetadata("/examples");

const examples = [
  {
    href: "/examples/board",
    title: "Courier board",
    line: "A community board, today's shifts and a rank page, under one top bar with tabs that Q and E step through. Built from the community feed, daily schedule and level rewards blocks.",
  },
  {
    href: "/examples/signal-board",
    title: "Signal board",
    line: "A news aggregator to scan, not read: a live ticker, readings, a heat-ranked board you walk with J and K beside a preview, topics, and stories in a sheet. Built from Ticker, Gauge, Sparkline, Table and Sheet.",
  },
];

export default function Examples() {
  return (
    <div className="min-h-svh bg-zero-ground bg-(image:--zero-hatch) text-zero-text">
      <JsonLd data={exampleGraph("/examples")} />
      <SiteHeader />
      <main className="mx-auto grid max-w-4xl gap-8 px-4 py-14 sm:px-8">
        <header className="grid gap-4">
          <h1 className="font-black font-zero text-zero-2xl italic">
            Examples
          </h1>
          <p className="max-w-2xl font-medium text-zero-md text-zero-text-2 leading-relaxed">
            Whole apps put together from zzzUI's blocks and components, to show
            how the pieces work side by side. Open one, then read its source:
            every part of it installs from the registry.
          </p>
        </header>
        <ul className="grid gap-3">
          {examples.map((example) => (
            <li key={example.href}>
              <Link
                href={example.href}
                className="group grid gap-1 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void px-5 py-4 outline-none transition-colors duration-(--zero-dur-fast) hover:border-zero-accent focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2"
              >
                <span className="flex items-center justify-between gap-4 font-black font-zero text-zero-lg italic">
                  {example.title}
                  <ArrowRightIcon className="shrink-0 text-zero-text-3 transition-colors group-hover:text-zero-accent" />
                </span>
                <span className="font-medium font-zero-text text-zero-sm text-zero-text-2">
                  {example.line}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
