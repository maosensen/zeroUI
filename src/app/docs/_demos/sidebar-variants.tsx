"use client";

import { useState } from "react";
import { InfoIcon, LockIcon, SearchIcon } from "@/components/zero/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/zero/sidebar";
import { ToggleGroup, ToggleGroupItem } from "@/components/zero/toggle-group";

type Variant = "sidebar" | "floating" | "inset";

const rows = [
  { label: "Board", icon: SearchIcon, active: true },
  { label: "Locked", icon: LockIcon },
  { label: "Help", icon: InfoIcon },
];

export default function SidebarVariants() {
  const [variant, setVariant] = useState<Variant>("floating");
  return (
    <div className="grid w-full gap-4">
      <ToggleGroup
        size="sm"
        variant="secondary"
        value={[variant]}
        onValueChange={(next) => next[0] && setVariant(next[0] as Variant)}
      >
        <ToggleGroupItem value="sidebar">Sidebar</ToggleGroupItem>
        <ToggleGroupItem value="floating">Floating</ToggleGroupItem>
        <ToggleGroupItem value="inset">Inset</ToggleGroupItem>
      </ToggleGroup>
      {/* A box instead of a whole page: the sidebar's container is absolute here, not fixed. */}
      <SidebarProvider className="relative h-80 min-h-0 w-full overflow-hidden border-(length:--zero-stroke-thin) border-zero-line">
        <Sidebar
          variant={variant}
          collapsible="icon"
          className="absolute h-full"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Jobs</SidebarGroupLabel>
              <SidebarMenu>
                {rows.map(({ label, icon: Icon, active }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton isActive={active} tooltip={label}>
                      <Icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="gap-3 p-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="font-black font-zero text-zero-lg italic">
              Board
            </span>
          </div>
          <p className="font-medium font-zero-text text-zero-sm text-zero-text-2">
            The {variant} sidebar.
          </p>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
