import { LockIcon, SearchIcon } from "@/components/zero/icons";
import { Tabs, TabsList, TabsTab } from "@/components/zero/tabs";

export default function TabsIcons() {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTab value="all">All</TabsTab>
        <TabsTab value="open">Open commissions</TabsTab>
        <TabsTab value="search">
          <SearchIcon />
          Find
        </TabsTab>
        <TabsTab value="locked" disabled>
          <LockIcon />
          Locked
        </TabsTab>
      </TabsList>
    </Tabs>
  );
}
