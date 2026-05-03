import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import CopyTextButton from '@/components/CopyTextButton';

export const metadata = {
  title: 'Donate — Support ImageFlow',
  description:
    'Support The Webrise Company and ImageFlow via UPI. Simple, private donations.',
};

const INSTAGRAM_URL = 'https://www.instagram.com/thewebrise/';
const UPI_ID = 'webrise@ptyes';

export default function DonatePage() {
  return (
    <main style={{ padding: 'clamp(32px, 6vw, 72px) 0 80px' }}>
      <div className="container" style={{ maxWidth: 520 }}>

        <header style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontSize: 'clamp(26px, 4vw, 38px)',
            fontWeight: 800,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}>
            Support ImageFlow
          </h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
            ImageFlow stays free with no ads. If these tools help you, you can contribute via UPI—quick on mobile, no forms.
          </p>
        </header>

        {/* QR — top */}
        <section style={{
          padding: '28px 24px',
          borderRadius: 18,
          background: 'var(--surface-card)',
          border: '1px solid var(--hairline-soft)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          marginBottom: 24,
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: 18,
            letterSpacing: '-0.01em',
          }}>
            The Webrise Company QR code
          </h2>
          <div style={{
            display: 'inline-block',
            padding: 14,
            borderRadius: 14,
            background: '#fff',
            border: '1px solid var(--hairline-soft)',
          }}>
            <Image
              src="/webrise-upi-qr.png"
              alt="The Webrise Company UPI QR code for donations"
              width={260}
              height={260}
              priority
              style={{ width: 'min(72vw, 260px)', height: 'auto', display: 'block' }}
            />
          </div>
        </section>

        {/* UPI ID */}
        <section style={{
          padding: '24px',
          borderRadius: 18,
          background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--surface-card) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.12)',
          marginBottom: 28,
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: 12,
          }}>
            The Webrise Company UPI ID
          </h2>
          <p style={{
            fontSize: 'clamp(18px, 4vw, 22px)',
            fontWeight: 700,
            fontFamily: 'ui-monospace, monospace',
            color: 'var(--ink)',
            letterSpacing: '0.02em',
            margin: 0,
            wordBreak: 'break-all',
          }}>
            {UPI_ID}
          </p>
          <CopyTextButton text={UPI_ID} label="Copy UPI ID" />
        </section>

        {/* Quotation message */}
        <figure style={{
          margin: '0 0 28px',
          padding: '26px 22px',
          borderRadius: 16,
          background: 'var(--surface)',
          borderLeft: '4px solid var(--primary)',
        }}>
          <blockquote style={{
            margin: 0,
            fontSize: 'clamp(16px, 3vw, 18px)',
            fontWeight: 600,
            color: 'var(--ink)',
            lineHeight: 1.75,
          }}>
            <span style={{ fontSize: '2rem', color: 'var(--primary)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>&ldquo;</span>
            {' '}
            This donation is for the development and future products of &lsquo;The Webrise Company&rsquo;, aiming to simplify lives.
            {' '}
            <span style={{ fontSize: '2rem', color: 'var(--primary)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>&rdquo;</span>
          </blockquote>
        </figure>

        {/* Mission */}
        <section style={{
          padding: '22px 24px',
          borderRadius: 16,
          background: 'var(--surface-card)',
          border: '1px solid var(--hairline-soft)',
          marginBottom: 36,
        }}>
          <p style={{
            fontSize: 15,
            color: 'var(--muted)',
            lineHeight: 1.75,
            margin: 0,
          }}>
            The Webrise Company operates 24/7 to create innovative website and software developments that simplify and improve your life.
          </p>
        </section>

        {/* Page footer — Instagram */}
        <footer style={{
          paddingTop: 28,
          borderTop: '1px solid var(--hairline-soft)',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: 14,
            letterSpacing: '0.02em',
          }}>
            Follow us on Instagram
          </p>
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 20px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(220, 39, 67, 0.35)',
            }}>
            <Instagram size={22} strokeWidth={2.25} aria-hidden />
            <span>The Webrise Company Instagram Handle</span>
          </Link>
        </footer>

      </div>
    </main>
  );
}
