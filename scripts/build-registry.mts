/**
 * Writes registry.json, the source `shadcn build` turns into public/r/*.json.
 *
 * The CSS files in src/styles/zero stay the one source of the foundation's CSS: this script parses
 * them and writes them into the foundation item's `css` field, which shadcn merges into the host
 * project's stylesheet on install. An @import cannot be used instead: shadcn knows where the host's
 * stylesheet is but not the path from it to files it has just written.
 *
 * shadcn's merger takes declarations only inside rules and @utility blocks, so the declarations of
 * @theme go to the item's `cssVars.theme` instead, which shadcn writes into the host's
 * `@theme inline` (Tailwind still emits every one a component reads through var()). The @keyframes
 * inside @theme stay in `css`, where shadcn also puts them in `@theme inline`.
 *
 * So the shapes the foundation CSS may use: top-level rules; @theme holding declarations and
 * @keyframes; @media holding rules; @property; @utility holding declarations and rules nested one
 * level. No at-rule nested inside a @utility.
 *
 * Run with `pnpm registry:build`.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import postcss, { type ChildNode, type Container } from "postcss";
import { SITE_URL } from "../src/lib/site.ts";

const NAMESPACE = "@zeroui";

type CssObject = { [key: string]: string | CssObject };

/** A parsed stylesheet as the nested object a registry item's `css` field holds. */
function toCssObject(container: Container<ChildNode>): CssObject {
  const out: CssObject = {};
  for (const node of container.nodes ?? []) {
    if (node.type === "decl") {
      out[node.prop] =
        `${squash(node.value)}${node.important ? " !important" : ""}`;
    } else if (node.type === "rule") {
      const key = squash(node.selector);
      out[key] = merge(out[key], toCssObject(node));
    } else if (node.type === "atrule") {
      const key = squash(`@${node.name} ${node.params}`);
      out[key] = node.nodes ? merge(out[key], toCssObject(node)) : {};
    }
  }
  return out;
}

