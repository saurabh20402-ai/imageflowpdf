import '../blog-post.css';

export const metadata = {
  title: 'Aadhaar Card Photo Size, Background & Upload Requirements',
  description: 'Understand the official photo size, white background requirements, and guidelines for Aadhaar card updates and enrollment.',
  alternates: {
    canonical: 'https://imageflow.in/blog/aadhaar-card-photo-size-requirements/',
  },
};

const FEATURES = [
  { title: 'White Background', text: 'Learn why UIDAI strictly requires a solid white background.', bg: '#eef2ff' },
  { title: 'Official Dimensions', text: 'Get the exact dimensions for print and digital uploads.', bg: '#f5f3ff' },
  { title: '100% Privacy', text: 'Prepare your identity documents securely in your browser.', bg: '#ecfdf5' },
];

const STEPS = [
  'Stand in front of a solid white or light-colored wall.',
  'Take a well-lit photo looking straight into the camera.',
  'Upload the image to the Passport Photo Maker on ImageFlow.',
  'Select the India Passport/Aadhaar preset (2x2 inches).',
  'Align your face within the guidelines and download.',
];

const PRO_TIPS = [
  'Do not wear white clothes, as they blend into the white background.',
  'Keep a neutral expression; smiling or showing teeth is not allowed.',
  'Ensure your ears are visible and there are no shadows on your face.',
  'Spectacles/glasses with tinted lenses or glare are not accepted.',
];

const RELATED_TOOLS = [
  { title: 'Passport Photo Maker', description: 'Create passport-size photos with presets.', href: '/tools/passport-photo-maker/' },
  { title: 'Remove Background', description: 'Make any background solid white in one click.', href: '/tools/remove-background/' },
  { title: 'Compress Image', description: 'Shrink photo file size for online uploads.', href: '/tools/compress-image/' },
];

const FAQs = [
  {
    q: 'What is the background color required for Aadhaar card photos?',
    a: 'UIDAI requires a solid white or very light grey background for Aadhaar card photos.',
  },
  {
    q: 'What is the photo size for Aadhaar card applications?',
    a: 'The official photo size is 2x2 inches (51x51 mm), which is the standard Indian passport size.',
  },
  {
    q: 'Can I upload a photo with a blue background?',
    a: 'No. UIDAI and Indian passport offices strictly reject photos with blue, red, or patterned backgrounds. Only white/off-white is accepted.',
  },
];

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Aadhaar Card Photo Size, Background & Upload Requirements',
  description: 'Official guidelines for Aadhaar card photo dimensions, background, and upload limits.',
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
  articleBody: 'Understand the official Aadhaar card photo size and background requirements. Learn how to prepare your photo for UIDAI portal updates.',
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
    { '@type': 'ListItem', position: 3, name: 'Aadhaar Photo Requirements', item: 'https://imageflow.in/blog/aadhaar-card-photo-size-requirements/' },
  ],
};

export default function AadhaarBlog() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <main className="blog-main">
        <article className="blog-article">
          <section className="blog-hero">
            <div className="blog-hero-content">
              <span className="blog-badge">🪪 Identity Document Guide</span>
              <h1>Aadhaar Card Photo Size, Background & Upload Requirements</h1>
              <p>Prepare your photo for Aadhaar updates. Learn the official UIDAI specifications for background, dimensions, and facial alignment to ensure quick approval.</p>
              <div className="blog-cta-buttons">
                <a href="/tools/passport-photo-maker/" className="btn-primary">Make Aadhaar Photo</a>
                <a href="#requirements" className="btn-secondary">Check Rules</a>
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

          <section id="requirements" className="blog-section">
            <h2>Official UIDAI Photo Specifications</h2>
            <p>To avoid delays or rejection when updating your Aadhaar card online or at an enrollment center, make sure your photo meets these criteria:</p>
            <ul>
              <li><strong>Background:</strong> Solid white or off-white. Avoid shadows.</li>
              <li><strong>Size:</strong> 2x2 inches (51x51 mm) or 3.5 x 4.5 cm.</li>
              <li><strong>Face Coverage:</strong> Close-up showing head and shoulders. Face must occupy 70-80% of the photo.</li>
              <li><strong>Eyes:</strong> Open and looking straight. No red-eye or glare on glasses.</li>
            </ul>
          </section>

          <section className="blog-section">
            <h2>How to Prepare Your Photo Using ImageFlow</h2>
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
            <h2>Important Rules to Remember</h2>
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
