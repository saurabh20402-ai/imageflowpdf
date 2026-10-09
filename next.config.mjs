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
      // /tools/ has no index page — redirect to homepage tools section
      {
        source: '/tools/',
        destination: '/#all-tools',
        permanent: true,
      },
      // Convenience alias for edit-pdf
      {
        source: '/tools/edit-pdf/',
        destination: '/tools/sign-pdf/',
        permanent: true,
      },
      // Redirect www → non-www (requires www.imageflow.in domain in Vercel for SSL)
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
  async headers() {
    return [
      // Prevent Google from trying to index binary/asset files as pages
      {
        source: '/favicon.ico',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/(.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp|.*\\.svg|.*\\.ico)',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },
};

export default nextConfig;
