"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Button } from "@/components/zero/button";
import { SidebarIcon } from "@/components/zero/icons/sidebar";
import { Sheet, SheetContent, SheetTitle } from "@/components/zero/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/zero/tooltip";
import { cn } from "@/lib/zero/cn";

/*
 * The column down the side of an app: a black, hatched strip with a quiet line on its inner edge.
 * Its rows are the Dropdown menu's (slabs cut at the end); the page you are on is filled with the
 * accent. On a wide screen it can fold away entirely (`collapsible="offcanvas"`) or down to a rail
 * of icons (`"icon"`), where each row shows only its icon and names itself in a tooltip; on a
 * phone it is a Sheet. SidebarTrigger and ⌘B / Ctrl+B open and close it.
 *
 *   <SidebarProvider>
 *     <Sidebar collapsible="icon">
 *       <SidebarHeader />
 *       <SidebarContent>
 *         <SidebarGroup>
 *           <SidebarGroupLabel>Jobs</SidebarGroupLabel>
 *           <SidebarMenu>
 *             <SidebarMenuItem>
 *               <SidebarMenuButton isActive tooltip="Board"><Icon /><span>Board</span></SidebarMenuButton>
 *             </SidebarMenuItem>
 *           </SidebarMenu>
 *         </SidebarGroup>
 *       </SidebarContent>
 *     </Sidebar>
 *     <SidebarInset><SidebarTrigger />…</SidebarInset>
 *   </SidebarProvider>
 */

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
/** One icon row and the group's padding either side. */
const SIDEBAR_WIDTH_ICON =
  "calc(var(--height-zero-md) * (1 + tan(var(--zero-slant))) + 1rem)";
