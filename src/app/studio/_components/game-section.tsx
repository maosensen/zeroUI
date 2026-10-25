import CounterCredits from "@/app/docs/_demos/counter-credits";
import GaugeHit from "@/app/docs/_demos/gauge-hit";
import GaugeKinds from "@/app/docs/_demos/gauge-kinds";
import HoldButtonScrap from "@/app/docs/_demos/hold-button-scrap";
import InventoryHold from "@/app/docs/_demos/inventory-hold";
import ObjectivesShift from "@/app/docs/_demos/objectives-shift";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-start gap-6 border-zero-line border-t-2 py-5">
      <span className="font-bold font-zero text-zero-sm text-zero-text-2 italic">
        {label}
      </span>
      <div className="flex flex-wrap items-start gap-6">{children}</div>
    </div>
  );
}

/** The game pieces (the docs' demos). */
export function GameSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">Game</h2>
      <div>
        <Row label="gauge">
          <GaugeHit />
          <GaugeKinds />
        </Row>
        <Row label="inventory">
          <InventoryHold />
        </Row>
        <Row label="hold button">
          <HoldButtonScrap />
        </Row>
        <Row label="counter">
          <CounterCredits />
        </Row>
        <Row label="objectives">
          <ObjectivesShift />
        </Row>
      </div>
    </section>
  );
}
