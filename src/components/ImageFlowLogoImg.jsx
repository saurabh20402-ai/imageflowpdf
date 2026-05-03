'use client';

import { Image as ImageIcon } from 'lucide-react';

/**
 * Brand mark in code (matches reference): purple squircle + white gallery icon + “Image” / “Flow” wordmark.
 * Props kept for compatibility: priority / unconstrained are ignored.
 */
export default function ImageFlowLogoImg({ height = 38, priority: _p, unconstrained: _u }) {
  const box = Math.max(28, Math.round(height));
  const iconSize = Math.max(14, Math.round(box * 0.5));
  const fontSize = Math.max(15, Math.round(box * 0.5));
  const gap = Math.max(8, Math.round(box * 0.22));
  const radius = Math.round(box * 0.26);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap,
        lineHeight: 1,
        userSelect: 'none',
      }}>
      <span
        style={{
          width: box,
          height: box,
          borderRadius: radius,
          background: 'var(--primary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 1px 3px rgba(99, 102, 241, 0.35)',
        }}
        aria-hidden>
        <ImageIcon size={iconSize} color="#fff" strokeWidth={2.25} aria-hidden />
      </span>
      <span
        style={{
          fontSize,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontFamily: 'var(--font)',
          whiteSpace: 'nowrap',
        }}>
        <span style={{ color: 'var(--ink)' }}>Image</span>
        <span style={{ color: 'var(--primary)' }}>Flow</span>
      </span>
    </span>
  );
}
