import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages deployment: deploy manually via npm run deploy
  basePath: process.env.NODE_ENV === 'production' ? '/personal website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal website' : '',
  reactStrictMode: true,
};

export default nextConfig;
