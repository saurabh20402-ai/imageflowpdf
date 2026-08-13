'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function ToolCard({ tool }) {
  const Icon = Icons[tool.icon] || Icons.FileImage;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}>
      <Link
        href={`/tools/${tool.slug}/`}
        title={`${tool.name} — Free Online Tool`}
        style={{ display: 'block', textDecoration: 'none' }}>

        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surface-card)',
          // Light mode: subtle silver border + soft shadow
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(192, 200, 215, 0.2)',
          transition: 'box-shadow 200ms, border-color 200ms',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.09), 0 0 0 1.5px rgba(99, 102, 241, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(192, 200, 215, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
          }}>

          {/* Icon */}
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${tool.color}14`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={22} style={{ color: tool.color }} />
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '6px',
              letterSpacing: '-0.01em',
            }}>
              {tool.name}
            </h3>
            <p style={{
              fontSize: '13px',
              color: 'var(--muted)',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {tool.description}
            </p>
          </div>

          {/* CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: '12px',
            fontWeight: 600,
            color: tool.color,
            opacity: 0.85,
          }}>
            Use tool →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
