import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/zero/button";
import { ArrowRightIcon } from "@/components/zero/icons";
import { Tabs, TabsList, TabsTab } from "@/components/zero/tabs";

export const metadata: Metadata = {
  title: "Share card",
  robots: { index: false, follow: false },
};

/**
 * The share card (public/og.png), drawn with the components themselves at exactly 1200 × 630.
 * Local only. To remake it, with the dev server up: `pnpm og:capture` (scripts/capture-og.mts).
 */
export default function OgCard() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="relative flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden bg-zero-ground bg-(image:--zero-hatch) p-20">
      {/* keep the dev overlay out of the capture */}
      <style>{"nextjs-portal{display:none!important}"}</style>
      <p
        aria-hidden
        className="absolute -right-24 bottom-6 rotate-(--zero-tilt) whitespace-nowrap font-black font-zero text-[15rem] text-zero-surface italic leading-none"
      >
        ZERO
      </p>
      <div className="relative grid gap-6">
        <p className="font-bold font-zero text-[1.35rem] text-zero-text-2 uppercase italic tracking-[0.12em]">
          Components for shadcn, on Base UI
        </p>
        <h1 className="origin-left rotate-(--zero-tilt) font-black font-zero text-[7rem] italic leading-[0.95]">
          zero<span className="text-zero-accent">UI</span>
        </h1>
        <p className="max-w-[44rem] font-semibold text-[1.75rem] text-zero-text-2 leading-snug">
          A dark-only component library with a game-UI look. Slabs cut on the
          slant, thick outlines, one fluorescent accent.
        </p>
      </div>
      <div className="relative flex items-center gap-6">
        <Button size="lg">
          Get started
          <ArrowRightIcon />
        </Button>
        <Tabs size="lg" defaultValue="button">
          <TabsList>
            <TabsTab value="button">Button</TabsTab>
            <TabsTab value="select">Select</TabsTab>
            <TabsTab value="tabs">Tabs</TabsTab>
          </TabsList>
        </Tabs>
        <span className="ms-auto font-bold font-zero text-[1.35rem] text-zero-text-3 italic">
          zeroui.catforest.dev
        </span>
      </div>
    </div>
  );
}
