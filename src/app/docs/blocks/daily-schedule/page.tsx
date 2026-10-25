import { DailySchedule } from "@/components/blocks/daily-schedule";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const metadata = pageMetadata("/docs/blocks/daily-schedule");

export default function DailySchedulePage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/daily-schedule")} />
      <DocHeader
        title="Daily schedule"
        lead="A day planner the way a game shows it: four shifts side by side, the one under way framed and marked NOW, past ones dimmed, each with its errands as objectives."
      />
      <DocSection id="install" title="Install">
        <Install item="daily-schedule" />
      </DocSection>
      <DocSection id="preview" title="Preview">
        <Block name="daily-schedule">
          <DailySchedule />
        </Block>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Each shift is a box with its name, hours and errands as{" "}
            <a href="/docs/objectives">Objectives</a>: done ones struck through,
            the current one in the accent with its count. The shift under way is
            framed and marked NOW (and is the list's current item for screen
            readers); those gone by are dimmed.
          </p>
          <p>
            The shifts sit four across, two across, or stacked, by the block's
            own width (a container query).
          </p>
          <p>
            Built from <a href="/docs/objectives">Objectives</a>,{" "}
            <a href="/docs/badge">Badge</a>, <a href="/docs/button">Button</a>.
            It installs those with it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
