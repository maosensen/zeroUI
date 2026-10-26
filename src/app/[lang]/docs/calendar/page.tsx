import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CalendarShift from "../_demos/calendar-shift";

export const generateMetadata = metadataFor("/docs/calendar");

export default async function CalendarPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/calendar")} />
      <DocHeader
        title="Calendar"
        lead={pick({
          en: "A month to pick dates from, every day a small slab cut on both sides, so a week is a row of nesting parallelograms.",
          zh: "按月展示的日期选择器。每一天都是两端带切角的小号斜切块，一周便是一行彼此嵌合的平行四边形。",
        })}
      />
      <DocSection id="install">
        <Install item="calendar" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="calendar-shift"
          title={pick({
            en: "One day, and a range with month and year menus",
            zh: "单日，以及带年月下拉菜单的日期范围",
          })}
        >
          <CalendarShift />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The chosen day fills with the accent; a range is its two ends
                  in the accent with the days between on the raised grey.
                  Today's number is in the accent and underlined. Arrow keys
                  move between days.
                </p>
                <p>
                  It is react-day-picker underneath, so every DayPicker prop
                  works: <code>mode</code>, <code>selected</code>,{" "}
                  <code>disabled</code>, <code>numberOfMonths</code>,{" "}
                  <code>locale</code>. It reads the current date to mark today,
                  so with Next's cacheComponents render it inside a{" "}
                  <code>Suspense</code> boundary, as the example does.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  选中的日期以强调色填充；选择范围时，首尾两天为强调色，中间各天为浮起色。今天的日期数字为强调色，并带下划线。按方向键可在日期之间移动焦点。
                </p>
                <p>
                  底层是 react-day-picker，DayPicker 的所有属性均可使用：
                  <code>mode</code>、<code>selected</code>、
                  <code>disabled</code>、<code>numberOfMonths</code>、
                  <code>locale</code>。组件需要读取当前日期来标记今天，因此启用
                  Next 的 cacheComponents 时，应将其渲染在 <code>Suspense</code>{" "}
                  边界内，示例即是如此。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Calendar"
          rows={[
            {
              name: "mode",
              type: '"single" | "multiple" | "range"',
              description: pick({
                en: "What can be chosen.",
                zh: "选择方式。",
              }),
            },
            {
              name: "captionLayout",
              type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
              default: '"label"',
              description: pick({
                en: "The month's name, or menus to jump.",
                zh: "显示月份名称，或用于跳转的下拉菜单。",
              }),
            },
            {
              name: "showOutsideDays",
              type: "boolean",
              default: "true",
              description: pick({
                en: "Days of the months before and after, in grey.",
                zh: "以灰色显示前后月份的日期。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
