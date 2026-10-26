import { CheckIcon, SearchIcon, SpinnerIcon } from "@/components/zero/icons";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/zero/trace";

export default function TraceSteps() {
  return (
    <Trace className="max-w-md">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <SearchIcon />
            </TraceIcon>
            <TraceTitle>Searched the job board</TraceTitle>
            <TraceDescription>12 jobs</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          Rush jobs in the east district, sorted by reward. Three are within a
          kilometre of the rail yards.
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceLine>
        <TraceIcon>
          <CheckIcon />
        </TraceIcon>
        <TraceTitle>Took the sealed crate</TraceTitle>
        <TraceDescription>0.4 s</TraceDescription>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <SpinnerIcon className="animate-spin [animation-duration:calc(var(--zero-dur-loop)/2)]" />
        </TraceIcon>
        <TraceTitle>Planning the route</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <CheckIcon />
        </TraceIcon>
        <TraceTitle>Message the north gate</TraceTitle>
      </TraceLine>
    </Trace>
  );
}
