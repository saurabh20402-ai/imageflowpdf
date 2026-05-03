'use client';

import Image from 'next/image';

export default function ImageFlowLogoImg({ height = 36, priority = false }) {
  return (
    <Image
      src="/imageflow-logo.png"
      alt="ImageFlow"
      width={280}
      height={80}
      priority={priority}
      sizes="200px"
      style={{
        height,
        width: 'auto',
        maxWidth: 'min(240px, calc(100vw - 140px))',
        objectFit: 'contain',
      }}
    />
  );
}
