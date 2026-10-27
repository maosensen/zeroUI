import type { ReactNode } from "react";
import { getLang } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { type PagePath, page, pageCopy } from "@/seo/site";
import { DocHeader } from "../../_components/doc";
import { ChartGrid } from "./chart-display";

/** A chart type's page: its title and description from src/seo/site.ts, then the gallery. */
export function ChartTypePage({
  path,
  children,
}: {
  path: Extract<PagePath, `/docs/charts/${string}`>;
  children: ReactNode;
}) {
  const copy = pageCopy(page(path), getLang());
  return (
    <>
      <JsonLd data={docGraph(path)} />
      <DocHeader title={copy.title} lead={copy.description} />
      <ChartGrid>{children}</ChartGrid>
    </>
  );
}
