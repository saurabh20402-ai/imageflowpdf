'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { q: 'Is ImageFlow really free?', a: 'Yes, completely free. No sign-up, no hidden fees. All tools work without any payment.' },
  { q: 'Are my images safe?', a: 'Your images never leave your device. All processing happens directly in your browser using client-side technology. We don\'t upload, store, or have access to your files.' },
  { q: 'What image formats are supported?', a: 'We support JPEG, PNG, WebP, SVG, HEIC (iPhone photos), and more. You can convert between any supported format.' },
  { q: 'Is there a file size limit?', a: 'There\'s no hard limit, but very large files (50MB+) may process slower on older devices since everything runs in your browser.' },
  { q: 'Can I process multiple images at once?', a: 'Yes! Tools like Compress, Resize, and Collage support batch processing. Multiple files are downloaded as a ZIP archive.' },
  { q: 'Does it work offline?', a: 'Most tools work offline after the first page load. The OCR tool requires a one-time language model download (~2MB).' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ padding: '60px 0', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: 700 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            Frequently asked questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 15, fontWeight: 500, color: 'var(--ink)', textAlign: 'left',
                }}>
                {faq.q}
                <div style={{
                  width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                  background: open === i ? 'var(--primary-light)' : 'var(--surface)',
                  color: open === i ? 'var(--primary)' : 'var(--muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <div style={{ padding: '0 24px 18px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
