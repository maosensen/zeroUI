"use client";

import { Button } from "@/components/zero/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/zero/tooltip";

export default function TooltipBasic() {
  return (
    <TooltipProvider>
      {(["top", "right", "bottom"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="ghost" />}>
            Hover ({side})
          </TooltipTrigger>
          <TooltipContent side={side}>Opens the job board</TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  );
}
