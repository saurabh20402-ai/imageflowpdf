'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, Cpu, Lock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import Hero from '@/components/Hero';
import ToolCard from '@/components/ToolCard';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import { TOOLS } from '@/lib/tools-registry';

const ALL_CATS = [
  { id: 'all', name: 'All Tools' },
  { id: 'pdf', name: 'PDF Tools' },
  { id: 'convert', name: 'Convert' },
  { id: 'transform', name: 'Transform' },
  { id: 'optimize', name: 'Optimize' },
  { id: 'create', name: 'Create' },
];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = useMemo(() => {
    let result = activeCategory === 'all' ? TOOLS : TOOLS.filter(t => t.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const popularTools = TOOLS.filter(t => t.popular);

  return (
    <main>
      <Hero />

      {/* SEO + LLM-readable content */}
      <section className="home-hero-section">
        <div className="container home-hero-container">
          <h2 className="home-hero-title">
            Free Online PDF and Image Tools for Everyday Work
          </h2>
          <p className="home-hero-desc">
            ImageFlow helps you merge PDF, split PDF, compress PDF, rotate PDF, crop PDF, watermark PDF, and sign PDF in your browser. You can also convert image formats like JPG to PNG, PNG to JPG, WebP to PNG, and WebP to JPG, plus resize and compress images.
          </p>
          <p className="home-hero-desc">
            All tools are designed for fast results, mobile-friendly usage, and no-signup workflows. Browse the categories below to pick the exact tool you need.
          </p>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="home-section-padding home-section-border">
        <div className="container">
          <div className="home-section-header">
            <p className="home-section-label">
              Most Popular
            </p>
            <h2 className="home-section-title">
              Start with our top tools
            </h2>
            <p className="home-section-subtitle">
              The most-used image and PDF tools by creators worldwide
            </p>
          </div>
          <div className="tools-responsive-grid">
            {popularTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools with Category Tabs */}
      <section id="all-tools" className="home-section-padding home-section-bg">
        <div className="container">
          <div className="home-section-header" style={{ marginBottom: '28px' }}>
            <p className="home-section-label">
              Complete Toolkit
            </p>
            <h2 className="home-section-title home-section-title-mb">
              All {TOOLS.length} online tools
            </h2>
            <p className="home-section-subtitle home-section-subtitle-mx">
              Everything you need for PDFs and images — merge, split, compress, convert, and create. No signup required.
            </p>
          </div>

          {/* Search */}
          <div className="home-search-container">
            <Search size={16} className="home-search-icon" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input home-search-input"
            />
          </div>

          {/* Category Tabs */}
          <div className="home-tabs-container">
            {ALL_CATS.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileTap={{ scale: 0.96 }}
                className={`pill home-tab-btn ${activeCategory === cat.id ? 'pill-active' : ''}`}>
                {cat.name}
              </motion.button>
            ))}
          </div>

          {/* Tools Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="tools-responsive-grid">
              {filteredTools.map((tool, i) => (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.25), duration: 0.3 }}>
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredTools.length === 0 && (
            <div className="home-empty-state">
              <p className="home-empty-title">No tools found for &quot;{search}&quot;</p>
              <p className="home-empty-desc">Try a different search term</p>
            </div>
          )}
        </div>
      </section>

      <Features />

      {/* Educational & Architectural Deep-Dive Section (High Value Content) */}
      <section style={{ padding: '64px 0', borderTop: '1px solid var(--hairline-soft)', borderBottom: '1px solid var(--hairline-soft)' }}>
        <div className="container" style={{ maxWidth: 1040 }}>
          
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: 8 }}>
              Architecture &amp; Ethics
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 14 }}>
              How ImageFlow Works: Zero-Upload Technology
            </h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 680, margin: '0 auto', lineHeight: 1.65 }}>
              Most online file tools secretly upload your documents, confidential IDs, and photos to external cloud storage. ImageFlow is built differently.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginBottom: 48,
          }}>
            <div style={{
              padding: 28,
              borderRadius: 20,
              background: 'var(--surface-card)',
              border: '1px solid var(--hairline)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'rgba(16, 185, 129, 0.1)', color: '#10b981',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                1. Local Execution Engine
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                When you drag a file into ImageFlow, your web browser executes the file manipulation algorithms using HTML5 Canvas and client-side WebAssembly. No bytes leave your device or travel over the internet.
              </p>
            </div>

            <div style={{
              padding: 28,
              borderRadius: 20,
              background: 'var(--surface-card)',
              border: '1px solid var(--hairline)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Cpu size={22} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                2. Instant Hardware Speeds
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                Because you never wait for slow file uploads or server queues, even large files compress, convert, or merge in milliseconds directly on your device&apos;s processor and GPU.
              </p>
            </div>

            <div style={{
              padding: 28,
              borderRadius: 20,
              background: 'var(--surface-card)',
              border: '1px solid var(--hairline)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Lock size={22} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                3. Zero Account Friction
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                We believe basic digital productivity should be universal. We do not require credit cards, email registrations, or daily quota limits to get your work done.
              </p>
            </div>
          </div>

          {/* Practical Guides Showcase */}
          <div style={{
            padding: '32px 28px',
            borderRadius: 20,
            background: 'var(--surface)',
            border: '1px solid var(--hairline)',
            display: 'flex',
            flexDirection: 'column',
            mdFlexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}>
            <div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                Need help formatting files for exams, visas, or emails?
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
                Explore our detailed step-by-step guides covering Aadhaar card sizes, SSC/UPSC requirements, email compression limits, and more.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
              <Link
                href="/tutorials/"
                className="btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 20px',
                  borderRadius: 12,
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <BookOpen size={16} /> Explore Tutorials
              </Link>
              <Link
                href="/blog/"
                className="btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 20px',
                  borderRadius: 12,
                  background: 'var(--surface-card)',
                  border: '1px solid var(--hairline)',
                  color: 'var(--ink)',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Read Guides <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      <FAQ />
    </main>
  );
}
