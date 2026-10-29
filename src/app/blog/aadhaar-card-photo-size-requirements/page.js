import '../blog-post.css';

export const metadata = {
  title: 'Aadhaar Card Photo Size, Background & Verification Guidelines',
  description: 'Verified guidelines for Aadhaar card photo updates, in-person biometric capture rules, and standard 35x45mm photo formatting for Indian identity documents.',
  alternates: {
    canonical: 'https://imageflow.in/blog/aadhaar-card-photo-size-requirements/',
  },
  openGraph: {
    title: 'Aadhaar Card Photo Size, Background & Verification Guidelines — ImageFlow',
    description: 'Verified guidelines for Aadhaar card photo updates, in-person biometric capture rules, and standard 35x45mm photo formatting for Indian identity documents.',
    url: 'https://imageflow.in/blog/aadhaar-card-photo-size-requirements/',
    type: 'article',
    images: [{ url: 'https://imageflow.in/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadhaar Card Photo Size, Background & Verification Guidelines — ImageFlow',
    description: 'Verified guidelines for Aadhaar card photo updates, in-person biometric capture rules, and standard 35x45mm photo formatting for Indian identity documents.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const FEATURES = [
  { title: 'In-Person Biometrics', text: 'UIDAI captures Aadhaar photos live at authorized centers.', bg: '#eef2ff' },
  { title: 'Standard 35×45mm Size', text: 'Official dimensions for physical forms and Indian passport photos.', bg: '#f5f3ff' },
  { title: 'Local Browser Processing', text: 'Format your identity photos privately without server uploads.', bg: '#ecfdf5' },
];

const STEPS = [
  'Stand in front of a solid white or light-coloured background with balanced lighting.',
  'Capture a clear frontal photo looking directly into the camera with a neutral expression.',
  'Open the Passport Photo Maker tool on ImageFlow.',
  'Select the India 35×45mm preset (standard Indian passport and identity size).',
  'Align your face within the frame guidelines and download your formatted JPEG.',
];

const PRO_TIPS = [
  'Avoid wearing white clothing so your shoulders do not blend into the white background.',
  'Maintain a neutral expression with both eyes open and mouth closed.',
  'Ensure both ears are visible and there are no harsh shadows across your face.',
  'Tinted glasses and sunglasses are not allowed. Clear spectacles must have zero flash reflection.',
  'Remember that updating the photo on your Aadhaar card requires an in-person visit to an Aadhaar Seva Kendra.',
];

const RELATED_TOOLS = [
  { title: 'Passport Photo Maker', description: 'Create standard 35×45mm photos with precise presets.', href: '/tools/passport-photo-maker/' },
  { title: 'Crop Image', description: 'Crop and frame your portrait with custom dimensions.', href: '/tools/crop-image/' },
  { title: 'Compress Image', description: 'Reduce photo file size for online portal applications.', href: '/tools/compress-image/' },
];

const FAQs = [
  {
    q: 'Can I change my Aadhaar card photo online by uploading a file?',
    a: 'No. The Unique Identification Authority of India (UIDAI) does not permit online photo uploads for biometric updates. To update the photograph on your Aadhaar card, you must visit an authorized Aadhaar Seva Kendra (ASK) in person, where an operator captures your live photograph using their official digital camera.',
  },
  {
    q: 'What are the photo dimensions for Indian passport and KYC forms?',
    a: 'The standard photograph dimension for Indian identity documents, physical Aadhaar correction forms, and passport applications is 3.5 cm × 4.5 cm (35 mm × 45 mm). 2×2 inches (51×51 mm) is typically used for US visa and OCI applications, not standard domestic Indian identity documents.',
  },
  {
    q: 'What background color is required for Indian official photos?',
    a: 'UIDAI and Indian passport authorities specify a solid, plain white or very light off-white background without shadows or patterns.',
  },
  {
    q: 'What is the official source for Aadhaar guidelines?',
    a: 'Official guidelines and enrollment procedures are published directly by the Unique Identification Authority of India at uidai.gov.in.',
  },
];

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Aadhaar Card Photo Size, Background & Verification Guidelines',
  description: 'Accurate guidelines on Aadhaar card photo requirements, live biometric capture rules, and standard Indian 35x45mm photo specifications.',
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
  dateModified: '2026-10-11',
  articleBody: 'Detailed guide explaining UIDAI in-person biometric capture rules for Aadhaar card photo updates and standard 35x45mm photo specifications for Indian forms.',
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
              <h1>Aadhaar Card Photo Size, Background &amp; Verification Guidelines</h1>
              <p>Understand the official UIDAI rules for Aadhaar card photo updates, in-person biometric procedures, and standard 35×45mm photo sizing for physical forms and Indian KYC documents.</p>
              <div className="blog-cta-buttons">
                <a href="/tools/passport-photo-maker/" className="btn-primary">Format 35×45mm Photo</a>
                <a href="#requirements" className="btn-secondary">Check Official Rules</a>
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

          {/* Important UIDAI Notice Callout */}
          <section className="blog-section" style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--hairline)',
            borderRadius: 16,
            padding: '24px 28px',
          }}>
            <h2 style={{ color: 'var(--ink)', fontSize: 20, marginTop: 0, marginBottom: 12 }}>
              Important Official Notice: How Aadhaar Photo Updates Actually Work
            </h2>
            <p style={{ color: 'var(--body)', lineHeight: 1.7, marginBottom: 14 }}>
              Many online tutorials mistakenly suggest you can upload a self-taken digital photo directly to the <em>myAadhaar</em> portal to update your Aadhaar card picture. <strong>This is incorrect.</strong>
            </p>
            <p style={{ color: 'var(--body)', lineHeight: 1.7, margin: 0 }}>
              Under UIDAI regulations, changing your photograph is classified as a <strong>biometric update</strong>. You must visit an authorized Aadhaar Enrolment Centre or Aadhaar Seva Kendra in person. The operator captures your live photograph using their official equipment against a white backdrop. Digital photo formatting tools are used when preparing printed photographs (3.5 × 4.5 cm) for physical Aadhaar enrolment forms, PAN applications (NSDL/UTIITSL), and passport documentation.
            </p>
          </section>

          <section id="requirements" className="blog-section">
            <h2>Standard Indian Identity Photo Specifications</h2>
            <p>For physical submission forms and related Indian KYC documents, adhere to these official standards:</p>
            <ul>
              <li><strong>Dimensions:</strong> 3.5 cm width × 4.5 cm height (35 mm × 45 mm) at 300 DPI.</li>
              <li><strong>Background:</strong> Solid plain white or very light off-white. No shadows, gradients, or household patterns.</li>
              <li><strong>Facial Coverage:</strong> The face from chin to top of hair must occupy approximately 70% to 80% of the frame.</li>
              <li><strong>Posture &amp; Lighting:</strong> Full frontal view, both ears visible, neutral facial expression with closed mouth.</li>
              <li><strong>Official Source:</strong> Verify current enrolment guidelines directly at the <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer">UIDAI Official Portal</a>.</li>
            </ul>
          </section>

          <section className="blog-section">
            <h2>How to Format Your Photo Using ImageFlow</h2>
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
