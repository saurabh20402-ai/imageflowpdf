/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles Next.js natively — no static export needed

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
