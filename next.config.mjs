/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // GitHub Pages: repo is "imageflowpdf" so set basePath
  basePath: '/imageflowpdf',
  assetPrefix: '/imageflowpdf/',

  // Disable image optimization for static export (no server)
  images: {
    unoptimized: true,
  },

  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
