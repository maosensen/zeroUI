import { Avatar, AvatarFallback, AvatarImage } from "@/components/zero/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/zero/hover-card";

export default function HoverCardDriver() {
  return (
    <p className="font-medium font-zero-text text-zero-md text-zero-text-2">
      Taken by{" "}
      <HoverCard>
        <HoverCardTrigger
          href="#mara"
          className="font-bold text-zero-text underline decoration-zero-accent decoration-2 underline-offset-4 outline-none focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus"
        >
          Mara K.
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/samples/portrait-a.svg" alt="" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-black font-zero italic">Mara K.</div>
              <div className="text-zero-text-3 text-zero-xs">
                Driver · 41 jobs
              </div>
            </div>
          </div>
          <p className="text-zero-text-2">
            Knows the rail yards. Never late on a rush job this month.
          </p>
        </HoverCardContent>
      </HoverCard>{" "}
      at 21:10.
    </p>
  );
}
