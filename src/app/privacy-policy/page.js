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
      'Processing is limited to legal purposes such as:
      • providing the features you use,
      • responding to requests,
      • protecting the service from abuse,
      • and complying with applicable laws.',
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

import React from 'react';

export const metadata = {
  title: 'Privacy Policy — ImageFlow',
  description: 'Latest ImageFlow privacy policy with updated data handling, security, and contact details.',
};

// Modern UI/UX Privacy Policy Page
export default function PrivacyPolicyPage() {
  return (
    <main style={{ padding: '60px 0 80px', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: 900, padding: '0 24px', margin: '0 auto' }}>
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'block', margin: '0 auto 32px', width: '178px', height: '38px', background: 'url(https://imageflow.in/_next/static/media/logo.2e0e0e0e.svg) center no-repeat', backgroundSize: 'contain' }} aria-label="ImageFlow Logo" />
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.05, marginBottom: 8, textAlign: 'center' }}>
              PRIVACY POLICY
            </h1>
            <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 8, textAlign: 'center' }}>
              Last updated <strong>May 07, 2026</strong>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <a href="#toc" style={{ display: 'block', borderRadius: 18, padding: 18, textDecoration: 'none', border: '1px solid var(--hairline-soft)', background: 'var(--surface)', color: 'var(--ink)', fontWeight: 600 }}>Jump to Table of Contents</a>
          <a href="#contact" style={{ display: 'block', borderRadius: 18, padding: 18, textDecoration: 'none', border: '1px solid var(--hairline-soft)', background: 'var(--surface)', color: 'var(--ink)', fontWeight: 600 }}>Contact Us</a>
        </section>

        <section style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Summary of Key Points</div>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li>We do <strong>not</strong> upload, store, or share your images. All processing is done in your browser.</li>
              <li>Minimal data is collected, only what is necessary for site operation and security.</li>
              <li>No advertising cookies, no third-party marketing pixels, and no sale of personal data.</li>
              <li>You have rights to access, correct, or delete your data, and to contact us with any concerns.</li>
            </ul>
            <div style={{ marginTop: 16 }}>
              For full details, see the sections below or <a href="#toc" style={{ color: '#3030F1', textDecoration: 'underline' }}>jump to the table of contents</a>.
            </div>
          </div>
        </section>

        <section id="toc" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Table of Contents</div>
          <ol style={{ paddingLeft: 20, color: 'var(--muted)', fontSize: 15, lineHeight: 2 }}>
            <li><a href="#infocollect" style={{ color: '#3030F1' }}>1. What information do we collect?</a></li>
            <li><a href="#infouse" style={{ color: '#3030F1' }}>2. How do we process your information?</a></li>
            <li><a href="#legalbases" style={{ color: '#3030F1' }}>3. What legal bases do we rely on?</a></li>
            <li><a href="#whoshare" style={{ color: '#3030F1' }}>4. When and with whom do we share your information?</a></li>
            <li><a href="#cookies" style={{ color: '#3030F1' }}>5. Do we use cookies and other tracking technologies?</a></li>
            <li><a href="#inforetain" style={{ color: '#3030F1' }}>6. How long do we keep your information?</a></li>
            <li><a href="#infosafe" style={{ color: '#3030F1' }}>7. How do we keep your information safe?</a></li>
            <li><a href="#infominors" style={{ color: '#3030F1' }}>8. Do we collect information from minors?</a></li>
            <li><a href="#privacyrights" style={{ color: '#3030F1' }}>9. What are your privacy rights?</a></li>
            <li><a href="#DNT" style={{ color: '#3030F1' }}>10. Controls for Do-Not-Track features</a></li>
            <li><a href="#uslaws" style={{ color: '#3030F1' }}>11. Do United States residents have specific privacy rights?</a></li>
            <li><a href="#policyupdates" style={{ color: '#3030F1' }}>12. Do we make updates to this notice?</a></li>
            <li><a href="#contact" style={{ color: '#3030F1' }}>13. How can you contact us about this notice?</a></li>
            <li><a href="#request" style={{ color: '#3030F1' }}>14. How can you review, update, or delete the data we collect from you?</a></li>
          </ol>
        </section>

        {/* --- Main Policy Content --- */}
        <section id="infocollect" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>1. What information do we collect?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li>Personal information you provide (e.g., names, email addresses).</li>
              <li>Information collected automatically (e.g., IP address, browser/device info, usage data).</li>
              <li>We do <strong>not</strong> collect images, image metadata, file names, or payment details.</li>
            </ul>
            <div style={{ marginTop: 12 }}>
              All image processing is performed in your browser. Your files never leave your device.
            </div>
          </div>
        </section>

        <section id="infouse" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>2. How do we process your information?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li>To provide, improve, and secure our services.</li>
              <li>To respond to your requests and feedback.</li>
              <li>To comply with legal obligations and protect against abuse.</li>
            </ul>
          </div>
        </section>

        <section id="legalbases" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>3. What legal bases do we rely on?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            We process your information only when we have a valid legal reason, such as your consent, contractual necessity, legitimate interest, or compliance with law. For EU/UK users, we follow GDPR principles.
          </div>
        </section>

        <section id="whoshare" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>4. When and with whom do we share your information?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li>We do not sell or share your personal data for commercial purposes.</li>
              <li>Information may be shared only for business transfers, legal requests, or with service providers who help deliver the product.</li>
            </ul>
            <div style={{ marginTop: 12 }}>
              We have not disclosed, sold, or shared personal information for commercial purposes in the past twelve (12) months.
            </div>
          </div>
        </section>

        <section id="cookies" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>5. Do we use cookies and other tracking technologies?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li>We use only essential cookies and local storage for preferences and session state.</li>
              <li>No advertising cookies or third-party marketing pixels.</li>
              <li>No Google Analytics or Meta Pixel by default.</li>
            </ul>
            <div style={{ marginTop: 12 }}>
              If you disable cookies, some site features may not work as expected.
            </div>
          </div>
        </section>

        <section id="inforetain" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>6. How long do we keep your information?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            We keep information only as long as needed for its purpose, unless a longer retention period is required by law. No purpose in this policy requires us to keep your information longer than <strong>8 hours</strong> in local storage.
          </div>
        </section>

        <section id="infosafe" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>7. How do we keep your information safe?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            We use standard security practices to protect the service and the limited information we collect. No system is completely secure, but we do our best to protect your data.
          </div>
        </section>

        <section id="infominors" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>8. Do we collect information from minors?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            ImageFlow is not intended for children under 18, and we do not knowingly collect data from children under that age. If you believe a child has provided us with personal information, please contact us so we can delete it.
          </div>
        </section>

        <section id="privacyrights" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>9. What are your privacy rights?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li>Right to know what data we have about you.</li>
              <li>Right to request correction or deletion.</li>
              <li>Right to withdraw consent if processing is based on consent.</li>
              <li>Right to appeal a decision if your request is denied.</li>
            </ul>
            <div style={{ marginTop: 12 }}>
              You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
            </div>
          </div>
        </section>

        <section id="DNT" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>10. Controls for Do-Not-Track features</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            Most browsers and some mobile OS/apps include a Do-Not-Track (DNT) feature. We do not currently respond to DNT signals, but if a standard is adopted, we will update this notice.
          </div>
        </section>

        <section id="uslaws" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>11. Do United States residents have specific privacy rights?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            If you are a resident of certain US states, you may have rights to access, correct, delete, or opt out of the sale/sharing of your personal data. See the full policy for details or contact us for more information.
          </div>
        </section>

        <section id="policyupdates" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>12. Do we make updates to this notice?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by the "Last updated" date at the top of this page.
          </div>
        </section>

        <section id="contact" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>13. How can you contact us about this notice?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            If you have questions or comments about this notice, you may email us at <a href="mailto:thewebrisecompany@gmail.com" style={{ color: '#3030F1', textDecoration: 'underline' }}>thewebrisecompany@gmail.com</a> or contact us by post at:<br />
            <div style={{ marginTop: 8, fontWeight: 600 }}>WebRise<br />India</div>
          </div>
        </section>

        <section id="request" style={{ marginBottom: 40, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--hairline-soft)', padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>14. How can you review, update, or delete the data we collect from you?</h2>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8 }}>
            You have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. To request to review, update, or delete your personal information, please <a href="https://app.termly.io/dsar/1701fe86-03f3-4d15-b503-47e35e348eb9" target="_blank" rel="noopener noreferrer" style={{ color: '#3030F1', textDecoration: 'underline' }}>fill out and submit a data subject access request</a>.
          </div>
        </section>

        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 32, textAlign: 'center' }}>
          This Privacy Policy was created using <a href="https://termly.io/products/privacy-policy-generator/" target="_blank" rel="noopener noreferrer" style={{ color: '#3030F1', textDecoration: 'underline' }}>Termly's Privacy Policy Generator</a>.
        </div>
      </div>
    </main>
  );
}
