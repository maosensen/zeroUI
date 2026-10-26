import Link from "next/link";
import { ArrowRightIcon } from "@/components/zero/icons/arrow-right";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { DocHeader, DocSection } from "../_components/doc";

export const metadata = pageMetadata("/docs/guides");

const guides = [
  {
    href: "/docs/guides/game-settings-menu",
    title: "Build a game settings menu in React",
    line: "Tabs, rows, apply, and a held reset.",
  },
  {
    href: "/docs/guides/health-bar-damage-trail",
    title: "A health bar that shows the size of a hit",
    line: "The damage trail, with the Gauge or from scratch.",
  },
  {
    href: "/docs/guides/theme-tokens",
    title: "Theme zzzUI with its tokens",
    line: "One slant, one accent, the timings.",
  },
];

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/guides")} />
      <DocHeader
        title="Guides"
        lead="How to build game screens with zzzUI and shadcn, how its effects work, and how to make it your own: longer reads that explain the why, with code you can lift."
      />
      <DocSection id="list" title="The guides">
        <ul className="grid gap-3">
          {guides.map((guide) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="group grid gap-1 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void px-5 py-4 outline-none transition-colors duration-(--zero-dur-fast) hover:border-zero-accent focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2"
              >
                <span className="flex items-center justify-between gap-4 font-black font-zero text-zero-lg italic">
                  {guide.title}
                  <ArrowRightIcon className="shrink-0 text-zero-text-3 transition-colors group-hover:text-zero-accent" />
                </span>
                <span className="font-medium font-zero-text text-zero-sm text-zero-text-2">
                  {guide.line}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </DocSection>
    </>
  );
}
