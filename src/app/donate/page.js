export const metadata = {
  title: 'Donate — Support ImageFlow',
  description: 'Support ImageFlow to help us keep all tools free and build more features.',
};

export default function DonatePage() {
  return (
    <main style={{ padding: '60px 0 100px' }}>
      <div className="container" style={{ maxWidth: 700 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>💖</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Support ImageFlow
          </h1>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            ImageFlow is completely free, with no ads and no data selling. If our tools have saved you time or helped your work,
            consider supporting us to keep the lights on.
          </p>
        </div>

        {/* Why donate */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 48,
        }}>
          {[
            { icon: '🚀', title: 'More Tools', desc: 'Your support helps us build new image tools and features.' },
            { icon: '⚡', title: 'Faster Processing', desc: 'Donations fund performance improvements and optimizations.' },
            { icon: '🔒', title: 'Stay Free', desc: 'Help us keep all tools free, with no ads or subscriptions.' },
            { icon: '🌍', title: 'Help Everyone', desc: 'Free tools help students, artists, and small businesses globally.' },
          ].map(item => (
            <div key={item.title} style={{
              padding: '20px', borderRadius: 14,
              background: 'var(--surface-card)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Donate options */}
        <div style={{
          padding: '36px', borderRadius: 20,
          background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--surface-card) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.15)',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.08)',
          marginBottom: 32,
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Make a Donation</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28 }}>
            Every contribution, big or small, makes a real difference.
          </p>

          {/* Bank Transfer */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Bank Transfer</h3>
            <div style={{
              background: 'var(--surface-card)', borderRadius: 12,
              border: '1px solid var(--hairline)', overflow: 'hidden',
            }}>
              {[
                ['Bank Name', 'Your Bank Name Here'],
                ['Account Name', 'ImageFlow'],
                ['Account Number', 'XXXX XXXX XXXX XXXX'],
                ['IFSC / SWIFT Code', 'XXXXXXXX'],
                ['UPI ID', 'imageflow@upi'],
              ].map(([label, value]) => (
                <div key={label} style={{
                  display: 'flex', gap: 16, padding: '12px 16px',
                  borderBottom: '1px solid var(--hairline-soft)',
                }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)', minWidth: 140, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'monospace' }}>{value}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
              * Please update with your actual bank details before publishing.
            </p>
          </div>

          {/* QR Code placeholder */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Scan to Pay (UPI / QR)</h3>
            <div style={{
              width: 180, height: 180, borderRadius: 14,
              background: 'var(--surface)', border: '2px dashed var(--hairline)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 8,
            }}>
              <div style={{ fontSize: 36 }}>📱</div>
              <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', padding: '0 16px' }}>
                Add your QR code image here
              </p>
            </div>
          </div>
        </div>

        {/* Message */}
        <div style={{
          padding: '24px 28px', borderRadius: 16,
          background: 'var(--surface)', borderLeft: '4px solid var(--primary)',
        }}>
          <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic' }}>
            "We built ImageFlow because we believe powerful image tools should be free and private for everyone.
            Your donation directly supports server costs, development time, and keeps this project independent.
            Thank you from the bottom of our hearts. 🙏"
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12, fontWeight: 600 }}>
            — The ImageFlow Team
          </p>
        </div>

      </div>
    </main>
  );
}
