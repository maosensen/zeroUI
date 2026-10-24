/** The docs, in reading order. */
export const docsNav = [
  {
    group: "Start",
    pages: [{ href: "/docs", title: "Getting started" }],
  },
  {
    group: "Components",
    pages: [
      { href: "/docs/button", title: "Button" },
      { href: "/docs/input", title: "Input" },
      { href: "/docs/field", title: "Field" },
      { href: "/docs/textarea", title: "Textarea" },
      { href: "/docs/select", title: "Select" },
      { href: "/docs/checkbox", title: "Checkbox" },
      { href: "/docs/radio-group", title: "Radio group" },
      { href: "/docs/switch", title: "Switch" },
      { href: "/docs/slider", title: "Slider" },
      { href: "/docs/tabs", title: "Tabs" },
    ],
  },
  {
    group: "Overlays",
    pages: [
      { href: "/docs/dialog", title: "Dialog" },
      { href: "/docs/sheet", title: "Sheet" },
      { href: "/docs/popover", title: "Popover" },
      { href: "/docs/tooltip", title: "Tooltip" },
      { href: "/docs/dropdown-menu", title: "Dropdown menu" },
    ],
  },
  {
    group: "Feedback",
    pages: [
      { href: "/docs/alert", title: "Alert" },
      { href: "/docs/progress", title: "Progress" },
      { href: "/docs/skeleton", title: "Skeleton" },
      { href: "/docs/toast", title: "Toast" },
    ],
  },
  {
    group: "Foundation",
    pages: [{ href: "/docs/icons", title: "Icons" }],
  },
] as const;
