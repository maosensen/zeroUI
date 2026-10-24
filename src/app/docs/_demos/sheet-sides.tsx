"use client";

import { Button } from "@/components/zero/button";
import { Input } from "@/components/zero/input";
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

export default function SheetSides() {
  return (
    <>
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
              </p>
              <Input placeholder="A note for the dispatcher" />
            </SheetBody>
            <SheetFooter>
              <Button>Take it</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </>
  );
}
