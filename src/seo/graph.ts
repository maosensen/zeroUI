/**
 * Each page's JSON-LD (yPulse docs/seo-geo.md §4, §5.1). The shared parts are in
 * `src/lib/seo/schema.ts`; this file puts zzzUI's types together.
 *
 * The home page is a product landing page: the library as a `SoftwareApplication` (no `offers`:
 * it costs nothing), created by the brand. Every docs page is a `WebPage` about that same
 * library, with its breadcrumb trail.
 */
import type { Article, SoftwareApplication } from "schema-dts";
import { HTML_LANG, LANGS, type Lang } from "@/lib/i18n/locale";
import { getLang } from "@/lib/i18n/server";
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
  pageCopy,
  pageUrl,
  SITE_URL,
} from "./site";

const LIBRARY_ID = `${SITE_URL}/#library`;

/** The page being rendered: its language, and a page's copy and address in it. */
function here() {
  const lang: Lang = getLang();
  return {
    lang,
    tag: HTML_LANG[lang],
    copy: (path: PagePath) => pageCopy(page(path), lang),
    url: (path: string) => pageUrl(path, lang),
  };
}

function shell() {
  const h = here();
  return [
    organization(h.tag),
    website({
      url: SITE_URL,
      name: "zzzUI",
      description: h.copy("/").description,
      inLanguage: h.tag,
    }),
  ];
}

function library(): SoftwareApplication {
  const h = here();
  return {
    "@type": "SoftwareApplication",
    "@id": LIBRARY_ID,
    name: "zzzUI",
    description: h.copy("/").description,
    url: h.url("/"),
    image: `${SITE_URL}${OG_IMAGE.url}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    creator: ref(ORG_ID),
  };
}

export function homeGraph() {
  const h = here();
  const home = h.copy("/");
  return graph([
    ...shell(),
    library(),
    webPage({
      siteUrl: SITE_URL,
      url: h.url("/"),
      name: home.absoluteTitle ?? home.title,
      description: home.description,
      inLanguage: h.tag,
      about: LIBRARY_ID,
      image: `${SITE_URL}${OG_IMAGE.url}`,
    }),
  ]);
}

export function docGraph(path: Exclude<PagePath, "/">) {
  const h = here();
  const p = h.copy(path);
  const url = h.url(path);
  const trail = [
    { name: h.copy("/").crumb, url: h.url("/") },
    ...(path === "/docs"
      ? []
      : [{ name: h.copy("/docs").crumb, url: h.url("/docs") }]),
    // a block sits under the blocks overview
    ...(path.startsWith("/docs/blocks/")
      ? [{ name: h.copy("/docs/blocks").crumb, url: h.url("/docs/blocks") }]
      : []),
    { name: p.crumb, url },
  ];
  return graph([
    ...shell(),
    library(),
    webPage({
      siteUrl: SITE_URL,
      url,
      name: `${p.title} · zzzUI`,
      description: p.description,
      inLanguage: h.tag,
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
  const h = here();
  const p = h.copy(path);
  const url = h.url(path);
  const trail = [
    { name: h.copy("/").crumb, url: h.url("/") },
    ...(path === "/examples"
      ? []
      : [{ name: h.copy("/examples").crumb, url: h.url("/examples") }]),
    { name: p.crumb, url },
  ];
  return graph([
    ...shell(),
    library(),
    webPage({
      siteUrl: SITE_URL,
      url,
      name: `${p.title} · zzzUI`,
      description: p.description,
      inLanguage: h.tag,
      about: LIBRARY_ID,
      breadcrumb: true,
    }),
    breadcrumbs(url, trail),
  ]);
}

/** Every page, for the sitemap and llms.txt. */
export const publicPaths = () => PAGES.map((p) => p.path);

/** Every page in every language, for the sitemap. */
export const publicUrls = () =>
  PAGES.flatMap((p) => LANGS.map((lang) => ({ path: p.path, lang })));

/** A guide: a docs page that is also an `Article` by the brand, about the library. */
export function guideGraph(path: Exclude<PagePath, "/">, published: string) {
  const h = here();
  const p = h.copy(path);
  const url = h.url(path);
  const article: Article = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: p.title,
    description: p.description,
    url,
    inLanguage: h.tag,
    datePublished: published,
    author: ref(ORG_ID),
    publisher: ref(ORG_ID),
    about: ref(LIBRARY_ID),
    mainEntityOfPage: ref(`${url}#webpage`),
    image: `${SITE_URL}${OG_IMAGE.url}`,
  };
  const trail = [
    { name: h.copy("/").crumb, url: h.url("/") },
    { name: h.copy("/docs").crumb, url: h.url("/docs") },
    { name: h.copy("/docs/guides").crumb, url: h.url("/docs/guides") },
    { name: p.crumb, url },
  ];
  return graph([
    ...shell(),
    library(),
    webPage({
      siteUrl: SITE_URL,
      url,
      name: `${p.title} · zzzUI`,
      description: p.description,
      inLanguage: h.tag,
      about: LIBRARY_ID,
      breadcrumb: true,
    }),
    article,
    breadcrumbs(url, trail),
  ]);
}
