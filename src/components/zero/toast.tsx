"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  type AlertVariant,
  alertIcons,
  alertVariants,
} from "@/components/zero/alert";
import { Button } from "@/components/zero/button";
import { CloseIcon } from "@/components/zero/icons/close";
import { cn } from "@/lib/zero/cn";

/*
 * A short message that comes and goes. It wears Alert's look (the tone's badge, the edge in the
 * tone colour) lifted by Panel's quiet outline, slides in from the right into the bottom-right
 * corner, newest nearest the corner, and leaves after a while (5 s by default, Base UI's timer,
 * paused while pointed at). Swipe it right, or press its close button, to send it away early; the
 * ones above close the gap. Three at most are shown; more wait their turn.
 *
 * Wrap the app in ToastProvider once; it also draws the corner. Anywhere inside, call
 *
 *   const toast = useToast();
 *   toast.add({ title: "Job taken", description: "North gate by 22:00", type: "success" });
 *
 * `type` is one of Alert's variants (info, success, warning, danger); `actionProps` adds a button.
 */

const useToast = ToastPrimitive.useToastManager;

function ToastProvider({ children, ...props }: ToastPrimitive.Provider.Props) {
  return (
    <ToastPrimitive.Provider {...props}>
      {children}
      <Toaster />
    </ToastPrimitive.Provider>
  );
}

const tones = new Set<string>(Object.keys(alertIcons));

/** The corner the toasts appear in. ToastProvider renders it; render it yourself only when you
 * build the provider from Base UI's parts. */
function Toaster({ className, ...props }: ToastPrimitive.Viewport.Props) {
  const { toasts } = useToast();
  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        data-slot="toaster"
        className={cn(
          "fixed right-4 bottom-4 z-zero-toast flex w-[min(24rem,calc(100vw-2rem))] flex-col-reverse outline-none",
          className,
        )}
        {...props}
      >
        {toasts.map((toast) => {
          const variant = (
            toast.type && tones.has(toast.type) ? toast.type : "info"
          ) as AlertVariant;
          const Icon = alertIcons[variant];
          return (
            <ToastPrimitive.Root
              key={toast.id}
              toast={toast}
              swipeDirection="right"
              data-slot="toast"
              className={cn(
                "group grid grid-rows-[1fr] outline-none not-first:pb-3",
                "[translate:var(--toast-swipe-movement-x,0px)_0]",
                "transition-[translate,opacity,grid-template-rows,padding] duration-(--zero-dur-base) ease-(--zero-ease-out)",
                "data-starting-style:[translate:calc(100%+1rem)_0] data-starting-style:opacity-0",
                "data-ending-style:grid-rows-[0fr] data-ending-style:pb-0 data-ending-style:opacity-0 data-ending-style:ease-(--zero-ease-in) data-ending-style:[translate:calc(100%+1rem)_0]",
                "data-swiping:duration-0 data-limited:hidden",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="p-(--zero-stroke-thin)">
                  <div
                    data-variant={variant}
                    className={cn(
                      alertVariants({ variant }),
                      "relative pe-12 outline-(length:--zero-stroke-thin) outline-zero-line group-focus-visible:outline-zero-focus",
                    )}
                  >
                    <span
                      data-slot="alert-mark"
                      className="flex text-(--alert-tone) [&>svg]:size-[1.5em]"
                    >
                      <Icon />
                    </span>
                    <ToastPrimitive.Title
                      data-slot="toast-title"
                      className="font-black font-zero text-zero-md italic leading-[1.5em]"
                    />
                    <ToastPrimitive.Description
                      data-slot="toast-description"
                      className="font-medium font-zero-text text-zero-sm text-zero-text-2 [[data-slot=alert-mark]~&]:col-start-2"
                    />
                    <ToastPrimitive.Action
                      data-slot="toast-action"
                      render={
                        <Button
                          size="sm"
                          variant="secondary"
                          className="col-start-2 mt-2 justify-self-start"
                        />
                      }
                    />
                    <ToastPrimitive.Close
                      aria-label="Close"
                      render={
                        <Button
                          variant="ghost"
                          size="sm"
                          cut="both"
                          className="absolute top-2 right-2 [--slab-px:0.25rem]"
                        />
                      }
                    >
                      <CloseIcon />
                    </ToastPrimitive.Close>
                  </div>
                </div>
              </div>
            </ToastPrimitive.Root>
          );
        })}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  );
}

export { Toaster, ToastProvider, useToast };
