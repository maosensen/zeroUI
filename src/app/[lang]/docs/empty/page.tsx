import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import EmptyBoard from "../_demos/empty-board";

export const generateMetadata = metadataFor("/docs/empty");

export default async function EmptyPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/empty")} />
      <DocHeader
        title="Empty"
        lead="What a place shows when it has nothing in it yet: a mark in a slanted black well, a leaning title, a line of explanation, and the action that fills it."
      />
      <DocSection id="install">
        <Install item="empty" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="empty-board" title="A district with no jobs">
          <EmptyBoard />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            It centres itself in the room it is given. Give it a dashed outline
            with <code>className</code> when it stands for a drop zone or a
            slot.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
