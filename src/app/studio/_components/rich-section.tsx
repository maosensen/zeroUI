import CalendarShift from "@/app/[lang]/docs/_demos/calendar-shift";
import CarouselCrates from "@/app/[lang]/docs/_demos/carousel-crates";
import ChartWeek from "@/app/[lang]/docs/_demos/chart-week";
import ResizablePanes from "@/app/[lang]/docs/_demos/resizable-panes";

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

/** The components built on other libraries: calendar, carousel, chart, resizable. */
export function RichSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">
        Calendar, carousel, chart, panels
      </h2>
      <div>
        <Row label="calendar">
          <CalendarShift />
        </Row>
        <Row label="chart">
          <ChartWeek />
        </Row>
        <Row label="carousel">
          <CarouselCrates />
        </Row>
        <Row label="resizable">
          <ResizablePanes />
        </Row>
      </div>
    </section>
  );
}
