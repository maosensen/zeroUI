import { Field, FieldError, FieldLabel } from "@/components/zero/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/zero/select";

const shifts = { dawn: "Dawn", day: "Day", night: "Night" };

export default function SelectField() {
  return (
    <Field invalid className="w-full max-w-64">
      <FieldLabel>Shift</FieldLabel>
      <Select items={shifts} defaultValue="night">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(shifts).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError match>No crew is free at night this week.</FieldError>
    </Field>
  );
}
