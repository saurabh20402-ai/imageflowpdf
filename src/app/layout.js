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

export const metadata = {
  title: 'ImageFlow — Free Online Image Tools',
  description: 'Compress, convert, resize, crop, and edit images instantly. 100% free, 100% private. All processing happens in your browser.',
  keywords: 'image compressor, image converter, resize image, crop image, jpg to png, png to jpg, webp converter, image tools, free online tools',
  openGraph: {
    title: 'ImageFlow — Free Online Image Tools',
    description: 'Every image tool you need, in one place. 100% free and private.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
