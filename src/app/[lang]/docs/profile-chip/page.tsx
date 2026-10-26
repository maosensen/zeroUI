import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ProfileChipBasic from "../_demos/profile-chip-basic";

export const generateMetadata = metadataFor("/docs/profile-chip");

export default async function ProfileChipPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/profile-chip")} />
      <DocHeader
        title="Profile chip"
        lead="A player profile chip for React: avatar, name, an experience bar with the points on it, and the level, on one slab cut on both sides."
      />
      <DocSection id="install">
        <Install item="profile-chip" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="profile-chip-basic" title="Earning experience">
          <ProfileChipBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            A slab of fixed height, cut on both sides, holding the avatar, the
            name over a thin experience bar in the rare blue with the points
            written on it, and the level big and leaning with LEVEL under it.
            The bar eases to its new length on the slow timing.
          </p>
          <p>
            Screen readers get one sentence instead of the parts: "Wren, level
            8, 685 of 790 experience".
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="ProfileChip"
          rows={[
            {
              name: "name",
              type: "string",
              description: "Who.",
            },
            {
              name: "level",
              type: "number",
              description: "Their level.",
            },
            {
              name: "xp / xpMax",
              type: "number",
              description: "Experience so far, and to the next level.",
            },
            {
              name: "avatar",
              type: "ReactNode",
              description: "An Avatar.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
