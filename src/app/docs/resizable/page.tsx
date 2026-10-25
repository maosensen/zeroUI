import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ResizablePanes from "../_demos/resizable-panes";

export const metadata = pageMetadata("/docs/resizable");

export default function ResizablePage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/resizable")} />
      <DocHeader
        title="Resizable"
        lead="Panels whose shared edge can be dragged: the quiet line, lit with the accent while pointed at or dragged."
      />
      <DocSection id="install" title="Install">
        <Install item="resizable" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="resizable-panes" title="Three panes">
          <ResizablePanes />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The grip is wider than the line. From the keyboard, focus the edge
            and use the arrow keys. <code>withHandle</code> puts a slanted grip
            on it. It is react-resizable-panels underneath: sizes take pixels or
            percentages, and groups nest.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="ResizablePanelGroup"
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Which way the panels sit.",
            },
          ]}
        />
        <PropsTable
          part="ResizablePanel"
          rows={[
            {
              name: "defaultSize / minSize / maxSize",
              type: "number | string",
              description: "Pixels, or a percentage as a string.",
            },
          ]}
        />
        <PropsTable
          part="ResizableHandle"
          rows={[
            {
              name: "withHandle",
              type: "boolean",
              default: "false",
              description: "A slanted grip on the edge.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
