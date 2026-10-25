import { Field, FieldLabel } from "@/components/zero/field";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/zero/native-select";

export default function NativeSelectDistrict() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>District</FieldLabel>
      <NativeSelect defaultValue="harbor">
        <NativeSelectOptGroup label="East">
          <NativeSelectOption value="harbor">Harbor</NativeSelectOption>
          <NativeSelectOption value="rail-yards">Rail yards</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="West">
          <NativeSelectOption value="old-market">Old market</NativeSelectOption>
          <NativeSelectOption value="canal-docks">
            Canal docks
          </NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </Field>
  );
}
