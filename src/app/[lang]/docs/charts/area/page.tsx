import { ChartAreaAxes } from "@/components/charts/chart-area-axes";
import { ChartAreaDefault } from "@/components/charts/chart-area-default";
import { ChartAreaGradient } from "@/components/charts/chart-area-gradient";
import { ChartAreaInteractive } from "@/components/charts/chart-area-interactive";
import { ChartAreaLegend } from "@/components/charts/chart-area-legend";
import { ChartAreaLinear } from "@/components/charts/chart-area-linear";
import { ChartAreaStacked } from "@/components/charts/chart-area-stacked";
import { ChartAreaStackedExpand } from "@/components/charts/chart-area-stacked-expand";
import { ChartAreaStep } from "@/components/charts/chart-area-step";
import { enter, type LangProps } from "@/lib/i18n/server";
import { metadataFor } from "@/seo/site";
import { ChartDisplay } from "../_components/chart-display";
import { ChartTypePage } from "../_components/chart-page";

export const generateMetadata = metadataFor("/docs/charts/area");

export default async function AreachartsPage({ params }: LangProps) {
  await enter(params);
  return (
    <ChartTypePage path="/docs/charts/area">
      <ChartDisplay name="chart-area-interactive" wide>
        <ChartAreaInteractive />
      </ChartDisplay>
      <ChartDisplay name="chart-area-default">
        <ChartAreaDefault />
      </ChartDisplay>
      <ChartDisplay name="chart-area-linear">
        <ChartAreaLinear />
      </ChartDisplay>
      <ChartDisplay name="chart-area-step">
        <ChartAreaStep />
      </ChartDisplay>
      <ChartDisplay name="chart-area-stacked">
        <ChartAreaStacked />
      </ChartDisplay>
      <ChartDisplay name="chart-area-stacked-expand">
        <ChartAreaStackedExpand />
      </ChartDisplay>
      <ChartDisplay name="chart-area-gradient">
        <ChartAreaGradient />
      </ChartDisplay>
      <ChartDisplay name="chart-area-legend">
        <ChartAreaLegend />
      </ChartDisplay>
      <ChartDisplay name="chart-area-axes">
        <ChartAreaAxes />
      </ChartDisplay>
    </ChartTypePage>
  );
}
