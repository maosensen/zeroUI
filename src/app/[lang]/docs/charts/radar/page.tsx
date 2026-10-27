import { ChartRadarDefault } from "@/components/charts/chart-radar-default";
import { ChartRadarDots } from "@/components/charts/chart-radar-dots";
import { ChartRadarGridCircle } from "@/components/charts/chart-radar-grid-circle";
import { ChartRadarGridFilled } from "@/components/charts/chart-radar-grid-filled";
import { ChartRadarGridNone } from "@/components/charts/chart-radar-grid-none";
import { ChartRadarLabelCustom } from "@/components/charts/chart-radar-label-custom";
import { ChartRadarLegend } from "@/components/charts/chart-radar-legend";
import { ChartRadarLinesOnly } from "@/components/charts/chart-radar-lines-only";
import { ChartRadarMultiple } from "@/components/charts/chart-radar-multiple";
import { enter, type LangProps } from "@/lib/i18n/server";
import { metadataFor } from "@/seo/site";
import { ChartDisplay } from "../_components/chart-display";
import { ChartTypePage } from "../_components/chart-page";

export const generateMetadata = metadataFor("/docs/charts/radar");

export default async function RadarchartsPage({ params }: LangProps) {
  await enter(params);
  return (
    <ChartTypePage path="/docs/charts/radar">
      <ChartDisplay name="chart-radar-default">
        <ChartRadarDefault />
      </ChartDisplay>
      <ChartDisplay name="chart-radar-dots">
        <ChartRadarDots />
      </ChartDisplay>
      <ChartDisplay name="chart-radar-lines-only">
        <ChartRadarLinesOnly />
      </ChartDisplay>
      <ChartDisplay name="chart-radar-multiple">
        <ChartRadarMultiple />
      </ChartDisplay>
      <ChartDisplay name="chart-radar-grid-circle">
        <ChartRadarGridCircle />
      </ChartDisplay>
      <ChartDisplay name="chart-radar-grid-filled">
        <ChartRadarGridFilled />
      </ChartDisplay>
      <ChartDisplay name="chart-radar-grid-none">
        <ChartRadarGridNone />
      </ChartDisplay>
      <ChartDisplay name="chart-radar-legend">
        <ChartRadarLegend />
      </ChartDisplay>
      <ChartDisplay name="chart-radar-label-custom">
        <ChartRadarLabelCustom />
      </ChartDisplay>
    </ChartTypePage>
  );
}
