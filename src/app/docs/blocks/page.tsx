import Link from "next/link";
import { ArrowRightIcon } from "@/components/zero/icons/arrow-right";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { DocHeader, DocSection, Prose } from "../_components/doc";

export const metadata = pageMetadata("/docs/blocks");

const blocks = [
  {
    href: "/docs/blocks/settings-menu",
    title: "Settings menu",
    line: "Tabs of settings, apply or hold to restore.",
  },
  {
    href: "/docs/blocks/mission-briefing",
    title: "Mission briefing",
    line: "A contract, its route, its reward; held to accept.",
  },
  {
    href: "/docs/blocks/loadout",
    title: "Loadout",
    line: "The hold, an item's details, a belt.",
  },
  {
    href: "/docs/blocks/leaderboard",
    title: "Leaderboard",
    line: "Periods, the top three by tier, your row.",
  },
  {
    href: "/docs/blocks/hud",
    title: "HUD",
    line: "Gauges, objectives, a hotbar that works.",
  },
  {
    href: "/docs/blocks/title-screen",
    title: "Title screen",
    line: "The name, a menu, the news.",
  },
  {
    href: "/docs/blocks/pause-menu",
    title: "Pause menu",
    line: "The run so far, and the ways out.",
  },
  {
    href: "/docs/blocks/character-select",
    title: "Character select",
    line: "A roster, ratings, a perk.",
  },
  {
    href: "/docs/blocks/community-feed",
    title: "Community feed",
    line: "A board of posts, a post in a sheet.",
  },
  {
    href: "/docs/blocks/level-rewards",
    title: "Level rewards",
    line: "Rank, experience, rewards to claim.",
  },
  {
    href: "/docs/blocks/daily-schedule",
    title: "Daily schedule",
    line: "Four shifts, the current one framed.",
  },
];

export default function BlocksPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks")} />
      <DocHeader
        title="Blocks"
        lead="Whole game screens built from zzzUI's components, installed with one command: a title screen, a settings menu, a pause menu, a mission briefing, a character select, a loadout, a leaderboard, a HUD, a community feed, level rewards and a daily schedule."
      />
      <DocSection id="about" title="About blocks">
        <Prose>
          <p>
            A block is one file in <code>components/blocks/</code> that puts the
            components together into a screen, with its state written out so you
            can see how the pieces talk. Installing a block installs the
            components it uses. Change it freely: it is yours once copied.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="list" title="The blocks">
        <ul className="grid gap-3 sm:grid-cols-2">
          {blocks.map((block) => (
            <li key={block.href}>
              <Link
                href={block.href}
                className="group grid gap-1 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void px-5 py-4 outline-none transition-colors duration-(--zero-dur-fast) hover:border-zero-accent focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2"
              >
                <span className="flex items-center justify-between font-black font-zero text-zero-lg italic">
                  {block.title}
                  <ArrowRightIcon className="text-zero-text-3 transition-colors group-hover:text-zero-accent" />
                </span>
                <span className="font-medium font-zero-text text-zero-sm text-zero-text-2">
                  {block.line}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </DocSection>
    </>
  );
}
