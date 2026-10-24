import type { Metadata } from "next";
import Link from "next/link";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import InputBasic from "../_demos/input-basic";
import InputSizes from "../_demos/input-sizes";
import InputSlots from "../_demos/input-slots";
import InputStates from "../_demos/input-states";

export const metadata: Metadata = {
  title: "Input",
  description:
    "A text field as an inset well, with room for an icon or an action at either end.",
};

export default function InputPage() {
  return (
    <>
      <DocHeader
        title="Input"
        lead="A text field as an inset well: the void for a fill, a quiet outline, the accent for a caret. A click almost anywhere on the slab lands in it."
      />
      <DocSection id="install" title="Install">
        <Install item="input" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="input-basic" title="Basic">
          <InputBasic />
        </Demo>
        <Demo file="input-sizes" title="Sizes">
          <InputSizes />
        </Demo>
        <Demo file="input-slots" title="An icon or an action at either end">
          <InputSlots />
        </Demo>
        <Demo file="input-states" title="Invalid and disabled">
          <InputStates />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Focus draws the selection frame, also while an{" "}
            <code>InputAction</code> inside it has focus. An invalid value turns
            the outline to danger: inside a{" "}
            <Link href="/docs/field">Field</Link> that follows its validation,
            outside one it follows <code>aria-invalid</code>.
          </p>
          <p>
            <code>className</code> styles the frame (its width, its margins);
            every other prop goes to the input itself.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Input"
          base={{
            name: "Input",
            href: "https://base-ui.com/react/components/input",
          }}
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
            {
              name: "start",
              type: "ReactNode",
              description:
                "Before the text: usually an icon. The input gives up its padding on that side.",
            },
            {
              name: "end",
              type: "ReactNode",
              description:
                "After the text: an icon or an InputAction (clear, show the password).",
            },
          ]}
        />
        <PropsTable
          part="InputAction"
          base={{
            name: "Button",
            href: "https://base-ui.com/react/components/button",
          }}
          rows={[
            {
              name: "aria-label",
              type: "string",
              description:
                "Required: the action holds only an icon, so this is its name.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
