"use client";

import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/zero/context-menu";

export default function ContextMenuJob() {
  const [pinned, setPinned] = useState(true);
  return (
    <ContextMenu>
      <ContextMenuTrigger className="grid h-40 w-full max-w-sm place-items-center border-(length:--zero-stroke-thin) border-zero-line border-dashed font-bold font-zero text-zero-sm text-zero-text-3 italic">
        Right-click the job card
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Take it
          <ContextMenuShortcut>⌘T</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Send to</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Mara</ContextMenuItem>
            <ContextMenuItem>Rui</ContextMenuItem>
            <ContextMenuItem>Jo</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
          Pinned
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem danger>Abandon</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
