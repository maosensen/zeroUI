"use client";

import { Button } from "@/components/zero/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/zero/popover";

export default function PopoverBasic() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>
        About the reward
      </PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>3,100 credits</PopoverTitle>
        <PopoverDescription>
          Paid when the crate is signed for at the north gate. Half if it
          arrives late.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}
