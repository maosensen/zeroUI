"use client";

import { Checkbox } from "@/components/zero/checkbox";

export default function CheckboxBasic() {
  return (
    <div className="grid gap-3">
      <label className="flex items-center gap-2.5">
        <Checkbox defaultChecked />
        Bring the spare battery
      </label>
      <label className="flex items-center gap-2.5">
        <Checkbox />
        Wait for a reply
      </label>
      <label className="flex items-center gap-2.5">
        <Checkbox indeterminate />
        Some of the crates loaded
      </label>
      <label className="flex items-center gap-2.5 text-zero-text-3">
        <Checkbox disabled />
        Signed off by the foreman
      </label>
    </div>
  );
}
