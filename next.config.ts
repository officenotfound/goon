import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/goon",
  images: { unoptimized: true },
};

export default nextConfig;
