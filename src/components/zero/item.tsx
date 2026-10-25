import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * One thing in a list: a mark, a leaning title with a line beneath it, and actions at the end.
 * Plain, outlined in the quiet line, or on the raised grey. As a link (`render`), it lights to the
 * raised grey when pointed at and takes the focus frame. ItemGroup stacks them; ItemSeparator
 * divides them. `rarity` colours the title by tier and marks the start edge, as an inventory does.
 */

const itemVariants = cva(
  [
    "group/item flex flex-wrap items-center gap-4 outline-none",
    "transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out)",
    "[a]:hover:bg-zero-raised focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:-outline-offset-2",
  ],
  {
    variants: {
      variant: {
        default: "",
        outline:
          "border-(length:--zero-stroke-thin) border-zero-line bg-zero-surface",
        muted: "bg-zero-raised [a]:hover:bg-zero-lifted",
      },
      size: {
        default: "px-4 py-3.5",
        sm: "gap-3 px-3 py-2.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

/** A tier's edge, and its colour for the title (ItemTitle reads --item-rarity). */
const rarities: Record<Rarity, string> = {
  common: "[--item-rarity:var(--color-zero-rarity-common)]",
  uncommon: "[--item-rarity:var(--color-zero-rarity-uncommon)]",
  rare: "[--item-rarity:var(--color-zero-rarity-rare)]",
  epic: "[--item-rarity:var(--color-zero-rarity-epic)]",
  legendary: "[--item-rarity:var(--color-zero-rarity-legendary)]",
};

type ItemProps = useRender.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & {
    /** Colours the title by tier and marks the start edge. */
    rarity?: Rarity;
  };

function Item({
  className,
  variant,
  size,
  rarity,
  render,
  ...props
}: ItemProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-rarity": rarity,
        className: cn(
          itemVariants({ variant, size }),
          rarity &&
            cn(
              rarities[rarity],
              "shadow-[inset_var(--zero-stroke-thick)_0_0_var(--item-rarity)]",
            ),
          className,
        ),
      } as ComponentProps<"div">,
      props,
    ),
    render,
    state: { slot: "item", variant, size },
  });
}

function ItemGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-group"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function ItemSeparator({ className, ...props }: ComponentProps<"hr">) {
  return (
    <hr
      data-slot="item-separator"
      className={cn(
        "my-0 h-(--zero-stroke-thin) border-0 bg-zero-line",
        className,
      )}
      {...props}
    />
  );
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-zero-text-2 [&_svg]:size-5",
        /** An icon in a small slanted black well. */
        icon: "slab slab-cut-both w-[calc(var(--height-zero-md)*(1+tan(var(--zero-slant))))] text-zero-text-2 [--slab-fill:var(--color-zero-void)] [--slab-h:var(--height-zero-md)] [--slab-line:var(--color-zero-line)] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px] [&_svg]:size-5",
        image:
          "size-12 overflow-hidden border-(length:--zero-stroke) border-zero-ink [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function ItemMedia({
  className,
  variant,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex items-center gap-2 font-black font-zero text-zero-md italic in-data-rarity:text-(--item-rarity)",
        className,
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 font-medium font-zero-text text-zero-sm text-zero-text-2",
        className,
      )}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function ItemHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  type ItemProps,
  ItemSeparator,
  ItemTitle,
  itemVariants,
};
