'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Graphic Designer',
    text: 'ImageFlow replaced five different tools I used to juggle. The compression quality is incredible — I saved 70% file size with zero visible difference.',
    rating: 5,
    avatar: 'SC',
  },
  {
    name: 'Marcus Rivera',
    role: 'Web Developer',
    text: 'The fact that everything runs in the browser is amazing. I can batch resize hundreds of images without worrying about privacy or upload limits.',
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Aisha Patel',
    role: 'Content Creator',
    text: 'The collage maker and batch tools are so polished. I use them daily for my social media content. Better than paid alternatives honestly.',
    rating: 5,
    avatar: 'AP',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-[var(--surface-soft)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3 block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ink)] mb-4">
            Loved by creators worldwide
          </h2>
          <p className="text-[var(--muted)]">See what our users are saying about ImageFlow.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[var(--surface-card)] border border-[var(--hairline-soft)] rounded-2xl p-7 hover:shadow-lg transition-all duration-300"
            >
              <Quote size={24} className="text-[var(--primary)] opacity-30 mb-4" />
              <p className="text-sm text-[var(--body)] leading-relaxed mb-6">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-pink-400 flex items-center justify-center text-white text-xs font-bold"
                >
                  {item.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">{item.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
