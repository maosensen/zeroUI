import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AccentSwitchPreview from "../_demos/accent-switch-preview";

export const metadata = pageMetadata("/docs/accent-switch");

export default function AccentSwitchPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/accent-switch")} />
      <DocHeader
        title="Accent switch"
        lead="Switch zzzUI's accent colour at runtime: twelve presets that keep ink readable on them, chosen with a row of swatches and remembered across visits."
      />
      <DocSection id="install" title="Install">
        <Install item="accent-switch" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo
          file="accent-switch-preview"
          title="Five presets, recolouring one part of a page"
        >
          <AccentSwitchPreview />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The presets are in the foundation: set <code>data-zero-accent</code>{" "}
            to <code>lime</code> (the default), <code>cyan</code>,{" "}
            <code>magenta</code>, <code>amber</code>, <code>mint</code>,{" "}
            <code>sky</code>, <code>violet</code>, <code>mono</code>,{" "}
            <code>yellow</code>, <code>leaf</code>, <code>iris</code> or{" "}
            <code>orchid</code> on <code>&lt;html&gt;</code> for the whole page,
            or on any element for what is inside it. Each keeps ink text on it
            at 7 : 1 or more (magenta, the darkest, is 7 : 1). Red stays out,
            since it means danger. Yellow sits near the focus frame&apos;s
            yellow, as lime does; the frame keeps an ink gap inside it, so it
            still shows on an accent fill. Several sit near a rarity tier&apos;s
            hue: on a screen that shows rarity, prefer lime, cyan, magenta, leaf
            or mono, so a tier is never mistaken for the accent.
          </p>
          <p>
            AccentSwitch writes that attribute (on <code>&lt;html&gt;</code>, or
            on <code>target</code>) and remembers the choice in localStorage
            under <code>storageKey</code>; pass <code>null</code> to keep it to
            this page view. It is a radio group: the arrow keys move between the
            swatches, and each is named. <code>accents</code> picks which
            presets the row offers. Put <code>AccentScript</code> in{" "}
            <code>&lt;head&gt;</code> so a remembered accent is on the page
            before it paints. For all twelve in little room, or a colour of your
            own, use the <a href="/docs/accent-picker">Accent picker</a>; the
            two keep the accent the same way.
          </p>
          <p>
            Corners are not switchable: zzzUI cuts, it does not round. The
            nearest knob is the slant, <code>--zero-slant</code>; at{" "}
            <code>0deg</code> every cut becomes a square corner (see{" "}
            <a href="/docs/guides/theme-tokens">Theme zzzUI with its tokens</a>
            ).
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="AccentSwitch"
          rows={[
            {
              name: "value / defaultValue / onValueChange",
              type: 'AccentPreset | "#rrggbb"',
              default: '"lime"',
              description:
                "The accent, controlled or not: a preset's name, or a colour of your own (which checks no swatch).",
            },
            {
              name: "accents",
              type: "AccentPreset[]",
              default: "all twelve",
              description: "Which presets the row offers.",
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
              name: "aria-label",
              type: "string",
              default: '"Accent colour"',
              description: "The group's name.",
            },
          ]}
        />
        <PropsTable
          part="AccentScript"
          rows={[
            {
              name: "storageKey",
              type: "string",
              default: '"zero-accent"',
              description: "The same key as the switch.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
