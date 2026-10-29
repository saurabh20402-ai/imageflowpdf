export const metadata = {
  title: 'Guides & Image Processing Blog',
  description: 'Helpful tutorials, optimization tips, and document processing guides from the ImageFlow team.',
  alternates: {
    canonical: 'https://imageflow.in/blog/',
  },
  openGraph: {
    title: 'Guides & Image Processing Blog — ImageFlow',
    description: 'Helpful tutorials, optimization tips, and document processing guides from the ImageFlow team.',
    url: 'https://imageflow.in/blog/',
    type: 'website',
    images: [{ url: 'https://imageflow.in/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides & Image Processing Blog — ImageFlow',
    description: 'Helpful tutorials, optimization tips, and document processing guides from the ImageFlow team.',
  },
};

import BlogContent from './BlogContent';

export default function BlogPage() {
  return <BlogContent />;
}
