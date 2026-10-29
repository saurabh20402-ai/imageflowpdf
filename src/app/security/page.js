export const metadata = {
  title: 'Security Standards',
  description: 'How ImageFlow keeps your files and data secure with client-side browser processing.',
  alternates: {
    canonical: 'https://imageflow.in/security/',
  },
  openGraph: {
    title: 'Security Standards — ImageFlow',
    description: 'How ImageFlow keeps your files and data secure with client-side browser processing.',
    url: 'https://imageflow.in/security/',
    type: 'website',
    images: [{ url: 'https://imageflow.in/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Standards — ImageFlow',
    description: 'How ImageFlow keeps your files and data secure with client-side browser processing.',
  },
};

export default function SecurityPage() {
  const points = [
    { icon: '🔒', title: 'Client-Side File Processing', body: 'Your personal documents and photographs are processed directly on your device using client-side browser APIs. Standard utility operations (compress, resize, format convert, PDF tools) do not transmit or store your files on ImageFlow application servers.' },
    { icon: '🛡️', title: 'No Account Required', body: 'ImageFlow requires no registration or login. We cannot link your activity to an identity because we do not collect names, passwords, or profile credentials.' },
    { icon: '⚡', title: 'HTTPS Everywhere', body: 'All connections to ImageFlow are encrypted via HTTPS/TLS. This protects your session and data in transit from eavesdropping.' },
    { icon: '🧹', title: 'Local Browser Preferences', body: 'Any processing preferences or local UI states are stored in your browser\'s localStorage and can be cleared manually at any time by clearing your browser cache.' },
    { icon: '📊', title: 'Transparent Telemetry & Ad Standards', body: 'We utilize Google Analytics 4 and Ahrefs Web Analytics solely for aggregate traffic and performance telemetry, and Google AdSense for advertising. We never transmit your document or image contents to advertising or analytics networks.' },
    { icon: '📦', title: 'Standard Web Standards & WebAssembly', body: 'ImageFlow\'s processing logic uses standard, well-audited Web APIs (Canvas, File, Blob, pdf-lib) and client-side WebAssembly (.wasm) modules (pdfjs-dist) executed locally in your browser. No proprietary background software or installers handle your files.' },
    { icon: '🤖', title: 'Optional AI Prompt Routing', body: 'When you choose to use the AI Generator in the Thumbnail Creator, text prompts are transmitted securely via TLS to Google Gemini and Pollinations APIs. Image rendering and composition remain strictly client-side.' },
    { icon: '🔑', title: 'Safe Script Loading', body: 'All static application assets and third-party scripts are loaded over verified HTTPS endpoints to reduce injection and tampering risks.' },
    { icon: '📋', title: 'Responsible Disclosure', body: 'If you discover a security vulnerability in ImageFlow, please contact us responsibly at thewebrisecompany@gmail.com. We investigate all security reports promptly.' },
  ];

  return (
    <main style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: 10 }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 14 }}>Security</h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 580 }}>
            We've designed ImageFlow from the ground up with security and privacy at the core. Here's exactly how we keep your images safe.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {points.map((p) => (
            <div key={p.title} style={{
              padding: '22px 24px', borderRadius: 16,
              background: 'var(--surface-card)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
