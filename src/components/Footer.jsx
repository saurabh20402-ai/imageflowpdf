'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import ImageFlowLogoImg from '@/components/ImageFlowLogoImg';
import InstagramGlyph from '@/components/icons/InstagramGlyph';

const INSTAGRAM_WEBRISE = 'https://www.instagram.com/thewebrise/';

const FOOTER_LINKS = {
  Tools: [
    { label: 'Compress Image', href: '/tools/compress-image/' },
    { label: 'Resize Image', href: '/tools/resize-image/' },
    { label: 'Crop Image', href: '/tools/crop-image/' },
    { label: 'Convert Format', href: '/tools/convert-format/' },
    { label: 'Bulk Compressor', href: '/tools/bulk-compress/' },
    { label: 'Batch Resize', href: '/tools/batch-resize/' },
    { label: 'All Tools →', href: '/#all-tools' },
  ],
  Learn: [
    { label: 'Tutorials', href: '/tutorials/' },
    { label: 'JPG to PNG Guide', href: '/tutorials/#tut-jpg-to-png' },
    { label: 'Image Compression 101', href: '/tutorials/#tut-compress-image' },
    { label: 'OCR Guide', href: '/tutorials/#tut-ocr-extract-text' },
    { label: 'Image Filters Guide', href: '/tutorials/#tut-image-filters' },
  ],
  Company: [
    { label: 'About Us', href: '/about-us/' },
    { label: 'Features', href: '/#features' },
    { label: 'Donate', href: '/donate/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Support', href: '/support/' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms & Conditions', href: '/terms/' },
    { label: 'Security', href: '/security/' },
    { label: 'Cookies', href: '/cookies/' },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--hairline-soft)',
      paddingTop: 56,
      paddingBottom: 28,
    }}>
      <div className="container">
        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto repeat(4, 1fr)',
          gap: 40,
          marginBottom: 48,
        }}
          className="footer-grid">

          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: 14, width: 'fit-content', lineHeight: 0 }}>
              <ImageFlowLogoImg height={38} />
            </Link>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 200 }}>
              Free, instant image tools. 100% in your browser. Zero uploads. Zero data collection.
            </p>
            <div style={{ marginTop: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 99,
                background: 'var(--primary-light)', color: 'var(--primary)',
                fontSize: 12, fontWeight: 700,
              }}>
                🔒 Privacy First
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p style={{
                fontSize: 11, fontWeight: 800, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 16,
              }}>
                {group}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 13,
                        color: 'var(--muted)',
                        textDecoration: 'none',
                        transition: 'color 150ms',
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--ink)'}
                      onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Instagram — The Webrise Company */}
        <div style={{
          marginBottom: 40,
          padding: '22px 20px',
          borderRadius: 14,
          background: 'var(--surface)',
          border: '1px solid var(--hairline-soft)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          textAlign: 'center',
        }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--ink)', width: '100%' }}>
            Follow us on Instagram
          </p>
          <a
            href={INSTAGRAM_WEBRISE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              borderRadius: 10,
              border: '1px solid var(--hairline-soft)',
              background: 'var(--surface-card)',
              color: 'var(--ink)',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'border-color 150ms, box-shadow 150ms',
            }}>
            <span style={{ color: '#E4405F', display: 'flex' }}>
              <InstagramGlyph size={20} />
            </span>
            The Webrise Company Instagram Handle
          </a>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--hairline-soft)',
          paddingTop: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 12, color: 'var(--muted-soft)' }}>
            © {new Date().getFullYear()} ImageFlow · All rights reserved
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted-soft)', display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <Heart size={12} style={{ color: '#ef4444', fill: '#ef4444' }} /> for creators everywhere
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            {[['Privacy', '/privacy-policy/'], ['Terms', '/terms/'], ['Cookies', '/cookies/']].map(([label, href]) => (
              <Link key={label} href={href} style={{ fontSize: 12, color: 'var(--muted-soft)', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = 'var(--muted)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted-soft)'}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
