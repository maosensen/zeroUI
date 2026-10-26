/**
 * Each page's JSON-LD (yPulse docs/seo-geo.md §4, §5.1). The shared parts are in
 * `src/lib/seo/schema.ts`; this file puts zzzUI's types together.
 *
 * The home page is a product landing page: the library as a `SoftwareApplication` (no `offers`:
 * it costs nothing), created by the brand. Every docs page is a `WebPage` about that same
 * library, with its breadcrumb trail.
 */
import type { Article, SoftwareApplication } from "schema-dts";
import { ORG_ID } from "@/lib/seo/identity";
import {
  breadcrumbs,
  graph,
  organization,
  ref,
  webPage,
  website,
} from "@/lib/seo/schema";
import {
  OG_IMAGE,
  PAGES,
  type PagePath,
  page,
  pageUrl,
  SITE_URL,
} from "./site";

const LANG = "en";
const LIBRARY_ID = `${SITE_URL}/#library`;
const home = page("/");

function shell() {
  return [
    organization(LANG),
    website({
      url: SITE_URL,
      name: "zzzUI",
      description: home.description,
      inLanguage: LANG,
    }),
  ];
}

const library: SoftwareApplication = {
  "@type": "SoftwareApplication",
  "@id": LIBRARY_ID,
  name: "zzzUI",
  description: home.description,
  url: pageUrl("/"),
  image: `${SITE_URL}${OG_IMAGE.url}`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  creator: ref(ORG_ID),
};

export function homeGraph() {
  return graph([
    ...shell(),
    library,
    webPage({
      siteUrl: SITE_URL,
      url: pageUrl("/"),
      name: home.absoluteTitle ?? home.title,
      description: home.description,
      inLanguage: LANG,
      about: LIBRARY_ID,
      image: `${SITE_URL}${OG_IMAGE.url}`,
    }),
  ]);
}

export function docGraph(path: Exclude<PagePath, "/">) {
  const p = page(path);
  const url = pageUrl(path);
  const trail = [
    { name: home.crumb, url: pageUrl("/") },
    ...(path === "/docs"
      ? []
      : [{ name: page("/docs").crumb, url: pageUrl("/docs") }]),
    // a block sits under the blocks overview
    ...(path.startsWith("/docs/blocks/")
      ? [{ name: page("/docs/blocks").crumb, url: pageUrl("/docs/blocks") }]
      : []),
    { name: p.crumb, url },
  ];
  return graph([
    ...shell(),
    library,
    webPage({
      siteUrl: SITE_URL,
      url,
      name: `${p.title} · zzzUI`,
      description: p.description,
      inLanguage: LANG,
      about: LIBRARY_ID,
      breadcrumb: true,
    }),
    breadcrumbs(url, trail),
  ]);
}

/** An example app: a page about the library, its trail through Examples. */
export function exampleGraph(
  path:
    | "/examples"
    | "/examples/board"
    | "/examples/signal-board"
    | "/examples/ops-console",
) {
  const p = page(path);
  const url = pageUrl(path);
  const trail = [
    { name: home.crumb, url: pageUrl("/") },
    ...(path === "/examples"
      ? []
      : [{ name: page("/examples").crumb, url: pageUrl("/examples") }]),
    { name: p.crumb, url },
  ];
  return graph([
    ...shell(),
    library,
    webPage({
      siteUrl: SITE_URL,
      url,
      name: `${p.title} · zzzUI`,
      description: p.description,
      inLanguage: LANG,
      about: LIBRARY_ID,
      breadcrumb: true,
    }),
    breadcrumbs(url, trail),
  ]);
}

/** Every page, for the sitemap and llms.txt. */
export const publicPaths = () => PAGES.map((p) => p.path);

/** A guide: a docs page that is also an `Article` by the brand, about the library. */
export function guideGraph(path: Exclude<PagePath, "/">, published: string) {
  const p = page(path);
  const url = pageUrl(path);
  const article: Article = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: p.title,
    description: p.description,
    url,
    inLanguage: LANG,
    datePublished: published,
    author: ref(ORG_ID),
    publisher: ref(ORG_ID),
    about: ref(LIBRARY_ID),
    mainEntityOfPage: ref(`${url}#webpage`),
    image: `${SITE_URL}${OG_IMAGE.url}`,
  };
  const trail = [
    { name: home.crumb, url: pageUrl("/") },
    { name: page("/docs").crumb, url: pageUrl("/docs") },
    { name: page("/docs/guides").crumb, url: pageUrl("/docs/guides") },
    { name: p.crumb, url },
  ];
  return graph([
    ...shell(),
    library,
    webPage({
      siteUrl: SITE_URL,
      url,
      name: `${p.title} · zzzUI`,
      description: p.description,
      inLanguage: LANG,
      about: LIBRARY_ID,
      breadcrumb: true,
    }),
    article,
    breadcrumbs(url, trail),
  ]);
}
