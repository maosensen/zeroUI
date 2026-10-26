import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import FormHook from "../_demos/form-hook";
import FormJob from "../_demos/form-job";

export const generateMetadata = metadataFor("/docs/form");

export default async function FormPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/form")} />
      <DocHeader
        title="Form"
        lead={pick({
          en: "The frame around Fields: Base UI's form, which validates every Field on submit and shows errors handed back from the server, with fieldsets under leaning legends.",
          zh: "承载各个 Field 的表单外框，基于 Base UI 的 Form：提交时校验所有 Field，并显示服务器返回的错误；字段可按组归入带倾斜标题的 Fieldset。",
        })}
      />
      <DocSection id="install">
        <Install item="form" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="form-job"
          title={pick({
            en: "Post a job, with an error from the server",
            zh: "发布职位，含服务器返回的错误",
          })}
        >
          <FormJob />
        </Demo>
        <Demo
          file="form-hook"
          title={pick({
            en: "With react-hook-form and zod",
            zh: "搭配 react-hook-form 与 zod",
          })}
        >
          <FormHook />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Form collects every Field's value and runs their validation on
                  submit; <code>errors</code>, keyed by each Field's{" "}
                  <code>name</code>, puts a server's messages in the Fields'
                  FieldError. Fieldset groups Fields under a legend led by a
                  slanted sliver; disabling it disables everything inside.
                  FormActions is the row of buttons at the end.
                </p>
                <p>
                  With react-hook-form, wire each control through its Controller
                  and give the Field <code>invalid</code> and the FieldError{" "}
                  <code>match</code> from the field's state, as in the second
                  example.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  提交时，Form 收集每个 Field 的值，并执行各自的校验。
                  <code>errors</code> 以各 Field 的 <code>name</code>{" "}
                  为键，把服务器返回的信息填入对应 Field 的 FieldError。Fieldset
                  将多个 Field 归为一组，组标题前有一道细长的斜切条；禁用
                  Fieldset 会禁用组内所有控件。FormActions 是表单末尾的按钮行。
                </p>
                <p>
                  搭配 react-hook-form 时，每个控件通过各自的 Controller
                  接入，并根据字段状态为 Field 设置 <code>invalid</code>、为
                  FieldError 设置 <code>match</code>，写法见第二个示例。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Form"
          base={{
            name: "Form",
            href: "https://base-ui.com/react/components/form",
          }}
          rows={[
            {
              name: "errors",
              type: "Record<string, string | string[]>",
              description: pick({
                en: "Messages from the server, by field name.",
                zh: "服务器返回的错误信息，按字段名索引。",
              }),
            },
            {
              name: "onFormSubmit",
              type: "(values) => void",
              description: pick({
                en: "Called with every Field's value once they are all valid.",
                zh: "所有 Field 均通过校验后调用，参数为各 Field 的值。",
              }),
            },
          ]}
        />
        <PropsTable
          part="Fieldset, FieldsetLegend"
          base={{
            name: "Fieldset.Root",
            href: "https://base-ui.com/react/components/fieldset",
          }}
          rows={[
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Disables every control inside.",
                zh: "禁用组内所有控件。",
              }),
            },
          ]}
        />
        <PropsTable part="FormActions" rows={[]} />
      </DocSection>
    </>
  );
}
