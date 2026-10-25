import Link from "next/link";
import type { ReactNode } from "react";
import { Hud } from "@/components/blocks/hud";
import { Button } from "@/components/zero/button";
import { ArrowRightIcon } from "@/components/zero/icons";
import { JsonLd } from "@/lib/seo/json-ld";
import { REGISTRY_URL } from "@/lib/site";
import { homeGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { ComponentIndex } from "./_showcase/component-index";
import { Console } from "./_showcase/console";
import { JobBoard } from "./_showcase/job-board";
import { SlantDial } from "./_showcase/slant-dial";
import { SiteHeader } from "./_site/site-header";
import { CodeBlock } from "./docs/_components/code-block";

/** The showcase: what zeroUI looks like at work, and the way into the docs. */

export const metadata = pageMetadata("/");

function Heading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <p className="font-bold font-zero text-zero-accent text-zero-xs uppercase italic tracking-[0.12em]">
        {eyebrow}
      </p>
      <h2 className="font-black font-zero text-zero-2xl italic">{children}</h2>
    </div>
  );
}

const rules = [
  {
    title: "Cut, never rounded",
    text: "Every block is a slab with an edge cut on one slant. Slabs set side by side nest into each other.",
  },
  {
    title: "Lifted by outline",
    text: "No shadows. Thick ink outlines and a quiet second line do the work, and a yellow frame marks focus.",
  },
  {
    title: "Moves on purpose",
    text: "A fast press and a springing release, a slab that slides, popups that grow and fold. All of it holds still for reduced motion.",
  },
];

const blocks = [
  ["/docs/blocks/settings-menu", "Settings menu"],
  ["/docs/blocks/mission-briefing", "Mission briefing"],
  ["/docs/blocks/loadout", "Loadout"],
  ["/docs/blocks/leaderboard", "Leaderboard"],
  ["/docs/blocks/title-screen", "Title screen"],
  ["/docs/blocks/pause-menu", "Pause menu"],
  ["/docs/blocks/character-select", "Character select"],
] as const;

export default function Home() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-zero-ground bg-(image:--zero-hatch)">
      <JsonLd data={homeGraph()} />
      <SiteHeader
        end={
          <Button size="sm" nativeButton={false} render={<Link href="/docs" />}>
            Get started
          </Button>
        }
      />

      {/* lettering in the ground, barely lighter than it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 h-[52rem] overflow-hidden"
      >
        <p className="absolute -left-8 top-24 rotate-(--zero-tilt) whitespace-nowrap font-black font-zero text-[clamp(7rem,18vw,15rem)] text-zero-surface italic leading-none">
          CUT ON THE SLANT
        </p>
        <p className="absolute top-[30rem] left-[20%] rotate-(--zero-tilt) whitespace-nowrap font-black font-zero text-[clamp(5rem,12vw,10rem)] text-zero-surface italic leading-none">
          ZERO
        </p>
      </div>

      <main className="relative mx-auto grid max-w-6xl gap-28 px-4 pt-14 pb-24 sm:px-8 sm:pt-20">
        <section className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pt-6">
          <div className="grid justify-items-start gap-7">
            <p className="font-bold font-zero text-zero-text-2 text-zero-xs uppercase italic tracking-[0.12em]">
              Components for shadcn, on Base UI
            </p>
            <h1 className="origin-left rotate-(--zero-tilt) font-black font-zero text-zero-3xl italic">
              Cut on
              <br />
              <span className="text-zero-accent">the slant.</span>
            </h1>
            <p className="max-w-md font-medium text-zero-lg text-zero-text-2">
              zeroUI is a dark-only component library with a strong game-UI
              look: black bars, a charcoal ground, one fluorescent accent, slabs
              with thick outlines.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/docs" />}
              >
                Get started
                <ArrowRightIcon />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                nativeButton={false}
                render={<Link href="/docs/button" />}
              >
                Components
              </Button>
            </div>
            <CodeBlock
              lang="bash"
              title="terminal"
              className="w-full"
              code={`pnpm dlx shadcn@latest registry add @zeroui=${REGISTRY_URL}
pnpm dlx shadcn@latest add @zeroui/button`}
            />
          </div>
          <JobBoard />
        </section>

        <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="grid gap-5">
            <Heading eyebrow="The foundation">One angle, everywhere</Heading>
            <p className="max-w-md font-medium text-zero-md text-zero-text-2 leading-relaxed">
              Every slanted cut comes from a single token, set to sit with the
              italic. Turn it and the buttons, the tabs and the wells all re-cut
              together, with their outlines still even.
            </p>
            <ul className="grid gap-4">
              {rules.map(({ title, text }) => (
                <li key={title} className="grid gap-1">
                  <span className="flex items-center gap-2.5 font-black font-zero text-zero-md italic before:h-[0.9em] before:w-[0.4em] before:-skew-x-(--zero-slant) before:bg-zero-accent">
                    {title}
                  </span>
                  <span className="max-w-md font-medium text-zero-sm text-zero-text-2">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <SlantDial />
        </section>

        <section className="grid gap-8">
          <div className="grid gap-4">
            <Heading eyebrow="At work">A dispatch console</Heading>
            <p className="max-w-xl font-medium text-zero-md text-zero-text-2 leading-relaxed">
              A command palette, a channel and a chart, built from the same
              slabs. Run a command, or say something to the district.
            </p>
          </div>
          <Console />
        </section>

        <section className="grid gap-8">
          <div className="grid gap-4">
            <Heading eyebrow="In the game">A HUD that works</Heading>
            <p className="max-w-xl font-medium text-zero-md text-zero-text-2 leading-relaxed">
              Gauges that leave a trail, a hotbar with cooldowns, objectives
              that strike through. Use the hotbar: the kit patches the hull, the
              flare and the key finish the shift.
            </p>
          </div>
          <Hud />
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 font-bold font-zero text-zero-sm italic">
            <span className="text-zero-text-3">More blocks:</span>
            {blocks.map(([href, name]) => (
              <Link
                key={href}
                href={href}
                className="text-zero-text-2 underline decoration-zero-line decoration-2 underline-offset-4 outline-none transition-colors hover:text-zero-accent focus-visible:text-zero-focus"
              >
                {name}
              </Link>
            ))}
          </p>
        </section>

        <section className="grid gap-8">
          <Heading eyebrow="The set">Components</Heading>
          <ComponentIndex />
        </section>
      </main>

      <footer className="relative bg-zero-void">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 font-bold font-zero text-zero-sm text-zero-text-3 italic sm:px-8">
          <span>
            zero<span className="text-zero-accent">UI</span> · built on shadcn
            and Base UI
          </span>
          <span>A catforest project</span>
        </div>
      </footer>
    </div>
  );
}
