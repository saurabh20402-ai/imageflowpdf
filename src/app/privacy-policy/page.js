import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — ImageFlow',
  description: 'How ImageFlow handles your data, privacy, and image files.',
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: 10 }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12 }}>Privacy Policy</h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>
            Last updated: May 2025 · This policy explains how ImageFlow collects, uses, and protects your information.
          </p>
        </div>

        {[
          {
            title: '1. Our Core Principle: Your Data Stays With You',
            content: `ImageFlow is built on a privacy-first architecture. All image processing happens entirely within your browser using the HTML5 Canvas API. Your images are never uploaded to our servers, stored in any database, or transmitted over the internet. When you close the browser tab, your images are gone.`,
          },
          {
            title: '2. What We Collect',
            content: `We collect minimal data to improve our service:\n\n• Usage analytics (pages visited, tools used) — anonymized and aggregated. No personal identifiers.\n• User reviews submitted via our feedback form — stored in your browser's localStorage only, not on our servers.\n• Processing history — stored locally for 8 hours for your convenience, then automatically deleted.\n\nWe do NOT collect: your images, image metadata, file names, personal information, or payment details.`,
          },
          {
            title: '3. Cookies',
            content: `We use strictly necessary cookies to remember your theme preference (light/dark mode) and session state. We do not use advertising cookies, tracking pixels, or third-party analytics cookies. You can disable cookies in your browser settings, though some features may not work correctly.`,
          },
          {
            title: '4. Third-Party Services',
            content: `We use Google Fonts to load typography for the "Add Text" tool. This means Google may log that your browser requested a font file. No personal data is shared. We do not use Google Analytics, Meta Pixel, or any advertising SDKs.`,
          },
          {
            title: '5. Local Storage',
            content: `ImageFlow uses your browser's localStorage to save: (a) your theme preference, (b) review history, and (c) recent processing history (auto-cleared after 8 hours). This data never leaves your device.`,
          },
          {
            title: '6. Children\'s Privacy',
            content: `ImageFlow is not directed at children under 13. We do not knowingly collect information from children. If you believe your child has used our service in a way that raises privacy concerns, please contact us.`,
          },
          {
            title: '7. Changes to This Policy',
            content: `We may update this privacy policy from time to time. We will notify users of significant changes by updating the "Last updated" date at the top of this page. Continued use of ImageFlow after any changes constitutes acceptance of the updated policy.`,
          },
          {
            title: '8. Contact Us',
            content: `If you have any questions about this Privacy Policy, please reach out via the contact information on our website. We aim to respond to all inquiries within 48 hours.`,
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--hairline-soft)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>{section.title}</h2>
            <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{section.content}</div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
          {[['Terms & Conditions', '/terms'], ['Security', '/security'], ['Cookies', '/cookies']].map(([label, href]) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
              {label} →
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
