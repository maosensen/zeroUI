import ComboboxDistricts from "@/app/docs/_demos/combobox-districts";
import FormHook from "@/app/docs/_demos/form-hook";
import FormJob from "@/app/docs/_demos/form-job";
import SidebarVariants from "@/app/docs/_demos/sidebar-variants";

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
      <div className="flex flex-wrap items-start gap-10">{children}</div>
    </div>
  );
}

/** Form, Combobox chips, Sidebar variants (the docs' demos). */
export function RemainderSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">
        Forms, chips, sidebar variants
      </h2>
      <div>
        <Row label="form">
          <FormJob />
          <FormHook />
        </Row>
        <Row label="combobox chips">
          <ComboboxDistricts />
        </Row>
        <Row label="sidebar variants">
          <SidebarVariants />
        </Row>
      </div>
    </section>
  );
}
