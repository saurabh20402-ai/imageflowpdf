/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // GitHub Pages: if your repo is NOT username.github.io, set basePath
  // e.g. if your repo is "imageflowpdf", uncomment this:
  // basePath: '/imageflowpdf',
  // assetPrefix: '/imageflowpdf/',

  // Disable image optimization for static export (no server)
  images: {
    unoptimized: true,
  },

  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
