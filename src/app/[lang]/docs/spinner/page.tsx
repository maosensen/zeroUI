import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SpinnerBasic from "../_demos/spinner-basic";

export const generateMetadata = metadataFor("/docs/spinner");

export default async function SpinnerPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/spinner")} />
      <DocHeader
        title="Spinner"
        lead={pick({
          en: "The spinner icon, turning: half a waiting loop a turn, in the colour and size of the text beside it.",
          zh: "旋转的加载图标：每 800 ms 转一圈（等待类循环动画时长的一半），颜色与尺寸跟随旁边的文字。",
        })}
      />
      <DocSection id="install">
        <Install item="spinner" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="spinner-basic"
          title={pick({
            en: "Alone, beside text, in a button",
            zh: "单独使用、置于文字旁、置于按钮内",
          })}
        >
          <SpinnerBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                It announces itself as "Loading"; pass <code>aria-label</code>{" "}
                to say what is loading, or <code>aria-hidden</code> when the
                text beside it already says so. Under reduced motion it holds
                still.
              </p>
            ),
            zh: (
              <p>
                读屏软件会将其读作「Loading」；可传入 <code>aria-label</code>{" "}
                说明正在加载的内容；若旁边的文字已有说明，则传入{" "}
                <code>aria-hidden</code>
                。系统开启「减少动态效果」时，图标保持静止。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Spinner"
          rows={[
            {
              name: "className",
              type: "string",
              description: pick({
                en: "Size it with size-*, colour it with text-*.",
                zh: "用 size-* 设置尺寸，用 text-* 设置颜色。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
