import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // The old name's domain: every page moves for good to the same path on the new one. Static
  // files (the registry's JSON) are served before this runs, on either domain.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "zeroui.catforest.dev" }],
        destination: "https://zzzui.catforest.dev/:path*",
        permanent: true,
      },
      // /en/… is only the address the pages are built at: English is served without a prefix
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  // The pages live in app/[lang]/. An English address has no prefix, so after the static files
  // and routes (the registry, llms.txt, the studio) it is handed to /en/…. One rule for a single
  // segment and one for more: a single parameter across slashes is encoded as %2F on Workers
  // (yPulse docs/seo-geo.md §12, yIso).
  async rewrites() {
    const notLang = "(?!(?:zh|en|_next)(?:/|$))";
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/en" },
        { source: `/:first(${notLang}[^/]+)`, destination: "/en/:first" },
        {
          source: `/:first(${notLang}[^/]+)/:rest*`,
          destination: "/en/:first/:rest*",
        },
      ],
      fallback: [],
    };
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
