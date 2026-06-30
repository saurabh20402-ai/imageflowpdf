import '../blog-post.css';

export const metadata = {
  title: 'How to Convert HEIC iPhone Photos to JPG for Free (Offline)',
  description: 'Easily convert Apple HEIC photos to standard JPG format for free. Learn how to do it offline in your browser to protect your privacy.',
  alternates: {
    canonical: 'https://imageflow.in/blog/convert-heic-to-jpg-iphone-free/',
  },
};

const FEATURES = [
  { title: '100% Offline & Private', text: 'Files are processed locally in your browser. No server uploads.', bg: '#eef2ff' },
  { title: 'Keep Original Quality', text: 'Convert without losing details or compression artifacts.', bg: '#f5f3ff' },
  { title: 'Batch Conversion', text: 'Convert multiple HEIC files at once and download as a ZIP.', bg: '#ecfdf5' },
];

const STEPS = [
  'Go to the HEIC Converter on ImageFlow.',
  'Click "Choose Files" or drag-and-drop your .heic images.',
  'The tool will instantly convert them to .jpg in your browser.',
  'Click "Download" or "Download All" for batch conversions.',
];

const PRO_TIPS = [
  'Government and school portals only accept JPEG/JPG. Convert your HEIC files before uploading.',
  'Use WebP as an alternative output format if you are uploading to a website for faster load speeds.',
  'HEIC files are smaller on your phone, so only convert them when compatibility is required.',
];

const RELATED_TOOLS = [
  { title: 'HEIC Converter', description: 'Convert HEIC files to JPG or PNG.', href: '/tools/heic-converter/' },
  { title: 'Convert Format', description: 'Convert between any image formats.', href: '/tools/convert-format/' },
  { title: 'Compress Image', description: 'Reduce JPG file size after conversion.', href: '/tools/compress-image/' },
];

const FAQs = [
  {
    q: 'Why does my iPhone save photos as HEIC?',
    a: 'Apple uses HEIC (High Efficiency Image Container) because it compresses images to about half the size of a JPEG while maintaining the same quality.',
  },
  {
    q: 'Why was my photo rejected by the website portal?',
    a: 'Most older website portals (including government, school, and job portals) do not support the HEIC format. You must convert them to JPG first.',
  },
  {
    q: 'Is it safe to convert my private photos online?',
    a: 'Yes, on ImageFlow. Since all processing is done locally in your browser using JavaScript, your photos are never uploaded to any server, keeping them 100% private.',
  },
];

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Convert HEIC iPhone Photos to JPG for Free (Offline)',
  description: 'Convert iPhone HEIC photos to JPEG format for free, offline, and privately.',
  image: 'https://imageflow.in/og-image.png',
  author: {
    '@type': 'Organization',
    name: 'ImageFlow',
    url: 'https://imageflow.in',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ImageFlow',
    logo: {
      '@type': 'ImageObject',
      url: 'https://imageflow.in/favicon.ico',
    },
  },
  datePublished: '2026-06-30',
  dateModified: '2026-06-30',
  articleBody: 'Learn how to convert HEIC photos from your iPhone to standard JPG format. Free, instant, and completely offline in your browser.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://imageflow.in/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://imageflow.in/blog/' },
    { '@type': 'ListItem', position: 3, name: 'HEIC to JPG Guide', item: 'https://imageflow.in/blog/convert-heic-to-jpg-iphone-free/' },
  ],
};

export default function HeicBlog() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <main className="blog-main">
        <article className="blog-article">
          <section className="blog-hero">
            <div className="blog-hero-content">
              <span className="blog-badge">📱 iPhone Photo Compatibility</span>
              <h1>How to Convert HEIC iPhone Photos to JPG for Free</h1>
              <p>Solve the "Unsupported File Format" error on web portals. Convert Apple HEIC images to standard JPG format instantly, securely, and completely offline.</p>
              <div className="blog-cta-buttons">
                <a href="/tools/heic-converter/" className="btn-primary">Convert HEIC Now</a>
                <a href="#how-to-convert" className="btn-secondary">View Steps</a>
              </div>
            </div>
            <div className="blog-features">
              {FEATURES.map((item) => (
                <div key={item.title} className="feature-item" style={{ backgroundColor: item.bg }}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>The HEIC vs JPG Compatibility Issue</h2>
            <p>While Apple\'s HEIC format saves storage, most online systems cannot read it. Whether you are uploading documents to a school portal, applying for a visa, or filing taxes, converting to JPG is usually required.</p>
          </section>

          <section id="how-to-convert" className="blog-section">
            <h2>Step-by-Step: Convert HEIC to JPG Offline</h2>
            <div className="steps-grid">
              {STEPS.map((step, idx) => (
                <div key={idx} className="step-item">
                  <div className="step-number">{idx + 1}</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Pro Tips</h2>
            <div className="tips-grid">
              {PRO_TIPS.map((tip) => (
                <div key={tip} className="tip-item">
                  <p>💡 {tip}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Related Tools</h2>
            <div className="grid-auto">
              {RELATED_TOOLS.map((tool) => (
                <a key={tool.title} href={tool.href} className="tool-card">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <span>Use tool →</span>
                </a>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              {FAQs.map((faq) => (
                <div key={faq.q} className="faq-item">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
