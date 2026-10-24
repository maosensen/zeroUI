import { Input } from "@/components/zero/input";

export default function InputStates() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      <Input defaultValue="no@" aria-invalid aria-label="Invalid" />
      <Input placeholder="Disabled" disabled aria-label="Disabled" />
    </div>
  );
}
