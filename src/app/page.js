'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
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

      {/* Popular Tools */}
      <section style={{ padding: '64px 0', borderTop: '1px solid var(--hairline-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: '10px' }}>
              Most Popular
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Start with our top tools
            </h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', marginTop: 10 }}>
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
      <section id="all-tools" style={{ padding: '64px 0', background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: '10px' }}>
              Complete Toolkit
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              All {TOOLS.length} online tools
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto' }}>
              Everything you need for PDFs and images — merge, split, compress, convert, and create. 100% free, no signup.
            </p>
          </div>

          {/* Search */}
          <div style={{ maxWidth: '440px', margin: '0 auto 24px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-soft)' }} />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              style={{ paddingLeft: 38 }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px' }}>
            {ALL_CATS.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileTap={{ scale: 0.96 }}
                className={`pill ${activeCategory === cat.id ? 'pill-active' : ''}`}
                style={{ fontSize: 13, padding: '7px 16px' }}>
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
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
              <p style={{ fontSize: '16px', fontWeight: 500 }}>No tools found for &quot;{search}&quot;</p>
              <p style={{ fontSize: '14px', marginTop: '4px' }}>Try a different search term</p>
            </div>
          )}
        </div>
      </section>

      <Features />
      <FAQ />
    </main>
  );
}
