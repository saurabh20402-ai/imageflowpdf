export const metadata = {
  title: 'Cookie Policy — ImageFlow',
  description: 'How ImageFlow uses cookies and browser storage.',
  alternates: {
    canonical: 'https://imageflow.in/cookies/',
  },
};

export default function CookiesPage() {
  return (
    <main style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: 10 }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12 }}>Cookie Policy</h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>Last updated: May 2025 · A clear explanation of how we use cookies and local storage.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {[
            { title: 'What Are Cookies?', content: 'Cookies are small text files stored in your browser. They are commonly used to remember your preferences, deliver relevant advertising, and improve your experience. ImageFlow uses minimal, standard web technologies to make the site work efficiently and support our free services.' },
            { title: 'Cookies We Use', content: null, table: [
              { name: 'theme', purpose: 'Remembers your light/dark mode preference', type: 'Strictly Necessary', duration: 'Persistent (1 year)' },
              { name: '_ga, _ga_*', purpose: 'Google Analytics anonymized traffic metrics', type: 'Analytics', duration: '2 years' },
              { name: '__gads, __gpi', purpose: 'Google AdSense ad serving and fraud prevention', type: 'Advertising', duration: 'Up to 13 months' },
            ]},
            { title: 'Local Storage', content: 'In addition to cookies, ImageFlow uses your browser\'s localStorage (not cookies) to save:\n\n• Processing history — auto-deleted after 8 hours\n• Review history — only what you submit\n• Tool preferences — e.g., last used quality setting\n\nThis data never leaves your device and is not accessible to our servers.' },
            { title: 'Advertising & Third-Party Partners', content: 'We partner with third-party networks, including Google AdSense, to display non-intrusive advertisements on ImageFlow:\n\n• Google uses cookies to serve ads based on prior visits to this and other websites.\n• Google and third-party ad vendors may use tracking cookies or web beacons to measure ad effectiveness.\n• You can opt out of personalized ads at any time through Google Ads Settings (https://www.google.com/settings/ads) or www.aboutads.info.' },
            { title: 'Managing & Disabling Cookies', content: 'You can control, block, or delete cookies through your browser settings. Note that disabling essential cookies may reset your theme preference, while advertising opt-outs allow you to see generic instead of personalized ads.' },
            { title: 'Contact', content: 'If you have questions about our cookie usage or privacy practices, reach out via the Support page.' },
          ].map((section) => (
            <div key={section.title} style={{ paddingBottom: 28, borderBottom: '1px solid var(--hairline-soft)' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>{section.title}</h2>
              {section.content && (
                <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{section.content}</div>
              )}
              {section.table && (
                <div style={{ overflowX: 'auto', marginTop: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                      <tr style={{ background: 'var(--surface)' }}>
                        {['Cookie Name', 'Purpose', 'Type', 'Duration'].map(h => (
                          <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--hairline)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--hairline-soft)' }}>
                          <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 13, color: 'var(--ink)' }}>{row.name}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--muted)' }}>{row.purpose}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--muted)' }}>{row.type}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--muted)' }}>{row.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
