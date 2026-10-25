import ComboboxDistrict from "@/app/docs/_demos/combobox-district";
import CommandPalette from "@/app/docs/_demos/command-palette";
import ContextMenuJob from "@/app/docs/_demos/context-menu-job";
import HoverCardDriver from "@/app/docs/_demos/hover-card-driver";
import MenubarDispatch from "@/app/docs/_demos/menubar-dispatch";

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

/** The commands family (the docs' demos). */
export function CommandsSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">Commands</h2>
      <div>
        <Row label="command">
          <CommandPalette />
        </Row>
        <Row label="combobox">
          <ComboboxDistrict />
        </Row>
        <Row label="menubar">
          <MenubarDispatch />
        </Row>
        <Row label="context menu">
          <ContextMenuJob />
        </Row>
        <Row label="hover card">
          <HoverCardDriver />
        </Row>
      </div>
    </section>
  );
}
