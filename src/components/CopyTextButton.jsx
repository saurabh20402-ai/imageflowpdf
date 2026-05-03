'use client';

import { useState } from 'react';

export default function CopyTextButton({ text, label = 'Copy' }) {
  const [done, setDone] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        marginTop: 12,
        padding: '10px 18px',
        borderRadius: 10,
        border: '1px solid var(--hairline-soft)',
        background: 'var(--surface-card)',
        color: 'var(--ink)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
      }}>
      {done ? 'Copied!' : label}
    </button>
  );
}
