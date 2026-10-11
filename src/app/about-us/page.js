import Link from 'next/link';
import ImageFlowLogoImg from '@/components/ImageFlowLogoImg';
import { ShieldCheck, Cpu, HeartHandshake, Mail, Globe, Users } from 'lucide-react';

export const metadata = {
  title: 'About Us — The Webrise Company & ImageFlow Team',
  description:
    'Discover the story behind ImageFlow and The Webrise Company. Founded by Harshit Negi and Saurav Kumar, dedicated to creating privacy-first, browser-based digital utilities.',
  alternates: {
    canonical: 'https://imageflow.in/about-us/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Webrise Company',
  url: 'https://imageflow.in',
  logo: 'https://imageflow.in/favicon.ico',
  description: 'The Webrise Company creates modern web applications, digital utilities, and privacy-first software solutions.',
  foundingDate: '2026-05-01',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi',
      addressCountry: 'India',
    },
  },
  founders: [
    {
      '@type': 'Person',
      name: 'Harshit Negi',
      jobTitle: 'Co-Founder & Technology Lead',
    },
    {
      '@type': 'Person',
      name: 'Saurav Kumar',
      jobTitle: 'Co-Founder & Product Lead',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'thewebrisecompany@gmail.com',
    contactType: 'Customer Support',
  },
};

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <main style={{ padding: 'clamp(40px, 8vw, 80px) 0 100px' }}>
        <div className="container" style={{ maxWidth: 840 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 24 }}>
              <ImageFlowLogoImg height={72} />
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}>
              About ImageFlow &amp; The Webrise Company
            </h1>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              maxWidth: 640,
              margin: '0 auto',
            }}>
              Building free, high-performance browser tools that put user privacy, digital accessibility, and simplicity first.
            </p>
          </div>

          <article style={{ fontSize: 16, color: 'var(--body)', lineHeight: 1.8 }}>

            {/* Founders & Story Section */}
            <div style={{
              padding: 'clamp(24px, 5vw, 36px)',
              background: 'var(--surface-card)',
              border: '1px solid var(--hairline)',
              borderRadius: 20,
              marginBottom: 36,
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'var(--primary-light)', color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Users size={22} />
                </div>
                <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                  Our Story &amp; Founders
                </h2>
              </div>
              <p style={{ marginBottom: 18 }}>
                The Webrise Company was founded in Delhi on May 1st, 2026, by <strong>Harshit Negi</strong> and <strong>Saurav Kumar</strong>. From humble beginnings in a small room with a basic computer and limited resources, the journey started with an unwavering passion for building practical, clean, and reliable web software.
              </p>
              <p style={{ marginBottom: 0 }}>
                Frustrated by clunky online converters filled with aggressive popups, intrusive subscription paywalls, and privacy-invasive server uploads, we set out to build an alternative. That alternative is <strong>ImageFlow</strong>: a comprehensive digital workshop where users can compress, convert, merge, crop, and manipulate PDFs and image files without friction, without fees, and without sacrificing their privacy.
              </p>
            </div>

            {/* Core Values 3-Col Grid */}
            <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 700, color: 'var(--ink)', marginBottom: 20, textAlign: 'center' }}>
              Why We Build Differently
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              marginBottom: 40,
            }}>
              <div style={{
                padding: '24px',
                background: 'var(--surface-card)',
                border: '1px solid var(--hairline)',
                borderRadius: 16,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(16, 185, 129, 0.1)', color: '#10b981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <ShieldCheck size={20} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                  Client-Side File Processing
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  Your document and image files are processed directly on your device using client-side browser APIs. Your files are not transmitted to or stored on our application servers for standard utility operations.
                </p>
              </div>

              <div style={{
                padding: '24px',
                background: 'var(--surface-card)',
                border: '1px solid var(--hairline)',
                borderRadius: 16,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <Cpu size={20} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                  Modern Web Architecture
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  We leverage HTML5 Canvas, pdf-lib, and modern browser standards to deliver responsive file formatting right inside mobile and desktop web browsers.
                </p>
              </div>

              <div style={{
                padding: '24px',
                background: 'var(--surface-card)',
                border: '1px solid var(--hairline)',
                borderRadius: 16,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <HeartHandshake size={20} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                  Free &amp; Accessible
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  No accounts, no email gates, and no hidden subscriptions. We build practical tools so students, job seekers, and creators can format files without barriers.
                </p>
              </div>
            </div>

            {/* Editorial and Testing Standards */}
            <div style={{
              padding: 'clamp(24px, 5vw, 36px)',
              background: 'var(--surface-card)',
              border: '1px solid var(--hairline)',
              borderRadius: 20,
              marginBottom: 36,
            }}>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
                Our Editorial &amp; Technical Standards
              </h2>
              <p style={{ marginBottom: 16 }}>
                Every guide and tutorial published on ImageFlow is compiled from publicly available official portals, including UIDAI for identity documentation and the Staff Selection Commission (SSC) and UPSC for competitive exam requirements. Because portal submission specifications can update with new notification cycles, we provide direct references to official sources and encourage users to confirm details against their active application bulletin.
              </p>
              <p style={{ margin: 0 }}>
                Our client-side processing workflows are tested across modern mobile and desktop browsers (Chrome, Edge, Safari, Firefox). While core PDF and image manipulation operations run locally on your device without server uploads, optional third-party integrations (such as the AI text prompt feature in Thumbnail Creator) and anonymous site traffic telemetry communicate with their designated endpoints as detailed in our Privacy Policy.
              </p>
            </div>

            {/* Company Transparency & Contact */}
            <div style={{
              padding: 'clamp(24px, 5vw, 32px)',
              background: 'var(--surface)',
              border: '1px solid var(--hairline)',
              borderRadius: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Company Information &amp; Direct Inquiries
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
                <strong>Legal Entity:</strong> The Webrise Company<br />
                <strong>Location:</strong> Delhi, India<br />
                <strong>Founded:</strong> May 1, 2026<br />
                <strong>Proprietors:</strong> Harshit Negi &amp; Saurav Kumar
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 8 }}>
                <a
                  href="mailto:thewebrisecompany@gmail.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 18px',
                    borderRadius: 12,
                    background: 'var(--primary)',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Mail size={16} /> thewebrisecompany@gmail.com
                </a>
                <a
                  href="https://www.instagram.com/thewebrise/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 18px',
                    borderRadius: 12,
                    background: 'var(--surface-card)',
                    border: '1px solid var(--hairline)',
                    color: 'var(--ink)',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Globe size={16} /> @thewebrise on Instagram
                </a>
              </div>
            </div>

          </article>
        </div>
      </main>
    </>
  );
}

