import TutorialsPageClient from './TutorialsPageClient';

export const metadata = {
  title: 'Tutorials — How to Use ImageFlow Tools',
  description:
    'Step-by-step tutorials for every ImageFlow tool. Learn how to merge, split, compress, rotate, crop, watermark, and sign PDFs, convert image formats, resize, compress, and edit photos — all free in your browser.',
  alternates: {
    canonical: 'https://imageflow.in/tutorials/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TutorialsPage() {
  return <TutorialsPageClient />;
}
