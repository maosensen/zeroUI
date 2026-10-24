import { Input } from "@/components/zero/input";

export default function InputSizes() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      <Input size="sm" placeholder="Small" aria-label="Small" />
      <Input size="md" placeholder="Medium" aria-label="Medium" />
      <Input size="lg" placeholder="Large" aria-label="Large" />
    </div>
  );
}
