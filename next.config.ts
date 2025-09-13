import type { NextConfig } from "next";
// tx trweil https://www.reddit.com/r/nextjs/comments/1ixfypv/nextjs_on_github_pages/
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // // GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/mariachiaralischi.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mariachiaralischi.github.io' : '',
  distDir:'out'
};

export default nextConfig;
