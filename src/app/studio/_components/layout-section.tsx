import AspectRatioMap from "@/app/[lang]/docs/_demos/aspect-ratio-map";
import EmptyBoard from "@/app/[lang]/docs/_demos/empty-board";
import ItemDrivers from "@/app/[lang]/docs/_demos/item-drivers";
import ScrollAreaLog from "@/app/[lang]/docs/_demos/scroll-area-log";
import SpinnerBasic from "@/app/[lang]/docs/_demos/spinner-basic";

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
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

/** Layout and the rest: items, empty states, scroll areas, ratios, spinners (the docs' demos). */
export function LayoutSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">Layout and the rest</h2>
      <div>
        <Row label="item">
          <ItemDrivers />
        </Row>
        <Row label="empty">
          <EmptyBoard />
        </Row>
        <Row label="scroll area">
          <ScrollAreaLog />
        </Row>
        <Row label="aspect ratio">
          <AspectRatioMap />
        </Row>
        <Row label="spinner">
          <SpinnerBasic />
        </Row>
      </div>
    </section>
  );
}
