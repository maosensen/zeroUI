import { Badge } from "@/components/zero/badge";
import { Stat, Stats } from "@/components/zero/stats";

export default function StatsCompare() {
  return (
    <div className="grid w-full max-w-sm gap-4 border-(length:--zero-stroke) border-zero-ink bg-zero-surface p-5">
      <div className="grid gap-1.5">
        <Badge rarity="epic" className="w-fit">
          Epic
        </Badge>
        <p className="font-black font-zero text-zero-lg italic">Night rig</p>
        <p className="font-medium font-zero-text text-zero-sm text-zero-text-3">
          Compared with your Courier rig
        </p>
      </div>
      <Stats>
        <Stat label="Capacity" value={8} compare={6} />
        <Stat label="Speed" value={14} compare={14} unit=" km/h" />
        <Stat label="Shield" value={3} compare={4} />
        <Stat label="Weight" value={5} compare={7} better="lower" unit=" kg" />
        <Stat label="Noise" value={22} compare={18} better="lower" unit=" dB" />
      </Stats>
    </div>
  );
}
