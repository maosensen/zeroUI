import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A box of related things set into the page. Its height is whatever it holds, so it is
 * square-cornered like Alert: an ink border, the surface with the hatching. The header is a black
 * bar, the Dialog's, holding the title and, at its end, an action. A picture as the first child
 * runs edge to edge under the border. A card that is a link or holds the one control that opens
 * it can pass `interactive`: pointing at it lifts the border to the accent.
 *
 *   <Card>
 *     <CardHeader><CardTitle /><CardDescription /><CardAction /></CardHeader>
 *     <CardContent>…</CardContent>
 *     <CardFooter>…</CardFooter>
 *   </Card>
 */

function Card({
  className,
  interactive,
  ...props
}: ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col overflow-hidden border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch) text-zero-text",
        "[&>img:first-child]:w-full [&>img:first-child]:object-cover",
        interactive &&
          "outline-(length:--zero-stroke-thin) outline-transparent transition-[outline-color] duration-(--zero-dur-fast) ease-(--zero-ease-out) hover:outline-zero-accent has-focus-visible:outline-zero-focus",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-1.5 bg-zero-void px-5 py-4 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-black font-zero text-zero-lg italic", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "font-medium font-zero-text text-zero-sm text-zero-text-2",
        className,
      )}
      {...props}
    />
  );
}

/** Something at the header's end: a badge, a menu, a small button. */
function CardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-center justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "grid gap-3 px-5 py-4 font-medium font-zero-text text-zero-md",
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-auto flex flex-wrap items-center gap-3 border-zero-line border-t-(length:--zero-stroke-thin) px-5 py-4",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
