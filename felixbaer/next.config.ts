import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname, // Ensures the correct root directory is used
};

export default nextConfig;