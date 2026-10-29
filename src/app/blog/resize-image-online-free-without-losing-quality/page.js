import '../blog-post.css';

export const metadata = {
  title: 'Resize Image Online Free — Scale Dimensions with High Clarity (20KB, 50KB, 100KB & More)',
  description: 'Resize images online free while preserving visual clarity. Easily resize images to 20KB, 50KB, 100KB, or 200KB with our fast, in-browser image resizer.',
  alternates: {
    canonical: 'https://imageflow.in/blog/resize-image-online-free-without-losing-quality/',
  },
};

const FEATURES = [
  { title: 'Smart resizing', text: 'Shrink images while keeping quality sharp and clear.', bg: '#eef2ff' },
  { title: 'Size targets', text: 'Resize to specific dimensions or file sizes easily.', bg: '#f5f3ff' },
  { title: 'No signup', text: 'Use the tool immediately on any browser or device.', bg: '#ecfdf5' },
];

const WHO_NEEDS = [
  { title: '🌐 Web developers', detail: 'Optimize images for faster website loading.' },
  { title: '📧 Email users', detail: 'Reduce image sizes for email attachments.' },
  { title: '📱 Social media', detail: 'Resize photos for perfect platform dimensions.' },
  { title: '☁️ Cloud storage', detail: 'Shrink images to save cloud storage space.' },
];

const STEPS = [
  'Upload your image or drag it into the resizer.',
  'Choose your target size or dimensions.',
  'Preview the result before downloading.',
  'Download your resized image instantly.',
];

const QUALITY_POINTS = [
  { title: 'Maintain image clarity', detail: 'Keep details sharp while reducing file size effectively.' },
  { title: 'Smart compression', detail: 'Automatically optimize dimensions and quality balance.' },
  { title: 'Flexible sizing', detail: 'Resize by dimensions, percentage, or target file size.' },
];

const USE_CASES = [
  'Optimize images for website performance and speed.',
  'Resize photos to specific dimensions for web layouts.',
  'Reduce image file sizes for email attachments.',
  'Prepare images for social media posting.',
];

const RESOLUTION_GUIDE = [
  { platform: 'Website Hero & Banners', resolution: '1920 × 1080 px (16:9)', targetSize: '150 – 300 KB', benefit: 'Crisp desktop display without slowing web page speed' },
  { platform: 'Blog & Article Headers', resolution: '1200 × 630 px (1.91:1)', targetSize: '80 – 150 KB', benefit: 'Optimal Open Graph ratio for social preview cards' },
  { platform: 'Social Media Feed Posts', resolution: '1080 × 1080 px (1:1)', targetSize: '100 – 200 KB', benefit: 'Eliminates platform aggressive downscaling compression' },
  { platform: 'Exam & Portal ID Photos', resolution: '35 × 45 mm (or portal spec)', targetSize: '20 – 50 KB', benefit: 'Meets official portal dimensional and file-size constraints' },
];

const PRO_TIPS = [
  'Always keep a backup of your original image.',
  'Test different quality settings for your use case.',
  'Resize images before uploading to save bandwidth.',
  'Use appropriate dimensions for your target platform.',
];

const RELATED_TOOLS = [
  { title: 'Compress Image', description: 'Reduce image file size without resizing.', href: '/tools/compress-image/' },
  { title: 'Crop Image', description: 'Crop images to perfect aspect ratios.', href: '/tools/crop-image/' },
  { title: 'Image to PDF', description: 'Convert resized images to PDF format.', href: '/tools/image-to-pdf/' },
];

const FAQs = [
  {
    q: 'Does resizing reduce image quality?',
    a: 'Downsizing dimensions preserves sharp visual detail. If you enlarge beyond original dimensions or apply heavy JPEG compression, some softness can occur.',
  },
  {
    q: 'Can I resize to specific file sizes like 100KB?',
    a: 'Yes, you can target specific file sizes like 20KB, 50KB, 100KB, or 200KB during resizing.',
  },
  {
    q: 'Is this tool free?',
    a: 'Yes, completely free with no signup or hidden fees required.',
  },
  {
    q: 'What image formats are supported?',
    a: 'We support JPG, PNG, and other common image formats for resizing.',
  },
  {
    q: 'Is my image secure?',
    a: 'Yes. All resizing operations execute client-side in your browser using local canvas resampling. Your images are never uploaded to ImageFlow application servers.',
  },
];

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Resize Image Online Free — Scale Dimensions with High Clarity (20KB, 50KB, 100KB & More)',
  description: 'Learn how to resize images online for free using ImageFlow while maintaining visual clarity.',
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
  articleBody: 'Free image resizer online with ImageFlow. Resize images while maintaining high visual clarity.',
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
      name: 'Resize Image Online Free',
      item: 'https://imageflow.in/blog/resize-image-online-free-without-losing-quality/',
    },
  ],
};

