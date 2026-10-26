"use client";

import { Gauge, GaugeLabel, GaugeValue } from "@/components/zero/gauge";

export default function GaugeKinds() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <Gauge value={68} segments={5} tone="rare">
        <GaugeLabel>Shield</GaugeLabel>
        <GaugeValue />
      </Gauge>
      <Gauge value={41} max={60} tone="legendary">
        <GaugeLabel>Fuel</GaugeLabel>
        <GaugeValue>{(_, value) => `${value} L`}</GaugeValue>
      </Gauge>
      <Gauge value={7} max={10} segments={10} tone="epic">
        <GaugeLabel>Signal</GaugeLabel>
        <GaugeValue />
      </Gauge>
    </div>
  );
}
