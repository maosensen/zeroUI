import AccordionFaq from "@/app/docs/_demos/accordion-faq";
import CollapsibleBasic from "@/app/docs/_demos/collapsible-basic";
import SeparatorBasic from "@/app/docs/_demos/separator-basic";
import ToggleBasic from "@/app/docs/_demos/toggle-basic";
import ToggleGroupDistricts from "@/app/docs/_demos/toggle-group-districts";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-start gap-6 border-zero-line border-t-2 py-5">
      <span className="font-bold font-zero text-zero-sm text-zero-text-2 italic">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

/** The disclosure and toggle family (the docs' demos). */
export function DisclosureSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">Disclosure and toggles</h2>
      <div>
        <Row label="toggle">
          <ToggleBasic />
        </Row>
        <Row label="toggle group">
          <ToggleGroupDistricts />
        </Row>
        <Row label="accordion">
          <AccordionFaq />
        </Row>
        <Row label="collapsible">
          <CollapsibleBasic />
        </Row>
        <Row label="separator">
          <SeparatorBasic />
        </Row>
      </div>
    </section>
  );
}
