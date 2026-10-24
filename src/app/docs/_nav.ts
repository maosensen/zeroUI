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
      { href: "/docs/select", title: "Select" },
      { href: "/docs/tabs", title: "Tabs" },
    ],
  },
  {
    group: "Foundation",
    pages: [{ href: "/docs/icons", title: "Icons" }],
  },
] as const;
