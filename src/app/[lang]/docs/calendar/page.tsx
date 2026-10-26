import { enter, type LangProps } from "@/lib/i18n/server";
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
        lead="A month to pick dates from, every day a small slab cut on both sides, so a week is a row of nesting parallelograms."
      />
      <DocSection id="install">
        <Install item="calendar" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="calendar-shift"
          title="One day, and a range with month and year menus"
        >
          <CalendarShift />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            The chosen day fills with the accent; a range is its two ends in the
            accent with the days between on the raised grey. Today's number is
            in the accent and underlined. Arrow keys move between days.
          </p>
          <p>
            It is react-day-picker underneath, so every DayPicker prop works:{" "}
            <code>mode</code>, <code>selected</code>, <code>disabled</code>,{" "}
            <code>numberOfMonths</code>, <code>locale</code>. It reads the
            current date to mark today, so with Next's cacheComponents render it
            inside a <code>Suspense</code> boundary, as the example does.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Calendar"
          rows={[
            {
              name: "mode",
              type: '"single" | "multiple" | "range"',
              description: "What can be chosen.",
            },
            {
              name: "captionLayout",
              type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
              default: '"label"',
              description: "The month's name, or menus to jump.",
            },
            {
              name: "showOutsideDays",
              type: "boolean",
              default: "true",
              description: "Days of the months before and after, in grey.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
