import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export works on Cloudflare Pages, Netlify, and GitHub Pages.
  output: "export",
  images: {
    unoptimized: true,
  },
  // Cloud/preview agents open the app via 127.0.0.1; without this, Next blocks
  // HMR/dev resources and React client updates appear frozen.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
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
