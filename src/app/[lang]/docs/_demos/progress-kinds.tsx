"use client";

import { useEffect, useState } from "react";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/zero/progress";

export default function ProgressKinds() {
  const [value, setValue] = useState(20);
  useEffect(() => {
    const timer = setInterval(
      () => setValue((current) => (current >= 100 ? 0 : current + 10)),
      900,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="grid w-full max-w-md gap-6">
      <Progress value={value}>
        <ProgressLabel>Uploading the route</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={value} segments={10}>
        <ProgressLabel>Charges</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={null}>
        <ProgressLabel>Finding a driver</ProgressLabel>
      </Progress>
    </div>
  );
}
