import Link from "next/link";
import { JsonLd } from "@/lib/seo/json-ld";
import { guideGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { CodeBlock } from "../../_components/code-block";
import {
  DocHeader,
  DocSection,
  PropsTable,
  Prose,
} from "../../_components/doc";

export const metadata = pageMetadata("/docs/guides/theme-tokens");

const slant = `:root {
  --zero-slant: 8deg; /* a gentler cut than the default 14deg */
}`;

const accent = `:root {
  --zero-accent: #2ee6d6;
  --zero-accent-hi: color-mix(in oklab, #2ee6d6, white 22%); /* hover */
  --zero-accent-lo: color-mix(in oklab, #2ee6d6, black 18%); /* pressed */
}`;

const preset = `<html lang="en" data-zero-accent="cyan" suppressHydrationWarning>
  <head>
    <AccentScript />  {/* applies a remembered choice before paint */}
  </head>
  …
</html>`;

const speed = `:root {
  /* everything a little quicker */
  --zero-dur-fast: 110ms;
  --zero-dur-base: 190ms;
  --zero-dur-slow: 330ms;
}`;

export default function ThemeTokensGuide() {
  return (
    <>
      <JsonLd data={guideGraph("/docs/guides/theme-tokens", "2026-10-25")} />
      <DocHeader
        title="Theme zzzUI with its tokens"
        lead="zzzUI's look comes from a handful of tokens: one slant angle, three outline weights, one accent and a set of timings. Override them on :root in your own stylesheet and every component follows, with nothing else to edit."
      />

      <DocSection id="where" title="Where the tokens live">
        <Prose>
          <p>
            Installing any zzzUI component writes the foundation into your
            project's main stylesheet: each token is declared once on{" "}
            <code>:root</code> under a <code>--zero-</code> name, and Tailwind's
            theme points at it, so <code>bg-zero-accent</code> reads{" "}
            <code>--zero-accent</code>. To change one, set the same name again
            on <code>:root</code>, after the foundation. Override the{" "}
            <code>--zero-</code> name, not the <code>--color-zero-</code> one:
            the utilities read the first.
          </p>
        </Prose>
        <PropsTable
          part="The main tokens"
          rows={[
            {
              name: "--zero-slant",
              type: "angle",
              default: "14deg",
              description:
                "Every slanted cut: slab edges, the lean of fills and marks.",
            },
            {
              name: "--zero-stroke-thin / --zero-stroke / --zero-stroke-thick",
              type: "length",
              default: "2px / 3px / 4px",
              description: "Outline weights.",
            },
            {
              name: "--zero-accent (-hi, -lo)",
              type: "colour",
              default: "#cde31c",
              description:
                "The one bright colour, with its hover and pressed shades.",
            },
            {
              name: "--zero-focus",
              type: "colour",
              default: "#f2e74b",
              description: "The selection frame around whatever has focus.",
            },
            {
              name: "--zero-dur-fast / -base / -slow",
              type: "time",
              default: "140ms / 240ms / 420ms",
              description: "Hover, release and reveal timings.",
            },
            {
              name: "--zero-rarity-common … -legendary",
              type: "colour",
              default: "",
              description: "The five tiers of worth (see Rarity).",
            },
          ]}
        />
      </DocSection>

      <DocSection id="slant" title="Change the slant">
        <Prose>
          <p>
            Every cut is worked out from <code>--zero-slant</code> and the
            element's height, and every outline is the shape moved inward
            exactly, so a different angle re-cuts buttons, tabs, inputs and
            badges together and their outlines stay even. Lettering keeps its
            own italic, so stay near the default (between 8 and 18 degrees) if
            you want the cuts to sit with the type.
          </p>
        </Prose>
        <CodeBlock code={slant} lang="css" title="globals.css" />
      </DocSection>

      <DocSection id="presets" title="Switch between the accent presets">
        <Prose>
          <p>
            The quickest way to change the accent is a preset: set{" "}
            <code>data-zero-accent</code> to <code>lime</code>,{" "}
            <code>cyan</code> or <code>magenta</code> on{" "}
            <code>&lt;html&gt;</code>, or on any element to recolour only what
            is inside it. The{" "}
            <Link href="/docs/accent-switch">Accent switch</Link> lets visitors
            choose one and remembers it. The presets were picked to keep ink
            readable on them and to stay clear of the colours that already mean
            something: the focus yellow, danger red and the rarity tiers.
          </p>
        </Prose>
        <CodeBlock code={preset} lang="tsx" title="layout.tsx" />
      </DocSection>

      <DocSection id="accent" title="Change the accent">
        <Prose>
          <p>
            The accent is the fill of primary buttons and selected tabs, with
            ink-black text on it, so pick a bright colour that keeps that text
            readable (zzzUI's lime is 13.8 : 1 against ink). Keep it clear of
            the focus yellow, or a focused primary button loses its frame, and
            of the red that means danger. Mix the hover and pressed shades from
            it:
          </p>
        </Prose>
        <CodeBlock code={accent} lang="css" title="globals.css" />
      </DocSection>

      <DocSection id="motion" title="Speed up or slow down the motion">
        <Prose>
          <p>
            Durations are tokens too, so scaling them changes the feel of the
            whole set: presses, popups, tabs sliding, a gauge's trail. Under
            reduced motion zzzUI already drops the decorative ones (the sheen,
            the glitch, the waiting loops) to zero, whatever you set here.
          </p>
        </Prose>
        <CodeBlock code={speed} lang="css" title="globals.css" />
      </DocSection>

      <DocSection id="next" title="Where to go next">
        <Prose>
          <p>
            <Link href="/docs/rarity">Rarity</Link> covers the tier colours and
            where they show; <Link href="/docs/icons">Icons</Link> explains how
            the icons follow the same angle. To see the tokens at work in a
            whole screen, try the <Link href="/docs/blocks">blocks</Link>.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
