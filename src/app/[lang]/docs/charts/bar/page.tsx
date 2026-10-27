import { ChartBarActive } from "@/components/charts/chart-bar-active";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";
import { ChartBarHorizontal } from "@/components/charts/chart-bar-horizontal";
import { ChartBarInteractive } from "@/components/charts/chart-bar-interactive";
import { ChartBarLabel } from "@/components/charts/chart-bar-label";
import { ChartBarLabelCustom } from "@/components/charts/chart-bar-label-custom";
import { ChartBarMixed } from "@/components/charts/chart-bar-mixed";
import { ChartBarMultiple } from "@/components/charts/chart-bar-multiple";
import { ChartBarNegative } from "@/components/charts/chart-bar-negative";
import { ChartBarStacked } from "@/components/charts/chart-bar-stacked";
import { enter, type LangProps } from "@/lib/i18n/server";
import { metadataFor } from "@/seo/site";
import { ChartDisplay } from "../_components/chart-display";
import { ChartTypePage } from "../_components/chart-page";

export const generateMetadata = metadataFor("/docs/charts/bar");

export default async function BarchartsPage({ params }: LangProps) {
  await enter(params);
  return (
    <ChartTypePage path="/docs/charts/bar">
      <ChartDisplay name="chart-bar-interactive" wide>
        <ChartBarInteractive />
      </ChartDisplay>
      <ChartDisplay name="chart-bar-default">
        <ChartBarDefault />
      </ChartDisplay>
      <ChartDisplay name="chart-bar-horizontal">
        <ChartBarHorizontal />
      </ChartDisplay>
      <ChartDisplay name="chart-bar-multiple">
        <ChartBarMultiple />
      </ChartDisplay>
      <ChartDisplay name="chart-bar-stacked">
        <ChartBarStacked />
      </ChartDisplay>
      <ChartDisplay name="chart-bar-label">
        <ChartBarLabel />
      </ChartDisplay>
      <ChartDisplay name="chart-bar-label-custom">
        <ChartBarLabelCustom />
      </ChartDisplay>
      <ChartDisplay name="chart-bar-negative">
        <ChartBarNegative />
      </ChartDisplay>
      <ChartDisplay name="chart-bar-mixed">
        <ChartBarMixed />
      </ChartDisplay>
      <ChartDisplay name="chart-bar-active">
        <ChartBarActive />
      </ChartDisplay>
    </ChartTypePage>
  );
}
