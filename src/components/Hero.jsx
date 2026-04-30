'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, var(--primary-glow), transparent)'
      }} />

      <div className="container relative" style={{ textAlign: 'center', maxWidth: '720px' }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '99px',
            background: 'var(--primary-light)', border: '1px solid var(--primary-muted)',
            fontSize: '12px', fontWeight: 600, color: 'var(--primary)',
            marginBottom: '24px'
          }}
        >
          <Zap size={12} />
          100% Free · No Sign-up Required
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 800, lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--ink)', marginBottom: '20px'
          }}
        >
          Every image tool you need,{' '}
          <span style={{ color: 'var(--primary)' }}>in one place</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: '17px', color: 'var(--muted)',
            maxWidth: '520px', margin: '0 auto 32px',
            lineHeight: 1.7
          }}
        >
          Compress, convert, resize, crop, and edit images instantly.
          All processing happens in your browser — your files never leave your device.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/#all-tools" className="btn-primary" style={{ padding: '14px 28px', fontSize: '15px' }}>
            Explore All Tools
            <ArrowRight size={16} />
          </Link>
          <Link href="/tools/compress-image/" className="btn-secondary" style={{ padding: '14px 28px', fontSize: '15px' }}>
            Try Compress Image
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap',
            marginTop: '40px'
          }}
        >
          {[
            { icon: Shield, text: '100% Private' },
            { icon: Zap, text: 'Instant Processing' },
            { icon: Globe, text: 'Works Offline' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--muted)' }}>
              <Icon size={14} style={{ color: 'var(--primary)' }} />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
