'use client';

import Image from 'next/image';

/** Horizontal mark: purple squircle icon + “ImageFlow” wordmark (single PNG). */
export default function ImageFlowLogoImg({ height = 38, priority = false, unconstrained = false }) {
  return (
    <Image
      src="/imageflow-logo.png"
      alt="ImageFlow"
      width={220}
      height={48}
      priority={priority}
      sizes={unconstrained ? '(max-width: 640px) 85vw, 320px' : '(max-width: 640px) 150px, 200px'}
      style={{
        height,
        width: 'auto',
        maxWidth: unconstrained ? 'min(320px, 90vw)' : 'min(200px, calc(100vw - 168px))',
        objectFit: 'contain',
        objectPosition: 'left center',
        display: 'block',
      }}
    />
  );
}
