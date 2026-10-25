import type { ComponentProps } from "react";
import { CheckIcon } from "@/components/zero/icons/check";
import { CloseIcon } from "@/components/zero/icons/close";
import { cn } from "@/lib/zero/cn";

/*
 * What is left to do, kept at the edge of the screen the way a game keeps its objectives: a
 * leaning header over a dark band that fades out to the right, and one line per objective. Each
 * has a slanted mark: an empty frame while it waits, the accent frame while it is the one in hand,
 * the filled accent with a check when it is done, red with a cross when it failed. A done or
 * failed title is struck through, the line drawn across from the start. The state is also said in
 * words for screen readers.
 *
 *   <Objectives aria-label="Night shift">
 *     <ObjectivesHeader>Night shift</ObjectivesHeader>
 *     <Objective state="done"><ObjectiveTitle>Reach the rail yards</ObjectiveTitle></Objective>
 *     <Objective state="active">
 *       <ObjectiveTitle>Find the sealed crates</ObjectiveTitle>
 *       <ObjectiveCount>2 / 5</ObjectiveCount>
 *     </Objective>
 *   </Objectives>
 */

type ObjectiveState = "pending" | "active" | "done" | "failed";

const said: Record<ObjectiveState, string> = {
  pending: "To do: ",
  active: "Current: ",
  done: "Done: ",
  failed: "Failed: ",
};

function Objectives({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      data-slot="objectives"
      className={cn(
        "grid w-full max-w-80 gap-2.5 bg-[linear-gradient(to_right,rgb(0_0_0/0.72)_55%,transparent)] py-3 ps-4 pe-10",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

function ObjectivesHeader({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="objectives-header"
      className={cn(
        "font-black font-zero text-zero-accent text-zero-xs uppercase italic tracking-[0.12em]",
        className,
      )}
      {...props}
    />
  );
}

function Objective({
  className,
  state = "pending",
  children,
  ...props
}: ComponentProps<"div"> & { state?: ObjectiveState }) {
  return (
    <div
      data-slot="objective"
      data-state={state}
      className={cn(
        "group/objective grid grid-cols-[auto_1fr_auto] text-zero-md items-baseline gap-x-2.5 gap-y-0.5",
        className,
      )}
      {...props}
    >
      <span
        data-slot="objective-mark"
        className={cn(
          "grid size-[0.95em] translate-y-[0.12em] -skew-x-(--zero-slant) place-items-center self-start",
          "shadow-[inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-text-3)]",
          "transition-[background-color,box-shadow] duration-(--zero-dur-fast) ease-(--zero-ease-out)",
          "group-data-[state=active]/objective:shadow-[inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-accent)]",
          "group-data-[state=done]/objective:bg-zero-accent group-data-[state=done]/objective:shadow-none",
          "group-data-[state=failed]/objective:bg-zero-danger group-data-[state=failed]/objective:shadow-none",
          "text-zero-ink [&_svg]:size-[0.75em] [&_svg]:skew-x-(--zero-slant)",
        )}
      >
        {state === "done" ? <CheckIcon /> : null}
        {state === "failed" ? <CloseIcon /> : null}
        <span className="sr-only">{said[state]}</span>
      </span>
      {children}
    </div>
  );
}

function ObjectiveTitle({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="objective-title"
      className={cn(
        "w-fit font-bold font-zero text-zero-md italic",
        // the strike: a line drawn from the start, under a done or failed title
        "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_var(--zero-stroke-thin)] bg-position-[0_55%] bg-no-repeat",
        "transition-[background-size,color] duration-(--zero-dur-slow) ease-(--zero-ease-out)",
        "group-data-[state=done]/objective:bg-[length:100%_var(--zero-stroke-thin)] group-data-[state=done]/objective:text-zero-text-3",
        "group-data-[state=failed]/objective:bg-[length:100%_var(--zero-stroke-thin)] group-data-[state=failed]/objective:text-zero-danger",
        "group-data-[state=pending]/objective:text-zero-text-2",
        className,
      )}
      {...props}
    />
  );
}

/** How far along, at the line's end: "2 / 5". */
function ObjectiveCount({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="objective-count"
      className={cn(
        "font-semibold font-zero-text text-zero-sm text-zero-text-2 tabular-nums group-data-[state=active]/objective:text-zero-accent group-data-[state=done]/objective:text-zero-text-3",
        className,
      )}
      {...props}
    />
  );
}

/** A line under the title. */
function ObjectiveDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="objective-description"
      className={cn(
        "col-span-2 col-start-2 font-medium font-zero-text text-zero-sm text-zero-text-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Objective,
  ObjectiveCount,
  ObjectiveDescription,
  Objectives,
  ObjectivesHeader,
  type ObjectiveState,
  ObjectiveTitle,
};
