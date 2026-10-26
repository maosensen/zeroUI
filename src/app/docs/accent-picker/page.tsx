import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AccentPickerPreview from "../_demos/accent-picker-preview";

export const metadata = pageMetadata("/docs/accent-picker");

export default function AccentPickerPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/accent-picker")} />
      <DocHeader
        title="Accent picker"
        lead="A theme colour picker for React in a small button: the accent in use as a swatch, opening on twelve presets and a colour of your own, kept legible and remembered across visits."
      />
      <DocSection id="install" title="Install">
        <Install item="accent-picker" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo
          file="accent-picker-preview"
          title="Recolouring one part of a page"
        >
          <AccentPickerPreview />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The button shows the accent in use as a slanted swatch and opens a
            popover: the presets as a grid of swatches (a radio group, so the
            arrow keys move between them) and, under them, a colour of your own,
            from the colour well or typed as hex. The site&apos;s header has
            one.
          </p>
          <p>
            A colour of your own is applied as you pick it, but only if ink text
            reads on it at 7 : 1 or more, the floor every preset meets: buttons,
            badges and the active tab all set ink on the accent. A darker colour
            is refused, and the note under the field says so with its ratio; the
            note is a polite live region, so it is heard too. Hover and pressed
            shades are mixed from the colour by the foundation. It is written as{" "}
            <code>data-zero-accent=&quot;custom&quot;</code> with the colour
            inline, and remembered like a preset.
          </p>
          <p>
            It keeps and writes the accent exactly as the{" "}
            <a href="/docs/accent-switch">Accent switch</a> does, with the same{" "}
            <code>target</code>, <code>storageKey</code> and controlled{" "}
            <code>value</code>, so the two can share a page, and{" "}
            <code>AccentScript</code> in <code>&lt;head&gt;</code> puts a
            remembered colour on the page before it paints. Use the switch where
            there is room for a row of swatches and no need for a colour of your
            own.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="AccentPicker"
          rows={[
            {
              name: "value / defaultValue / onValueChange",
              type: 'AccentPreset | "#rrggbb"',
              default: '"lime"',
              description: "The accent, controlled or not.",
            },
            {
              name: "accents",
              type: "AccentPreset[]",
              default: "all twelve",
              description: "Which presets to offer.",
            },
            {
              name: "custom",
              type: "boolean",
              default: "true",
              description: "Offer a colour of your own.",
            },
            {
              name: "target",
              type: "() => HTMLElement | null",
              default: "<html>",
              description: "Where data-zero-accent is written.",
            },
            {
              name: "storageKey",
              type: "string | null",
              default: '"zero-accent"',
              description: "Where the choice is remembered; null to forget it.",
            },
            {
              name: "side / align",
              type: "Popover's",
              default: '"bottom" / "end"',
              description: "Where the popover opens.",
            },
            {
              name: "aria-label",
              type: "string",
              default: '"Accent colour"',
              description: "The button's name, followed by the accent in use.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
