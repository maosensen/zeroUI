import Link from "next/link";
import { ArrowRightIcon } from "@/components/zero/icons";

const entries = [
  {
    href: "/docs/button",
    name: "Button",
    line: "A slab that drops when pressed and springs back.",
  },
  {
    href: "/docs/input",
    name: "Input",
    line: "An inset well, with room for an icon or an action.",
  },
  {
    href: "/docs/field",
    name: "Field",
    line: "Label, help and an error that slides in.",
  },
  {
    href: "/docs/select",
    name: "Select",
    line: "A popup lifted by outline; the row lights up.",
  },
  {
    href: "/docs/textarea",
    name: "Textarea",
    line: "The same well, for several lines; it grows.",
  },
  {
    href: "/docs/checkbox",
    name: "Checkbox",
    line: "A slanted well that fills with the accent.",
  },
  {
    href: "/docs/radio-group",
    name: "Radio group",
    line: "The chosen one holds a slab.",
  },
  {
    href: "/docs/switch",
    name: "Switch",
    line: "A slab that springs to the other end.",
  },
  {
    href: "/docs/slider",
    name: "Slider",
    line: "Slab thumbs on a slanted track; one or two.",
  },
  {
    href: "/docs/tabs",
    name: "Tabs",
    line: "A slab that springs along a slanted track.",
  },
  {
    href: "/docs/dialog",
    name: "Dialog",
    line: "A panel over a dimmed page, a black title bar.",
  },
  {
    href: "/docs/sheet",
    name: "Sheet",
    line: "A dialog that slides in from an edge.",
  },
  {
    href: "/docs/popover",
    name: "Popover",
    line: "A panel beside its trigger.",
  },
  {
    href: "/docs/tooltip",
    name: "Tooltip",
    line: "One line on a light slab.",
  },
  {
    href: "/docs/dropdown-menu",
    name: "Dropdown menu",
    line: "Actions in rows that light up.",
  },
  {
    href: "/docs/alert",
    name: "Alert",
    line: "Four tones, each with its badge.",
  },
  {
    href: "/docs/progress",
    name: "Progress",
    line: "A slanted bar, or a gauge of charges.",
  },
  {
    href: "/docs/skeleton",
    name: "Skeleton",
    line: "Placeholders with a moving glint.",
  },
  {
    href: "/docs/toast",
    name: "Toast",
    line: "Messages that slide in and leave.",
  },
  {
    href: "/docs/card",
    name: "Card",
    line: "A box with a black header bar.",
  },
  {
    href: "/docs/table",
    name: "Table",
    line: "Rows on a hatched surface.",
  },
  {
    href: "/docs/badge",
    name: "Badge",
    line: "A small slanted label.",
  },
  {
    href: "/docs/avatar",
    name: "Avatar",
    line: "A face or initials in an ink ring.",
  },
  {
    href: "/docs/breadcrumb",
    name: "Breadcrumb",
    line: "The way here, between slanted bars.",
  },
  {
    href: "/docs/pagination",
    name: "Pagination",
    line: "Pages as small slabs.",
  },
  {
    href: "/docs/sidebar",
    name: "Sidebar",
    line: "A black strip that folds to icons.",
  },
  {
    href: "/docs/accordion",
    name: "Accordion",
    line: "Sections that open one at a time.",
  },
  {
    href: "/docs/collapsible",
    name: "Collapsible",
    line: "A panel that unfolds in place.",
  },
  {
    href: "/docs/toggle",
    name: "Toggle",
    line: "A slab that stays down.",
  },
  {
    href: "/docs/toggle-group",
    name: "Toggle group",
    line: "Toggles nesting in a row.",
  },
  {
    href: "/docs/separator",
    name: "Separator",
    line: "A quiet line.",
  },
  {
    href: "/docs/command",
    name: "Command",
    line: "Type to find an action.",
  },
  {
    href: "/docs/combobox",
    name: "Combobox",
    line: "A field that suggests as you type.",
  },
  {
    href: "/docs/context-menu",
    name: "Context menu",
    line: "The menu where you right-click.",
  },
  {
    href: "/docs/menubar",
    name: "Menubar",
    line: "Menus on a black bar.",
  },
  {
    href: "/docs/hover-card",
    name: "Hover card",
    line: "A preview behind a link.",
  },
  {
    href: "/docs/icons",
    name: "Icons",
    line: "Nineteen solid glyphs on the same slant.",
  },
];

/** Every component, as a slab that leads to its page. */
export function ComponentIndex() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(({ href, name, line }) => (
        <li key={href}>
          <Link
            href={href}
            className="group slab slab-cut-end flex items-center gap-4 outline-none [--slab-fill:var(--color-zero-raised)] [--slab-h:5.5rem] [--slab-px:1.25rem] hover:[--slab-fill:var(--color-zero-lifted)] focus-visible:[--slab-gap-fill:var(--color-zero-ink)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-line:var(--color-zero-focus)]"
          >
            <span className="grid min-w-0 flex-1 gap-1">
              <span className="font-black font-zero text-zero-lg italic">
                {name}
              </span>
              <span className="font-medium text-zero-sm text-zero-text-2">
                {line}
              </span>
            </span>
            <ArrowRightIcon className="text-zero-text-3 transition-[translate,color] duration-(--zero-dur-fast) ease-(--zero-ease-out) group-hover:translate-x-1 group-hover:text-zero-accent motion-reduce:group-hover:translate-x-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
