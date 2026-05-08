import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — ImageFlow',
  description: 'Latest ImageFlow privacy policy with updated data handling, security, and contact details.',
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
      'We collect only the information needed to keep ImageFlow running smoothly and to provide a safe experience for our users.',
      'We do not upload or store your images. All image processing is performed in your browser, and your files never leave your device.',
    ],
    bullets: [
      'Usage information: pages visited, tools used, and performance metrics — anonymized and aggregated.',
      'Optional contact data you provide when you email us or submit feedback.',
      'Preferences stored locally for an improved experience, such as theme selection and review history.',
    ],
    note: 'We do NOT collect your images, image metadata, file names, personal identifiers, or payment details.',
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
    title: '5. Do we use cookies and tracking technologies?',
    content: [
      'We use only essential technologies to support the site and save basic preferences.',
      'This includes cookies and local storage for items like theme preference, session state, and form progress.',
    ],
    bullets: [
      'No advertising cookies.',
      'No third-party tracking pixels for marketing.',
      'No Google Analytics or Meta Pixel by default.',
    ],
    note: 'If you disable cookies, some site features may not work as expected.',
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
          <Link href="/terms" style={{ padding: 18, borderRadius: 20, background: 'var(--primary)', color: '#fff', textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}>Terms & Conditions</Link>
          <Link href="/security" style={{ padding: 18, borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--hairline-soft)', color: 'var(--ink)', textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}>Security</Link>
          <Link href="/cookies" style={{ padding: 18, borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--hairline-soft)', color: 'var(--ink)', textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}>Cookies</Link>
        </div>
      </div>
    </main>
  );
}
