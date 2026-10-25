"use client";

import { Suspense, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/zero/calendar";
import { Skeleton } from "@/components/zero/skeleton";

function Calendars() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 24));
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 9, 20),
    to: new Date(2026, 9, 24),
  });
  return (
    <div className="flex flex-wrap gap-6">
      <div className="panel">
        <Calendar
          mode="single"
          selected={day}
          onSelect={setDay}
          defaultMonth={new Date(2026, 9)}
        />
      </div>
      <div className="panel">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          defaultMonth={new Date(2026, 9)}
          captionLayout="dropdown"
        />
      </div>
    </div>
  );
}

export default function CalendarShift() {
  return (
    <Suspense
      fallback={<Skeleton className="h-[18rem] w-[36rem] max-w-full" />}
    >
      <Calendars />
    </Suspense>
  );
}
