"use client";

import { type ReactNode, useState } from "react";
import { Button } from "@/components/zero/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/zero/dialog";
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
import { ArrowRightIcon, ExternalIcon } from "@/components/zero/icons";
import { Input } from "@/components/zero/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/zero/popover";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/zero/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/zero/tooltip";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-center gap-6 border-zero-line border-t-2 py-5">
      <span className="font-bold font-zero text-zero-sm text-zero-text-2 italic">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

/** The overlay family: dialog, sheet, popover, tooltip, dropdown menu. */
export function OverlaysSection() {
  const [radio, setRadio] = useState(true);
  const [sort, setSort] = useState("reward");
  return (
    <TooltipProvider>
      <section className="grid gap-2">
        <h2 className="font-black text-zero-xl italic">Overlays</h2>
        <div>
          <Row label="dialog">
            <Dialog>
              <DialogTrigger render={<Button />}>Take the job</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Take this job?</DialogTitle>
                  <DialogDescription>
                    Escort a sealed crate through the rail yards.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <p className="text-zero-text-2">
                    The crate has to reach the north gate before the night
                    shift. You can hand the job back until you pick it up.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <DialogClose render={<Button variant="secondary" />}>
                    Not now
                  </DialogClose>
                  <DialogClose render={<Button />}>
                    Take it
                    <ArrowRightIcon />
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Row>
          <Row label="sheet">
            {(["right", "left", "bottom"] as const).map((side) => (
              <Sheet key={side}>
                <SheetTrigger render={<Button variant="secondary" />}>
                  From the {side}
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Job details</SheetTitle>
                    <SheetDescription>Rail yards · 3,100 cr</SheetDescription>
                  </SheetHeader>
                  <SheetBody>
                    <p className="text-zero-text-2">
                      Escort a sealed crate through the yards to the north gate.
                      Do not open it.
                    </p>
                    <Input placeholder="A note for the dispatcher" />
                  </SheetBody>
                  <SheetFooter>
                    <Button>Take it</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </Row>
          <Row label="popover">
            <Popover>
              <PopoverTrigger render={<Button variant="secondary" />}>
                About the reward
              </PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>3,100 credits</PopoverTitle>
                <PopoverDescription>
                  Paid when the crate is signed for at the north gate. Half if
                  it arrives late.
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          </Row>
          <Row label="tooltip">
            {(["top", "right", "bottom"] as const).map((side) => (
              <Tooltip key={side}>
                <TooltipTrigger render={<Button variant="ghost" />}>
                  Hover ({side})
                </TooltipTrigger>
                <TooltipContent side={side}>Opens the job board</TooltipContent>
              </Tooltip>
            ))}
          </Row>
          <Row label="menu">
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
                <DropdownMenuCheckboxItem
                  checked={radio}
                  onCheckedChange={setRadio}
                >
                  Radio on
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                    <DropdownMenuRadioItem value="reward">
                      Reward
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="distance">
                      Distance
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem danger>Abandon</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Row>
        </div>
      </section>
    </TooltipProvider>
  );
}
