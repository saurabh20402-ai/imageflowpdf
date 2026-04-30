/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles Next.js natively — no static export needed

  // Disable image optimization (keep consistent behavior)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