function squash(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function merge(existing: string | CssObject | undefined, next: CssObject) {
  return typeof existing === "object" ? { ...existing, ...next } : next;
}

/** The foundation's CSS, split into what goes to `cssVars.theme` and what goes to `css`. */
function foundationCss() {
  const entry = readFileSync("src/styles/zero/zero.css", "utf8");
  const files = [...entry.matchAll(/@import "\.\/(.+?)";/g)].map(
    ([, file]) => `src/styles/zero/${file}`,
  );
  const css: CssObject = {};
  const theme: Record<string, string> = {};
  const rootColours: Record<string, string> = {};
  for (const file of files) {
    const root = postcss.parse(readFileSync(file, "utf8"), { from: file });
    for (const [key, value] of Object.entries(toCssObject(root))) {
      if (key === "@theme" && typeof value === "object") {
        for (const [name, inner] of Object.entries(value)) {
          if (typeof inner !== "string") {
            css[name] = inner;
            continue;
          }
          const token = name.replace(/^--/, "");
          // shadcn maps every literal colour in cssVars to --color-<key>, so a colour goes in as
          // its raw value on :root (--zero-accent) and the theme refers to it, shadcn's own pattern
          const colour = token.match(/^color-(.+)$/);
          if (colour && !inner.startsWith("var(")) {
            rootColours[`--${colour[1]}`] = inner;
            theme[token] = `var(--${colour[1]})`;
          } else {
            theme[token] = inner;
          }
        }
      } else {
        css[key] = typeof value === "object" ? merge(css[key], value) : value;
      }
    }
  }
  css[":root"] = merge(rootColours, css[":root"] as CssObject);
  return { css, theme };
}

const foundation = foundationCss();

const dep = (name: string) => `${NAMESPACE}/${name}`;

const icons = readdirSync("src/components/zero/icons")
  .filter((file) => file.endsWith(".tsx") && file !== "icon.tsx")
  .map((file) => file.replace(/\.tsx$/, ""))
  .sort();

const component = (
  name: string,
  title: string,
  description: string,
  dependencies: string[],
  registryDependencies: string[] = [],
) => ({
  name,
  type: "registry:ui",
  title,
  description,
  dependencies,
  registryDependencies: [dep("foundation"), ...registryDependencies],
  files: [
    {
      path: `src/components/zero/${name}.tsx`,
      type: "registry:ui",
      target: `@components/zero/${name}.tsx`,
    },
  ],
});

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "zeroui",
  homepage: SITE_URL,
  items: [
    {
      name: "font",
      type: "registry:font",
      title: "Montserrat",
      description:
        "zeroUI's display face (labels, buttons, tabs, headings), behind --font-montserrat.",
      font: {
        family: "Montserrat",
        provider: "google",
        import: "Montserrat",
        variable: "--font-montserrat",
        subsets: ["latin"],
      },
    },
    {
      name: "font-text",
      type: "registry:font",
      title: "Outfit",
      description:
        "zeroUI's text face (running text, typed values), behind --font-outfit.",
      font: {
        family: "Outfit",
        provider: "google",
        import: "Outfit",
        variable: "--font-outfit",
        subsets: ["latin"],
      },
    },
    {
      name: "foundation",
      type: "registry:lib",
      title: "Foundation",
      description:
        "Tokens, motion and the slab: everything zeroUI's components are drawn from.",
      dependencies: ["cn", "motion"],
      registryDependencies: [dep("font"), dep("font-text")],
      files: [
        {
          path: "src/lib/zero/cn.ts",
          type: "registry:lib",
          target: "@lib/zero/cn.ts",
        },
        {
          path: "src/lib/zero/motion.ts",
          type: "registry:lib",
          target: "@lib/zero/motion.ts",
        },
      ],
      cssVars: { theme: foundation.theme },
      css: foundation.css,
      docs: 'zeroUI is dark only: put its components on a dark ground, or add @zeroui/theme to turn the project\'s shadcn variables to zeroUI\'s. For Montserrat\'s true italic, add style: ["normal", "italic"] where your layout loads it.',
    },
    {
      name: "theme",
      type: "registry:theme",
      title: "Theme",
      description:
        "shadcn's variables drawn from zeroUI's tokens, the same in light and dark: the host goes dark.",
      registryDependencies: [dep("foundation")],
      cssVars: (() => {
        const vars = {
          background: "var(--color-zero-ground)",
          foreground: "var(--color-zero-text)",
          card: "var(--color-zero-surface)",
          "card-foreground": "var(--color-zero-text)",
          popover: "var(--color-zero-surface)",
          "popover-foreground": "var(--color-zero-text)",
          primary: "var(--color-zero-accent)",
          "primary-foreground": "var(--color-zero-ink)",
          secondary: "var(--color-zero-raised)",
          "secondary-foreground": "var(--color-zero-text)",
          muted: "var(--color-zero-raised)",
          "muted-foreground": "var(--color-zero-text-2)",
          accent: "var(--color-zero-raised)",
          "accent-foreground": "var(--color-zero-text)",
          destructive: "var(--color-zero-danger)",
          border: "var(--color-zero-line)",
          input: "var(--color-zero-line)",
          ring: "var(--color-zero-focus)",
          "chart-1": "var(--color-zero-accent)",
          "chart-2": "var(--color-zero-accent-lo)",
          "chart-3": "var(--color-zero-focus)",
          "chart-4": "var(--color-zero-danger)",
          "chart-5": "var(--color-zero-text-2)",
          sidebar: "var(--color-zero-surface)",
          "sidebar-foreground": "var(--color-zero-text)",
          "sidebar-primary": "var(--color-zero-accent)",
          "sidebar-primary-foreground": "var(--color-zero-ink)",
          "sidebar-accent": "var(--color-zero-raised)",
          "sidebar-accent-foreground": "var(--color-zero-text)",
          "sidebar-border": "var(--color-zero-line)",
          "sidebar-ring": "var(--color-zero-focus)",
          radius: "0rem",
        };
        return { light: vars, dark: vars };
      })(),
    },
    {
      name: "icon",
      type: "registry:lib",
      title: "Icon",
      description: "The shape every zeroUI icon shares (createIcon).",
      registryDependencies: [dep("foundation")],
      files: [
        {
          path: "src/components/zero/icons/icon.tsx",
          type: "registry:component",
          target: "@components/zero/icons/icon.tsx",
        },
      ],
    },
    ...icons.map((icon) => ({
      name: `icon-${icon}`,
      type: "registry:component",
      title: `Icon: ${icon}`,
      registryDependencies: [dep("icon")],
      files: [
        {
          path: `src/components/zero/icons/${icon}.tsx`,
          type: "registry:component",
          target: `@components/zero/icons/${icon}.tsx`,
        },
      ],
    })),
    {
      name: "icons",
      type: "registry:component",
      title: "Icons",
      description: "Every zeroUI icon, with an index to import them from.",
      registryDependencies: icons.map((icon) => dep(`icon-${icon}`)),
      files: [
        {
          path: "src/components/zero/icons/index.ts",
          type: "registry:component",
          target: "@components/zero/icons/index.ts",
        },
      ],
    },
    component(
      "button",
      "Button",
      "A slab with a label: four variants, three sizes, four cuts.",
      ["@base-ui/react", "class-variance-authority"],
    ),
    component(
      "input",
      "Input",
      "A text field as an inset well, with room for an icon or an action at either end.",
      ["@base-ui/react", "class-variance-authority"],
    ),
    component(
      "field",
      "Field",
      "Label, description and error around a control, with Base UI's validation.",
      ["@base-ui/react"],
    ),
    component(
      "select",
      "Select",
      "A well for a trigger and a popup lifted by outline; the highlighted row fills with the accent.",
      ["@base-ui/react", "class-variance-authority"],
      [dep("icon-chevron-down")],
    ),
    component(
      "textarea",
      "Textarea",
      "Several lines in the same sunken well as Input; it grows with what is typed.",
      ["@base-ui/react"],
    ),
    component(
      "checkbox",
      "Checkbox",
      "A slanted well that fills with the accent, with an indeterminate state.",
      ["@base-ui/react"],
      [dep("icon-check"), dep("icon-minus")],
    ),
    component(
      "radio-group",
      "Radio group",
      "Slanted wells; the chosen one holds a slab of the accent.",
      ["@base-ui/react"],
    ),
    component(
      "switch",
      "Switch",
      "A slanted track and a slab that springs across to the other end.",
      ["@base-ui/react"],
    ),
    component(
      "slider",
      "Slider",
      "A slanted track, an accent fill and slab thumbs; one value or a range.",
      ["@base-ui/react"],
    ),
    component(
      "dialog",
      "Dialog",
      "A panel over a dimmed page, with a black title bar and a corner close button.",
      ["@base-ui/react"],
      [dep("button"), dep("icon-close")],
    ),
    component(
      "sheet",
      "Sheet",
      "A dialog that slides in from an edge of the screen.",
      ["@base-ui/react"],
      [dep("dialog")],
    ),
    component(
      "popover",
      "Popover",
      "A panel beside its trigger for a few lines or a small form.",
      ["@base-ui/react"],
    ),
    component(
      "tooltip",
      "Tooltip",
      "A one-line label on a light slab cut on both sides.",
      ["@base-ui/react"],
    ),
    component(
      "dropdown-menu",
      "Dropdown menu",
      "Actions, checkbox and radio rows and submenus in a panel that drops from its trigger.",
      ["@base-ui/react"],
      [dep("icon-check"), dep("icon-chevron-right")],
    ),
    component(
      "alert",
      "Alert",
      "A message in the page in four tones, each with its slanted badge.",
      ["class-variance-authority"],
      [dep("icon-alert"), dep("icon-info"), dep("icon-done")],
    ),
    component(
      "progress",
      "Progress",
      "A slanted track or a segmented gauge, with a sweep for an unknown amount.",
      ["@base-ui/react"],
    ),
    component(
      "skeleton",
      "Skeleton",
      "Loading placeholders: blocks, slanted text lines and slabs, with a moving glint.",
      ["class-variance-authority"],
    ),
    component(
      "toast",
      "Toast",
      "Messages that slide into the corner in Alert's tones, stack, and swipe away.",
      ["@base-ui/react"],
      [dep("alert"), dep("button"), dep("icon-close")],
    ),
    component(
      "card",
      "Card",
      "A square-cornered box with a black header bar, content and a footer.",
      [],
    ),
    component(
      "table",
      "Table",
      "Rows of data: heads on a black bar, quiet lines, a lit and a selected row.",
      [],
    ),
    component(
      "badge",
      "Badge",
      "A small slab cut on both sides, in four variants.",
      ["@base-ui/react", "class-variance-authority"],
    ),
    component(
      "avatar",
      "Avatar",
      "A round picture or initials in an ink ring, with a status dot and groups.",
      ["@base-ui/react"],
    ),
    component(
      "breadcrumb",
      "Breadcrumb",
      "The pages above this one in leaning type, between slanted bars.",
      ["@base-ui/react"],
      [dep("icon-more")],
    ),
    component(
      "pagination",
      "Pagination",
      "Pages as small slabs cut on both sides; the current one in the accent.",
      ["@base-ui/react"],
      [
        dep("button"),
        dep("icon-chevron-left"),
        dep("icon-chevron-right"),
        dep("icon-more"),
      ],
    ),
    component(
      "sidebar",
      "Sidebar",
      "A black strip of rows that folds to an icon rail, and opens as a sheet on phones.",
      ["@base-ui/react"],
      [dep("button"), dep("sheet"), dep("tooltip"), dep("icon-sidebar")],
    ),
    component("separator", "Separator", "A quiet line across or upright.", [
      "@base-ui/react",
    ]),
    component(
      "toggle",
      "Toggle",
      "A Button that stays down, filled with the accent while on.",
      ["@base-ui/react", "class-variance-authority"],
      [dep("button")],
    ),
    component(
      "toggle-group",
      "Toggle group",
      "Toggles cut on both sides, nesting in a row; one value or several.",
      ["@base-ui/react", "class-variance-authority"],
      [dep("toggle")],
    ),
    component(
      "collapsible",
      "Collapsible",
      "A panel that unfolds to its own height in place.",
      ["@base-ui/react"],
    ),
    component(
      "accordion",
      "Accordion",
      "Sections that open one at a time, with leaning headings and an accent mark.",
      ["@base-ui/react"],
      [dep("collapsible"), dep("icon-chevron-down")],
    ),
    component(
      "context-menu",
      "Context menu",
      "The Dropdown menu, opened where you right-click.",
      ["@base-ui/react"],
      [dep("dropdown-menu")],
    ),
    component(
      "menubar",
      "Menubar",
      "A black bar of menus that open one after another.",
      ["@base-ui/react"],
      [dep("dropdown-menu")],
    ),
    component(
      "hover-card",
      "Hover card",
      "A preview panel that opens while a link is pointed at.",
      ["@base-ui/react"],
    ),
    component(
      "combobox",
      "Combobox",
      "Input's well that suggests as you type, over Select's panel and rows.",
      ["@base-ui/react", "class-variance-authority"],
      [dep("input"), dep("icon-chevron-down"), dep("icon-close")],
    ),
    component(
      "command",
      "Command",
      "A search over a list of actions, inline or as a ⌘K palette.",
      ["@base-ui/react"],
      [dep("dialog"), dep("icon-search")],
    ),
    component(
      "input-otp",
      "Input OTP",
      "Slanted cells for a one-time code, one character each.",
      ["@base-ui/react"],
    ),
    component(
      "input-group",
      "Input group",
      "Input's well with text, icons, keys or small buttons at either end.",
      ["@base-ui/react", "class-variance-authority"],
      [dep("input"), dep("button")],
    ),
    component(
      "button-group",
      "Button group",
      "Buttons set close and cut on both sides so they nest.",
      [],
    ),
    component(
      "native-select",
      "Native select",
      "The browser's own select in Input's well.",
      ["class-variance-authority"],
      [dep("input"), dep("icon-chevron-down")],
    ),
    component("kbd", "Kbd", "A key to press: a small raised slab.", []),
    component("label", "Label", "A control's name in leaning type.", []),
    component(
      "alert-dialog",
      "Alert dialog",
      "A Dialog that asks before what cannot be undone, and waits for an answer.",
      ["@base-ui/react"],
      [dep("dialog"), dep("button")],
    ),
    component(
      "drawer",
      "Drawer",
      "A panel from the bottom (or any edge) that follows the finger and swipes away.",
      ["@base-ui/react"],
    ),
    component(
      "navigation-menu",
      "Navigation menu",
      "A row of menus sharing one panel that resizes and slides between them.",
      ["@base-ui/react"],
      [dep("icon-chevron-down")],
    ),
    component(
      "tabs",
      "Tabs",
      "A slanted track with an accent slab that springs to the active tab.",
      ["@base-ui/react", "motion"],
    ),
  ],
};

writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
console.log(
  `registry.json: ${registry.items.length} items (${icons.length} icons)`,
);
