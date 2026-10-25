import { EyeIcon, LockIcon } from "@/components/zero/icons";
import { Toggle } from "@/components/zero/toggle";

export default function ToggleBasic() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle defaultPressed>
        <EyeIcon />
        Show taken
      </Toggle>
      <Toggle variant="secondary">
        <LockIcon />
        Locked only
      </Toggle>
      <Toggle size="sm" cut="both" aria-label="Lock the board">
        <LockIcon />
      </Toggle>
    </div>
  );
}
