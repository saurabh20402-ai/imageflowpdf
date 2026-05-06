export const metadata = {
  title: 'JPG to PNG Converter Online Free (Fast, Secure & No Quality Loss)',
  description: 'Convert JPG to PNG online free without losing quality. Fast, secure, and easy-to-use image converter. No signup required.',
};

export default function JpgToPngConverterPage() {
  return (
    <main style={{ padding: '60px 20px', maxWidth: 980, margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#0f172a' }}>
      <article>
        <section style={{
          padding: '48px 32px',
          borderRadius: 32,
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          boxShadow: '0 28px 80px rgba(15, 23, 42, 0.08)',
          marginBottom: 40,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', textAlign: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 999, background: '#e0e7ff', color: '#4338ca', fontSize: 13, fontWeight: 700 }}>
              🌟 Free JPG to PNG Conversion
            </span>
            <div>
              <h1 style={{ fontSize: 'clamp(38px, 5vw, 56px)', lineHeight: 1.05, margin: '0 0 18px' }}>
                JPG to PNG Converter Online Free (Fast, Secure & No Quality Loss)
              </h1>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.8, maxWidth: 760, color: '#475569' }}>
                Convert JPG to PNG online free with a tool designed for sharp images, preserved colors, and transparent backgrounds. No signup, no app install — just instant quality conversion.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/tools/jpg-to-png/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 190, padding: '16px 24px', borderRadius: 14, border: 'none', background: '#4338ca', color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
                Convert JPG to PNG
              </a>
              <a href="#how-to-convert" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 190, padding: '16px 24px', borderRadius: 14, border: '1px solid #c7d2fe', background: '#fff', color: '#4338ca', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
                See the steps
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginTop: 36 }}>
            {[
              { title: 'No quality loss', text: 'Keep colors sharp and image detail intact after conversion.', accent: '#eef2ff' },
              { title: 'Transparency support', text: 'Convert JPG to PNG for transparent backgrounds and logos.', accent: '#f5f3ff' },
              { title: 'Fast and secure', text: 'Everything happens in your browser with no signup required.', accent: '#ecfdf5' },
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
              <h2 style={{ fontSize: 30, marginBottom: 18 }}>Why use a JPG to PNG converter online free?</h2>
              <p style={{ color: '#475569', fontSize: 17, lineHeight: 1.9, marginBottom: 24 }}>
                JPG is great for photos, but PNG is the better format for graphics, logos, and images that need transparency. Converting online gives you an instant result without changing your original quality.
              </p>
              <ul style={{ color: '#334155', fontSize: 16, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
                <li style={{ marginBottom: 12 }}>Supports transparent backgrounds for logos and overlays.</li>
                <li style={{ marginBottom: 12 }}>Preserves image quality with lossless PNG output.</li>
                <li style={{ marginBottom: 12 }}>Ideal for design, web graphics, and icon assets.</li>
                <li style={{ marginBottom: 12 }}>Avoids repeated compression loss from JPG edits.</li>
              </ul>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 24, padding: '28px', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.06)' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#4338ca', marginBottom: 14 }}>What this converter does</p>
              <p style={{ margin: 0, fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
                Converts JPG to PNG instantly, preserves your image detail, and lets you download the result without any watermark or signup barrier.
              </p>
            </div>
          </div>
        </section>

        <section id="how-to-convert" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>How to convert JPG to PNG online in 4 simple steps</h2>
          <div style={{ display: 'grid', gap: 18 }}>
            {[
              'Upload your JPG image to the converter.',
              'Click the convert button.',
              'Wait a few seconds for the conversion to finish.',
              'Download your PNG file.',
            ].map((step, index) => (
              <div key={step} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '22px 24px', borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ width: 34, height: 34, borderRadius: 14, background: '#4338ca', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 15 }}>{index + 1}</div>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#334155' }}>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40, background: '#f8fafc', borderRadius: 28, padding: '32px 30px' }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>What makes a great JPG to PNG converter?</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {[
              { title: 'Preserves color', detail: 'Keep vivid tones and accurate color after converting to PNG.' },
              { title: 'Maintains sharpness', detail: 'Convert without adding blur or losing clarity in edges.' },
              { title: 'Handles transparency', detail: 'Supports PNG transparency for logos, icons, and overlays.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '24px', borderRadius: 24, background: '#fff', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{item.title}</p>
                <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.8, color: '#475569' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>JPG vs PNG — choose the right format</h2>
          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {[
              { label: 'JPG', features: ['Smaller file size', 'Lossy compression', 'Best for photos'], accent: '#fff' },
              { label: 'PNG', features: ['Larger file size', 'Lossless compression', 'Supports transparency'], accent: '#f8fafc' },
            ].map((item) => (
              <div key={item.label} style={{ padding: '24px', borderRadius: 24, background: item.accent, border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: 0, fontSize: 20, color: '#0f172a' }}>{item.label}</h3>
                <ul style={{ paddingLeft: 20, margin: '16px 0 0', color: '#334155', lineHeight: 1.8 }}>
                  {item.features.map(feature => (
                    <li key={feature} style={{ marginBottom: 10 }}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Pro tips for better JPG to PNG conversion</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              'Use PNG for logos, icons, and graphics.',
              'Avoid converting the same image multiple times.',
              'Keep a backup of the original JPG file.',
              'Resize large images before converting for faster results.',
            ].map((tip) => (
              <div key={tip} style={{ padding: '22px', borderRadius: 20, background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#334155' }}>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, marginBottom: 18 }}>Related tools for image conversion</h2>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              { title: 'PNG to JPG', description: 'Convert PNG files back to JPG quickly.', href: '/tools/png-to-jpg/' },
              { title: 'Resize Image', description: 'Resize images before or after conversion.', href: '/tools/resize-image/' },
              { title: 'Image to PDF', description: 'Turn your converted PNGs into PDF documents.', href: '/tools/image-to-pdf/' },
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
              { question: 'Does JPG to PNG conversion reduce quality?', answer: 'No. PNG uses lossless compression, so your converted image keeps its original detail and color accuracy.' },
              { question: 'Is this tool free?', answer: 'Yes. It is completely free and works without signup on all modern browsers.' },
              { question: 'Can I convert multiple images?', answer: 'Yes, depending on your browser and device performance, you can convert multiple files one at a time.' },
              { question: 'What is the best use for PNG?', answer: 'Use PNG for logos, icons, illustrations, and any image that needs a transparent background or sharp edges.' },
            ].map((item) => (
              <div key={item.question} style={{ padding: '24px', borderRadius: 24, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 20 }}>{item.question}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#475569' }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40, padding: 32, borderRadius: 28, background: 'linear-gradient(135deg, #eef2ff, #eff6ff)' }}>
          <div style={{ display: 'grid', gap: 20, alignItems: 'center', textAlign: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#4338ca', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Final thoughts</p>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 38px)', margin: '16px 0 0' }}>Convert JPG to PNG online free with quality you can trust.</h2>
            </div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: '#334155', maxWidth: 760, marginInline: 'auto' }}>
              Use our JPG to PNG converter for crisp results, instant downloads, and support for transparent backgrounds. It’s fast, free, and built to keep your images looking their best.
            </p>
            <a href="/tools/jpg-to-png/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px 28px', borderRadius: 14, background: '#4338ca', color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
              Convert JPG to PNG Now
            </a>
          </div>
        </section>
      </article>
    </main>
  );
}
