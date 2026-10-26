import { Kbd, KbdGroup } from "@/components/zero/kbd";

export default function KbdShortcuts() {
  return (
    <div className="grid gap-3 font-medium font-zero-text text-zero-md text-zero-text-2">
      <p>
        Open the palette with{" "}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        , take the job with <Kbd>Enter</Kbd>.
      </p>
      <p className="text-zero-sm">
        Fold the sidebar: <Kbd>Ctrl</Kbd> + <Kbd>B</Kbd>
      </p>
    </div>
  );
}
