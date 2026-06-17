export const metadata = {
  title: 'Terms & Conditions — ImageFlow',
  description: 'Terms and conditions for using ImageFlow image tools.',
  alternates: {
    canonical: 'https://imageflow.in/terms/',
  },
};

export default function TermsPage() {
  return (
    <main style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: 10 }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12 }}>Terms & Conditions</h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>Last updated: May 2025 · Please read these terms carefully before using ImageFlow.</p>
        </div>

        {[
          { title: '1. Acceptance of Terms', content: `By accessing and using ImageFlow ("the Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not use our Service. These terms apply to all users of the platform.` },
          { title: '2. Description of Service', content: `ImageFlow provides free, browser-based image processing tools including compression, conversion, cropping, resizing, filtering, and more. All processing is performed locally in your browser. The Service is provided "as is" and "as available" without warranty of any kind.` },
          { title: '3. Acceptable Use', content: `You agree not to:\n• Use the Service for any illegal or unauthorized purpose\n• Process images containing illegal content, including child sexual abuse material\n• Attempt to reverse engineer, hack, or disrupt the Service\n• Use automated scripts to abuse the platform\n• Claim ownership of the ImageFlow brand, tools, or code\n\nImageFlow reserves the right to terminate access for violations.` },
          { title: '4. Intellectual Property', content: `The ImageFlow name, logo, and code are protected by intellectual property laws. The image processing tools are provided for your personal and commercial use. You retain all rights to images you process through our tools — we claim no ownership over your content.` },
          { title: '5. Disclaimer of Warranties', content: `ImageFlow is provided without any warranty. We do not guarantee that the Service will be uninterrupted, error-free, or that results will be accurate. Image processing quality depends on your browser, device, and input files. Use at your own risk.` },
          { title: '6. Limitation of Liability', content: `To the maximum extent permitted by law, ImageFlow and its creators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service, including data loss, image corruption, or business interruption.` },
          { title: '7. Changes to Terms', content: `We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of this page. Your continued use of ImageFlow after changes constitutes acceptance.` },
          { title: '8. Governing Law', content: `These terms shall be governed by applicable law. Any disputes arising from use of the Service shall be resolved through good-faith negotiation before any legal action is taken.` },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--hairline-soft)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>{section.title}</h2>
            <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{section.content}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
