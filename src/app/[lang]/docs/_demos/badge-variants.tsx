import { Badge } from "@/components/zero/badge";
import { LockIcon } from "@/components/zero/icons";

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Rush</Badge>
      <Badge variant="secondary">Harbor</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge variant="danger">Late</Badge>
      <Badge variant="secondary">
        <LockIcon />
        Locked
      </Badge>
    </div>
  );
}
