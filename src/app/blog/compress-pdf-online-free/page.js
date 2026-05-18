export const metadata = {
  title: 'Compress PDF Online Free Without Losing Quality (Fast, Secure & Easy)',
  description: 'Compress PDF online free without losing quality. Reduce file size instantly with a fast, secure, and easy-to-use tool. No signup required.',
};

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Compress PDF Online Free Without Losing Quality (Fast, Secure & Easy)',
  description: 'Learn how to compress PDF files online for free using ImageFlow. Reduce file size while maintaining quality.',
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
  articleBody: 'Compress PDF online free with ImageFlow. Reduce file size while keeping quality intact.',
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
      name: 'Compress PDF Online Free',
      item: 'https://imageflow.in/blog/compress-pdf-online-free/',
    },
  ],
};

export default function CompressPdfOnlineFreePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
                Compress PDF Online Free Without Losing Quality
              </h1>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.8, maxWidth: 760, color: '#475569' }}>
                Reduce PDF file size instantly with a fast and secure browser tool. No downloads, no signup, and no hidden steps — just reliable compression for clean, readable documents.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/tools/compress-pdf/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 180, padding: '16px 24px', borderRadius: 14, border: 'none', background: '#4338ca', color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
                Compress PDF Now
              </a>
              <a href="#pro-tips" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 180, padding: '16px 24px', borderRadius: 14, border: '1px solid #c7d2fe', background: '#fff', color: '#4338ca', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
                Read Tips
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginTop: 36 }}>
            {[
              { title: 'Fast compression', text: 'Shrink PDFs in seconds with smart optimization.', accent: '#eef2ff' },
              { title: 'Quality-first', text: 'Keep text sharp and images clear after compression.', accent: '#f5f3ff' },
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
              <h2 style={{ fontSize: 30, marginBottom: 18 }}>Why compress PDF online free?</h2>
              <p style={{ color: '#475569', fontSize: 17, lineHeight: 1.9, marginBottom: 24 }}>
                Large PDFs slow down sharing, waste storage, and hurt productivity. A fast online compressor removes file weight and keeps your document ready to send.
              </p>
              <ul style={{ color: '#334155', fontSize: 16, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
                <li style={{ marginBottom: 12 }}>Save storage space on desktop, laptop, or phone.</li>
                <li style={{ marginBottom: 12 }}>Send documents faster via email and chat.</li>
                <li style={{ marginBottom: 12 }}>Improve page load speed for published PDFs.</li>
                <li style={{ marginBottom: 12 }}>Keep important text and layout intact.</li>
              </ul>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 24, padding: '28px', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.06)' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#4338ca', marginBottom: 14 }}>What you get</p>
              <p style={{ margin: 0, fontSize: 16, color: '#334155', lineHeight: 1.8 }}>Smart PDF compression that keeps your document easy to read, fast to share, and small enough to fit any inbox.</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>How to compress PDF online in 5 easy steps</h2>
          <div style={{ display: 'grid', gap: 18 }}>
            {[
              'Open the PDF compressor page.',
              'Upload your PDF or drag it into the tool.',
              'Choose a balanced compression level.',
              'Start compression and wait a few seconds.',
              'Download your smaller, high-quality PDF.',
            ].map((step, index) => (
              <div key={step} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '22px 24px', borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ width: 34, height: 34, borderRadius: 14, background: '#4338ca', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 15 }}>{index + 1}</div>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#334155' }}>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40, background: '#f8fafc', borderRadius: 28, padding: '32px 30px' }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Better compression without blurry PDF results</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {[
              { title: 'Maintain text clarity', detail: 'Compress digital text without making it soft or unreadable.' },
              { title: 'Preserve image detail', detail: 'Shrink embedded images while keeping contrast and sharpness.' },
              { title: 'Smart data cleanup', detail: 'Remove metadata, unused fonts, and hidden file bulk.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '24px', borderRadius: 24, background: '#fff', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{item.title}</p>
                <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.8, color: '#475569' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pro-tips" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Pro tips for best PDF compression</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              'Start with a copy of your original PDF.',
              'Use medium compression for the best balance.',
              'Compress images before you insert them into the PDF.',
              'Remove unnecessary pages and blank sections.',
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
              { title: 'JPG to PNG', description: 'Convert images before adding them to your PDF.', href: '/tools/jpg-to-png/' },
              { title: 'Image to PDF', description: 'Turn scans and photos into a single document.', href: '/tools/image-to-pdf/' },
              { title: 'Resize Image', description: 'Shrink large pictures before PDF creation.', href: '/tools/resize-image/' },
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
              { question: 'Is it safe to compress PDF online?', answer: 'Yes. A trusted tool processes files in your browser and returns the compressed PDF immediately without storing your data longer than needed.' },
              { question: 'Is this tool free?', answer: 'Yes. ImageFlow lets you compress PDF online free with no signup and no hidden fees.' },
              { question: 'Can I compress large PDF files?', answer: 'Yes. Larger files may take a little more time, but the tool still works well in modern browsers and devices.' },
              { question: 'What is PDF compression?', answer: 'PDF compression removes extra data such as unused fonts and high-resolution images. Learn more on ', link: { href: 'https://en.wikipedia.org/wiki/PDF', text: 'Wikipedia' } },
            ].map((item) => (
              <div key={item.question} style={{ padding: '24px', borderRadius: 24, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 20 }}>{item.question}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#475569' }}>
                  {item.answer}
                  {item.link ? (
                    <a href={item.link.href} style={{ color: '#2563eb', textDecoration: 'underline' }}>{item.link.text}</a>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40, padding: 32, borderRadius: 28, background: 'linear-gradient(135deg, #eef2ff, #eff6ff)' }}>
          <div style={{ display: 'grid', gap: 20, alignItems: 'center', textAlign: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#4338ca', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Final thoughts</p>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 38px)', margin: '16px 0 0' }}>Compress PDF online free without the guesswork.</h2>
            </div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: '#334155', maxWidth: 760, marginInline: 'auto' }}>
              Use ImageFlow for reliable PDF compression that keeps quality intact, moves fast, and works on desktop and mobile. No signup, no extra apps, just a cleaner PDF experience.
            </p>
            <a href="/tools/compress-pdf/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px 28px', borderRadius: 14, background: '#4338ca', color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
              Try Compress PDF Now
            </a>
          </div>
        </section>
      </article>
    </main>
  );
}
