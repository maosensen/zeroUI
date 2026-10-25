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
    href: "/docs/input-otp",
    name: "Input OTP",
    line: "A code, a character to a cell.",
  },
  {
    href: "/docs/input-group",
    name: "Input group",
    line: "A well with addons at either end.",
  },
  {
    href: "/docs/button-group",
    name: "Button group",
    line: "Buttons that nest.",
  },
  {
    href: "/docs/native-select",
    name: "Native select",
    line: "The browser's picker in a well.",
  },
  {
    href: "/docs/kbd",
    name: "Kbd",
    line: "A key to press.",
  },
  {
    href: "/docs/label",
    name: "Label",
    line: "A control's name.",
  },
  {
    href: "/docs/alert-dialog",
    name: "Alert dialog",
    line: "Asks before what cannot be undone.",
  },
  {
    href: "/docs/drawer",
    name: "Drawer",
    line: "A sheet you can swipe away.",
  },
  {
    href: "/docs/navigation-menu",
    name: "Navigation menu",
    line: "Menus sharing one sliding panel.",
  },
  {
    href: "/docs/item",
    name: "Item",
    line: "One thing in a list.",
  },
  {
    href: "/docs/empty",
    name: "Empty",
    line: "What shows when there is nothing.",
  },
  {
    href: "/docs/scroll-area",
    name: "Scroll area",
    line: "Scrollbars with a slanted thumb.",
  },
  {
    href: "/docs/aspect-ratio",
    name: "Aspect ratio",
    line: "A box that keeps its shape.",
  },
  {
    href: "/docs/spinner",
    name: "Spinner",
    line: "Something is loading.",
  },
  {
    href: "/docs/calendar",
    name: "Calendar",
    line: "Days as nesting slabs.",
  },
  {
    href: "/docs/carousel",
    name: "Carousel",
    line: "Slides to swipe through.",
  },
  {
    href: "/docs/chart",
    name: "Chart",
    line: "Recharts in zeroUI's colours.",
  },
  {
    href: "/docs/resizable",
    name: "Resizable",
    line: "Panels with a draggable edge.",
  },
  {
    href: "/docs/form",
    name: "Form",
    line: "Fields, fieldsets and server errors.",
  },
  {
    href: "/docs/message",
    name: "Message",
    line: "A turn in a conversation.",
  },
  {
    href: "/docs/bubble",
    name: "Bubble",
    line: "What was said, a corner cut.",
  },
  {
    href: "/docs/marker",
    name: "Marker",
    line: "A note nobody said.",
  },
  {
    href: "/docs/attachment",
    name: "Attachment",
    line: "A file, sent or sending.",
  },
  {
    href: "/docs/code-block",
    name: "Code block",
    line: "Code in a black well.",
  },
  {
    href: "/docs/trace",
    name: "Trace",
    line: "An agent's steps.",
  },
  {
    href: "/docs/message-scroller",
    name: "Message scroller",
    line: "Keeps to the newest turn.",
  },
  {
    href: "/docs/questionnaire",
    name: "Questionnaire",
    line: "One question at a time.",
  },
  {
    href: "/docs/cut-in",
    name: "Cut-in",
    line: "A band thrown across the screen.",
  },
  {
    href: "/docs/gauge",
    name: "Gauge",
    line: "A bar that leaves a trail when it drops.",
  },
  {
    href: "/docs/inventory",
    name: "Inventory",
    line: "Slots with a rarity glow and a cooldown.",
  },
  {
    href: "/docs/hold-button",
    name: "Hold button",
    line: "Hold it until the fill runs across.",
  },
  {
    href: "/docs/counter",
    name: "Counter",
    line: "A number that rolls and throws its change.",
  },
  {
    href: "/docs/objectives",
    name: "Objectives",
    line: "Marks and a strike through what is done.",
  },
  {
    href: "/docs/dialogue",
    name: "Dialogue",
    line: "A typed line, a speaker, numbered replies.",
  },
  {
    href: "/docs/compass",
    name: "Compass",
    line: "A heading strip with markers.",
  },
  {
    href: "/docs/floating-text",
    name: "Floating text",
    line: "Hits and heals that pop and rise.",
  },
  {
    href: "/docs/feed",
    name: "Feed",
    line: "What just happened, at the edge.",
  },
  {
    href: "/docs/stats",
    name: "Stats",
    line: "Better or worse than what you have.",
  },
  {
    href: "/docs/radial-menu",
    name: "Radial menu",
    line: "A wheel picked by direction.",
  },
  {
    href: "/docs/icons",
    name: "Icons",
    line: "Thirty solid glyphs on the same slant.",
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
