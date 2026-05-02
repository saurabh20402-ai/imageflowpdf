'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';

const TUTORIALS = [
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    icon: 'Files',
    color: '#ef4444',
    emoji: '🧩',
    shortDesc: 'Combine multiple PDFs into one',
    whatItDoes: 'Merge two or more PDF files into a single PDF. Reorder files, then merge — everything runs in your browser.',
    steps: [
      'Upload 2 or more PDFs',
      'Reorder them using Up/Down',
      'Click "Merge PDFs"',
      'Download the merged PDF',
    ],
    tips: ['Put the main document first', 'If one PDF is upside down, rotate it first using Rotate PDF', 'Rename files before upload to keep order clear'],
    useCases: ['Combine scanned pages', 'Merge invoices', 'Submit multi-part forms', 'Create one final document'],
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    icon: 'Scissors',
    color: '#f97316',
    emoji: '✂️',
    shortDesc: 'Extract specific pages into a new PDF',
    whatItDoes: 'Create a new PDF from selected pages. Enter a page range like "1-3,5,7" and download the extracted PDF.',
    steps: [
      'Upload your PDF',
      'Type pages to extract (example: 1-3,5,7)',
      'Click "Extract pages"',
      'Download the split PDF',
    ],
    tips: ['Use commas to separate ranges', 'If you mistype a page number, it will be ignored', 'Great for pulling out just the pages you need'],
    useCases: ['Extract forms', 'Send only relevant pages', 'Split large reports', 'Create subsets of documents'],
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    icon: 'Zap',
    color: '#eab308',
    emoji: '🗜️',
    shortDesc: 'Reduce PDF size (best for scanned PDFs)',
    whatItDoes: 'Reduce PDF size by rebuilding pages as compressed images. This is ideal for scanned PDFs and image-heavy documents.',
    steps: [
      'Upload your PDF',
      'Choose quality and render scale',
      'Click "Compress PDF"',
      'Download the compressed file',
    ],
    tips: ['Lower quality gives smaller files', 'Increase render scale if text looks soft', 'If your PDF is text-based, compression savings may be smaller'],
    useCases: ['Email attachments', 'Website uploads', 'Form submissions', 'Storage reduction'],
  },
  {
    slug: 'rotate-pdf',
    name: 'Rotate PDF',
    icon: 'RotateCw',
    color: '#fb7185',
    emoji: '🔁',
    shortDesc: 'Rotate PDF pages in seconds',
    whatItDoes: 'Rotate pages by 90°, 180°, or 270°. Apply to all pages or just the current page.',
    steps: [
      'Upload your PDF',
      'Select All pages or Current page',
      'Pick 90°, 180°, or 270°',
      'Click "Rotate PDF" and download',
    ],
    tips: ['Use Current page to fix a single rotated scan', 'Rotate is lossless and preserves quality'],
    useCases: ['Fix scanned documents', 'Correct sideways pages', 'Prep PDFs for printing', 'Standardize orientation'],
  },
  {
    slug: 'crop-pdf',
    name: 'Crop PDF',
    icon: 'Crop',
    color: '#0e7490',
    emoji: '📐',
    shortDesc: 'Crop margins and keep only what you need',
    whatItDoes: 'Crop a PDF visually using a draggable, resizable selection box. Apply crop to all pages or only the current page.',
    steps: [
      'Upload your PDF',
      'Drag and resize the crop rectangle over the preview',
      'Choose All pages or Current page',
      'Click "Crop PDF" and download',
    ],
    tips: ['Crop removes margins for cleaner documents', 'Use Current page if only one page needs trimming'],
    useCases: ['Trim scans', 'Remove white borders', 'Focus on content', 'Prepare for printing'],
  },
  {
    slug: 'watermark-pdf',
    name: 'Watermark PDF',
    icon: 'Stamp',
    color: '#8b5cf6',
    emoji: '💧',
    shortDesc: 'Add a text watermark to PDFs',
    whatItDoes: 'Add a centered text watermark on top of your PDF pages. Control size, opacity, and rotation.',
    steps: [
      'Upload your PDF',
      'Enter watermark text',
      'Adjust size, opacity, and rotation',
      'Choose All pages or Current page',
      'Apply watermark and download',
    ],
    tips: ['25–35% opacity looks professional', 'Use rotation for a classic diagonal watermark'],
    useCases: ['Copyright notice', 'Draft marking', 'Confidential docs', 'Branding'],
  },
  {
    slug: 'sign-pdf',
    name: 'Sign PDF',
    icon: 'PenTool',
    color: '#22c55e',
    emoji: '✍️',
    shortDesc: 'Add a signature to your PDF',
    whatItDoes: 'Draw a signature or upload a PNG signature and place it on the PDF. Apply to the current page or all pages.',
    steps: [
      'Upload your PDF',
      'Draw or upload your signature',
      'Choose placement and size',
      'Apply signature and download',
    ],
    tips: ['Transparent PNG signatures look best', 'Use Current page for most signing workflows'],
    useCases: ['Signing forms', 'Approvals', 'Client contracts', 'Internal documents'],
  },
  {
    slug: 'compress-image',
    name: 'Compress Image',
    icon: 'FileDown',
    color: '#16a34a',
    emoji: '🗜️',
    shortDesc: 'Reduce file size while keeping quality',
    whatItDoes: 'Image compression reduces the file size of your photos by removing unnecessary data. Our tool uses browser-native canvas compression to shrink JPEG, PNG, and WebP images without visible quality loss.',
    steps: [
      'Click "Choose File" or drag your image into the upload area',
      'Adjust the Quality slider — lower = smaller file, higher = better quality',
      'Choose output format (JPEG for photos, PNG for transparency, WebP for web)',
      'Click "Compress" to process your image',
      'Preview the before/after and download your compressed image',
    ],
    tips: ['80% quality is usually a sweet spot for photos', 'Use WebP for web — it\'s 30% smaller than JPEG with the same quality', 'PNG is lossless — quality slider doesn\'t apply'],
    useCases: ['Website speed optimization', 'Email attachments', 'Social media uploads', 'Reducing storage usage'],
  },
  {
    slug: 'resize-image',
    name: 'Resize Image',
    icon: 'Maximize2',
    color: '#0891b2',
    emoji: '📐',
    shortDesc: 'Change image dimensions precisely',
    whatItDoes: 'Resize images to exact pixel dimensions or by a percentage. Supports aspect ratio locking and social media presets like Instagram, Twitter, and YouTube thumbnails.',
    steps: [
      'Upload your image',
      'Choose resize mode: by pixels, percentage, or social preset',
      'Enter your target width (height auto-adjusts if aspect ratio is locked)',
      'Optionally unlock aspect ratio to set custom width and height independently',
      'Click "Resize" and download your result',
    ],
    tips: ['Lock aspect ratio to prevent image distortion', 'Use presets for social media to get perfect sizes every time', 'Percentage mode is great for making images consistently smaller'],
    useCases: ['Profile photos', 'Social media posts', 'Website banners', 'Email signatures'],
  },
  {
    slug: 'crop-image',
    name: 'Crop Image',
    icon: 'Crop',
    color: '#0e7490',
    emoji: '✂️',
    shortDesc: 'Cut out any part of your image',
    whatItDoes: 'Crop images by dragging a selection box over the area you want to keep. Supports free-form cropping and locked aspect ratios (1:1, 4:3, 16:9, 9:16).',
    steps: [
      'Upload your image — it will appear in the crop view',
      'The crop box appears automatically. Drag the box to move it',
      'Drag any corner handle to resize the selection area',
      'Use rule-of-thirds gridlines as a composition guide',
      'Optionally select an aspect ratio preset (1:1, 16:9, etc.)',
      'Click "Crop Image" to apply and download',
    ],
    tips: ['1:1 is perfect for profile pictures', '16:9 is standard for YouTube thumbnails', '9:16 is ideal for Instagram Stories and TikTok'],
    useCases: ['Removing backgrounds/borders', 'Creating profile pictures', 'Preparing thumbnails', 'Composing better shots'],
  },
  {
    slug: 'jpg-to-png',
    name: 'JPG to PNG',
    icon: 'FileImage',
    color: '#ff385c',
    emoji: '🔄',
    shortDesc: 'Convert JPEG images to transparent PNG',
    whatItDoes: 'Convert JPEG images to PNG format. PNG supports transparency (alpha channel) while JPEG does not. Use this when you need a transparent background or lossless quality.',
    steps: [
      'Drop or select your JPEG/JPG file',
      'The tool automatically converts to PNG in your browser',
      'Click "Convert to PNG" to process',
      'Download your PNG file',
    ],
    tips: ['PNG files will be larger than JPEG — that\'s normal (PNG is lossless)', 'To add transparency after conversion, use a background remover tool', 'Use PNG for logos, icons, and illustrations that need crisp edges'],
    useCases: ['Logos and branding', 'Screenshots', 'Images needing transparency', 'Design assets'],
  },
  {
    slug: 'convert-format',
    name: 'Convert Format',
    icon: 'ArrowLeftRight',
    color: '#7c3aed',
    emoji: '⚙️',
    shortDesc: 'Convert between JPEG, PNG, WebP, and BMP',
    whatItDoes: 'Convert any image to JPEG, PNG, WebP, or BMP format. Choose your output format, adjust quality if needed, and download the result instantly.',
    steps: [
      'Upload any image (JPEG, PNG, WebP, BMP, GIF)',
      'Select your target format from the format pills (JPEG, PNG, WebP, BMP)',
      'Adjust quality for lossy formats (JPEG, WebP)',
      'Click "Convert" and download',
    ],
    tips: ['WebP is the best format for websites — smallest file size with great quality', 'JPEG is universal — works everywhere', 'Use PNG when you need transparency or exact color fidelity'],
    useCases: ['Web optimization', 'Cross-platform compatibility', 'Format standardization', 'Design workflow'],
  },
  {
    slug: 'bulk-compress',
    name: 'Bulk Compressor',
    icon: 'Package',
    color: '#15803d',
    emoji: '📦',
    shortDesc: 'Compress multiple images at once',
    whatItDoes: 'Compress dozens of images in a single batch operation. All images are downloaded as a ZIP file. Saves hours compared to processing one by one.',
    steps: [
      'Drag multiple images into the upload area, or click to select multiple files',
      'Use Ctrl/Cmd+Click or Shift+Click to select multiple files at once',
      'Set quality and output format for all images',
      'Click "Compress All" to process the batch',
      'Wait for the progress bar to complete',
      'Click "Download ZIP" to get all compressed images in one file',
    ],
    tips: ['Select files in your file manager with Ctrl+A to select all', 'You can mix JPEG and PNG files in one batch', 'Use WebP output for the smallest possible web-ready files'],
    useCases: ['Website asset optimization', 'Photo library management', 'Email newsletter images', 'E-commerce product photos'],
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    icon: 'FileText',
    color: '#9333ea',
    emoji: '📄',
    shortDesc: 'Combine images into a PDF document',
    whatItDoes: 'Convert one or more images into a PDF document. Perfect for creating photo portfolios, document scans, or multi-page presentations.',
    steps: [
      'Upload one or more images',
      'Reorder pages by dragging if needed',
      'Choose page size (A4, Letter, etc.) and orientation',
      'Adjust image fitting (fill page or fit with margins)',
      'Click "Convert to PDF" and download your PDF',
    ],
    tips: ['Images are added in the order you upload them', 'Use portrait orientation for documents, landscape for photos', 'Higher quality settings produce a larger but crisper PDF'],
    useCases: ['Document scanning', 'Photo portfolios', 'Invoice creation', 'Slide decks from images'],
  },
  {
    slug: 'collage-maker',
    name: 'Collage Maker',
    icon: 'LayoutGrid',
    color: '#c2410c',
    emoji: '🧩',
    shortDesc: 'Create beautiful photo collages',
    whatItDoes: 'Arrange multiple photos into a clean grid collage with quick, download-ready output.',
    steps: [
      'Upload multiple photos',
      'Choose a grid layout and spacing',
      'Adjust positioning if needed',
      'Download your collage image',
    ],
    tips: ['Use similarly sized images for cleaner grids', 'Try fewer images for stronger focus', 'Leave a little spacing for a modern look'],
    useCases: ['Social posts', 'Before/after sets', 'Photo highlights', 'Simple moodboards'],
  },
  {
    slug: 'remove-background',
    name: 'Remove Background',
    icon: 'Eraser',
    color: '#3b82f6',
    emoji: '🧼',
    shortDesc: 'Remove solid-color backgrounds fast',
    whatItDoes: 'Remove a flat/solid background by choosing a background color and tolerance. Best for product photos and studio shots.',
    steps: [
      'Upload your image',
      'Click on the background to pick its color (or use the color picker)',
      'Adjust tolerance and feather',
      'Click "Remove background" and download a PNG',
    ],
    tips: ['Works best on white/solid backgrounds', 'Increase feather for smoother edges', 'If background is complex, results may vary'],
    useCases: ['Product photos', 'Profile pics (solid background)', 'Catalog images', 'Quick cutouts'],
  },
  {
    slug: 'image-upscaler',
    name: 'Image Upscaler',
    icon: 'Maximize2',
    color: '#14b8a6',
    emoji: '🔍',
    shortDesc: 'Upscale images 2× or 4×',
    whatItDoes: 'Upscale images using high-quality canvas resizing. This is not AI — it’s a reliable enlarge for clean graphics and photos.',
    steps: [
      'Upload your image',
      'Choose 2× or 4×',
      'Select output format (PNG/WebP/JPG)',
      'Click "Upscale" and download',
    ],
    tips: ['PNG keeps best quality', 'WebP gives smaller size', 'Upscaling increases dimensions and file size'],
    useCases: ['Larger social graphics', 'Print drafts', 'Thumbnails', 'Quick enlarge'],
  },
  {
    slug: 'bulk-format-convert',
    name: 'Bulk Format Convert',
    icon: 'Package',
    color: '#ea580c',
    emoji: '📦',
    shortDesc: 'Batch convert images and download ZIP',
    whatItDoes: 'Convert many images to WebP/JPG/PNG at once and download everything as a ZIP file.',
    steps: [
      'Upload multiple images',
      'Pick output format and quality',
      'Click "Convert & build ZIP"',
      'Download the ZIP file',
    ],
    tips: ['Use WebP for the smallest website assets', 'JPG is best for photos', 'PNG is best for transparency'],
    useCases: ['Website optimization', 'E-commerce assets', 'Bulk exports', 'Content pipelines'],
  },
  {
    slug: 'passport-photo-maker',
    name: 'Passport Photo Maker',
    icon: 'IdCard',
    color: '#0ea5e9',
    emoji: '🪪',
    shortDesc: 'Create passport-size photos with presets',
    whatItDoes: 'Export a correctly sized passport photo using country presets like 35×45mm and 2×2 inch.',
    steps: [
      'Upload your photo',
      'Choose a preset size',
      'Adjust zoom and position',
      'Generate and download your photo',
    ],
    tips: ['Use a plain background for best results', 'Adjust position so the face is centered', 'Choose white/light background for most documents'],
    useCases: ['Passport', 'Visa', 'ID cards', 'Applications'],
  },
];

