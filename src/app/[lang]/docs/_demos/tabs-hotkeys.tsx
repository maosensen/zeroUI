import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/zero/tabs";

export default function TabsHotkeys() {
  return (
    <Tabs defaultValue="board" className="w-full max-w-lg">
      <TabsList hotkeys={["q", "e"]}>
        <TabsTab value="board">Board</TabsTab>
        <TabsTab value="today">Today</TabsTab>
        <TabsTab value="rank">Rank</TabsTab>
      </TabsList>
      <TabsPanel value="board" className="font-medium text-zero-text-2">
        Press Q or E anywhere on the page to step between tabs.
      </TabsPanel>
      <TabsPanel value="today" className="font-medium text-zero-text-2">
        Four shifts today; the night one is yours.
      </TabsPanel>
      <TabsPanel value="rank" className="font-medium text-zero-text-2">
        Level 8, sixty points from 9.
      </TabsPanel>
    </Tabs>
  );
}
