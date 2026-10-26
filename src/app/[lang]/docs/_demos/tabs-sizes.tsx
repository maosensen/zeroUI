import { Tabs, TabsList, TabsTab } from "@/components/zero/tabs";

export default function TabsSizes() {
  return (
    <div className="grid justify-items-center gap-5">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Tabs key={size} size={size} defaultValue="notes">
          <TabsList>
            <TabsTab value="notes">Notes</TabsTab>
            <TabsTab value="level">Level</TabsTab>
            <TabsTab value="schedule">Schedule</TabsTab>
          </TabsList>
        </Tabs>
      ))}
    </div>
  );
}
