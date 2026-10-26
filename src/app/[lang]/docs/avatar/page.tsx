import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "A face, or initials when there is no picture: round, with an ink ring and a quiet line outside it, in the three control heights.",
          zh: "显示人物头像，无图片时显示姓名首字母。呈圆形，外围有一圈墨黑色的环，最外侧再加一道暗色细线；尺寸对应三种控件高度。",
        })}
      />
      <DocSection id="install">
        <Install item="avatar" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="avatar-kinds"
          title={pick({
            en: "A picture, initials, a group",
            zh: "图片、首字母与头像组",
          })}
        >
          <AvatarKinds />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Round is the one radius zzzUI allows, kept for things round by
                  nature. Initials show while the picture loads and if it fails.
                </p>
                <p>
                  AvatarBadge puts a status dot on the edge, the accent unless
                  you colour it. AvatarGroup overlaps several, and
                  AvatarGroupCount says how many more.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  圆形是 zzzUI
                  唯一允许的圆角，仅用于本身就是圆形的事物。图片加载期间及加载失败时显示首字母。
                </p>
                <p>
                  AvatarBadge
                  在边缘放置一个状态圆点，默认为强调色，可另行指定颜色。AvatarGroup
                  将多个头像重叠排列，AvatarGroupCount 显示其余头像的数量。
                </p>
              </>
            ),
          })}
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
              description: pick({
                en: "32, 40 or 52 px: the control heights.",
                zh: "32、40 或 52 px，即控件高度。",
              }),
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
