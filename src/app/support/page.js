import Link from 'next/link';

export const metadata = {
  title: 'Support — ImageFlow',
  description: 'Get help with ImageFlow tools. Contact The Webrise Company by email.',
  alternates: {
    canonical: 'https://imageflow.in/support/',
  },
};

const EMAIL = 'thewebrisecompany@gmail.com';
const MAILTO = `mailto:${EMAIL}`;
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}`;

export default function SupportPage() {
  return (
    <main style={{ padding: 'clamp(36px, 6vw, 72px) 0 96px' }}>
      <div className="container" style={{ maxWidth: 680 }}>

        <header style={{ marginBottom: 36 }}>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}>
            Help &amp; support
          </h1>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
            ImageFlow runs entirely in your browser. Most questions are answered below—if you still need us, reach out by email.
          </p>
        </header>

        <section style={{
          padding: '28px 26px',
          borderRadius: 18,
          background: 'var(--surface-card)',
          border: '1px solid var(--hairline-soft)',
          marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
            Contact us
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 18 }}>
            For partnerships, feedback, bugs, or general enquiries about ImageFlow and The Webrise Company, email us—we typically reply within a few business days.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <a
              href={MAILTO}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 20px',
                borderRadius: 12,
                background: 'var(--primary)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
              }}>
              {EMAIL}
            </a>
            <a
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--primary)',
                textDecoration: 'none',
              }}>
              Open in Gmail (web)
            </a>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted-soft)', marginTop: 14, marginBottom: 0 }}>
            The first button opens your default mail app; use &ldquo;Open in Gmail&rdquo; if you prefer Gmail in the browser.
          </p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
            Common topics
          </h2>
          <ul style={{
            margin: 0,
            paddingLeft: 20,
            color: 'var(--muted)',
            fontSize: 15,
            lineHeight: 1.85,
          }}>
            <li style={{ marginBottom: 12 }}>
              <strong style={{ color: 'var(--ink)' }}>Privacy:</strong> Your files are processed locally—we don&apos;t upload your images to our servers.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong style={{ color: 'var(--ink)' }}>Something not working?</strong> Try another browser, disable extensions that block scripts, or ensure you&apos;re using a recent version of Chrome, Edge, Firefox, or Safari.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong style={{ color: 'var(--ink)' }}>Large files:</strong> Very heavy images or PDFs may be slow on older devices; closing other tabs often helps.
            </li>
            <li style={{ marginBottom: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>Feature requests:</strong> We read every message—tell us which tool or workflow would help you most.
            </li>
          </ul>
        </section>

        <section style={{
          padding: '22px 24px',
          borderRadius: 16,
          background: 'var(--surface)',
          border: '1px solid var(--hairline-soft)',
        }}>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
            ImageFlow is offered by <strong style={{ color: 'var(--ink)' }}>The Webrise Company</strong>. For donations and company updates, visit{' '}
            <Link href="/donate/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Donate</Link>
            {' '}and follow us on{' '}
            <a href="https://www.instagram.com/thewebrise/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Instagram
            </a>.
          </p>
        </section>

      </div>
    </main>
  );
}
