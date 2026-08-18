import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site so GitHub Pages can host it without a server.
  output: "export",
};

export default nextConfig;
