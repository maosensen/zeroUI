import AlertDialogAbandon from "@/app/[lang]/docs/_demos/alert-dialog-abandon";
import DrawerRoute from "@/app/[lang]/docs/_demos/drawer-route";
import NavigationMenuSite from "@/app/[lang]/docs/_demos/navigation-menu-site";

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

/** More overlays: alert dialog, drawer, navigation menu (the docs' demos). */
export function MoreOverlaysSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">More overlays</h2>
      <div>
        <Row label="navigation">
          <NavigationMenuSite />
        </Row>
        <Row label="alert dialog">
          <AlertDialogAbandon />
        </Row>
        <Row label="drawer">
          <DrawerRoute />
        </Row>
      </div>
    </section>
  );
}
