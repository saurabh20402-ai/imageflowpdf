'use client';

import Link from 'next/link';
import { useState } from 'react';

const POSTS = [];


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
          <div style={{
            padding: '32px', borderRadius: 20, marginBottom: 32,
            background: 'linear-gradient(135deg, var(--primary-light), var(--surface-card))',
            border: '1px solid rgba(99,102,241,0.15)',
            boxShadow: '0 4px 24px rgba(99,102,241,0.08)',
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
        )}

        {/* Post grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '32px', borderRadius: 20, background: 'var(--surface-card)', textAlign: 'center', color: 'var(--muted)' }}>
              No blog posts are available yet. Add your first post when ready.
            </div>
          ) : (
            (activeCategory === 'All' ? filtered.slice(1) : filtered).map(post => (
              <div key={post.slug} style={{
                padding: '24px', borderRadius: 16,
                background: 'var(--surface-card)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
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
