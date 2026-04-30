export const metadata = {
  title: 'Security — ImageFlow',
  description: 'How ImageFlow keeps your images and data secure.',
};

export default function SecurityPage() {
  const points = [
    { icon: '🔒', title: 'Zero Server Processing', body: 'Your images never leave your device. All image operations — compression, cropping, filtering, conversion — happen 100% in your browser using the HTML5 Canvas API. There are no servers receiving your files.' },
    { icon: '🛡️', title: 'No Account Required', body: 'ImageFlow requires no registration or login. We can\'t link your activity to an identity because we don\'t know who you are. No email, no password, no profile.' },
    { icon: '⚡', title: 'HTTPS Everywhere', body: 'All connections to ImageFlow are encrypted via HTTPS/TLS. This protects your session from eavesdropping even on public networks.' },
    { icon: '🧹', title: 'Auto-Clear History', body: 'Any processing history shown in the UI is stored in your browser\'s localStorage and automatically deleted after 8 hours. You can clear it manually at any time by clearing your browser storage.' },
    { icon: '🚫', title: 'No Third-Party Trackers', body: 'We do not use advertising networks, Meta Pixel, Google Analytics, or any third-party trackers that could associate your image usage with your identity.' },
    { icon: '📦', title: 'Open Architecture', body: 'ImageFlow\'s processing logic uses standard, well-audited Web APIs (Canvas, File, Blob). No proprietary black boxes handle your images.' },
    { icon: '🔑', title: 'Content Security Policy', body: 'We implement CSP headers to prevent cross-site scripting (XSS) attacks and reduce injection risks.' },
    { icon: '📋', title: 'Responsible Disclosure', body: 'If you discover a security vulnerability in ImageFlow, please contact us responsibly before public disclosure. We take all security reports seriously and will respond promptly.' },
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
