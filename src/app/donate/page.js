export const metadata = {
  title: 'Support ImageFlow — Donate',
  description: 'Support ImageFlow to help us keep all tools free, build new features, and make the web a better place.',
};

export default function DonatePage() {
  return (
    <main style={{ padding: 'clamp(40px, 8vw, 80px) 0 100px' }}>
      <div className="container" style={{ maxWidth: 600 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>💖</div>
          <h1 style={{
            fontSize: 'clamp(26px, 5vw, 42px)',
            fontWeight: 800,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: 16,
            lineHeight: 1.2,
          }}>
            Support ImageFlow
          </h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto' }}>
            ImageFlow is 100% free to use — no ads, no subscriptions, no data collection.
            All tools run entirely in your browser for maximum privacy.
          </p>
        </div>

        {/* QR Code Scanner Card */}
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--hairline)',
          borderRadius: 24,
          padding: 'clamp(24px, 5vw, 40px)',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center',
          marginBottom: 32,
        }}>
          <div style={{
            display: 'inline-block',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--primary)',
            background: 'var(--primary-light)',
            padding: '6px 16px',
            borderRadius: 99,
            marginBottom: 24,
          }}>
            🔒 Secure UPI Payment
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
            Scan QR to Donate
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28 }}>
            Scan with any UPI app — PhonePe, Paytm, GPay, BHIM, or any banking app
          </p>

          {/* QR Code Image */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: 16,
              border: '2px solid var(--hairline)',
              boxShadow: 'var(--shadow-md)',
              maxWidth: 280,
              width: '100%',
            }}>
              <img
                src="/qr-donate.png"
                alt="UPI QR Code — Scan to donate to ImageFlow"
                style={{ width: '100%', borderRadius: 8, display: 'block' }}
              />
            </div>
          </div>

          {/* UPI ID - prominent display */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-light), var(--surface))',
            border: '2px solid var(--primary-muted)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 8,
          }}>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              UPI ID
            </p>
            <p style={{
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: 800,
              color: 'var(--primary)',
              letterSpacing: '0.02em',
              fontFamily: 'monospace',
            }}>
              webrise@ptyes
            </p>
          </div>

          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>
            ✓ Accepted by all major UPI apps in India
          </p>
        </div>

        {/* Mission Statement */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
          borderRadius: 20,
          padding: 'clamp(24px, 5vw, 36px)',
          marginBottom: 32,
          color: '#e0e7ff',
        }}>
          <div style={{ fontSize: 28, marginBottom: 16 }}>🌟</div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.4 }}>
            Why We Keep These Tools Free
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: '#c7d2fe', marginBottom: 16 }}>
            Your contributions go directly toward developing <strong style={{ color: '#fff' }}>ImageFlow</strong>{' '}and
            our family of tools — building new features, improving existing ones, and creating future websites
            that make people&apos;s daily tasks easier and happier.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: '#c7d2fe', marginBottom: 16 }}>
            We believe powerful image tools shouldn&apos;t be locked behind subscriptions or paywalls.
            By keeping everything free, we help students, creators, small businesses, and everyday users
            around the world — without compromising on quality or privacy.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: '#a5b4fc', fontStyle: 'italic' }}>
            &quot;If our tools have saved you time, simplified your workflow, or helped your business —
            even a small donation encourages us to keep building. Every rupee matters to us. Thank you. 🙏&quot;
          </p>
          <p style={{ fontSize: 13, color: '#818cf8', marginTop: 16, fontWeight: 600 }}>
            — The ImageFlow Team
          </p>
        </div>

        {/* What donations fund */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}>
          {[
            { icon: '🚀', title: 'New Tools & Features', desc: 'Building more free image tools and expanding to video, PDF, and more.' },
            { icon: '⚡', title: 'Performance & Speed', desc: 'Faster processing, better mobile support, and a smoother experience.' },
            { icon: '🔒', title: 'Privacy & Security', desc: 'Keeping your images safe, private, and never stored on any server.' },
            { icon: '🌍', title: 'Free for Everyone', desc: 'No ads, no premium tiers — free tools for students, creators, and businesses.' },
          ].map(item => (
            <div key={item.title} style={{
              padding: 20, borderRadius: 16,
              background: 'var(--surface-card)',
              border: '1px solid var(--hairline)',
              boxShadow: 'var(--shadow-xs)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
          Made with ❤️ in India · All donations are voluntary and greatly appreciated
        </p>

      </div>
    </main>
  );
}
