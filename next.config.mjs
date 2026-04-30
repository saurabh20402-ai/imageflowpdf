/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages / custom domain
  output: 'export',

  // Custom domain — NO basePath needed (site is at root /)
  // basePath and assetPrefix removed for custom domain

  // Disable image optimization for static export (no server)
  images: {
    unoptimized: true,
  },

  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
