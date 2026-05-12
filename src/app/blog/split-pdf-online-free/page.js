export const metadata = {
  title: 'Split PDF Online Free (Extract PDF Pages Instantly)',
  description: 'Split PDF online free and extract PDF pages into separate files instantly. Fast, secure, and easy-to-use PDF splitter tool with no signup required.',
};

export default function SplitPdfOnlineFreePage() {
  return (
    <main style={{ padding: '60px 20px', maxWidth: 980, margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#0f172a' }}>
      <article>
        <section style={{
          padding: '48px 32px',
          borderRadius: 32,
          background: 'linear-gradient(180deg, #eef2ff 0%, #ffffff 100%)',
          boxShadow: '0 28px 80px rgba(15, 23, 42, 0.08)',
          marginBottom: 40,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', textAlign: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 999, background: '#e0e7ff', color: '#4338ca', fontSize: 13, fontWeight: 700 }}>
              🚀 100% Free · No Signup Required
            </span>
            <div>
              <h1 style={{ fontSize: 'clamp(38px, 5vw, 56px)', lineHeight: 1.05, margin: '0 0 18px' }}>
                Split PDF Online Free Without Losing Quality
              </h1>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.8, maxWidth: 760, color: '#475569' }}>
                Extract specific pages from your PDF instantly with a fast and secure browser tool. No downloads, no signup, and no hidden steps — just split PDFs exactly how you need them.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/tools/split-pdf/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 180, padding: '16px 24px', borderRadius: 14, border: 'none', background: '#4338ca', color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
                Split PDF Now
              </a>
              <a href="#how-to-split" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 180, padding: '16px 24px', borderRadius: 14, border: '1px solid #c7d2fe', background: '#fff', color: '#4338ca', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
                Learn How
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginTop: 36 }}>
            {[
              { title: 'Instant extraction', text: 'Split PDFs in seconds with smart page selection.', accent: '#eef2ff' },
              { title: 'Quality preserved', text: 'Keep all text, images, and formatting intact.', accent: '#f5f3ff' },
              { title: 'No signup', text: 'Use the tool immediately on any browser or device.', accent: '#ecfdf5' },
            ].map((item) => (
              <div key={item.title} style={{ background: item.accent, borderRadius: 24, padding: '22px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: '#4338ca' }}>{item.title}</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: '#334155' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1.4fr 0.6fr' }}>
            <div>
              <h2 style={{ fontSize: 30, marginBottom: 18 }}>Why split PDF files?</h2>
              <p style={{ color: '#475569', fontSize: 17, lineHeight: 1.9, marginBottom: 24 }}>
                Large PDF files are hard to manage, share, and organize. Splitting them into individual pages or page ranges makes document handling simpler and more efficient.
              </p>
              <ul style={{ color: '#334155', fontSize: 16, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
                <li style={{ marginBottom: 12 }}>Extract specific pages without downloading the full document.</li>
                <li style={{ marginBottom: 12 }}>Share only the pages people actually need.</li>
                <li style={{ marginBottom: 12 }}>Organize long documents into smaller, focused files.</li>
                <li style={{ marginBottom: 12 }}>Reduce file size for easier storage and faster sharing.</li>
              </ul>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 24, padding: '28px', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.06)' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#4338ca', marginBottom: 14 }}>What you get</p>
              <p style={{ margin: 0, fontSize: 16, color: '#334155', lineHeight: 1.8 }}>A fast PDF splitter that lets you extract pages exactly as you need them, with perfect quality and zero complexity.</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Who needs to split PDFs?</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {[
              { title: '📚 Students', detail: 'Extract specific chapters from textbooks and notes.' },
              { title: '💼 Office workers', detail: 'Pull individual pages from reports and proposals.' },
              { title: '📋 Forms & documents', detail: 'Split multi-page forms into single-page PDFs.' },
              { title: '📑 Archive management', detail: 'Organize large documents into smaller, searchable files.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '24px', borderRadius: 24, background: '#fff', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{item.title}</p>
                <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.8, color: '#475569' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-to-split" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>How to split PDF online in 5 easy steps</h2>
          <div style={{ display: 'grid', gap: 18 }}>
            {[
              'Open the PDF splitter tool and upload your file.',
              'Select the page range or individual pages you want to extract.',
              'Choose whether to split into separate files or keep as ranges.',
              'Click split and wait a few seconds for processing.',
              'Download your split PDF files — ready to use!',
            ].map((step, index) => (
              <div key={step} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '22px 24px', borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ width: 34, height: 34, borderRadius: 14, background: '#4338ca', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 15 }}>{index + 1}</div>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#334155' }}>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40, background: '#f8fafc', borderRadius: 28, padding: '32px 30px' }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Split PDF without losing quality</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {[
              { title: 'Perfect text quality', detail: 'Every word stays sharp and readable after splitting.' },
              { title: 'Images stay intact', detail: 'All embedded images and graphics remain at full quality.' },
              { title: 'Formatting preserved', detail: 'Page layouts, fonts, and styling are never compromised.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '24px', borderRadius: 24, background: '#fff', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{item.title}</p>
                <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.8, color: '#475569' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Common PDF splitting use cases</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              'Extract a single chapter from a book or course material.',
              'Pull specific pages from a multi-page contract or invoice.',
              'Separate employee records or student transcripts.',
              'Create individual PDF files for each form section.',
            ].map((useCase) => (
              <div key={useCase} style={{ padding: '22px', borderRadius: 20, background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#334155' }}>✂️ {useCase}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Split PDF vs. other tools</h2>
          <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 700, color: '#0f172a' }}>Feature</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>Our tool</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>Adobe</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>iLovePDF</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Free to use', our: '✓', adobe: '✗', ilove: '✓' },
                    { feature: 'No signup needed', our: '✓', adobe: '✗', ilove: '✗' },
                    { feature: 'Fast processing', our: '✓', adobe: '✓', ilove: '✓' },
                    { feature: 'Secure browser-based', our: '✓', adobe: '✗', ilove: '✓' },
                    { feature: 'Mobile-friendly', our: '✓', adobe: '✓', ilove: '✓' },
                  ].map((row) => (
                    <tr key={row.feature} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 20px', color: '#334155' }}>{row.feature}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center', color: '#16a34a' }}>{row.our}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center', color: '#334155' }}>{row.adobe}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center', color: '#334155' }}>{row.ilove}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Pro tips for splitting PDFs</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              'Save the original PDF before splitting to keep a backup.',
              'Label split files clearly with page numbers or content type.',
              'Use batch splitting if you need to split multiple PDFs.',
              'Keep related pages together when possible for better organization.',
            ].map((tip) => (
              <div key={tip} style={{ padding: '22px', borderRadius: 20, background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#334155' }}>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Related tools you can use</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              { title: 'Merge PDF', description: 'Combine multiple PDFs into a single document.', href: '/tools/merge-pdf/' },
              { title: 'Compress PDF', description: 'Reduce file size while keeping quality intact.', href: '/tools/compress-pdf/' },
              { title: 'Image to PDF', description: 'Convert images into a single PDF file.', href: '/tools/image-to-pdf/' },
            ].map((tool) => (
              <a key={tool.title} href={tool.href} style={{ display: 'block', padding: '24px', borderRadius: 24, background: '#fff', border: '1px solid #e2e8f0', textDecoration: 'none', color: '#0f172a', transition: 'transform 150ms, boxShadow 150ms' }}>
                <h3 style={{ margin: 0, fontSize: 20 }}>{tool.title}</h3>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.75, color: '#475569' }}>{tool.description}</p>
                <p style={{ marginTop: 18, fontSize: 14, fontWeight: 700, color: '#4338ca' }}>Use tool →</p>
              </a>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { question: 'Is it safe to split PDF online?', answer: 'Yes. Our tool processes files in your browser and deletes them immediately after splitting. We never store your data on servers.' },
              { question: 'Is this tool free?', answer: 'Yes. ImageFlow lets you split PDF online free with no signup, no limits, and no hidden fees.' },
              { question: 'Can I split PDF pages into separate files?', answer: 'Yes. You can extract individual pages or page ranges, and each can be downloaded as a separate PDF file.' },
              { question: 'What file formats are supported?', answer: 'Our tool supports standard PDF files. For more about PDF formats, check ', link: { href: 'https://en.wikipedia.org/wiki/PDF', text: 'Wikipedia' } },
              { question: 'Does splitting reduce quality?', answer: 'No. Splitting preserves the original quality of text, images, and formatting perfectly.' },
              { question: 'How many pages can I split at once?', answer: 'You can split PDFs of any size. Larger files may take a bit longer, but the tool handles them reliably.' },
            ].map((item, index) => (
              <div key={item.question} style={{ padding: '24px', borderRadius: 24, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 12px 0', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{item.question}</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: '#475569' }}>
                  {item.answer}
                  {item.link && (
                    <a href={item.link.href} target="_blank" rel="noopener noreferrer" style={{ color: '#4338ca', fontWeight: 600, textDecoration: 'none' }}>
                      {item.link.text}
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40, background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)', borderRadius: 32, padding: '48px 32px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, margin: '0 0 16px 0', fontWeight: 800 }}>Ready to split your PDF?</h2>
          <p style={{ margin: '0 0 28px 0', fontSize: 17, lineHeight: 1.8, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Start splitting PDFs instantly with our fast, free, and secure tool. No signup, no downloads, no complications.
          </p>
          <a href="/tools/split-pdf/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px 32px', borderRadius: 14, background: '#ffffff', color: '#4338ca', fontSize: 16, fontWeight: 700, textDecoration: 'none', transition: 'transform 150ms' }}>
            Split PDF Now →
          </a>
        </section>
      </article>
    </main>
  );
}
