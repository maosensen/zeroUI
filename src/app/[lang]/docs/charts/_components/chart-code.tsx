"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/zero/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/zero/sheet";
import { usePick } from "@/lib/i18n/client";

/** A chart's install command and source, in a sheet opened from under the chart. */
export function ChartCode({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const { pick } = usePick();
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="sm" cut="both" />}>
        {pick({ en: "Code", zh: "代码" })}
      </SheetTrigger>
      <SheetContent
        className="w-[min(46rem,calc(100%-3rem))]"
        closeLabel={pick({ en: "Close", zh: "关闭" })}
      >
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>
            {pick({
              en: "Install it, or copy the file into your project.",
              zh: "可直接安装，也可将文件复制到项目中。",
            })}
          </SheetDescription>
        </SheetHeader>
        <SheetBody className="min-w-0">{children}</SheetBody>
      </SheetContent>
    </Sheet>
  );
}
