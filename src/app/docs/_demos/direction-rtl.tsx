"use client";

import { DirectionProvider } from "@/components/zero/direction";
import { Tabs, TabsList, TabsTab } from "@/components/zero/tabs";

export default function DirectionRtl() {
  return (
    <div dir="rtl" className="grid justify-items-start gap-3">
      <DirectionProvider direction="rtl">
        <Tabs defaultValue="board">
          <TabsList>
            <TabsTab value="board">Board</TabsTab>
            <TabsTab value="map">Map</TabsTab>
            <TabsTab value="drivers">Drivers</TabsTab>
          </TabsList>
        </Tabs>
      </DirectionProvider>
      <p
        dir="ltr"
        className="font-medium font-zero-text text-zero-sm text-zero-text-3"
      >
        Right to left: the tabs run from the right, and the arrow keys follow.
      </p>
    </div>
  );
}
