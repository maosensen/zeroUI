import { Sparkline } from "@/components/zero/sparkline";

const relays = [
  { name: "Relay Kestrel", values: [9, 8, 9, 7, 8, 8, 7, 8] },
  { name: "Relay Ashgrove", values: [2, 3, 3, 5, 6, 9, 12, 15], hot: true },
  { name: "Relay Pellmoor", values: [11, 9, 7, 6, 4, 4, 3, 2] },
];

export default function SparklineRelays() {
  return (
    <ul className="grid w-full max-w-sm gap-3">
      {relays.map((relay) => (
        <li
          key={relay.name}
          className="flex items-center justify-between gap-4 border-zero-line border-b-(length:--zero-stroke-thin) pb-3"
        >
          <span className="font-bold font-zero italic">{relay.name}</span>
          <span className="flex items-center gap-3">
            <Sparkline values={relay.values} hot={relay.hot} />
            <span className="w-[2ch] text-end font-black font-zero tabular-nums">
              {relay.values.at(-1)}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
