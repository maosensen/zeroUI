import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import InputGroupReward from "../_demos/input-group-reward";

export const metadata = pageMetadata("/docs/input-group");

export default function InputGroupPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/input-group")} />
      <DocHeader
        title="Input group"
        lead="Input's well, taken apart: an input with addons at either end, text, icons, keys or small buttons, in any number."
      />
      <DocSection id="install" title="Install">
        <Install item="input-group" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo
          file="input-group-reward"
          title="A unit and a button, an icon and a key"
        >
          <InputGroupReward />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The well behaves like Input's: the focus frame, the invalid outline,
            the disabled fill, which follows the input alone: a Send button
            disabled while nothing is written leaves the well as it is. An end
            that holds an addon takes the input's padding. For a single icon or
            action, Input's own <code>start</code> and <code>end</code> are
            shorter.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="InputGroup"
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Input's heights.",
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: "Which edges are cut on the slant.",
            },
          ]}
        />
        <PropsTable
          part="InputGroupAddon"
          rows={[
            {
              name: "align",
              type: '"start" | "end"',
              default: '"start"',
              description: "Which end it sits at.",
            },
          ]}
        />
        <PropsTable
          part="InputGroupInput, InputGroupText, InputGroupButton"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
