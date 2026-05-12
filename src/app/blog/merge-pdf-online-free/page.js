import '../blog-post.css';

export const metadata = {
  title: 'Merge PDF Online Free (Fast, Secure & Easy)',
  description: 'Merge PDF online free and combine multiple PDF files into one instantly. Fast, secure, and easy-to-use PDF merger tool with no signup required.',
};

const FEATURES = [
  { title: 'Instant merging', text: 'Combine multiple PDFs in seconds with perfect ordering.', bg: '#eef2ff' },
  { title: 'Quality preserved', text: 'All text, images, and formatting remain perfectly intact.', bg: '#f5f3ff' },
  { title: 'No signup', text: 'Use the tool immediately on any browser or device.', bg: '#ecfdf5' },
];

const WHO_NEEDS = [
  { title: '📚 Students', detail: 'Combine chapters, assignments, and research into one document.' },
  { title: '💼 Office workers', detail: 'Merge reports, proposals, and meeting notes effortlessly.' },
  { title: '📋 Forms & documents', detail: 'Combine multi-part forms and applications into single PDFs.' },
  { title: '📑 Archive management', detail: 'Consolidate scattered documents into organized collections.' },
];

const STEPS = [
  'Open the PDF merger tool and upload your files.',
  'Arrange the PDFs in the order you want them combined.',
  'Preview the merged result to ensure correct arrangement.',
  'Click merge and wait a few seconds for processing.',
  'Download your merged PDF — ready to share and use!',
];

const QUALITY_POINTS = [
  { title: 'Perfect text quality', detail: 'Every word stays sharp and readable after merging.' },
  { title: 'Images stay intact', detail: 'All embedded images and graphics remain at full quality.' },
  { title: 'Formatting preserved', detail: 'Page layouts, fonts, and styling are never compromised.' },
];

const USE_CASES = [
  'Combine multiple chapters into one complete book or guide.',
  'Merge invoices and receipts into a single payment document.',
  'Combine employee records or student transcripts into one file.',
  'Consolidate multi-part applications into a single submission.',
];

const COMPARISON = [
  { feature: 'Free to use', our: '✓', adobe: '✗', ilove: '✓' },
  { feature: 'No signup needed', our: '✓', adobe: '✗', ilove: '✗' },
  { feature: 'Fast processing', our: '✓', adobe: '✓', ilove: '✓' },
  { feature: 'Secure browser-based', our: '✓', adobe: '✗', ilove: '✓' },
  { feature: 'Mobile-friendly', our: '✓', adobe: '✓', ilove: '✓' },
];

const PRO_TIPS = [
  'Arrange files in logical order before merging for better flow.',
  'Keep file sizes reasonable by merging similar document types together.',
  'Name merged files clearly with content descriptions.',
  'Save individual files separately as backups before merging.',
];

const RELATED_TOOLS = [
  { title: 'Split PDF', description: 'Extract specific pages from a PDF document.', href: '/tools/split-pdf/' },
  { title: 'Compress PDF', description: 'Reduce file size while keeping quality intact.', href: '/tools/compress-pdf/' },
  { title: 'Image to PDF', description: 'Convert images into a single PDF file.', href: '/tools/image-to-pdf/' },
];

const FAQs = [
  { q: 'Is it safe to merge PDF online?', a: 'Yes. Our tool processes files in your browser and deletes them immediately after merging. We never store your data on servers.' },
  { q: 'Is this tool free?', a: 'Yes. ImageFlow lets you merge PDF online free with no signup, no limits, and no hidden fees.' },
  { q: 'Can I reorder PDFs before merging?', a: 'Yes. You can drag and drop files to arrange them in any order before merging.' },
  { q: 'Does merging reduce quality?', a: 'No. Merging preserves the original quality of text, images, and formatting perfectly.' },
  { q: 'How many PDFs can I merge at once?', a: 'You can merge multiple PDFs of any size. Larger files may take a bit longer, but the tool handles them reliably.' },
];

export default function MergePdfOnlineFreePage() {
  return (
    <main className="blog-main">
      <article className="blog-article">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="blog-hero-content">
            <span className="blog-badge">🚀 100% Free · No Signup Required</span>
            <div>
              <h1>Merge PDF Online Free Without Losing Quality</h1>
              <p>Combine multiple PDF files into one instantly with a fast and secure browser tool. No downloads, no signup, and no hidden steps — just merge PDFs exactly how you need them.</p>
            </div>
            <div className="blog-cta-buttons">
              <a href="/tools/merge-pdf/" className="btn-primary">Merge PDF Now</a>
              <a href="#how-to-merge" className="btn-secondary">Learn How</a>
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
              <h2>Why merge PDF files?</h2>
              <p>Managing multiple PDF files is cumbersome and inefficient. Merging them into one unified document makes sharing, storing, and organizing much simpler and more professional.</p>
              <ul>
                <li>Combine related documents into a single, organized file.</li>
                <li>Share one file instead of multiple attachments.</li>
                <li>Create comprehensive documents from separate parts.</li>
                <li>Improve document management and archival efficiency.</li>
              </ul>
            </div>
            <div className="info-box">
              <p>What you get</p>
              <p>A fast PDF merger that lets you combine files exactly as you need them, with perfect quality and zero complexity.</p>
            </div>
          </div>
        </section>

        {/* Who Needs Section */}
        <section className="blog-section">
          <h2>Who needs to merge PDFs?</h2>
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
        <section id="how-to-merge" className="blog-section">
          <h2>How to merge PDF online in 5 easy steps</h2>
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
          <h2>Merge PDF without losing quality</h2>
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
          <h2>Common PDF merging use cases</h2>
          <div className="tips-grid">
            {USE_CASES.map((useCase) => (
              <div key={useCase} className="use-case-item">
                <p>🔗 {useCase}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="blog-section">
          <h2>Merge PDF vs. other tools</h2>
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
          <h2>Pro tips for merging PDFs</h2>
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
          <h2>Ready to merge your PDFs?</h2>
          <p>Start merging PDFs instantly with our fast, free, and secure tool. No signup, no downloads, no complications.</p>
          <a href="/tools/merge-pdf/" className="btn-primary">Merge PDF Now →</a>
        </section>
      </article>
    </main>
  );
}