export default function ResizeImageOnlineFreePage() {
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
      <main className="blog-main">
        <article className="blog-article">
          <section className="blog-hero">
            <div className="blog-hero-content">
              <span className="blog-badge">⚡ Resize Images Free</span>
              <div>
                <h1>Resize Image Online Free — Scale Dimensions with High Clarity</h1>
                <p>Resize images fast and free with a tool that keeps quality intact. Shrink to specific dimensions, file sizes (20KB, 50KB, 100KB, 200KB), or percentages instantly.</p>
              </div>
              <div className="blog-cta-buttons">
                <a href="/tools/resize-image/" className="btn-primary">Resize Image Now</a>
                <a href="#why-resize" className="btn-secondary">Learn Why</a>
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

          <section id="why-resize" className="blog-section">
            <div className="two-column">
              <div className="column-text">
                <h2>Why resize images?</h2>
                <p>Large images slow down websites, waste storage space, and complicate sharing. Resizing lets you optimize images for any purpose while keeping them sharp and clear.</p>
                <ul>
                  <li>Faster website loading and better performance.</li>
                  <li>Save storage space on devices and cloud storage.</li>
                  <li>Prepare images for specific platforms and purposes.</li>
                  <li>Reduce email attachment sizes for easier sharing.</li>
                </ul>
              </div>
              <div className="info-box">
                <p>What you get</p>
                <p>A fast image resizer that lets you shrink images with perfect quality and precise control over dimensions and file size.</p>
              </div>
            </div>
          </section>

          <section className="blog-section">
            <h2>Who needs to resize images?</h2>
            <div className="grid-auto">
              {WHO_NEEDS.map((item) => (
                <div key={item.title} className="grid-card">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>How to resize images in 4 easy steps</h2>
            <div className="steps-grid">
              {STEPS.map((step, idx) => (
                <div key={idx} className="step-item">
                  <div className="step-number">{idx + 1}</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="quality-section blog-section">
            <h2>Resize while keeping quality sharp</h2>
            <div className="grid-auto">
              {QUALITY_POINTS.map((item) => (
                <div key={item.title} className="grid-card">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Recommended image dimensions by platform</h2>
            <p>Resizing your images to target display specifications avoids blurry automatic downsampling on social and web channels:</p>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Platform / Medium</th>
                    <th>Standard Resolution</th>
                    <th>Target Size</th>
                    <th>Key Benefit</th>
                  </tr>
                </thead>
                <tbody>
                  {RESOLUTION_GUIDE.map((row) => (
                    <tr key={row.platform}>
                      <td><strong>{row.platform}</strong></td>
                      <td>{row.resolution}</td>
                      <td>{row.targetSize}</td>
                      <td>{row.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="blog-section">
            <h2>Common image resizing use cases</h2>
            <div className="tips-grid">
              {USE_CASES.map((useCase) => (
                <div key={useCase} className="use-case-item">
                  <p>📌 {useCase}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Pro tips for better image resizing</h2>
            <div className="tips-grid">
              {PRO_TIPS.map((tip) => (
                <div key={tip} className="tip-item">
                  <p>💡 {tip}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Related tools</h2>
            <div className="grid-auto">
              {RELATED_TOOLS.map((tool) => (
                <a key={tool.title} href={tool.href} className="tool-card">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <span className="arrow">Use tool →</span>
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

          <section className="blog-section blog-cta">
            <div>
              <p className="cta-label">Start resizing</p>
              <h2>Resize images online free while maintaining sharp clarity.</h2>
            </div>
            <p>Use ImageFlow for fast image resizing that keeps quality intact, works instantly, and requires no signup.</p>
            <a href="/tools/resize-image/" className="btn-primary">Start Resizing Now →</a>
          </section>
        </article>
      </main>
    </>
  );
}
