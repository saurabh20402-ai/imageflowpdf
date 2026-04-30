import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const BASE_URL = 'https://saurabh20402-ai.github.io/imageflowpdf';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ImageFlow — Free Online Image Tools',
    template: '%s — ImageFlow',
  },
  description: 'Free online image tools: compress, convert, resize, crop, add text, remove background and more. 100% private — all processing in your browser. No signup required.',
  keywords: [
    'image compressor', 'image converter', 'resize image online', 'crop image free',
    'jpg to png', 'png to jpg', 'webp converter', 'image tools', 'free online image editor',
    'compress image without losing quality', 'image to pdf', 'ocr text extractor',
    'bulk image compressor', 'watermark image', 'add text to image', 'meme generator',
    'heic converter', 'svg to png', 'image filters online', 'batch resize images',
  ],
  authors: [{ name: 'ImageFlow' }],
  creator: 'ImageFlow',
  publisher: 'ImageFlow',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'ImageFlow',
    title: 'ImageFlow — Free Online Image Tools',
    description: 'Compress, convert, resize, crop, and edit images instantly. 100% free, 100% private. All processing in your browser — no uploads, no signup.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'ImageFlow — Free Online Image Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImageFlow — Free Online Image Tools',
    description: 'Compress, convert, resize, crop, and edit images instantly. 100% free & private.',
    images: [`${BASE_URL}/og-image.png`],
  },
  verification: {
    google: 'eGTKl5-SMFU8xaqm_y1NXf0Iz5Y7oANPjHMV2QXan-I',
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// JSON-LD Schema for the website
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ImageFlow',
  url: BASE_URL,
  description: 'Free online image tools — compress, convert, resize, crop, and edit images in your browser.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ImageFlow',
  url: BASE_URL,
  description: 'Free, privacy-first online image processing tools.',
  sameAs: [
    `https://github.com/saurabh20402-ai/imageflowpdf`,
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen" style={{ paddingTop: 'var(--nav-height)' }}>
            {children}
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--surface-card)',
                border: '1px solid var(--hairline-soft)',
                color: 'var(--ink)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
