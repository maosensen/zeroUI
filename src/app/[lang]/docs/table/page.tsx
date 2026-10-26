import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TableJobs from "../_demos/table-jobs";

export const generateMetadata = metadataFor("/docs/table");

export default async function TablePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/table")} />
      <DocHeader
        title="Table"
        lead="Rows of data in a square-cornered box: column heads on a black bar in small leaning capitals, cells in the text face, quiet lines between rows."
      />
      <DocSection id="install">
        <Install item="table" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="table-jobs" title="Jobs with a total">
          <TableJobs />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            A row lights under the pointer. Mark a selected row with{" "}
            <code>data-state="selected"</code> or <code>aria-selected</code>: it
            keeps the light and carries the accent on its start edge.
          </p>
          <p>
            The box scrolls sideways when the table is wider than it. Give
            figures <code>text-right tabular-nums</code> so they line up. It is
            a plain HTML table: sorting and selection are yours to wire.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
