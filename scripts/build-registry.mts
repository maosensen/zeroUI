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
