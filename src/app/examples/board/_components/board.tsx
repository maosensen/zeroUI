"use client";

import Link from "next/link";
import { CommunityFeed } from "@/components/blocks/community-feed";
import { DailySchedule } from "@/components/blocks/daily-schedule";
import { LevelRewards } from "@/components/blocks/level-rewards";
import { Avatar, AvatarFallback } from "@/components/zero/avatar";
import { ArrowLeftIcon } from "@/components/zero/icons/arrow-left";
import { ProfileChip } from "@/components/zero/profile-chip";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/zero/tabs";

/*
 * The courier board: an example app put together from zzzUI's blocks. A black top bar with a
 * way back, who you are, and three tabs that Q and E step through from anywhere, the way a game
 * pages with its shoulder buttons; under it the board, today's shifts, and your rank. Every piece
 * is a block or a component from the registry, unchanged.
 */
export function Board() {
  return (
    <Tabs defaultValue="board" className="min-h-svh gap-0">
      <header className="z-zero-sticky flex flex-wrap items-center gap-x-4 gap-y-3 bg-zero-void px-4 py-3 sm:sticky sm:top-0 sm:gap-x-6 sm:px-8">
        <Link
          href="/examples"
          aria-label="Back to the examples"
          className="slab slab-cut-start grid place-items-center outline-none [--slab-fill:var(--color-zero-void)] [--slab-h:var(--height-zero-md)] [--slab-line:var(--color-zero-danger)] [--slab-o:var(--zero-stroke)] [--slab-px:1rem] [--slab-ink:var(--color-zero-danger)] hover:[--slab-line:var(--color-zero-danger-hi)] focus-visible:[--slab-gap-fill:var(--color-zero-ink)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-line:var(--color-zero-focus)]"
        >
          <ArrowLeftIcon />
        </Link>
        <ProfileChip
          name="Wren"
          level={5}
          xp={410}
          xpMax={600}
          avatar={
            <Avatar size="sm">
              <AvatarFallback>WR</AvatarFallback>
            </Avatar>
          }
        />
        <div className="ms-auto max-w-full">
          <TabsList hotkeys={["q", "e"]}>
            <TabsTab value="board">Board</TabsTab>
            <TabsTab value="today">Today</TabsTab>
            <TabsTab value="rank">Rank</TabsTab>
          </TabsList>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8">
        <h1 className="sr-only">Courier board</h1>
        <TabsPanel value="board">
          <CommunityFeed />
        </TabsPanel>
        <TabsPanel value="today">
          <DailySchedule />
        </TabsPanel>
        <TabsPanel value="rank" className="grid justify-items-center">
          <LevelRewards header={false} />
        </TabsPanel>
      </main>
    </Tabs>
  );
}
