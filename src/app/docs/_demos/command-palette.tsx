"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/zero/button";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/zero/command";

type Action = { value: string; label: string; keys?: string };

const groups: { value: string; items: Action[] }[] = [
  {
    value: "Jobs",
    items: [
      { value: "take", label: "Take the job", keys: "⌘T" },
      { value: "hand-in", label: "Hand in" },
      { value: "abandon", label: "Abandon" },
    ],
  },
  {
    value: "Go to",
    items: [
      { value: "board", label: "Job board" },
      { value: "map", label: "District map" },
      { value: "drivers", label: "Drivers" },
    ],
  },
];

function Palette({ onRun }: { onRun?: () => void }) {
  return (
    <Command items={groups}>
      <CommandInput placeholder="Type a command" aria-label="Command" />
      <CommandList>
        {(group: (typeof groups)[number]) => (
          <CommandGroup key={group.value} items={group.items}>
            <CommandGroupLabel>{group.value}</CommandGroupLabel>
            <CommandCollection>
              {(item: Action) => (
                <CommandItem key={item.value} value={item} onClick={onRun}>
                  {item.label}
                  {item.keys ? (
                    <CommandShortcut>{item.keys}</CommandShortcut>
                  ) : null}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        )}
      </CommandList>
      <CommandEmpty>Nothing matches.</CommandEmpty>
    </Command>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <div className="grid w-full max-w-md justify-items-start gap-4">
      <Palette />
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open the palette (⌘K)
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Palette onRun={() => setOpen(false)} />
      </CommandDialog>
    </div>
  );
}
