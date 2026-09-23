'use client';

import Link from 'next/link';
import { Heart, ShieldCheck, Zap } from 'lucide-react';
import ImageFlowLogoImg from '@/components/ImageFlowLogoImg';
import InstagramGlyph from '@/components/icons/InstagramGlyph';
import './components.css';

const INSTAGRAM_WEBRISE = 'https://www.instagram.com/thewebrise/';

const FOOTER_LINKS = {
  'PDF Tools': [
    { label: 'Merge PDF', href: '/tools/merge-pdf/' },
    { label: 'Split PDF', href: '/tools/split-pdf/' },
    { label: 'Compress PDF', href: '/tools/compress-pdf/' },
    { label: 'Rotate PDF', href: '/tools/rotate-pdf/' },
    { label: 'Crop PDF', href: '/tools/crop-pdf/' },
    { label: 'Watermark PDF', href: '/tools/watermark-pdf/' },
    { label: 'Sign PDF', href: '/tools/sign-pdf/' },
  ],
  'Image Tools': [
    { label: 'Compress Image', href: '/tools/compress-image/' },
    { label: 'Resize Image', href: '/tools/resize-image/' },
    { label: 'Crop Image', href: '/tools/crop-image/' },
    { label: 'Convert Format', href: '/tools/convert-format/' },
    { label: 'Remove Background', href: '/tools/remove-background/' },
    { label: 'Image Upscaler', href: '/tools/image-upscaler/' },
    { label: 'Bulk Compressor', href: '/tools/bulk-compress/' },
  ],
  'Guides & Learn': [
    { label: 'Tutorials & Guides', href: '/tutorials/' },
    { label: 'JPG to PNG Guide', href: '/blog/jpg-to-png-converter-online-free/' },
    { label: 'Image Compression 101', href: '/blog/compress-pdf-online-free/' },
    { label: 'Photo Editor Online', href: '/blog/photo-editor-online-free-hd-image-editing-without-download/' },
    { label: 'Resize Without Losing Quality', href: '/blog/resize-image-online-free-without-losing-quality/' },
    { label: 'WhatsApp DP Resizer', href: '/blog/whatsapp-dp-size-resizer-guide/' },
    { label: 'Aadhaar Photo Requirements', href: '/blog/aadhaar-card-photo-size-requirements/' },
  ],
  'Company & Legal': [
    { label: 'About Us', href: '/about-us/' },
    { label: 'Blog & Updates', href: '/blog/' },
    { label: 'Features Overview', href: '/#features' },
    { label: 'Support & FAQ', href: '/support/' },
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms of Service', href: '/terms/' },
    { label: 'Security Standards', href: '/security/' },
    { label: 'Cookie Policy', href: '/cookies/' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="container">
        {/* Main grid */}
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" className="footer-brand-logo" title="ImageFlow — Free Online Image & PDF Tools">
              <ImageFlowLogoImg height={42} />
            </Link>
            <p className="footer-brand-text">
              Free, instant online PDF and image processing tools. 100% private in-browser processing with zero server uploads and no signup required.
            </p>
            <div className="footer-badges-wrap">
              <span className="footer-badge">
                <ShieldCheck size={14} className="text-[var(--primary)]" />
                100% Client-Side Privacy
              </span>
              <span className="footer-badge">
                <Zap size={14} className="text-[#10b981]" />
                Fast & No Signup
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="footer-column">
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
          <div className="footer-instagram-info">
            <p className="footer-instagram-title">
              Follow Us on Instagram
            </p>
            <p className="footer-instagram-subtitle">
              Get the latest updates, design tips, and new tool announcements from The Webrise Company.
            </p>
          </div>
          <a
            href={INSTAGRAM_WEBRISE}
            target="_blank"
            rel="noopener noreferrer"
            title="Follow The Webrise Company on Instagram"
            className="footer-instagram-link">
            <span className="footer-instagram-icon">
              <InstagramGlyph size={22} />
            </span>
            <span>The Webrise Company</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} ImageFlow · All rights reserved.
          </p>
          <p className="footer-heart">
            Made with <Heart size={14} className="footer-heart-icon" style={{ fill: '#ef4444' }} /> for creators everywhere
          </p>
          <div className="footer-bottom-links">
            {[['Privacy', '/privacy-policy/'], ['Terms', '/terms/'], ['Security', '/security/'], ['Cookies', '/cookies/']].map(([label, href]) => (
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
