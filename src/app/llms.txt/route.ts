import { IDENTITY } from "@/lib/seo/identity";
import { llmsTxt } from "@/lib/seo/llms";
import { REGISTRY_URL, SITE_URL } from "@/lib/site";
import { PAGES, page, pageUrl } from "@/seo/site";

/**
 * `/llms.txt` (yPulse docs/seo-geo.md §7): built from the same page list as the sitemap, not
 * maintained on its own. In English: machines read it. It reads nothing from the request, so it is
 * prerendered at build like the pages.
 */

const home = page("/");
const section = (group: string) =>
  PAGES.filter((p) => p.group === group).map((p) => ({
    title: p.title,
    url: pageUrl(p.path),
    note: p.description,
  }));

export function GET() {
  const body = llmsTxt({
    title: "zeroUI",
    summary: home.description,
    details: [
      `Made by ${IDENTITY.name}. zeroUI is installed the shadcn way: once per project, \`shadcn registry add @zeroui=${REGISTRY_URL}\`, then \`shadcn add @zeroui/<component>\` copies the component into the project, along with its foundation (tokens, motion and the slab shape, written into the project's stylesheet).`,
      "Dark only: there is no light theme. Sixty-eight components (forms, overlays, feedback, data display, navigation, disclosure, commands, chat, layout, and game pieces: gauges, inventory, objectives) and thirty icons, each listed below. Requires Tailwind CSS v4 and React 19; built on Base UI, not Radix.",
    ],
    sections: [
      { heading: "Start", links: section("start") },
      { heading: "Components", links: section("components") },
      { heading: "Overlays", links: section("overlays") },
      { heading: "Feedback", links: section("feedback") },
      { heading: "Data display", links: section("data") },
      { heading: "Navigation", links: section("navigation") },
      { heading: "Disclosure and toggles", links: section("disclosure") },
      { heading: "Commands", links: section("commands") },
      { heading: "More inputs", links: section("inputs") },
      { heading: "Layout and the rest", links: section("layout") },
      { heading: "Chat", links: section("chat") },
      { heading: "Game", links: section("game") },
      { heading: "Foundation", links: section("foundation") },
      {
        heading: "Registry",
        links: [
          {
            title: "Registry index",
            url: `${SITE_URL}/r/registry.json`,
            note: "Every @zeroui item: font, foundation, theme, icons, components.",
          },
        ],
      },
      {
        heading: "Elsewhere",
        links: IDENTITY.sameAs.map((url) => ({
          title: new URL(url).host.replace(/^www\./, ""),
          url,
        })),
      },
    ],
  });
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
