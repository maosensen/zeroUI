import type { ComponentProps } from "react";
import { SpinnerIcon } from "@/components/zero/icons/spinner";
import { cn } from "@/lib/zero/cn";

/*
 * The spinner icon, turning: half a waiting loop (--zero-dur-loop) a turn. It sizes with the text
 * like any icon and takes the text's colour. Under reduced motion it holds still. It announces
 * itself as "Loading"; pass aria-label to say what is loading.
 */
function Spinner({ className, ...props }: ComponentProps<typeof SpinnerIcon>) {
  return (
    <SpinnerIcon
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn(
        "animate-spin [animation-duration:calc(var(--zero-dur-loop)/2)]",
        className,
      )}
      {...props}
    />
  );
}

export { Spinner };
