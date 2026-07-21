import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Unsplash already serves pre-sized, pre-optimized images via its own CDN
    // (we request exact widths via ?w=), so Vercel's on-the-fly optimizer adds
    // no value here and its per-source-image quota was blocking real images
    // with 402 Payment Required on this project's plan.
    unoptimized: true,
  },
};

export default nextConfig;
