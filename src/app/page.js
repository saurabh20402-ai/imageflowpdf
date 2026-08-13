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

      {/* SEO + LLM-readable content */}
      <section className="home-hero-section">
        <div className="container home-hero-container">
          <h1 className="home-hero-title">
            Free Online PDF and Image Tools for Everyday Work
          </h1>
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
          <div className="home-section-header" style={{ marginBottom: '36px' }}>
            <p className="home-section-label">
              Complete Toolkit
            </p>
            <h2 className="home-section-title home-section-title-mb">
              All {TOOLS.length} online tools
            </h2>
            <p className="home-section-subtitle home-section-subtitle-mx">
              Everything you need for PDFs and images — merge, split, compress, convert, and create. 100% free, no signup.
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
      <FAQ />
    </main>
  );
}
