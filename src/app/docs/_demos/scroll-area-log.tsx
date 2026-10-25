import { ScrollArea } from "@/components/zero/scroll-area";

const log = Array.from({ length: 24 }, (_, index) => {
  const minute = String(10 + index * 2).padStart(2, "0");
  const stops = [
    "Harbor",
    "Rail yards",
    "Canal docks",
    "Tower 9",
    "Old market",
  ];
  return `21:${minute.slice(-2)} · Passed ${stops[index % stops.length]}`;
});

export default function ScrollAreaLog() {
  return (
    <ScrollArea className="h-64 w-full max-w-xs border-(length:--zero-stroke-thin) border-zero-line bg-zero-void">
      <ol className="grid gap-2 p-4 font-medium font-zero-text text-zero-sm text-zero-text-2">
        {log.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>
    </ScrollArea>
  );
}
