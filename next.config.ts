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
    ];
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
