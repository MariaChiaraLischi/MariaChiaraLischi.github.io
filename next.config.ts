import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/MariaChiaraLischi.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/MariaChiaraLischi.github.io/' : '',
  reactStrictMode: true,
};

export default nextConfig;
