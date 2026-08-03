'use client';

import Link from 'next/link';
import { Image, Maximize2, FileDown, RotateCw } from 'lucide-react';

export default function PhotoEditorTool({ tool }) {
  const actions = [
    {
      title: 'Resize Image',
      description: 'Change image dimensions for social media, web, or forms.',
      href: '/tools/resize-image/',
      icon: Maximize2,
    },
    {
      title: 'Compress Image',
      description: 'Reduce file size while keeping quality sharp.',
      href: '/tools/compress-image/',
      icon: FileDown,
    },
    {
      title: 'Rotate Image',
      description: 'Rotate photos by 90°, 180°, or any custom angle.',
      href: '/tools/rotate-image/',
      icon: RotateCw,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      <section style={{ display: 'grid', gap: 24 }}>
        <div style={{ padding: '32px', borderRadius: 28, background: 'linear-gradient(180deg, #eef2ff 0%, #ffffff 100%)', boxShadow: '0 24px 64px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: '#e0e7ff', display: 'grid', placeItems: 'center', color: '#4338ca' }}>
              <Image size={28} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 'clamp(30px, 3vw, 44px)', fontWeight: 800, color: '#0f172a' }}>{tool.name}</h1>
              <p style={{ margin: '10px 0 0', color: '#475569', lineHeight: 1.8, maxWidth: 680 }}>
                Edit your photos online with a quick, browser-based workflow. This hub gives you direct access to the best image tools for crop, resize, compress, rotate, and format conversion without downloads.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/tools/resize-image/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', borderRadius: 16, background: '#4338ca', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
              <Maximize2 size={18} /> Resize Image
            </Link>
            <Link href="/tools/compress-image/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', borderRadius: 16, background: '#0f766e', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
              <FileDown size={18} /> Compress Image
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {actions.map(action => (
            <Link key={action.title} href={action.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: '24px',
                borderRadius: 24,
                background: '#ffffff',
                border: '1px solid rgba(15, 23, 42, 0.06)',
                textDecoration: 'none',
                color: '#0f172a',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 14, background: '#eef2ff', color: '#4338ca' }}>
                <action.icon size={20} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{action.title}</h2>
                <p style={{ margin: '10px 0 0', color: '#475569', fontSize: 15, lineHeight: 1.7 }}>{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gap: 20, padding: '32px', borderRadius: 24, background: '#f8fafc', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: '#c7d2fe', display: 'grid', placeItems: 'center', color: '#4338ca' }}>
            <Image size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>One place for fast photo editing</h2>
            <p style={{ margin: '8px 0 0', color: '#475569', lineHeight: 1.8 }}>
              Use the right tool for each task. This page helps you edit HD photos without installing anything, and keeps the process simple and secure.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <div style={{ padding: '18px', borderRadius: 20, background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a' }}>HD Image Editing</h3>
            <p style={{ margin: '10px 0 0', color: '#475569', fontSize: 14, lineHeight: 1.7 }}>Keep photos sharp while editing brightness, crop, and transform operations.</p>
          </div>
          <div style={{ padding: '18px', borderRadius: 20, background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a' }}>No Download Needed</h3>
            <p style={{ margin: '10px 0 0', color: '#475569', fontSize: 14, lineHeight: 1.7 }}>Works in your browser on desktop and mobile with instant access.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
