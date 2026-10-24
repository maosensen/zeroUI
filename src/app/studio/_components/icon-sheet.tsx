import * as icons from "@/zero/icons";

const set = Object.entries(icons).filter(
  ([name]) => name.endsWith("Icon") && name !== "createIcon",
) as [string, (typeof icons)["CheckIcon"]][];

/** The 24-unit grid behind an enlarged icon, with the 2–22 live area marked. */
function Grid() {
  const lines = Array.from({ length: 25 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="absolute inset-0 size-full text-zero-line"
    >
      {lines.map((i) => (
        <g key={i} stroke="currentColor" strokeWidth={0.04}>
          <line x1={i} y1={0} x2={i} y2={24} />
          <line x1={0} y1={i} x2={24} y2={i} />
        </g>
      ))}
      <rect
        x={2}
        y={2}
        width={20}
        height={20}
        fill="none"
        stroke="var(--color-zero-focus)"
        strokeOpacity={0.5}
        strokeWidth={0.08}
      />
    </svg>
  );
}

export function IconSheet() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-4 border-zero-line border-t-2 pt-5">
      {set.map(([name, Icon]) => (
        <figure
          key={name}
          className="grid gap-3 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void p-3"
        >
          <div className="relative aspect-square w-full">
            <Grid />
            <Icon className="relative size-full text-zero-text" />
          </div>
          <div className="flex items-end justify-between text-zero-text">
            <Icon className="size-4" />
            <Icon className="size-5" />
            <Icon className="size-6" />
            <span className="bg-zero-accent p-1 text-zero-text">
              <Icon outline className="size-6" />
            </span>
          </div>
          <figcaption className="font-bold font-zero text-zero-text-2 text-zero-xs italic">
            {name.replace(/Icon$/, "")}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
