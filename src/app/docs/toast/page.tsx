import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ToastBasic from "../_demos/toast-basic";

export const metadata = pageMetadata("/docs/toast");

export default function ToastPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/toast")} />
      <DocHeader
        title="Toast"
        lead="A short message that slides into the bottom-right corner and leaves on its own. It wears Alert's look, lifted by an outline."
      />
      <DocSection id="install" title="Install">
        <Install item="toast" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="toast-basic" title="Two messages, one with an action">
          <ToastBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Wrap the app in ToastProvider once; anywhere inside,{" "}
            <code>useToast().add(&#123; title, description, type &#125;)</code>{" "}
            shows one. <code>type</code> is one of Alert's tones, and{" "}
            <code>actionProps</code> adds a button.
          </p>
          <p>
            Each leaves after five seconds, held while pointed at or focused.
            Swipe it right or press its close button to send it away early; the
            rest close the gap. Three show at once, newest nearest the corner;
            more wait their turn. They are announced politely as they arrive.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
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
              description: "Milliseconds before a toast leaves; 0 keeps it.",
            },
            {
              name: "limit",
              type: "number",
              default: "3",
              description: "How many show at once.",
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
              description:
                "Shows a toast: title, description, type, timeout, actionProps. Returns its id.",
            },
            {
              name: "close",
              type: "(id?) => void",
              description: "Closes one toast, or all of them.",
            },
            {
              name: "update",
              type: "(id, options) => void",
              description: "Changes a toast that is showing.",
            },
            {
              name: "promise",
              type: "(promise, options) => Promise",
              description:
                "A toast that follows a promise from loading to success or error.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
