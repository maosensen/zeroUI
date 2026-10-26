import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ToastBasic from "../_demos/toast-basic";

export const generateMetadata = metadataFor("/docs/toast");

export default async function ToastPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/toast")} />
      <DocHeader
        title="Toast"
        lead={pick({
          en: "A short message that slides into the bottom-right corner and leaves on its own. It wears Alert's look, lifted by an outline.",
          zh: "滑入右下角、随后自动消失的简短消息。外观沿用 Alert，外加一圈描边，使其浮于页面之上。",
        })}
      />
      <DocSection id="install">
        <Install item="toast" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="toast-basic"
          title={pick({
            en: "Two messages, one with an action",
            zh: "两条消息，其中一条带操作按钮",
          })}
        >
          <ToastBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Wrap the app in ToastProvider once; anywhere inside,{" "}
                  <code>
                    useToast().add(&#123; title, description, type &#125;)
                  </code>{" "}
                  shows one. <code>type</code> is one of Alert's tones, and{" "}
                  <code>actionProps</code> adds a button.
                </p>
                <p>
                  Each leaves after five seconds, held while pointed at or
                  focused. Swipe it right or press its close button to send it
                  away early; the rest close the gap. Three show at once, newest
                  nearest the corner; more wait their turn. They are announced
                  politely as they arrive.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  在应用外层包裹一次 ToastProvider，其内任意位置调用{" "}
                  <code>
                    useToast().add(&#123; title, description, type &#125;)
                  </code>{" "}
                  即可显示一条消息。<code>type</code> 取 Alert 的四种色调之一，
                  <code>actionProps</code> 用于添加按钮。
                </p>
                <p>
                  每条消息在五秒后消失，指针悬停或获得焦点期间暂停计时。向右滑动或点击关闭按钮可提前关闭，其余消息随即补上空位。同时最多显示三条，最新的一条最靠近角落，多出的依次排队。每条消息出现时以
                  polite 方式通知读屏软件。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="ToastProvider"
          base={{
            name: "Toast.Provider",
            href: "https://base-ui.com/react/components/toast",
          }}
          rows={[
            {
              name: "timeout",
              type: "number",
              default: "5000",
              description: pick({
                en: "Milliseconds before a toast leaves; 0 keeps it.",
                zh: "消息消失前的毫秒数；设为 0 则不自动消失。",
              }),
            },
            {
              name: "limit",
              type: "number",
              default: "3",
              description: pick({
                en: "How many show at once.",
                zh: "同时显示的最大数量。",
              }),
            },
          ]}
        />
        <PropsTable
          part="useToast"
          base={{
            name: "useToastManager",
            href: "https://base-ui.com/react/components/toast",
          }}
          rows={[
            {
              name: "add",
              type: "(options) => string",
              description: pick({
                en: "Shows a toast: title, description, type, timeout, actionProps. Returns its id.",
                zh: "显示一条消息，可传入 title、description、type、timeout、actionProps；返回该消息的 id。",
              }),
            },
            {
              name: "close",
              type: "(id?) => void",
              description: pick({
                en: "Closes one toast, or all of them.",
                zh: "关闭指定的一条消息，或全部关闭。",
              }),
            },
            {
              name: "update",
              type: "(id, options) => void",
              description: pick({
                en: "Changes a toast that is showing.",
                zh: "修改正在显示的消息。",
              }),
            },
            {
              name: "promise",
              type: "(promise, options) => Promise",
              description: pick({
                en: "A toast that follows a promise from loading to success or error.",
                zh: "跟随 promise 状态变化的消息：从加载中到成功或出错。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
