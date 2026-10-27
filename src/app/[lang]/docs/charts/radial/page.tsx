import { ChartRadialGrid } from "@/components/charts/chart-radial-grid";
import { ChartRadialLabel } from "@/components/charts/chart-radial-label";
import { ChartRadialShape } from "@/components/charts/chart-radial-shape";
import { ChartRadialSimple } from "@/components/charts/chart-radial-simple";
import { ChartRadialStacked } from "@/components/charts/chart-radial-stacked";
import { ChartRadialText } from "@/components/charts/chart-radial-text";
import { enter, type LangProps } from "@/lib/i18n/server";
import { metadataFor } from "@/seo/site";
import { ChartDisplay } from "../_components/chart-display";
import { ChartTypePage } from "../_components/chart-page";

export const generateMetadata = metadataFor("/docs/charts/radial");

export default async function RadialchartsPage({ params }: LangProps) {
  await enter(params);
  return (
    <ChartTypePage path="/docs/charts/radial">
      <ChartDisplay name="chart-radial-simple">
        <ChartRadialSimple />
      </ChartDisplay>
      <ChartDisplay name="chart-radial-label">
        <ChartRadialLabel />
      </ChartDisplay>
      <ChartDisplay name="chart-radial-grid">
        <ChartRadialGrid />
      </ChartDisplay>
      <ChartDisplay name="chart-radial-text">
        <ChartRadialText />
      </ChartDisplay>
      <ChartDisplay name="chart-radial-shape">
        <ChartRadialShape />
      </ChartDisplay>
      <ChartDisplay name="chart-radial-stacked">
        <ChartRadialStacked />
      </ChartDisplay>
    </ChartTypePage>
  );
}
