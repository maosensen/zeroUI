import { ChartPieDonut } from "@/components/charts/chart-pie-donut";
import { ChartPieDonutActive } from "@/components/charts/chart-pie-donut-active";
import { ChartPieDonutText } from "@/components/charts/chart-pie-donut-text";
import { ChartPieInteractive } from "@/components/charts/chart-pie-interactive";
import { ChartPieLabel } from "@/components/charts/chart-pie-label";
import { ChartPieLabelList } from "@/components/charts/chart-pie-label-list";
import { ChartPieLegend } from "@/components/charts/chart-pie-legend";
import { ChartPieSimple } from "@/components/charts/chart-pie-simple";
import { ChartPieStacked } from "@/components/charts/chart-pie-stacked";
import { enter, type LangProps } from "@/lib/i18n/server";
import { metadataFor } from "@/seo/site";
import { ChartDisplay } from "../_components/chart-display";
import { ChartTypePage } from "../_components/chart-page";

export const generateMetadata = metadataFor("/docs/charts/pie");

export default async function PiechartsPage({ params }: LangProps) {
  await enter(params);
  return (
    <ChartTypePage path="/docs/charts/pie">
      <ChartDisplay name="chart-pie-simple">
        <ChartPieSimple />
      </ChartDisplay>
      <ChartDisplay name="chart-pie-label">
        <ChartPieLabel />
      </ChartDisplay>
      <ChartDisplay name="chart-pie-label-list">
        <ChartPieLabelList />
      </ChartDisplay>
      <ChartDisplay name="chart-pie-legend">
        <ChartPieLegend />
      </ChartDisplay>
      <ChartDisplay name="chart-pie-donut">
        <ChartPieDonut />
      </ChartDisplay>
      <ChartDisplay name="chart-pie-donut-active">
        <ChartPieDonutActive />
      </ChartDisplay>
      <ChartDisplay name="chart-pie-donut-text">
        <ChartPieDonutText />
      </ChartDisplay>
      <ChartDisplay name="chart-pie-stacked">
        <ChartPieStacked />
      </ChartDisplay>
      <ChartDisplay name="chart-pie-interactive">
        <ChartPieInteractive />
      </ChartDisplay>
    </ChartTypePage>
  );
}
