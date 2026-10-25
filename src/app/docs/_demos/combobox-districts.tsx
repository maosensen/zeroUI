"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/zero/combobox";

type District = { value: string; label: string };

const districts: District[] = [
  { value: "harbor", label: "Harbor" },
  { value: "rail-yards", label: "Rail yards" },
  { value: "old-market", label: "Old market" },
  { value: "canal-docks", label: "Canal docks" },
  { value: "tower-9", label: "Tower 9" },
  { value: "north-gate", label: "North gate" },
];

export default function ComboboxDistricts() {
  return (
    <div className="w-full max-w-sm">
      <Combobox items={districts} multiple defaultValue={[districts[0]]}>
        <ComboboxChips>
          <ComboboxValue>
            {(value: District[]) => (
              <>
                {value.map((district) => (
                  <ComboboxChip key={district.value}>
                    {district.label}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  aria-label="Districts"
                  placeholder={value.length > 0 ? "" : "Pick districts"}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No district by that name.</ComboboxEmpty>
          <ComboboxList>
            {(item: District) => (
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
