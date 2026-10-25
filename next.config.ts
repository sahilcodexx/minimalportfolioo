import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project and blog covers are pulled from raw.githubusercontent.com.
    remotePatterns: [new URL("https://raw.githubusercontent.com/**")],
  },
};

export default nextConfig;
