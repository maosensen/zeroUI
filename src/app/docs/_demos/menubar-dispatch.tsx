"use client";

import { useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/zero/menubar";

export default function MenubarDispatch() {
  const [radio, setRadio] = useState(true);
  const [sort, setSort] = useState("reward");
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Job</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New job
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Take it
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Send to</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Mara</MenubarItem>
              <MenubarItem>Rui</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem danger>Abandon</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={radio} onCheckedChange={setRadio}>
            Radio on
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value={sort} onValueChange={setSort}>
            <MenubarRadioItem value="reward">By reward</MenubarRadioItem>
            <MenubarRadioItem value="distance">By distance</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Shortcuts</MenubarItem>
          <MenubarItem>About dispatch</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
