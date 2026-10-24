import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { AlertIcon } from "@/components/zero/icons/alert";
import { DoneIcon } from "@/components/zero/icons/done";
import { InfoIcon } from "@/components/zero/icons/info";
import { cn } from "@/lib/zero/cn";

/*
 * A message set into the page. Its height is whatever it says, so it is a square-cornered box,
 * not a slab: an ink border, the surface with the hatching, and the start edge thickened in the
 * message's tone. The mark is the tone's badge, a slanted slab with its glyph knocked out
 * (alert, info, done), in the tone colour. The tones reuse colours the library already has:
 * quiet grey for information, the accent for done, the selection yellow for a warning, the
 * danger red.
 *
 *   <Alert variant="warning">
 *     <AlertTitle>Low on fuel</AlertTitle>
 *     <AlertDescription>Refuel before you take the next job.</AlertDescription>
 *   </Alert>
 */

const alertVariants = cva(
  [
    "grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 px-4 py-3.5",
    "border-(length:--zero-stroke) border-zero-ink border-s-(length:--zero-stroke-thick) border-s-(--alert-tone)",
    "bg-zero-surface bg-(image:--zero-hatch) text-zero-md text-zero-text",
  ],
  {
    variants: {
      variant: {
        info: "[--alert-tone:var(--color-zero-text-2)]",
        success: "[--alert-tone:var(--color-zero-accent)]",
        warning: "[--alert-tone:var(--color-zero-focus)]",
        danger: "[--alert-tone:var(--color-zero-danger)]",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>;

/** Each tone's badge. */
const alertIcons = {
  info: InfoIcon,
  success: DoneIcon,
  warning: AlertIcon,
  danger: AlertIcon,
} satisfies Record<AlertVariant, unknown>;

type AlertProps = ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    /** Replaces the tone's badge; `null` leaves the mark out. */
    icon?: ReactNode;
  };

function Alert({
  className,
  variant = "info",
  icon,
  children,
  ...props
}: AlertProps) {
  const Icon = alertIcons[variant ?? "info"];
  const mark = icon === undefined ? <Icon /> : icon;
  return (
    <div
      role="alert"
      data-slot="alert"
      data-variant={variant}
      className={cn(
        alertVariants({ variant }),
        mark === null && "grid-cols-1",
        className,
      )}
      {...props}
    >
      {mark === null ? null : (
        <span
          data-slot="alert-mark"
          className="flex text-(--alert-tone) [&>svg]:size-[1.5em]"
        >
          {mark}
        </span>
      )}
      {children}
    </div>
  );
}

function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-black font-zero text-zero-md italic leading-[1.5em]",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "font-medium font-zero-text text-zero-sm text-zero-text-2 [[data-slot=alert-mark]~&]:col-start-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  Alert,
  AlertDescription,
  alertIcons,
  type AlertProps,
  AlertTitle,
  type AlertVariant,
  alertVariants,
};