export default function TutorialsPage() {
  return (
    <main style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 940 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: 10 }}>Learn</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 14 }}>
            How to Use ImageFlow Tools
          </h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
            Step-by-step tutorials for every tool. Learn what each tool does, how to use it, and when to use it — with tips from our team.
          </p>
        </div>

        {/* Quick Jump Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12, marginBottom: 60,
          padding: '24px', borderRadius: 16,
          background: 'var(--surface)', border: '1px solid var(--hairline)',
        }}>
          <p style={{ gridColumn: '1 / -1', fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 4 }}>JUMP TO TUTORIAL</p>
          {TUTORIALS.map(t => (
            <a key={t.slug} href={`#tut-${t.slug}`} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', borderRadius: 8, textDecoration: 'none',
              fontSize: 13, color: 'var(--muted)', transition: 'all 150ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-card)'; e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}>
              <span>{t.emoji}</span> {t.name}
            </a>
          ))}
        </div>

        {/* Tutorials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {TUTORIALS.map((tut) => (
            <div key={tut.slug} id={`tut-${tut.slug}`} style={{
              borderRadius: 20, overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              {/* Header */}
              <div style={{
                padding: '24px 28px',
                background: `linear-gradient(135deg, ${tut.color}10, var(--surface-card))`,
                borderBottom: '1px solid var(--hairline-soft)',
                display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: `${tut.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                }}>
                  {tut.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{tut.name}</h2>
                  <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 2 }}>{tut.shortDesc}</p>
                </div>
                <Link href={`/tools/${tut.slug}/`} style={{
                  padding: '9px 20px', borderRadius: 10,
                  background: tut.color, color: 'white',
                  textDecoration: 'none', fontSize: 13, fontWeight: 700,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  Try it →
                </Link>
              </div>

              {/* Body */}
              <div style={{ padding: '28px', background: 'var(--surface-card)', display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* What it does */}
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>What It Does</h3>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>{tut.whatItDoes}</p>
                </div>

                {/* Steps + Tips in 2 columns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                  {/* Steps */}
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Step-by-Step</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {tut.steps.map((step, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <div style={{
                            width: 22, height: 22, borderRadius: 99,
                            background: tut.color, color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
                          }}>{i + 1}</div>
                          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Tips */}
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>💡 Pro Tips</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {tut.tips.map((tip, i) => (
                          <div key={i} style={{
                            fontSize: 13, color: 'var(--muted)', lineHeight: 1.6,
                            padding: '8px 12px', borderRadius: 8,
                            background: 'var(--surface)', borderLeft: `3px solid ${tut.color}`,
                          }}>
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Best For</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {tut.useCases.map(uc => (
                          <span key={uc} style={{
                            padding: '4px 12px', borderRadius: 99,
                            background: `${tut.color}12`, color: tut.color,
                            fontSize: 12, fontWeight: 600,
                          }}>{uc}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Tools CTA */}
        <div style={{ textAlign: 'center', marginTop: 60, padding: '36px', borderRadius: 20, background: 'var(--surface)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>Ready to try these tools?</h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 20 }}>All tools are free, instant, and work right in your browser.</p>
          <Link href="/#all-tools" style={{
            display: 'inline-block', padding: '12px 28px',
            background: 'var(--primary)', color: 'white', borderRadius: 12,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
          }}>Browse All Tools →</Link>
        </div>

      </div>
    </main>
  );
}
