"use client";

import { RadioGroup, RadioGroupItem } from "@/components/zero/radio-group";

const shifts = [
  { value: "dawn", label: "Dawn" },
  { value: "day", label: "Day" },
  { value: "night", label: "Night" },
];

export default function RadioGroupBasic() {
  return (
    <RadioGroup defaultValue="night" aria-label="Shift">
      {shifts.map((shift) => (
        <label key={shift.value} className="flex items-center gap-2.5">
          <RadioGroupItem value={shift.value} />
          {shift.label}
        </label>
      ))}
      <label className="flex items-center gap-2.5 text-zero-text-3">
        <RadioGroupItem value="closed" disabled />
        Closed for repairs
      </label>
    </RadioGroup>
  );
}
