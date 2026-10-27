import { ChartTooltipDefault } from "@/components/charts/chart-tooltip-default";
import { ChartTooltipFormatter } from "@/components/charts/chart-tooltip-formatter";
import { ChartTooltipIcons } from "@/components/charts/chart-tooltip-icons";
import { ChartTooltipIndicatorLine } from "@/components/charts/chart-tooltip-indicator-line";
import { ChartTooltipIndicatorNone } from "@/components/charts/chart-tooltip-indicator-none";
import { ChartTooltipLabelCustom } from "@/components/charts/chart-tooltip-label-custom";
import { ChartTooltipLabelFormatter } from "@/components/charts/chart-tooltip-label-formatter";
import { enter, type LangProps } from "@/lib/i18n/server";
import { metadataFor } from "@/seo/site";
import { ChartDisplay } from "../_components/chart-display";
import { ChartTypePage } from "../_components/chart-page";

export const generateMetadata = metadataFor("/docs/charts/tooltip");

export default async function ChartTooltipsPage({ params }: LangProps) {
  await enter(params);
  return (
    <ChartTypePage path="/docs/charts/tooltip">
      <ChartDisplay name="chart-tooltip-default">
        <ChartTooltipDefault />
      </ChartDisplay>
      <ChartDisplay name="chart-tooltip-indicator-line">
        <ChartTooltipIndicatorLine />
      </ChartDisplay>
      <ChartDisplay name="chart-tooltip-indicator-none">
        <ChartTooltipIndicatorNone />
      </ChartDisplay>
      <ChartDisplay name="chart-tooltip-label-custom">
        <ChartTooltipLabelCustom />
      </ChartDisplay>
      <ChartDisplay name="chart-tooltip-label-formatter">
        <ChartTooltipLabelFormatter />
      </ChartDisplay>
      <ChartDisplay name="chart-tooltip-formatter">
        <ChartTooltipFormatter />
      </ChartDisplay>
      <ChartDisplay name="chart-tooltip-icons">
        <ChartTooltipIcons />
      </ChartDisplay>
    </ChartTypePage>
  );
}
