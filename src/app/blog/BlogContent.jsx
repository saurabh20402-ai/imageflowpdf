'use client';

import Link from 'next/link';
import { useState } from 'react';

const POSTS = [
  {
    slug: 'compress-pdf-online-free',
    title: 'Compress PDF Online Free Without Losing Quality (Fast, Secure & Easy)',
    excerpt: 'A step-by-step guide to compress PDF online free with safe results, sharp text, and no signup needed.',
    category: 'Guide',
    date: 'May 6, 2026',
    readTime: '6 min',
    emoji: '⚡',
  },
  {
    slug: 'webp-converter-online-free',
    title: 'WebP Converter Online Free | Convert JPG PNG to WebP Instantly',
    excerpt: 'Convert images to WebP online free with ImageFlow. Fast, secure, high-quality WebP conversion. No signup required. Reduce file size by 70-80% while maintaining quality.',
    category: 'Guide',
    date: 'June 18, 2026',
    readTime: '10 min',
    emoji: '🌐',
  },
  {
    slug: 'png-to-jpg-converter-online-free',
    title: 'PNG to JPG Converter Online Free | Convert PNG Images to JPG Instantly',
    excerpt: 'Convert PNG to JPG online free with ImageFlow. Fast, secure, high-quality PNG to JPG conversion. No signup required. Reduce file size while maintaining quality.',
    category: 'Guide',
    date: 'June 18, 2026',
    readTime: '8 min',
    emoji: '🖼️',
  },
  {
    slug: 'jpg-to-png-converter-online-free',
    title: 'JPG to PNG Converter Online Free (Fast, Secure & No Quality Loss)',
    excerpt: 'Convert JPG to PNG online free without losing quality. Fast, secure, and easy image conversion with no signup required.',
    category: 'Guide',
    date: 'May 6, 2026',
    readTime: '5 min',
    emoji: '🖼️',
  },
  {
    slug: 'resize-image-online-free-without-losing-quality',
    title: 'Resize Image Online Free Without Losing Quality (20KB, 50KB, 100KB & More)',
    excerpt: 'Resize image online free without losing quality. Easily resize image to 20KB, 50KB, 100KB, or 200KB with our fast and secure image resizer tool.',
    category: 'Guide',
    date: 'May 7, 2026',
    readTime: '5 min',
    emoji: '🔥',
  },
  {
    slug: 'photo-editor-online-free-hd-image-editing-without-download',
    title: 'Photo Editor Online Free (HD Image Editing Without Download)',
    excerpt: 'Use the best free photo editor online to edit images in HD quality. Fast, secure, and easy-to-use image editor with no download required.',
    category: 'Guide',
    date: 'May 7, 2026',
    readTime: '5 min',
    emoji: '🔥',
  },
  {
    slug: 'image-to-pdf-converter-free-online-convert-jpg-png-instantly',
    title: 'Image to PDF Converter Free Online (Convert JPG & PNG Instantly)',
    excerpt: 'Use our free image to PDF converter online to convert JPG and PNG files instantly. Create PDFs under 100KB or 200KB without losing quality.',
    category: 'Guide',
    date: 'May 7, 2026',
    readTime: '5 min',
    emoji: '🔥',
  },
  {
    slug: 'merge-pdf-online-free',
    title: 'Merge PDF Online Free (Fast, Secure & Easy)',
    excerpt: 'Learn how to merge PDF files online for free with ImageFlow. Fast, secure, and no signup required.',
    category: 'Guide',
    date: 'May 11, 2026',
    readTime: '6 min',
    emoji: '📄',
  },
  {
    slug: 'split-pdf-online-free',
    title: 'Split PDF Online Free (Extract PDF Pages Instantly)',
    excerpt: 'Split PDF online free and extract PDF pages into separate files instantly. Fast, secure, and easy-to-use PDF splitter tool with no signup required.',
    category: 'Guide',
    date: 'May 12, 2026',
    readTime: '6 min',
    emoji: '✂️',
  },
  {
    slug: 'rotate-pdf-online-free',
    title: 'Rotate PDF Online Free (Rotate PDF Pages Instantly)',
    excerpt: 'Rotate PDF online free and rotate PDF pages instantly without losing quality. Fast, secure, and easy-to-use PDF rotation tool.',
    category: 'Guide',
    date: 'May 22, 2026',
    readTime: '6 min',
    emoji: '🔄',
  },
  {
    slug: 'crop-pdf-online-free',
    title: 'Crop PDF Online Free (Remove Margins & Crop PDF Pages Easily)',
    excerpt: 'Crop PDF online free and remove unwanted margins instantly. Auto crop PDF pages and trim documents without losing quality.',
    category: 'Guide',
    date: 'May 22, 2026',
    readTime: '6 min',
    emoji: '✂️',
  },
  {
    slug: 'sign-pdf-online-free',
    title: 'Sign PDF Online Free (Add Digital Signatures Instantly)',
    excerpt: 'Sign PDF online free without creating an account. Add digital signatures to PDF files instantly with secure browser-based processing.',
    category: 'Guide',
    date: 'May 22, 2026',
    readTime: '6 min',
    emoji: '✍️',
  },
  {
    slug: 'watermark-pdf-online-free',
    title: 'Watermark PDF Online Free (Add Text & Image Watermarks Instantly)',
    excerpt: 'Add watermarks to PDF online free. Watermark PDF documents with text or images instantly. Secure browser-based PDF watermarking tool.',
    category: 'Guide',
    date: 'May 22, 2026',
    readTime: '6 min',
    emoji: '🔒',
  },
];

