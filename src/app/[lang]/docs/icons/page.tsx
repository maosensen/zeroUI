import * as icons from "@/components/zero/icons";
import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { CodeBlock } from "../_components/code-block";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";

export const generateMetadata = metadataFor("/docs/icons");

// every export ending in Icon except the factory that makes them
const set = Object.entries(icons).filter(
  ([name]) => name.endsWith("Icon") && name !== "createIcon",
) as [string, typeof icons.CheckIcon][];

const kebab = (name: string) =>
  name
    .replace(/Icon$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

export default async function IconsPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/icons")} />
      <DocHeader
        title="Icons"
        lead="Thirty solid icons drawn for zzzUI on a 24-unit grid, interface glyphs and a few things to carry. Strokes end on the same slant as the slabs, corners are cut, and only things round by nature are curved."
      />
      <DocSection id="install">
        <Prose>
          <p>
            All of them, with an index to import from — or one at a time as{" "}
            <code>@zzzui/icon-search</code>, <code>@zzzui/icon-check</code>…
          </p>
        </Prose>
        <Install item="icons" />
      </DocSection>
      <DocSection id="set" title="The set">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] gap-3">
          {set.map(([name, Icon]) => (
            <li
              key={name}
              className="grid justify-items-center gap-3 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void px-3 pt-5 pb-3"
            >
              <Icon className="size-8 text-zero-text" />
              <span className="grid justify-items-center gap-0.5 text-center">
                <span className="font-bold font-zero text-zero-sm italic">
                  {name}
                </span>
                <span className="font-mono text-[0.7rem] text-zero-text-3">
                  icon-{kebab(name)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <Prose>
          <p>
            An icon is <code>1.25em</code> square and takes the text colour, so
            inside a button, a tab or an input it sizes and colours itself.
            Decorative by default; give it a <code>title</code> when it stands
            alone and means something.
          </p>
        </Prose>
        <CodeBlock
          code={`import { Button } from "@/components/zero/button";
import { ArrowRightIcon, AlertIcon } from "@/components/zero/icons";

<Button variant="secondary">
  Next job
  <ArrowRightIcon />
</Button>

<AlertIcon title="Overdue" className="text-zero-danger" />`}
        />
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Every icon"
          rows={[
            {
              name: "title",
              type: "string",
              description:
                'Makes the icon meaningful on its own: role="img", named by the title.',
            },
            {
              name: "outline",
              type: "boolean",
              default: "false",
              description:
                "An ink outline around the whole shape, for an icon on the accent or on an image.",
            },
            {
              name: "className",
              type: "string",
              description:
                "A size-* class overrides the 1.25em; a text-* class sets the colour.",
            },
          ]}
        />
        <PropsTable
          part="createIcon(name, shape)"
          rows={[
            {
              name: "shape.d",
              type: "string",
              description: "The path, on the 24-unit grid.",
            },
            {
              name: "shape.fillRule",
              type: '"nonzero" | "evenodd"',
              default: '"nonzero"',
              description: "evenodd turns overlapping paths into holes.",
            },
            {
              name: "shape.cut",
              type: "string",
              description:
                "A region taken out of d, for an opening a fill rule cannot make.",
            },
            {
              name: "shape.over",
              type: "string",
              description: "Drawn on top after the cut.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
