import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/mariachiaralischi.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mariachiaralischi.github.io' : '',
};

export default nextConfig;
