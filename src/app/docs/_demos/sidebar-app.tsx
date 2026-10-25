"use client";

import {
  ArrowRightIcon,
  ExternalIcon,
  InfoIcon,
  LockIcon,
  SearchIcon,
} from "@/components/zero/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/zero/sidebar";

const jobs = [
  { label: "Board", icon: SearchIcon, count: 12, active: true },
  { label: "Taken", icon: ArrowRightIcon, count: 3 },
  { label: "Locked", icon: LockIcon },
];

export default function SidebarApp() {
  return (
    // A box instead of a whole page: the sidebar's container is absolute here, not fixed.
    <SidebarProvider className="relative h-[26rem] min-h-0 w-full overflow-hidden border-(length:--zero-stroke-thin) border-zero-line">
      <Sidebar collapsible="icon" className="absolute h-full">
        <SidebarHeader>
          <div className="flex items-center gap-3 px-3 py-2">
            <span className="h-5 w-3 shrink-0 -skew-x-(--zero-slant) bg-zero-accent" />
            <span className="truncate font-black font-zero text-zero-lg italic group-data-[collapsible=icon]/sidebar:hidden">
              Dispatch
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Jobs</SidebarGroupLabel>
            <SidebarMenu>
              {jobs.map(({ label, icon: Icon, count, active }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton isActive={active} tooltip={label}>
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                  {count ? <SidebarMenuBadge>{count}</SidebarMenuBadge> : null}
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Districts">
                  <ExternalIcon />
                  <span>Districts</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#harbor" isActive>
                      Harbor
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#rail-yards">
                      Rail yards
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Help">
                <InfoIcon />
                <span>Help</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset render={<div />} className="gap-4 p-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <span className="font-black font-zero text-zero-lg italic">
            Board
          </span>
        </div>
        <p className="font-medium font-zero-text text-zero-sm text-zero-text-2">
          Press the button or ⌘B / Ctrl+B to fold the sidebar to its icons.
        </p>
      </SidebarInset>
    </SidebarProvider>
  );
}
