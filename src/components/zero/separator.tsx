import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "@/lib/zero/cn";

/*
 * A quiet line between two things, the same line that divides rows and panels. Horizontal by
 * default; `orientation="vertical"` stands it up beside inline content.
 */
function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-zero-line",
        "data-[orientation=horizontal]:h-(--zero-stroke-thin) data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:w-(--zero-stroke-thin) data-[orientation=vertical]:self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
