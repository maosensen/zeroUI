import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ObjectivesShift from "../_demos/objectives-shift";

export const generateMetadata = metadataFor("/docs/objectives");

export default async function ObjectivesPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/objectives")} />
      <DocHeader
        title="Objectives"
        lead="A quest and objective tracker for React: a leaning header over a dark band, a slanted mark per objective, and a strike drawn through what is done."
      />
      <DocSection id="install">
        <Install item="objectives" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="objectives-shift" title="A shift's objectives">
          <ObjectivesShift />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Each objective has a slanted mark: an empty frame while it waits,
            the accent frame while it is the one in hand, the filled accent with
            a check when done, red with a cross when it failed. A done or failed
            title is struck through, the line drawn across from the start. The
            band behind fades out to the right, so it can sit over a map or a
            scene.
          </p>
          <p>
            The state is also said in words to screen readers ("Done:",
            "Current:"). <code>ObjectiveCount</code> sits at the line's end;{" "}
            <code>ObjectiveDescription</code> goes under the title.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Objective"
          rows={[
            {
              name: "state",
              type: '"pending" | "active" | "done" | "failed"',
              default: '"pending"',
              description: "Its mark, and how its title is drawn.",
            },
          ]}
        />
        <PropsTable
          part="Objectives, ObjectivesHeader, ObjectiveTitle, ObjectiveCount, ObjectiveDescription"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
