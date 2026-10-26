"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/zero/dropdown-menu";
import { ExternalIcon } from "@/components/zero/icons";

export default function DropdownMenuBasic() {
  const [radio, setRadio] = useState(true);
  const [sort, setSort] = useState("reward");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        Job actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>This job</DropdownMenuLabel>
          <DropdownMenuItem>
            Take it
            <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Open the route
            <ExternalIcon className="ms-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Hand in</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={radio} onCheckedChange={setRadio}>
          Radio on
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="reward">Reward</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="distance">
              Distance
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem danger>Abandon</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
