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

const NAMESPACE = "@zzzui";

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

/** A whole screen built from the components: one file in components/blocks/. */
const block = (
  name: string,
  title: string,
  description: string,
  registryDependencies: string[],
) => ({
  name,
  type: "registry:block",
  title,
  description,
  registryDependencies: [dep("foundation"), ...registryDependencies],
  files: [
    {
      path: `src/components/blocks/${name}.tsx`,
      type: "registry:component",
      target: `@components/blocks/${name}.tsx`,
    },
  ],
});

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "zzzui",
  homepage: SITE_URL,
  items: [
    {
      name: "font",
      type: "registry:font",
      title: "Montserrat",
      description:
        "zzzUI's display face (labels, buttons, tabs, headings), behind --font-montserrat.",
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
        "zzzUI's text face (running text, typed values), behind --font-outfit.",
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
        "Tokens, motion and the slab: everything zzzUI's components are drawn from.",
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
      docs: 'zzzUI is dark only: put its components on a dark ground, or add @zzzui/theme to turn the project\'s shadcn variables to zzzUI\'s. For Montserrat\'s true italic, add style: ["normal", "italic"] where your layout loads it.',
    },
    {
      name: "theme",
      type: "registry:theme",
      title: "Theme",
      description:
        "shadcn's variables drawn from zzzUI's tokens, the same in light and dark: the host goes dark.",
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
      description: "The shape every zzzUI icon shares (createIcon).",
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
      description: "Every zzzUI icon, with an index to import them from.",
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
      "Input's well that suggests as you type, over Select's panel and rows; chips for several.",
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
      "item",
      "Item",
      "One thing in a list: a mark, a leaning title, a line of text, actions.",
      ["@base-ui/react", "class-variance-authority"],
    ),
    component(
      "empty",
      "Empty",
      "An empty state: a mark in a slanted well, a title, a line and the action.",
      [],
    ),
    component(
      "scroll-area",
      "Scroll area",
      "Scrollbars with a thin track and a slanted thumb.",
      ["@base-ui/react"],
    ),
    component(
      "aspect-ratio",
      "Aspect ratio",
      "A box that keeps a ratio of width to height.",
      [],
    ),
    component(
      "spinner",
      "Spinner",
      "The spinner icon, turning; still under reduced motion.",
      [],
      [dep("icon-spinner")],
    ),
    component(
      "calendar",
      "Calendar",
      "A month of slanted day cells for one day or a range (react-day-picker).",
      ["react-day-picker"],
      [
        dep("button"),
        dep("icon-chevron-left"),
        dep("icon-chevron-right"),
        dep("icon-chevron-down"),
      ],
    ),
    component(
      "carousel",
      "Carousel",
      "Slides to drag or swipe, slab arrows and slanted pips (Embla).",
      ["embla-carousel-react"],
      [dep("button"), dep("icon-chevron-left"), dep("icon-chevron-right")],
    ),
    component(
      "chart",
      "Chart",
      "Recharts in zzzUI's colours: quiet axes, slanted swatches, a panel tooltip.",
      ["recharts"],
    ),
    component(
      "resizable",
      "Resizable",
      "Panels with a draggable edge and a slanted grip (react-resizable-panels).",
      ["react-resizable-panels"],
    ),
    component(
      "form",
      "Form",
      "Base UI's form with fieldsets under leaning legends and a row of actions.",
      ["@base-ui/react"],
      [dep("field")],
    ),
    component(
      "message",
      "Message",
      "A turn in a conversation: speaker, time, content, a line under it.",
      [],
    ),
    component(
      "bubble",
      "Bubble",
      "What was said, in a square box with the corner toward the speaker cut off.",
      ["@base-ui/react", "class-variance-authority"],
    ),
    component(
      "marker",
      "Marker",
      "A quiet note in a conversation: a date, a join, an event.",
      ["@base-ui/react", "class-variance-authority"],
    ),
    component(
      "attachment",
      "Attachment",
      "A file sent or sending: a mark, its name, its state, small actions.",
      ["@base-ui/react", "class-variance-authority"],
      [dep("button")],
    ),
    component(
      "code-block",
      "Code block",
      "Code in a black well with line numbers, a copy button and marked lines.",
      ["class-variance-authority"],
      [dep("button"), dep("icon-check"), dep("icon-copy")],
    ),
    component(
      "trace",
      "Trace",
      "An agent's steps, one line each, that can open to show more.",
      [],
      [dep("collapsible"), dep("icon-chevron-right")],
    ),
    component(
      "message-scroller",
      "Message scroller",
      "The scrolling column of a conversation, keeping to the newest turn.",
      ["@shadcn/react"],
      [dep("button"), dep("icon-arrow-down")],
    ),
    component(
      "questionnaire",
      "Questionnaire",
      "Questions one at a time: slanted choice rows with keys, a field, then next.",
      ["@shadcn/react", "class-variance-authority"],
      [dep("button"), dep("input"), dep("icon-check")],
    ),
    component(
      "cut-in",
      "Cut-in",
      "A band that wipes across the screen on the slant, with a glitching title.",
      ["@base-ui/react"],
    ),
    component(
      "direction",
      "Direction",
      "Base UI's direction provider, for right-to-left pages.",
      ["@base-ui/react"],
    ),
    component(
      "gauge",
      "Gauge",
      "A reading on a slanted well that leaves a trail when it drops: health, shields, fuel.",
      ["@base-ui/react"],
    ),
    component(
      "inventory",
      "Inventory",
      "Square slots with a rarity glow, a count and a cooldown sweep, moved through with the arrow keys.",
      ["@base-ui/react"],
    ),
    component(
      "hold-button",
      "Hold button",
      "A button held until a fill runs across it, for what should not happen by accident.",
      [],
      [dep("button")],
    ),
    component(
      "counter",
      "Counter",
      "A number that rolls to each new value and throws the change off it.",
      ["motion"],
    ),
    component(
      "objectives",
      "Objectives",
      "An objective tracker: slanted marks per state and a strike through what is done.",
      [],
      [dep("icon-check"), dep("icon-close")],
    ),
    block(
      "settings-menu",
      "Settings menu",
      "A game settings menu block for React: display, audio, controls and gameplay tabs, built from zzzUI's Select, Slider, Switch and Hold button.",
      [
        dep("button"),
        dep("hold-button"),
        dep("kbd"),
        dep("radio-group"),
        dep("select"),
        dep("slider"),
        dep("switch"),
        dep("tabs"),
      ],
    ),
    block(
      "mission-briefing",
      "Mission briefing",
      "A game mission briefing block for React: a route map, objectives, a threat gauge, the reward, and hold-to-accept with a cut-in.",
      [
        dep("badge"),
        dep("button"),
        dep("counter"),
        dep("cut-in"),
        dep("gauge"),
        dep("hold-button"),
        dep("icon-crate"),
        dep("icon-key"),
        dep("icon-kit"),
        dep("inventory"),
        dep("kbd"),
        dep("objectives"),
      ],
    ),
    block(
      "loadout",
      "Loadout",
      "A game loadout and inventory screen block for React: a slot grid, item details with gauges, a belt to equip, and hold-to-scrap that pays credits.",
      [
        dep("badge"),
        dep("button"),
        dep("counter"),
        dep("gauge"),
        dep("hold-button"),
        dep("icon-cell"),
        dep("icon-chip"),
        dep("icon-crate"),
        dep("icon-flare"),
        dep("icon-key"),
        dep("icon-kit"),
        dep("inventory"),
      ],
    ),
    block(
      "leaderboard",
      "Leaderboard",
      "A game leaderboard block for React: periods as tabs, the top three marked legendary, epic and rare, and the player's own row pinned.",
      [dep("avatar"), dep("badge"), dep("table"), dep("tabs")],
    ),
    block(
      "hud",
      "HUD",
      "A game HUD block for React: health and shield gauges, a credit counter, objectives and a working hotbar with cooldowns, over a scene.",
      [
        dep("counter"),
        dep("cut-in"),
        dep("gauge"),
        dep("icon-cell"),
        dep("icon-flare"),
        dep("icon-key"),
        dep("icon-kit"),
        dep("inventory"),
        dep("objectives"),
      ],
    ),
    component(
      "dialogue",
      "Dialogue",
      "A dialogue box: a speaker slab, a typed-out line, continue, and numbered replies.",
      [],
      [dep("icon-chevron-down")],
    ),
    component(
      "compass",
      "Compass",
      "A heading strip with ticks, the eight points and markers at their bearings.",
      [],
      [dep("icon-chevron-left"), dep("icon-chevron-right")],
    ),
    component(
      "floating-text",
      "Floating text",
      "Damage numbers and words that pop, rise and fade where something happened.",
      ["motion"],
      [],
    ),
    component(
      "feed",
      "Feed",
      "An event feed of bands that slide in at the screen's edge and fold away.",
      ["motion"],
      [],
    ),
    component(
      "stats",
      "Stats",
      "Item stats with the difference from what you have, better or worse.",
      [],
      [dep("icon-arrow-down")],
    ),
    component(
      "radial-menu",
      "Radial menu",
      "A wheel of choices picked by the pointer's direction or the arrow keys.",
      [],
      [],
    ),
    block(
      "title-screen",
      "Title screen",
      "A game title screen and main menu block for React: a glitching title, an arrow-key menu, a news panel and key hints.",
      [dep("badge"), dep("icon-chevron-right"), dep("kbd")],
    ),
    block(
      "pause-menu",
      "Pause menu",
      "A game pause menu block for React: the run's stats, resume, settings and map, and hold-to-abandon, toggled with Escape.",
      [
        dep("button"),
        dep("gauge"),
        dep("hold-button"),
        dep("kbd"),
        dep("stats"),
      ],
    ),
    block(
      "character-select",
      "Character select",
      "A game character select block for React: a roster of cards, ratings as segmented gauges, a perk, locked characters, and hold-to-deploy.",
      [
        dep("badge"),
        dep("button"),
        dep("gauge"),
        dep("hold-button"),
        dep("icon-lock"),
      ],
    ),
    component(
      "post-card",
      "Post card",
      "A community post: a cover with views, the author on its edge, a leaning title and a line.",
      [],
      [dep("icon-eye")],
    ),
    component(
      "profile-chip",
      "Profile chip",
      "A player's avatar, name, experience bar and level on one slanted slab.",
      [],
      [],
    ),
    component(
      "reward-track",
      "Reward track",
      "Rewards per level, claimed, ready to claim or locked, like a season pass.",
      [],
      [dep("button"), dep("icon-check"), dep("icon-lock")],
    ),
    component(
      "masonry",
      "Masonry",
      "Cards of different heights in as many columns as fit, with CSS columns.",
      [],
      [],
    ),
    block(
      "community-feed",
      "Community feed",
      "A game community feed block for React: a masonry board of post cards, a filter, and a post sheet with replies and actions.",
      [
        dep("avatar"),
        dep("button"),
        dep("icon-cell"),
        dep("icon-chip"),
        dep("icon-crate"),
        dep("icon-eye"),
        dep("icon-flare"),
        dep("icon-key"),
        dep("icon-kit"),
        dep("masonry"),
        dep("post-card"),
        dep("sheet"),
        dep("toggle-group"),
      ],
    ),
    block(
      "level-rewards",
      "Level rewards",
      "A season pass block for React: a profile chip with experience, a reward track per level, claim and claim all.",
      [
        dep("avatar"),
        dep("button"),
        dep("icon-cell"),
        dep("icon-chip"),
        dep("icon-crate"),
        dep("icon-flare"),
        dep("icon-key"),
        dep("icon-kit"),
        dep("inventory"),
        dep("profile-chip"),
        dep("reward-track"),
      ],
    ),
    block(
      "daily-schedule",
      "Daily schedule",
      "A game daily schedule block for React: shifts with errands as objectives, the current one framed and marked now.",
      [dep("badge"), dep("button"), dep("objectives")],
    ),
    component(
      "tabs",
      "Tabs",
      "A slanted track with an accent slab that springs to the active tab.",
      ["@base-ui/react", "motion"],
      [dep("kbd")],
    ),
  ],
};

writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
console.log(
  `registry.json: ${registry.items.length} items (${icons.length} icons)`,
);
