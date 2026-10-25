import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { ChevronDownIcon } from "@/components/zero/icons/chevron-down";
import { inputVariants } from "@/components/zero/input";
import { cn } from "@/lib/zero/cn";

/*
 * The browser's own <select> in Input's well, with zeroUI's chevron: for forms that must work
 * without JavaScript, or where the phone's own picker is wanted. Its list is drawn by the browser,
 * so it does not take zeroUI's look; use Select for that. className styles the well.
 */

type NativeSelectProps = Omit<ComponentProps<"select">, "size"> &
  VariantProps<typeof inputVariants>;

function NativeSelect({ className, size, cut, ...props }: NativeSelectProps) {
  return (
    <span
      data-slot="input"
      className={cn(inputVariants({ size, cut }), className)}
    >
      <select
        data-slot="input-control"
        className={cn(
          "absolute inset-0 size-full cursor-pointer appearance-none bg-transparent ps-(--input-px) pe-[calc(var(--input-px)+1.75em)] outline-none",
          "font-semibold font-zero-text text-inherit [font-size:inherit] [line-height:inherit]",
          "disabled:cursor-default [&>option]:bg-zero-surface [&>option]:text-zero-text",
        )}
        {...props}
      />
      <ChevronDownIcon className="pointer-events-none ms-auto me-(--input-px) size-[1.1em] text-zero-text-3" />
    </span>
  );
}

function NativeSelectOption(props: ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup(props: ComponentProps<"optgroup">) {
  return <optgroup data-slot="native-select-optgroup" {...props} />;
}

export {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  type NativeSelectProps,
};
