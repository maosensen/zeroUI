import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CardJob from "../_demos/card-job";

export const generateMetadata = metadataFor("/docs/card");

export default async function CardPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/card")} />
      <DocHeader
        title="Card"
        lead={pick({
          en: "A box of related things set into the page: a black header bar for the title and an action, the content, and a footer divided by a quiet line.",
          zh: "嵌入页面、收纳一组相关内容的方框：黑色标题栏放置标题与操作，其下为正文，页脚以一道暗色细线隔开。",
        })}
      />
      <DocSection id="install">
        <Install item="card" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="card-job"
          title={pick({ en: "A job with its reward", zh: "附带报酬的委托" })}
        >
          <CardJob />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  It is square-cornered, like everything whose height depends on
                  what it holds. A picture as its first child runs edge to edge.
                  A card with no header is a plain box.
                </p>
                <p>
                  Pass <code>interactive</code> to a card that is a link or
                  opens something: pointing at it lifts its outline to the
                  accent, and a focused control inside lifts it to the focus
                  yellow.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  卡片为直角，与所有高度随内容而定的元素一致。作为第一个子元素的图片会铺满整个宽度，不留边距。不带标题栏的卡片即一个普通方框。
                </p>
                <p>
                  卡片本身是链接，或点击后会打开其他内容时，传入{" "}
                  <code>interactive</code>
                  ：指针悬停时，描边变为强调色；卡片内的控件获得焦点时，描边变为焦点框的黄色。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Card"
          rows={[
            {
              name: "rarity",
              type: '"common" | "uncommon" | "rare" | "epic" | "legendary"',
              description: pick({
                en: "Colours it by tier (see Rarity).",
                zh: "按稀有度档位着色（见 Rarity）。",
              }),
            },
            {
              name: "interactive",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Lights the outline on hover and when something inside has keyboard focus.",
                zh: "悬停时，或内部元素获得键盘焦点时，描边高亮。",
              }),
            },
          ]}
        />
        <PropsTable
          part="CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
