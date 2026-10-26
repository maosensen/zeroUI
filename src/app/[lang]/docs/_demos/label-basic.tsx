import { Checkbox } from "@/components/zero/checkbox";
import { Label } from "@/components/zero/label";
import { Switch } from "@/components/zero/switch";

export default function LabelBasic() {
  return (
    <div className="grid gap-4">
      <Label>
        <Checkbox defaultChecked />
        Rush jobs only
      </Label>
      <Label>
        <Switch />
        Radio on
      </Label>
      <Label>
        <Checkbox disabled />
        Locked jobs (none today)
      </Label>
    </div>
  );
}