const SIDEBAR_SHORTCUT = "b";
const MOBILE_QUERY = "(max-width: 767px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [ownOpen, setOwnOpen] = useState(defaultOpen);
  const open = openProp ?? ownOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (onOpenChange) onOpenChange(next);
      else setOwnOpen(next);
    },
    [onOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) setOpenMobile((current) => !current);
    else setOpen(!open);
  }, [isMobile, open, setOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleSidebar]);

  const value = useMemo<SidebarContextValue>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [open, setOpen, openMobile, isMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as CSSProperties
        }
        className={cn("flex min-h-svh w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

const strip =
  "flex size-full flex-col bg-zero-void bg-(image:--zero-hatch) text-zero-text";

function Sidebar({
  side = "left",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  side?: "left" | "right";
  /** What closing does on a wide screen: slide away, fold to icons, or nothing. */
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          strip,
          "h-full w-(--sidebar-width) border-zero-line border-e-(length:--zero-stroke-thin)",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side={side}
          showClose={false}
          data-slot="sidebar"
          data-mobile=""
          className="w-(--sidebar-width) bg-zero-void p-0"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as CSSProperties}
        >
          <SheetTitle className="sr-only">Sidebar</SheetTitle>
          <div className="flex size-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      data-slot="sidebar"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-side={side}
      className="group/sidebar peer hidden md:block"
    >
      {/* holds the strip's place in the page */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) transition-[width] duration-(--zero-dur-base) ease-(--zero-ease-out)",
          "group-data-[collapsible=offcanvas]/sidebar:w-0 group-data-[collapsible=icon]/sidebar:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-zero-sticky hidden h-svh w-(--sidebar-width) md:flex",
          "transition-[left,right,width] duration-(--zero-dur-base) ease-(--zero-ease-out)",
          side === "left"
            ? "left-0 border-zero-line border-e-(length:--zero-stroke-thin) group-data-[collapsible=offcanvas]/sidebar:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 border-zero-line border-s-(length:--zero-stroke-thin) group-data-[collapsible=offcanvas]/sidebar:right-[calc(var(--sidebar-width)*-1)]",
          "group-data-[collapsible=icon]/sidebar:w-(--sidebar-width-icon)",
          className,
        )}
        {...props}
      >
        <div data-slot="sidebar-inner" className={strip}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="sm"
      cut="both"
      aria-label="Toggle sidebar"
      className={cn("[--slab-px:0.375rem]", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <SidebarIcon />
    </Button>
  );
}

/** The page beside the sidebar. */
function SidebarInset({ className, ...props }: ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn("relative flex min-w-0 flex-1 flex-col", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("mt-auto flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarSeparator({ className, ...props }: ComponentProps<"hr">) {
  return (
    <hr
      data-slot="sidebar-separator"
      className={cn(
        "mx-3 h-(--zero-stroke-thin) border-0 bg-zero-line",
        className,
      )}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden group-data-[collapsible=icon]/sidebar:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

/** Small leaning capitals over a group; they fade out on the icon rail. */
function SidebarGroupLabel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "flex h-8 shrink-0 items-center px-3 font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]",
        "transition-[margin,opacity] duration-(--zero-dur-base) ease-(--zero-ease-out)",
        "group-data-[collapsible=icon]/sidebar:-mt-8 group-data-[collapsible=icon]/sidebar:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

/** The row every sidebar button shares: the Dropdown menu's, quieter until pointed at. */
const row = cn(
  "slab slab-cut-end flex w-full min-w-0 items-center gap-2.5 overflow-hidden text-left outline-none select-none",
  "font-bold font-zero italic",
  "[--slab-o:0px] [--slab-px:0.75rem] [--slab-fill:transparent] [--slab-line:transparent] [--slab-ink:var(--color-zero-text-2)]",
  "transition-[width] duration-(--zero-dur-base) ease-(--zero-ease-out)",
  "hover:[--slab-fill:var(--color-zero-raised)] hover:[--slab-ink:var(--color-zero-text)]",
  "focus-visible:[--slab-o:var(--zero-stroke-thin)] focus-visible:[--slab-line:var(--color-zero-focus)] focus-visible:[--slab-ink:var(--color-zero-text)]",
  "disabled:pointer-events-none disabled:[--slab-ink:var(--color-zero-text-3)] aria-disabled:pointer-events-none aria-disabled:[--slab-ink:var(--color-zero-text-3)]",
  "[&>span:last-child]:truncate [&>span:last-child]:pe-[0.2em] [&_svg]:pointer-events-none [&_svg]:shrink-0",
);

type SidebarMenuButtonProps = useRender.ComponentProps<"button"> & {
  /** The page you are on: filled with the accent. */
  isActive?: boolean;
  /** Names the row in a tooltip while the sidebar is folded to icons. */
  tooltip?: string;
};

function SidebarMenuButton({
  className,
  isActive = false,
  tooltip,
  render,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const showTooltip = Boolean(tooltip) && state === "collapsed" && !isMobile;
  const button = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          row,
          "text-zero-md [--slab-h:var(--height-zero-md)] [&_svg]:size-[1.15em]",
          "data-active:[--slab-fill:var(--color-zero-accent)] data-active:[--slab-ink:var(--color-zero-ink)]",
          "group-data-[collapsible=icon]/sidebar:w-[calc(var(--height-zero-md)*(1+tan(var(--zero-slant))))]",
          className,
        ),
      },
      props,
    ),
    render: showTooltip ? <TooltipTrigger render={render} /> : render,
    state: { slot: "sidebar-menu-button", active: isActive },
  });
  if (!showTooltip) return button;
  return (
    <Tooltip>
      {button}
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  );
}

/** A count at the end of a row. Hidden on the icon rail. */
function SidebarMenuBadge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className={cn(
        "pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 font-semibold font-zero-text text-zero-text-3 text-zero-xs tabular-nums",
        "group-has-data-active/menu-item:text-zero-ink group-data-[collapsible=icon]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}

/** Rows under a row, behind a quiet line. Hidden on the icon rail. */
function SidebarMenuSub({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        "ms-5 mt-1 flex min-w-0 flex-col gap-0.5 border-zero-line border-s-(length:--zero-stroke-thin) ps-2",
        "group-data-[collapsible=icon]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  className,
  isActive = false,
  render,
  ...props
}: useRender.ComponentProps<"a"> & { isActive?: boolean }) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          row,
          "text-zero-sm [--slab-h:var(--height-zero-sm)] [&_svg]:size-[1.1em]",
          "data-active:[--slab-fill:var(--color-zero-raised)] data-active:[--slab-ink:var(--color-zero-accent)]",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "sidebar-menu-sub-button", active: isActive },
  });
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  type SidebarMenuButtonProps,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
