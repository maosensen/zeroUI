"use client";

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
import { ArrowRightIcon } from "@/components/zero/icons";

export default function DialogBasic() {
  return (
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
            The crate has to reach the north gate before the night shift. You
            can hand the job back until you pick it up.
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
  );
}
