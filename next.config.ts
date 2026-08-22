import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Other experimental features if any
  },
  // @ts-ignore
  turbopack: {
    root: "./",
  },
};

export default nextConfig;
