import '../blog-post.css';

export const metadata = {
  title: 'Split PDF Online Free (Extract PDF Pages Instantly)',
  description: 'Split PDF online free and extract PDF pages into separate files instantly. Fast, secure, and easy-to-use PDF splitter tool with no signup required.',
};

const FEATURES = [
  { title: 'Instant extraction', text: 'Split PDFs in seconds with smart page selection.', bg: '#eef2ff' },
  { title: 'Quality preserved', text: 'Keep all text, images, and formatting intact.', bg: '#f5f3ff' },
  { title: 'No signup', text: 'Use the tool immediately on any browser or device.', bg: '#ecfdf5' },
];

const WHO_NEEDS = [
  { title: '📚 Students', detail: 'Extract specific chapters from textbooks and notes.' },
  { title: '💼 Office workers', detail: 'Pull individual pages from reports and proposals.' },
  { title: '📋 Forms & documents', detail: 'Split multi-page forms into single-page PDFs.' },
  { title: '📑 Archive management', detail: 'Organize large documents into smaller, searchable files.' },
];

const STEPS = [
  'Open the PDF splitter tool and upload your file.',
  'Select the page range or individual pages you want to extract.',
  'Choose whether to split into separate files or keep as ranges.',
  'Click split and wait a few seconds for processing.',
  'Download your split PDF files — ready to use!',
];

const QUALITY_POINTS = [
  { title: 'Perfect text quality', detail: 'Every word stays sharp and readable after splitting.' },
  { title: 'Images stay intact', detail: 'All embedded images and graphics remain at full quality.' },
  { title: 'Formatting preserved', detail: 'Page layouts, fonts, and styling are never compromised.' },
];

const USE_CASES = [
  'Extract a single chapter from a book or course material.',
  'Pull specific pages from a multi-page contract or invoice.',
  'Separate employee records or student transcripts.',
  'Create individual PDF files for each form section.',
];

const COMPARISON = [
  { feature: 'Free to use', our: '✓', adobe: '✗', ilove: '✓' },
  { feature: 'No signup needed', our: '✓', adobe: '✗', ilove: '✗' },
  { feature: 'Fast processing', our: '✓', adobe: '✓', ilove: '✓' },
  { feature: 'Secure browser-based', our: '✓', adobe: '✗', ilove: '✓' },
  { feature: 'Mobile-friendly', our: '✓', adobe: '✓', ilove: '✓' },
];

const PRO_TIPS = [
  'Save the original PDF before splitting to keep a backup.',
  'Label split files clearly with page numbers or content type.',
  'Use batch splitting if you need to split multiple PDFs.',
  'Keep related pages together when possible for better organization.',
];

const RELATED_TOOLS = [
  { title: 'Merge PDF', description: 'Combine multiple PDFs into a single document.', href: '/tools/merge-pdf/' },
  { title: 'Compress PDF', description: 'Reduce file size while keeping quality intact.', href: '/tools/compress-pdf/' },
  { title: 'Image to PDF', description: 'Convert images into a single PDF file.', href: '/tools/image-to-pdf/' },
];

const FAQs = [
  { q: 'Is it safe to split PDF online?', a: 'Yes. Our tool processes files in your browser and deletes them immediately after splitting. We never store your data on servers.' },
  { q: 'Is this tool free?', a: 'Yes. ImageFlow lets you split PDF online free with no signup, no limits, and no hidden fees.' },
  { q: 'Can I split PDF pages into separate files?', a: 'Yes. You can extract individual pages or page ranges, and each can be downloaded as a separate PDF file.' },
  { q: 'Does splitting reduce quality?', a: 'No. Splitting preserves the original quality of text, images, and formatting perfectly.' },
  { q: 'How many pages can I split at once?', a: 'You can split PDFs of any size. Larger files may take a bit longer, but the tool handles them reliably.' },
];

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Split PDF Online Free (Extract PDF Pages Instantly)',
  description: 'Learn how to split PDF files online for free using ImageFlow. Extract specific pages from PDFs in seconds with no signup required.',
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
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  articleBody: 'Split PDF online free with ImageFlow. Extract specific pages from your PDF files instantly.',
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
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://imageflow.in/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://imageflow.in/blog/',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Split PDF Online Free',
      item: 'https://imageflow.in/blog/split-pdf-online-free/',
    },
  ],
};

export default function SplitPdfOnlineFreePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="blog-article">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="blog-hero-content">
            <span className="blog-badge">🚀 100% Free · No Signup Required</span>
            <div>
              <h1>Split PDF Online Free Without Losing Quality</h1>
              <p>Extract specific pages from your PDF instantly with a fast and secure browser tool. No downloads, no signup, and no hidden steps — just split PDFs exactly how you need them.</p>
            </div>
            <div className="blog-cta-buttons">
              <a href="/tools/split-pdf/" className="btn-primary">Split PDF Now</a>
              <a href="#how-to-split" className="btn-secondary">Learn How</a>
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

        {/* Why Section */}
        <section className="blog-section">
          <div className="two-column">
            <div className="column-text">
              <h2>Why split PDF files?</h2>
              <p>Large PDF files are hard to manage, share, and organize. Splitting them into individual pages or page ranges makes document handling simpler and more efficient.</p>
              <ul>
                <li>Extract specific pages without downloading the full document.</li>
                <li>Share only the pages people actually need.</li>
                <li>Organize long documents into smaller, focused files.</li>
                <li>Reduce file size for easier storage and faster sharing.</li>
              </ul>
            </div>
            <div className="info-box">
              <p>What you get</p>
              <p>A fast PDF splitter that lets you extract pages exactly as you need them, with perfect quality and zero complexity.</p>
            </div>
          </div>
        </section>

        {/* Who Needs Section */}
        <section className="blog-section">
          <h2>Who needs to split PDFs?</h2>
          <div className="grid-auto">
            {WHO_NEEDS.map((item) => (
              <div key={item.title} className="grid-card">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How To Section */}
        <section id="how-to-split" className="blog-section">
          <h2>How to split PDF online in 5 easy steps</h2>
          <div className="steps-grid">
            {STEPS.map((step, idx) => (
              <div key={idx} className="step-item">
                <div className="step-number">{idx + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Section */}
        <section className="quality-section blog-section">
          <h2>Split PDF without losing quality</h2>
          <div className="grid-auto">
            {QUALITY_POINTS.map((item) => (
              <div key={item.title} className="grid-card">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="blog-section">
          <h2>Common PDF splitting use cases</h2>
          <div className="tips-grid">
            {USE_CASES.map((useCase) => (
              <div key={useCase} className="use-case-item">
                <p>✂️ {useCase}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="blog-section">
          <h2>Split PDF vs. other tools</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Our tool</th>
                  <th>Adobe</th>
                  <th>iLovePDF</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td className="check">✓</td>
                    <td>{row.adobe === '✓' ? <span className="check">✓</span> : <span className="cross">✗</span>}</td>
                    <td>{row.ilove === '✓' ? <span className="check">✓</span> : <span className="cross">✗</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="blog-section">
          <h2>Pro tips for splitting PDFs</h2>
          <div className="tips-grid">
            {PRO_TIPS.map((tip) => (
              <div key={tip} className="tip-item">
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="blog-section">
          <h2>Related tools you can use</h2>
          <div className="tools-grid">
            {RELATED_TOOLS.map((tool) => (
              <a key={tool.title} href={tool.href} className="tool-card">
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <span className="arrow">Use tool →</span>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section className="cta-section">
          <h2>Ready to split your PDF?</h2>
          <p>Start splitting PDFs instantly with our fast, free, and secure tool. No signup, no downloads, no complications.</p>
          <a href="/tools/split-pdf/" className="btn-primary">Split PDF Now →</a>
        </section>
      </article>
    </main>
  );
}
