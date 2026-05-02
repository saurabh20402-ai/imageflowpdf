'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Laptop, Lock, RefreshCw, Layers } from 'lucide-react';

const FEATURES = [
  { icon: Shield, title: 'Privacy First', desc: 'Images never leave your browser. All processing is 100% client-side.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'No uploading or downloading from servers. Instant results on your device.' },
  { icon: Laptop, title: 'Works Everywhere', desc: 'Any modern browser, any device. No software to install.' },
  { icon: Lock, title: 'No Sign-up', desc: 'No accounts, no emails, no tracking. Just open and use.' },
  { icon: RefreshCw, title: 'Batch Processing', desc: 'Process multiple images at once with ZIP download support.' },
  { icon: Layers, title: '30+ Tools', desc: 'From format conversion to compression — everything in one place.' },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: 8 }}>Why ImageFlow</p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            Built for privacy and speed
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }} viewport={{ once: true }}
              className="card" style={{ display: 'flex', gap: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--radius-md)', flexShrink: 0,
                background: 'var(--primary-light)', color: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
