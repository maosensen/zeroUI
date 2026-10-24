"use client";

import { Switch } from "@/components/zero/switch";

export default function SwitchBasic() {
  return (
    <div className="grid gap-4">
      <label className="flex items-center gap-3">
        <Switch defaultChecked />
        Night routes
      </label>
      <label className="flex items-center gap-3">
        <Switch />
        Share my position
      </label>
      <label className="flex items-center gap-3 text-zero-lg">
        <Switch />
        Larger, beside larger text
      </label>
    </div>
  );
}
