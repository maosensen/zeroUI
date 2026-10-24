import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SelectBasic from "../_demos/select-basic";
import SelectField from "../_demos/select-field";
import SelectGroups from "../_demos/select-groups";

export const metadata = pageMetadata("/docs/select");

const select = { href: "https://base-ui.com/react/components/select" };

export default function SelectPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/select")} />
      <DocHeader
        title="Select"
        lead="The trigger is the same inset well as Input. The list drops from it in a square box lifted by a double outline; the highlighted row fills with the accent."
      />
      <DocSection id="install" title="Install">
        <Install item="select" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="select-basic" title="Basic">
          <SelectBasic />
        </Demo>
        <Demo file="select-groups" title="Groups, a separator, a disabled row">
          <SelectGroups />
        </Demo>
        <Demo file="select-field" title="In a Field">
          <SelectField />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The popup grows out of the trigger in 240 ms and folds away in 140
            ms. It always drops below (or above, if there is no room) rather
            than laying the chosen row over the trigger, so a long list scrolls
            inside it.
          </p>
          <p>
            Pass <code>items</code> to <code>Select</code> (value to label) so
            the trigger can show the chosen label before the list has ever
            opened.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Select"
          base={{ name: "Select.Root", ...select }}
          rows={[
            {
              name: "items",
              type: "Record<string, ReactNode>",
              description: "Labels by value, for the trigger.",
            },
          ]}
        />
        <PropsTable
          part="SelectTrigger"
          base={{ name: "Select.Trigger", ...select }}
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "32, 40 or 52 px tall.",
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: "Which edges of the well are cut on the slant.",
            },
          ]}
        />
        <PropsTable
          part="SelectValue"
          base={{ name: "Select.Value", ...select }}
          rows={[
            {
              name: "placeholder",
              type: "ReactNode",
              description: "Shown, in italic grey, until something is chosen.",
            },
          ]}
        />
        <PropsTable
          part="SelectContent"
          base={{ name: "Select.Popup", ...select }}
          rows={[
            {
              name: "side",
              type: '"bottom" | "top" | "left" | "right"',
              default: '"bottom"',
              description: "Where the popup opens from the trigger.",
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"start"',
              description: "How it lines up with the trigger.",
            },
          ]}
        />
        <PropsTable
          part="SelectItem"
          base={{ name: "Select.Item", ...select }}
          rows={[]}
        />
        <PropsTable
          part="SelectGroup, SelectLabel, SelectSeparator"
          base={{ name: "Select.Group", ...select }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
