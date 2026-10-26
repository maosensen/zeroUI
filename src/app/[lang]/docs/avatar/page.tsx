import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AvatarKinds from "../_demos/avatar-kinds";

export const generateMetadata = metadataFor("/docs/avatar");

export default async function AvatarPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/avatar")} />
      <DocHeader
        title="Avatar"
        lead="A face, or initials when there is no picture: round, with an ink ring and a quiet line outside it, in the three control heights."
      />
      <DocSection id="install">
        <Install item="avatar" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="avatar-kinds" title="A picture, initials, a group">
          <AvatarKinds />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Round is the one radius zzzUI allows, kept for things round by
            nature. Initials show while the picture loads and if it fails.
          </p>
          <p>
            AvatarBadge puts a status dot on the edge, the accent unless you
            colour it. AvatarGroup overlaps several, and AvatarGroupCount says
            how many more.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Avatar"
          base={{
            name: "Avatar.Root",
            href: "https://base-ui.com/react/components/avatar",
          }}
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "32, 40 or 52 px: the control heights.",
            },
          ]}
        />
        <PropsTable
          part="AvatarImage, AvatarFallback"
          base={{
            name: "Avatar.Image",
            href: "https://base-ui.com/react/components/avatar",
          }}
          rows={[]}
        />
        <PropsTable
          part="AvatarBadge, AvatarGroup, AvatarGroupCount"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
