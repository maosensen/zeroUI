import {
  Ticker,
  TickerItem,
  TickerLive,
  TickerValue,
} from "@/components/zero/ticker";

const notices = [
  { line: "Ferry Lumen leaves pier 3", value: "06:40" },
  { line: "Crane B back in service", value: "+2" },
  { line: "Fog over the outer mole", value: "40 m" },
  { line: "Night shift signs off", value: "18" },
  { line: "Berth 9 cleared for the Ostra", value: "07:15" },
];

export default function TickerHarbour() {
  return (
    <Ticker aria-label="Harbour notices" duration={40} className="w-full">
      <TickerLive />
      {notices.map((notice) => (
        <TickerItem key={notice.line}>
          {notice.line}
          <TickerValue>{notice.value}</TickerValue>
        </TickerItem>
      ))}
    </Ticker>
  );
}
