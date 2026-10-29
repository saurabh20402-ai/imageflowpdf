import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Latest ImageFlow privacy policy with updated data handling, security, and contact details.',
  alternates: {
    canonical: 'https://imageflow.in/privacy-policy/',
  },
  openGraph: {
    title: 'Privacy Policy — ImageFlow',
    description: 'Latest ImageFlow privacy policy with updated data handling, security, and contact details.',
    url: 'https://imageflow.in/privacy-policy/',
    type: 'website',
    images: [{ url: 'https://imageflow.in/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — ImageFlow',
    description: 'Latest ImageFlow privacy policy with updated data handling, security, and contact details.',
  },
};

const tocItems = [
  { label: 'What information do we collect?', href: '#infocollect' },
  { label: 'How do we process your information?', href: '#infouse' },
  { label: 'Legal bases', href: '#legalbases' },
  { label: 'Sharing information', href: '#whoshare' },
  { label: 'Cookies & tracking', href: '#cookies' },
  { label: 'Retention', href: '#inforetain' },
  { label: 'Security', href: '#infosafe' },
  { label: 'Children’s privacy', href: '#infominors' },
  { label: 'Your rights', href: '#privacyrights' },
  { label: 'Contact', href: '#contact' },
  { label: 'Data requests', href: '#request' },
];

const policySections = [
  {
    id: 'infocollect',
    title: '1. What information do we collect?',
    content: [
      'We collect only the information needed to maintain website performance, ensure security, and provide our free utility services.',
      'For our standard document and image utilities (including PDF merge, split, compress, format conversions, resize, and crop), all processing executes locally in your browser. Your document and image files are never uploaded to, processed by, or stored on our servers.',
    ],
    bullets: [
      'Usage & Analytics: Aggregated traffic trends, pages visited, tools used, device/browser specifications, and performance telemetry collected via Google Analytics and Ahrefs Web Analytics.',
      'Optional AI Prompt Input: When you explicitly use the optional AI Generator tab in the Thumbnail Creator tool, the text topic you enter is sent to our API to generate layout suggestions via Google Gemini.',
      'Direct Contact: Any information you voluntarily provide if you email us for support or feedback.',
      'Local Browser Storage: Client-side preferences stored only on your own device (such as light/dark mode selection and local canvas state).',
    ],
    note: 'We do NOT upload, inspect, or store your personal files, photographs, PDFs, file names, or payment details during standard tool operations.',
  },
  {
    id: 'infouse',
    title: '2. How do we process your information?',
    content: [
      'We process information to deliver our services, improve performance, maintain security, and keep the site useful and reliable.',
      'Processing is limited to legal purposes such as:',
      '• providing the features you use,',
      '• responding to requests,',
      '• protecting the service from abuse,',
      '• and complying with applicable laws.'
    ],
  },
  {
    id: 'legalbases',
    title: '3. What legal bases do we rely on?',
    content: [
      'When required by law, we rely on the legal grounds applicable to your jurisdiction, including consent, contractual necessity, legitimate interest, and compliance with legal obligations.',
      'For users in the EU and UK, ImageFlow follows GDPR principles by processing data only when a valid legal basis exists.',
    ],
  },
  {
    id: 'whoshare',
    title: '4. When and with whom do we share your information?',
    content: [
      'We do not sell or share your personal data for commercial purposes. The information collected is only shared in very limited cases.',
      'Examples include business transfers, legal requests, and service providers who help deliver the product.',
    ],
    bullets: [
      'Business transfers, such as mergers or acquisitions.',
      'Legal authorities in response to lawful requests.',
      'Service providers who assist with our website infrastructure.',
    ],
    note: 'We have not disclosed, sold, or shared personal information for commercial purposes in the past twelve (12) months.',
  },
  {
    id: 'cookies',
    title: '5. Cookies, Analytics & Advertising Technologies',
    content: [
      'ImageFlow uses browser cookies, local storage, and third-party measurement services for site performance, usage analysis, and advertising.',
      'Third-party vendors, including Google, use cookies (such as the Google DoubleClick cookie) to serve advertisements based on prior visits to ImageFlow or other websites on the Internet.',
      'Google\'s use of advertising cookies enables it and its partners to serve relevant ads based on visits to this site and other sites across the web.',
      'We utilize Google Analytics 4 and Ahrefs Web Analytics to understand aggregated traffic patterns, browser compatibility, and site performance.',
    ],
    bullets: [
      'Essential Storage: Used to preserve light/dark theme choices, UI state, and local tool options on your device.',
      'Advertising Cookies (Google AdSense): Google and authorized third-party ad networks may place cookies or use web beacons in the course of ad serving.',
      'Analytics Telemetry: Pseudonymous metrics including page views, referrer data, and general device information to help us maintain website reliability.',
      'Opt-Out Controls: Users may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads) or via www.aboutads.info.',
    ],
    note: 'Your image and PDF files are never shared with, processed by, or accessible to Google, advertisers, or analytics services. All standard document operations remain strictly in your local browser.',
  },
  {
    id: 'inforetain',
    title: '6. How long do we keep your information?',
    content: [
      'We keep information only as long as needed to support the purpose for which it was collected, unless a longer retention period is required by law.',
      'Information stored locally in your browser is cleared automatically when it is no longer needed.',
    ],
    note: 'No purpose in this policy requires us to keep your information longer than 8 hours in local storage.',
  },
  {
    id: 'infosafe',
    title: '7. How do we keep your information safe?',
    content: [
      'ImageFlow uses standard security practices to protect the service and the limited information we collect.',
      'However, no system is completely secure. We cannot guarantee that unauthorized parties will never overcome our protections.',
    ],
  },
  {
    id: 'infominors',
    title: '8. Do we collect information from minors?',
    content: [
      'ImageFlow is not intended for children under 13, and we do not knowingly collect data from children under that age.',
      'If you believe a child has provided us with personal information, please contact us immediately so we can delete it.',
    ],
  },
  {
    id: 'privacyrights',
    title: '9. What are your privacy rights?',
    content: [
      'Depending on where you live, you may have rights such as access, correction, deletion, and objection to processing.',
      'If you are located in the EU, UK, Switzerland, Canada, or certain US states, you may also have additional privacy protections.',
    ],
    bullets: [
      'Right to know what data we have about you.',
      'Right to request correction or deletion.',
      'Right to withdraw consent if processing is based on consent.',
      'Right to appeal a decision if your request is denied.',
    ],
  },
  {
    id: 'contact',
    title: '10. How can you contact us about this notice?',
    content: [
      'If you have questions or concerns about this Privacy Policy, please contact us at the email address below.',
    ],
    note: 'Email: thewebrisecompany@gmail.com',
  },
  {
    id: 'request',
    title: '11. How can you review, update, or delete your data?',
    content: [
      'To review, update, or delete data we have collected from you, submit a data subject access request using the link below or contact us directly.',
    ],
    note: 'Data access request: https://app.termly.io/dsar/1701fe86-03f3-4d15-b503-47e35e348eb9',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 900, padding: '0 24px' }}>
        <section style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--primary)', marginBottom: 12 }}>
            Legal
          </p>
          <div style={{ display: 'grid', gap: 24 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.05, marginBottom: 16 }}>
                Privacy Policy
              </h1>
              <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 720 }}>
                Last updated: May 07, 2026 · This notice explains how ImageFlow collects, uses, and protects your information when you use our services at ImageFlow.in.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {[
                { title: 'Browser-first privacy', description: 'Images are processed locally in your browser.', icon: '🛡️' },
                { title: 'Minimal data', description: 'We only collect what is essential to run the site.', icon: '⚡' },
                { title: 'No sale of data', description: 'We do not sell or share personal data for marketing.', icon: '🚫' },
              ].map((card) => (
                <div key={card.title} style={{ borderRadius: 24, padding: 24, background: 'var(--surface)', border: '1px solid var(--hairline-soft)' }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{card.title}</h2>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75 }}>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40, display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
          {tocItems.map((item) => (
            <a key={item.href} href={item.href} style={{ display: 'block', borderRadius: 18, padding: 18, textDecoration: 'none', border: '1px solid var(--hairline-soft)', background: 'var(--surface)', color: 'var(--ink)', fontWeight: 600, transition: 'transform 0.15s ease' }}>
              {item.label}
            </a>
          ))}
        </section>

        {policySections.map((section) => (
          <section key={section.id} id={section.id} style={{ marginBottom: 40, padding: '32px 28px', borderRadius: 24, background: 'var(--surface)', border: '1px solid var(--hairline-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--primary-muted)', display: 'grid', placeItems: 'center', color: 'var(--primary)', fontWeight: 700 }}>
                {section.id.replace(/[^0-9]/g, '') || '•'}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--ink)' }}>{section.title}</h2>
            </div>

            {section.content.map((paragraph, index) => (
              <p key={index} style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: 16 }}>
                {paragraph}
              </p>
            ))}

            {section.bullets?.length ? (
              <ul style={{ paddingLeft: 20, marginBottom: 16, color: 'var(--muted)', lineHeight: 1.8 }}>
                {section.bullets.map((bullet) => (
                  <li key={bullet} style={{ marginBottom: 10, fontSize: 15 }}>{bullet}</li>
                ))}
              </ul>
            ) : null}

            {section.note ? (
              <div style={{ padding: '16px 18px', borderRadius: 18, background: 'rgba(67, 56, 202, 0.06)', color: 'var(--ink)', border: '1px solid rgba(67, 56, 202, 0.16)', fontSize: 15, lineHeight: 1.8 }}>
                {section.note}
              </div>
            ) : null}
          </section>
        ))}

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: 16 }}>
          <Link href="/terms/" style={{ padding: 18, borderRadius: 20, background: 'var(--primary)', color: '#fff', textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}>Terms & Conditions</Link>
          <Link href="/security/" style={{ padding: 18, borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--hairline-soft)', color: 'var(--ink)', textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}>Security</Link>
          <Link href="/cookies/" style={{ padding: 18, borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--hairline-soft)', color: 'var(--ink)', textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}>Cookies</Link>
        </div>
      </div>
    </main>
  );
}