const CATEGORIES = ['All', 'Guide', 'Deep Dive', 'Privacy', 'Tips', 'Productivity'];

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter(p => p.category === activeCategory);

  return (
    <main style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 860 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: 10 }}>From the team</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 14 }}>ImageFlow Blog</h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            Tips, guides, and insights on image optimization, design, and web performance.
          </p>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 16px', borderRadius: 99,
                background: cat === activeCategory ? 'var(--primary)' : 'var(--surface)',
                color: cat === activeCategory ? 'white' : 'var(--muted)',
                fontSize: 13, fontWeight: 600,
                border: '1px solid var(--hairline)',
                cursor: 'pointer', transition: 'all 150ms',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {activeCategory === 'All' && POSTS.length > 0 && (
          <Link href={`/blog/${POSTS[0].slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '32px', borderRadius: 20, marginBottom: 32,
              background: 'linear-gradient(135deg, var(--primary-light), var(--surface-card))',
              border: '1px solid rgba(99,102,241,0.15)',
              boxShadow: '0 4px 24px rgba(99,102,241,0.08)',
              cursor: 'pointer',
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: 12, display: 'block' }}>✨ Featured</span>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{POSTS[0].emoji}</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 10, lineHeight: 1.3 }}>{POSTS[0].title}</h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16 }}>{POSTS[0].excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
                <span>{POSTS[0].date}</span>
                <span>·</span>
                <span>{POSTS[0].readTime} read</span>
                <span style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 99, background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600 }}>{POSTS[0].category}</span>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '32px', borderRadius: 20, background: 'var(--surface-card)', textAlign: 'center', color: 'var(--muted)' }}>
              No blog posts are available yet. Add your first post when ready.
            </div>
          ) : (
            (activeCategory === 'All' ? filtered.slice(1) : filtered).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '24px', borderRadius: 16,
                  background: 'var(--surface-card)',
                  border: '1px solid var(--hairline)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex', flexDirection: 'column', gap: 12,
                  cursor: 'pointer', transition: 'all 200ms',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; }}>
                  <div style={{ fontSize: 28 }}>{post.emoji}</div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)' }}>{post.category}</span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginTop: 6, lineHeight: 1.4 }}>{post.title}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, flex: 1 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--muted-soft)' }}>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} read</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 56, padding: '32px', borderRadius: 16, background: 'var(--surface)' }}>
          <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 4 }}>More articles coming soon</p>
          <Link href="/#all-tools" style={{
            display: 'inline-block', marginTop: 14, padding: '10px 24px',
            background: 'var(--primary)', color: 'white', borderRadius: 10,
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>Browse All Tools →</Link>
        </div>
      </div>
    </main>
  );
}
