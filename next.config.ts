import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Resized images are kept for 31 days instead of being rebuilt hourly.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
