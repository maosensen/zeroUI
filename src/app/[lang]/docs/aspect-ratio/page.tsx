import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AspectRatioMap from "../_demos/aspect-ratio-map";

export const generateMetadata = metadataFor("/docs/aspect-ratio");

export default async function AspectRatioPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/aspect-ratio")} />
      <DocHeader
        title="Aspect ratio"
        lead={pick({
          en: "Keeps its content to a ratio of width to height, so pictures, video and maps do not jump while they load.",
          zh: "让内容保持固定的宽高比，图片、视频与地图在加载过程中不会造成布局跳动。",
        })}
      />
      <DocSection id="install">
        <Install item="aspect-ratio" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="aspect-ratio-map"
          title={pick({ en: "A 16 : 9 map", zh: "16 : 9 的地图" })}
        >
          <AspectRatioMap />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                The content fills it; a picture inside is cropped to cover it.
              </p>
            ),
            zh: <p>内容填满容器；其中的图片会被裁切，以完整覆盖容器。</p>,
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="AspectRatio"
          rows={[
            {
              name: "ratio",
              type: "number",
              default: "16 / 9",
              description: pick({
                en: "Width divided by height.",
                zh: "宽度除以高度。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
