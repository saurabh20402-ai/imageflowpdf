import '../blog-post.css';

export const metadata = {
  title: 'How to Compress Photo & Signature to 20KB/50KB for SSC & UPSC Exams',
  description: 'Complete guide to compress and resize photographs and signatures to 20KB, 50KB, and 100KB for SSC, UPSC, IBPS, and Railway online application forms.',
  alternates: {
    canonical: 'https://imageflow.in/blog/ssc-upsc-photo-size-compress-guide/',
  },
};

const FEATURES = [
  { title: 'SSC & UPSC Compliant', text: 'Compress to exact KB sizes (20KB, 50KB) required by portals.', bg: '#eef2ff' },
  { title: '100% Secure & Private', text: 'All compression happens in your browser. No files are uploaded.', bg: '#f5f3ff' },
  { title: 'Sharp Text & Faces', text: 'Preserve legibility of signatures and facial features.', bg: '#ecfdf5' },
];

const WHO_NEEDS = [
  { title: '📝 SSC Aspirants', detail: 'Compress photo to 20-50KB and signature to 10-20KB.' },
  { title: '🏛️ UPSC Applicants', detail: 'Resize photo and signature to between 20KB and 300KB.' },
  { title: '🚂 Railway & Banking', detail: 'Quickly adjust file sizes for RRB and IBPS applications.' },
  { title: '🎓 Board Students', detail: 'Shrink documents for school and college admission portals.' },
];

const STEPS = [
  'Go to the ImageFlow Compress Image tool.',
  'Upload your photograph or signature file.',
  'Choose JPEG as the output format (required by most portals).',
  'Adjust the quality slider (70% for 50KB, 50% for 20KB).',
  'Click Compress and download your portal-ready file.',
];

const USE_CASES = [
  'Compressing passport photo for SSC CGL / CHSL registration.',
  'Resizing signature scan for UPSC Civil Services application.',
  'Shrinking thumb impression scans for banking exams.',
  'Preparing marksheets and ID proofs for college admissions.',
];

const COMPARISON = [
  { feature: 'Precise KB Target', our: '✓', adobe: '✗', ilove: '✓' },
  { feature: '100% Offline/Private', our: '✓', adobe: '✗', ilove: '✗' },
  { feature: 'No Registration', our: '✓', adobe: '✗', ilove: '✗' },
  { feature: 'Mobile Friendly', our: '✓', md: '✓', ilove: '✓' },
];

const PRO_TIPS = [
  'Always sign on plain white paper with black ink for high contrast.',
  'Crop the signature closely to remove excess white space before compressing.',
  'Verify the file extension is .jpg or .jpeg before uploading.',
  'Check the dimension requirements (e.g., 3.5 x 4.5 cm for photos).',
];

const RELATED_TOOLS = [
  { title: 'Compress Image', description: 'Compress your photo to under 50KB.', href: '/tools/compress-image/' },
  { title: 'Resize Image', description: 'Change the width and height in pixels or cm.', href: '/tools/resize-image/' },
  { title: 'Passport Photo Maker', description: 'Create passport-size photos with presets.', href: '/tools/passport-photo-maker/' },
];

const FAQs = [
  {
    q: 'What is the photo size limit for SSC online forms?',
    a: 'For SSC, the photograph must be in JPEG format, between 20KB and 50KB, with dimensions of 3.5 cm (width) x 4.5 cm (height).',
  },
  {
    q: 'What is the signature size limit for SSC?',
    a: 'The signature must be in JPEG format, between 10KB and 20KB, with dimensions of 4.0 cm (width) x 2.0 cm (height).',
  },
  {
    q: 'How do I compress my photo to exactly 50KB?',
    a: 'Upload your photo to our Compress Image tool, select JPEG, and adjust the quality slider to around 70-80%. Check the preview size and download once it is under 50KB.',
  },
  {
    q: 'Why does the portal reject my signature?',
    a: 'This usually happens if the file size is over 20KB, the background is not plain white, or the signature is blurry. Use a black pen on white paper, crop it closely, and compress it to 15KB.',
  },
];

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Compress Photo & Signature to 20KB/50KB for SSC & UPSC Exams',
  description: 'Learn how to resize and compress photos and signatures for Indian government exam portals.',
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
  articleBody: 'Compress photo and signature to 20KB and 50KB for SSC and UPSC online forms using ImageFlow. Learn the official guidelines and step-by-step compression.',
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
    { '@type': 'ListItem', position: 3, name: 'SSC & UPSC Compress Guide', item: 'https://imageflow.in/blog/ssc-upsc-photo-size-compress-guide/' },
  ],
};

export default function SscUpscBlog() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <main className="blog-main">
        <article className="blog-article">
          <section className="blog-hero">
            <div className="blog-hero-content">
              <span className="blog-badge">🇮🇳 India Exam Form Guide</span>
              <h1>How to Compress Photo & Signature to 20KB/50KB for SSC & UPSC</h1>
              <p>Meet the strict file size limits of government recruitment portals. Compress and resize your application photos and signatures instantly in your browser.</p>
              <div className="blog-cta-buttons">
                <a href="/tools/compress-image/" className="btn-primary">Compress Photo Now</a>
                <a href="#how-to-compress" className="btn-secondary">Read Guide</a>
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
            <h2>Official Size Limits for Major Government Portals</h2>
            <p>Indian competitive exam portals have rigid validation scripts. If your file is even 1KB over the limit, the upload will fail. Here is a quick reference table:</p>
            <div className="grid-auto">
              {WHO_NEEDS.map((item) => (
                <div key={item.title} className="grid-card">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="how-to-compress" className="blog-section">
            <h2>Step-by-Step: Compress to 20KB or 50KB</h2>
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
            <h2>Pro Tips for Exam Form Photo Uploads</h2>
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
