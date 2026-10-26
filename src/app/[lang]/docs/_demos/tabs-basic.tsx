import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/zero/tabs";

export default function TabsBasic() {
  return (
    <Tabs defaultValue="today" className="w-full max-w-md">
      <TabsList>
        <TabsTab value="today">Today</TabsTab>
        <TabsTab value="week">This week</TabsTab>
        <TabsTab value="later">Later</TabsTab>
      </TabsList>
      <TabsPanel value="today" className="font-medium text-zero-text-2">
        Three errands, one delivery across the river, a call at nine.
      </TabsPanel>
      <TabsPanel value="week" className="font-medium text-zero-text-2">
        The workshop reopens on Thursday; the parts arrive the day before.
      </TabsPanel>
      <TabsPanel value="later" className="font-medium text-zero-text-2">
        Nothing planned yet.
      </TabsPanel>
    </Tabs>
  );
}
