import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set by the Dockerfile; Vercel builds keep the default output
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  // Docker bind mounts on Windows don't emit file events, so Turbopack must poll
  watchOptions: process.env.WATCHPACK_POLLING
    ? { pollIntervalMs: 1000 }
    : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  compress: true,
  reactStrictMode: true,
  trailingSlash: false,
  // ponytail: optimizePackageImports removed in Next 16 — auto-optimized
};

export default nextConfig;
