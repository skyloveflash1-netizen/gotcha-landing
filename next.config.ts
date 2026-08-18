import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // Produce a fully static site so GitHub Pages can host it without a server.
  output: "export",
  // GitHub Pages serves this repository from a subdirectory. The Sites host
  // serves it from the domain root, so only prefix framework assets in CI.
  ...(isGitHubPagesBuild ? { assetPrefix: "/gotcha-landing" } : {}),
};

export default nextConfig;
