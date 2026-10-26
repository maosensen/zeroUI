"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/zero/toggle-group";

export default function ToggleGroupDistricts() {
  const [view, setView] = useState(["list"]);
  return (
    <div className="grid justify-items-start gap-4">
      <ToggleGroup value={view} onValueChange={setView} variant="secondary">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="map">Map</ToggleGroupItem>
        <ToggleGroupItem value="board">Board</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup multiple defaultValue={["harbor"]} size="sm">
        <ToggleGroupItem value="harbor">Harbor</ToggleGroupItem>
        <ToggleGroupItem value="rail">Rail yards</ToggleGroupItem>
        <ToggleGroupItem value="market">Old market</ToggleGroupItem>
        <ToggleGroupItem value="docks">Canal docks</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
