import { ChartLineDefault } from "@/components/charts/chart-line-default";
import { ChartLineDots } from "@/components/charts/chart-line-dots";
import { ChartLineDotsColors } from "@/components/charts/chart-line-dots-colors";
import { ChartLineInteractive } from "@/components/charts/chart-line-interactive";
import { ChartLineLabel } from "@/components/charts/chart-line-label";
import { ChartLineLabelCustom } from "@/components/charts/chart-line-label-custom";
import { ChartLineLinear } from "@/components/charts/chart-line-linear";
import { ChartLineMultiple } from "@/components/charts/chart-line-multiple";
import { ChartLineStep } from "@/components/charts/chart-line-step";
import { enter, type LangProps } from "@/lib/i18n/server";
import { metadataFor } from "@/seo/site";
import { ChartDisplay } from "../_components/chart-display";
import { ChartTypePage } from "../_components/chart-page";

export const generateMetadata = metadataFor("/docs/charts/line");

export default async function LinechartsPage({ params }: LangProps) {
  await enter(params);
  return (
    <ChartTypePage path="/docs/charts/line">
      <ChartDisplay name="chart-line-interactive" wide>
        <ChartLineInteractive />
      </ChartDisplay>
      <ChartDisplay name="chart-line-default">
        <ChartLineDefault />
      </ChartDisplay>
      <ChartDisplay name="chart-line-linear">
        <ChartLineLinear />
      </ChartDisplay>
      <ChartDisplay name="chart-line-step">
        <ChartLineStep />
      </ChartDisplay>
      <ChartDisplay name="chart-line-multiple">
        <ChartLineMultiple />
      </ChartDisplay>
      <ChartDisplay name="chart-line-dots">
        <ChartLineDots />
      </ChartDisplay>
      <ChartDisplay name="chart-line-dots-colors">
        <ChartLineDotsColors />
      </ChartDisplay>
      <ChartDisplay name="chart-line-label">
        <ChartLineLabel />
      </ChartDisplay>
      <ChartDisplay name="chart-line-label-custom">
        <ChartLineLabelCustom />
      </ChartDisplay>
    </ChartTypePage>
  );
}
