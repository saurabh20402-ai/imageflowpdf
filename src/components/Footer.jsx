'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import ImageFlowLogoImg from '@/components/ImageFlowLogoImg';
import InstagramGlyph from '@/components/icons/InstagramGlyph';
import './components.css';

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
    <footer>
      <div className="container">
        {/* Main grid */}
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" className="footer-brand-logo" title="ImageFlow — Free Online Image & PDF Tools">
              <ImageFlowLogoImg height={38} />
            </Link>
            <p className="footer-brand-text">
              Free, instant image tools. 100% in your browser. Zero uploads. Zero data collection.
            </p>
            <span className="footer-badge">
              🔒 Privacy First
            </span>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="footer-section-title">
                {group}
              </p>
              <ul className="footer-link-list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      title={link.label}
                      className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Instagram — The Webrise Company */}
        <div className="footer-instagram-section">
          <p className="footer-instagram-title">
            Follow us on Instagram
          </p>
          <a
            href={INSTAGRAM_WEBRISE}
            target="_blank"
            rel="noopener noreferrer"
            title="Follow The Webrise Company on Instagram"
            className="footer-instagram-link">
            <span className="footer-instagram-icon">
              <InstagramGlyph size={20} />
            </span>
            The Webrise Company Instagram Handle
          </a>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} ImageFlow · All rights reserved
          </p>
          <p className="footer-heart">
            Made with <Heart size={12} className="footer-heart-icon" style={{ fill: '#ef4444' }} /> for creators everywhere
          </p>
          <div className="footer-bottom-links">
            {[['Privacy', '/privacy-policy/'], ['Terms', '/terms/'], ['Cookies', '/cookies/']].map(([label, href]) => (
              <Link key={label} href={href} title={`${label} Policy`} className="footer-bottom-link">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
