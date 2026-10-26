"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/zero/combobox";

const districts = [
  { value: "harbor", label: "Harbor" },
  { value: "rail-yards", label: "Rail yards" },
  { value: "old-market", label: "Old market" },
  { value: "canal-docks", label: "Canal docks" },
  { value: "tower-9", label: "Tower 9" },
  { value: "north-gate", label: "North gate" },
];

export default function ComboboxDistrict() {
  return (
    <div className="w-full max-w-xs">
      <Combobox items={districts}>
        <ComboboxInput placeholder="Pick a district" aria-label="District" />
        <ComboboxContent>
          <ComboboxEmpty>No district by that name.</ComboboxEmpty>
          <ComboboxList>
            {(item: (typeof districts)[number]) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
