/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure URLs use trailing slashes to match sitemap and canonical URLs.
  // Without this, Next.js 308-redirects /path/ → /path, causing
  // "Page with redirect" failures in Google Search Console.
  trailingSlash: true,

  // Disable image optimization (keep consistent behavior)
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.imageflow.in',
          },
        ],
        destination: 'https://imageflow.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
