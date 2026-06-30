import '../blog-post.css';

export const metadata = {
  title: 'How to Compress a PDF to Fit Gmail & Outlook 25MB Limit',
  description: 'Learn how to reduce your PDF file size to under 25MB for Gmail and Outlook email attachments without losing text or image quality.',
  alternates: {
    canonical: 'https://imageflow.in/blog/compress-pdf-email-attachment-limit/',
  },
};

const FEATURES = [
  { title: 'Bypass Email Limits', text: 'Shrink your PDFs to under 25MB to attach them directly.', bg: '#eef2ff' },
  { title: 'Keep Text Readable', text: 'Vector-safe compression keeps text sharp and clear.', bg: '#f5f3ff' },
  { title: '100% Secure', text: 'Done locally in your browser. No files are uploaded to servers.', bg: '#ecfdf5' },
];

const STEPS = [
  'Go to the Compress PDF tool on ImageFlow.',
  'Upload the PDF file that exceeds the 25MB limit.',
  'Choose the "Recommended Compression" level.',
  'Click "Compress PDF" and wait a few seconds for processing.',
  'Download your optimized PDF, now ready for email attachment.',
];

const PRO_TIPS = [
  'Gmail and Outlook both have a strict 25MB limit. Aim for 23MB or less to be safe.',
  'If your PDF is still over 25MB after compression, consider using our Split PDF tool to send it in parts.',
  'Remove unnecessary pages or high-resolution images from the document before converting to PDF.',
];

const RELATED_TOOLS = [
  { title: 'Compress PDF', description: 'Shrink your PDF file size.', href: '/tools/compress-pdf/' },
  { title: 'Split PDF', description: 'Extract pages to make smaller files.', href: '/tools/split-pdf/' },
  { title: 'Merge PDF', description: 'Combine multiple PDFs into one.', href: '/tools/merge-pdf/' },
];

const FAQs = [
  {
    q: 'What is the maximum PDF size I can send via Gmail?',
    a: 'The maximum attachment limit for both Gmail and Outlook is 25MB. If your file is larger, it will be uploaded to Google Drive or OneDrive as a link instead of a direct attachment.',
  },
  {
    q: 'Will compressing my PDF make the text blurry?',
    a: 'No. Our compression tool uses vector-safe optimization which keeps text and document layouts perfectly sharp, only compressing embedded images and removing unnecessary metadata.',
  },
  {
    q: 'Is it safe to compress confidential documents here?',
    a: 'Yes. ImageFlow processes all files locally in your web browser using WebAssembly. Your documents are never uploaded to any server, ensuring complete privacy.',
  },
];

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Compress a PDF to Fit Gmail & Outlook 25MB Limit',
  description: 'Step-by-step guide to reducing PDF file size for email attachments.',
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
  articleBody: 'Learn how to compress large PDF files to fit within the 25MB attachment limit of Gmail and Outlook. Step-by-step guide using ImageFlow.',
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
    { '@type': 'ListItem', position: 3, name: 'Compress PDF for Email Guide', item: 'https://imageflow.in/blog/compress-pdf-email-attachment-limit/' },
  ],
};

export default function CompressPdfEmailBlog() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <main className="blog-main">
        <article className="blog-article">
          <section className="blog-hero">
            <div className="blog-hero-content">
              <span className="blog-badge">📧 Email Attachment Guide</span>
              <h1>How to Compress a PDF to Fit Gmail & Outlook 25MB Limit</h1>
              <p>Bypass the "File too large" error when sending emails. Reduce your PDF size under 25MB instantly in your browser while keeping all text and images perfectly readable.</p>
              <div className="blog-cta-buttons">
                <a href="/tools/compress-pdf/" className="btn-primary">Compress PDF Now</a>
                <a href="#how-to-compress" className="btn-secondary">Learn How</a>
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
            <h2>Why Do Email Clients Have a 25MB Limit?</h2>
            <p>Gmail, Outlook, Yahoo, and other major email providers limit attachments to 25MB to prevent email servers from being overloaded. If you try to send a larger file, it will be rejected or uploaded as a cloud link, which can be inconvenient for the recipient. Compressing the PDF is the cleanest solution.</p>
          </section>

          <section id="how-to-compress" className="blog-section">
            <h2>Step-by-Step: Compress PDF Under 25MB</h2>
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
