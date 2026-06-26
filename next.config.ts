import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    qualities: [25, 50, 75, 100],
  },
};

export default nextConfig;
