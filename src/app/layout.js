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

const BASE_URL = 'https://imageflow.in/';
const GA_MEASUREMENT_ID = 'G-XH02BRCHFC';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ImageFlow: Free Online PDF and Image Tools (No Signup)',
    template: '%s — ImageFlow',
  },
  description: 'Use free online PDF and image tools to merge, split, compress, convert, resize, rotate, watermark, and sign files in your browser with no signup.',
  keywords: [
    'pdf tools', 'image tools', 'merge pdf', 'split pdf', 'compress pdf', 'rotate pdf',
    'watermark pdf', 'sign pdf', 'crop pdf', 'image compressor', 'image converter',
    'jpg to png', 'png to jpg', 'webp to png', 'webp to jpg', 'remove background',
    'image upscaler', 'passport photo maker', 'bulk format convert', 'image to pdf',
    'heic converter', 'resize image online', 'batch resize images',
  ],
  alternates: {
    canonical: 'https://imageflow.in/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: [
      { rel: 'icon', url: '/favicon.ico' },
    ],
  },
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
    title: 'ImageFlow: Free Online PDF and Image Tools (No Signup)',
    description: 'Merge, split, compress, rotate, watermark, sign, and convert PDF and image files instantly in your browser.',
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
    title: 'ImageFlow: Free Online PDF and Image Tools (No Signup)',
    description: 'Merge, split, compress, rotate, watermark, sign, and convert PDF and image files online for free.',
    images: [`${BASE_URL}/og-image.png`],
  },
  verification: {
    google: 'eGTKl5-SMFU8xaqm_y1NXf0Iz5Y7oANPjHMV2QXan-I',
  },
};

// JSON-LD Schema for the website
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ImageFlow',
  url: BASE_URL,
  description: 'Free online PDF and image tools for convert, compress, resize, merge, split, rotate, watermark, and sign workflows.',
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
  description: 'Free, privacy-first online PDF and image processing tools.',
  sameAs: [
    `https://github.com/saurabh20402-ai/imageflowpdf`,
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
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
          <main className="min-h-screen main-content">
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
