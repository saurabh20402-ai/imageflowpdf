import TutorialsPageClient from './TutorialsPageClient';

export const metadata = {
  title: 'Tutorials & Guides',
  description: 'Step-by-step tutorials for every ImageFlow tool. Learn how to merge, split, compress, rotate, and convert files in your browser.',
  alternates: {
    canonical: 'https://imageflow.in/tutorials/',
  },
  openGraph: {
    title: 'Tutorials & Guides — ImageFlow',
    description: 'Step-by-step tutorials for every ImageFlow tool. Learn how to merge, split, compress, rotate, and convert files in your browser.',
    url: 'https://imageflow.in/tutorials/',
    type: 'website',
    images: [{ url: 'https://imageflow.in/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutorials & Guides — ImageFlow',
    description: 'Step-by-step tutorials for every ImageFlow tool. Learn how to merge, split, compress, rotate, and convert files in your browser.',
  },
};

export default function TutorialsPage() {
  return <TutorialsPageClient />;
}
