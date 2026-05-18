import Link from 'next/link';
import * as Icons from 'lucide-react';
import { TOOLS } from '@/lib/tools-registry';

export const metadata = {
  title: 'Tutorials — ImageFlow',
  description: 'Step-by-step tutorials for every ImageFlow tool. Learn what each tool does, how to use it, and best practices from our team.',
};

const TUTORIALS = [
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    icon: 'Files',
    color: '#ef4444',
    emoji: '🧩',
    shortDesc: 'Combine multiple PDFs into one',
    whatItDoes: 'Merge two or more PDF files into a single document while preserving page quality and order.',
    steps: ['Upload multiple PDFs', 'Reorder using Up/Down buttons', 'Click Merge PDFs', 'Download merged file'],
    tips: ['Place the final cover document first', 'Rotate pages before merge if needed'],
    useCases: ['Invoices', 'Multi-part applications', 'Scanning bundles'],
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    icon: 'Scissors',
    color: '#f97316',
    emoji: '✂️',
    shortDesc: 'Extract specific pages',
    whatItDoes: 'Create a new PDF from selected pages using ranges like 1-3,5,7.',
    steps: ['Upload PDF', 'Enter pages/ranges', 'Click Extract pages', 'Download split PDF'],
    tips: ['Use commas for multiple ranges', 'Invalid page numbers are ignored'],
    useCases: ['Share selected sections', 'Archive key pages'],
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    icon: 'Zap',
    color: '#eab308',
    emoji: '🗜️',
    shortDesc: 'Reduce PDF size',
    whatItDoes: 'Compress scanned/image-heavy PDFs with adjustable quality and render scale.',
    steps: ['Upload PDF', 'Set quality and scale', 'Click Compress PDF', 'Download result'],
    tips: ['Lower quality = smaller file', 'Higher scale preserves readability'],
    useCases: ['Email attachments', 'Portal upload limits'],
  },
  {
    slug: 'rotate-pdf',
    name: 'Rotate PDF',
    icon: 'RotateCw',
    color: '#fb7185',
    emoji: '🔁',
    shortDesc: 'Rotate all or one page',
    whatItDoes: 'Rotate PDF pages by 90°, 180°, or 270°.',
    steps: ['Upload PDF', 'Choose All pages or Current page', 'Pick angle', 'Rotate and download'],
    tips: ['Use Current page for one bad scan'],
    useCases: ['Fix sideways scans', 'Prepare print-ready docs'],
  },
  {
    slug: 'crop-pdf',
    name: 'Crop PDF',
    icon: 'Crop',
    color: '#0e7490',
    emoji: '📐',
    shortDesc: 'Crop with draggable selector',
    whatItDoes: 'Trim margins with an interactive, resizable selection box and apply to all/current pages.',
    steps: ['Upload PDF', 'Drag/resize crop area', 'Choose apply mode', 'Crop and download'],
    tips: ['Reset selection to start over quickly'],
    useCases: ['Remove borders', 'Focus on content blocks'],
  },
  {
    slug: 'watermark-pdf',
    name: 'Watermark PDF',
    icon: 'Stamp',
    color: '#8b5cf6',
    emoji: '💧',
    shortDesc: 'Add text watermark',
    whatItDoes: 'Apply watermark text with size, opacity, and rotation controls.',
    steps: ['Upload PDF', 'Enter text', 'Adjust controls', 'Apply and download'],
    tips: ['Use 20–35% opacity for subtle marks'],
    useCases: ['Draft mark', 'Confidential docs', 'Branding'],
  },
  {
    slug: 'sign-pdf',
    name: 'Sign PDF',
    icon: 'PenTool',
    color: '#22c55e',
    emoji: '✍️',
    shortDesc: 'Draw and place signature',
    whatItDoes: 'Draw your signature and place it on current/all pages.',
    steps: ['Upload PDF', 'Draw signature', 'Choose page mode and position', 'Apply and download'],
    tips: ['Use current page for standard approvals'],
    useCases: ['Agreements', 'Forms', 'Approvals'],
  },
  {
    slug: 'remove-background',
    name: 'Remove Background',
    icon: 'Eraser',
    color: '#3b82f6',
    emoji: '🧼',
    shortDesc: 'Solid background remover',
    whatItDoes: 'Remove flat-color backgrounds using color + tolerance.',
    steps: ['Upload image', 'Pick background color', 'Adjust tolerance', 'Export PNG'],
    tips: ['Works best for studio or plain backgrounds'],
    useCases: ['Product photos', 'Profile cutouts'],
  },
  {
    slug: 'image-upscaler',
    name: 'Image Upscaler',
    icon: 'Maximize2',
    color: '#14b8a6',
    emoji: '🔍',
    shortDesc: 'Upscale 2x/4x',
    whatItDoes: 'Increase image dimensions using high-quality in-browser resampling.',
    steps: ['Upload image', 'Choose 2x or 4x', 'Upscale', 'Download PNG'],
    tips: ['4x can create large files'],
    useCases: ['Banners', 'Print drafts'],
  },
  {
    slug: 'bulk-format-convert',
    name: 'Bulk Format Convert',
    icon: 'Package',
    color: '#ea580c',
    emoji: '📦',
    shortDesc: 'Batch convert with ZIP output',
    whatItDoes: 'Convert many images to WebP/JPG/PNG in one run.',
    steps: ['Upload multiple files', 'Choose output format', 'Convert', 'Download ZIP'],
    tips: ['Use WebP for smaller web assets'],
    useCases: ['Ecommerce assets', 'Blog image pipelines'],
  },
  {
    slug: 'passport-photo-maker',
    name: 'Passport Photo Maker',
    icon: 'IdCard',
    color: '#0ea5e9',
    emoji: '🪪',
    shortDesc: 'Country preset passport photos',
    whatItDoes: 'Generate passport-size photos using fixed country presets.',
    steps: ['Upload face photo', 'Choose preset', 'Adjust zoom/position', 'Generate and download'],
    tips: ['Plain backgrounds give best output'],
    useCases: ['Passport', 'Visa', 'ID forms'],
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
    slug: 'add-text',
    name: 'Add Text to Image',
    icon: 'Type',
    color: '#a78bfa',
    emoji: '✍️',
    shortDesc: 'Add custom text with 35+ fonts',
    whatItDoes: 'Overlay custom text on any image with full styling control. Choose from 35+ trending Google Fonts, adjust size, color, position, bold/italic, shadow, and stroke outline.',
    steps: [
      'Upload your image',
      'Type your text in the text input field',
      'Search and select a font from 35+ Google Fonts',
      'Adjust font size with the slider',
      'Pick a fill color and optional stroke (outline) color',
      'Toggle Bold, Italic, and Shadow',
      'Use X/Y Position sliders to place text anywhere on the image',
      'Click "Add Text" to apply and download',
    ],
    tips: ['Use high contrast colors for legibility (white text on dark images, dark on light)', 'Enable Shadow for text that works on any background', 'Stroke outline is great for meme-style text that stands out'],
    useCases: ['Memes and social posts', 'Image captions', 'Watermarking', 'Quote graphics', 'Event announcements'],
  },
  {
    slug: 'image-filters',
    name: 'Image Filters',
    icon: 'Sparkles',
    color: '#7c3aed',
    emoji: '🎨',
    shortDesc: 'Apply beautiful one-click filters',
    whatItDoes: 'Apply professional-looking filters to your images: Grayscale, Sepia, Vintage, Warm, Cool, Vivid, Fade, and more. All processed instantly in your browser.',
    steps: [
      'Upload your image',
      'Browse and click any filter preset to preview instantly',
      'Adjust the intensity slider to control how strong the effect is',
      'Switch to "Adjust" mode for manual brightness, contrast, saturation control',
      'Download your filtered image',
    ],
    tips: ['Vintage gives a warm, faded film look', 'Cool filter works well for winter/night photos', 'Vivid boosts all colors for a more striking look'],
    useCases: ['Social media posts', 'Photography editing', 'Brand consistency', 'Artistic effects'],
  },
  {
    slug: 'ocr-extract-text',
    name: 'OCR - Extract Text',
    icon: 'FileSearch',
    color: '#2563eb',
    emoji: '🔍',
    shortDesc: 'Read text from any image',
    whatItDoes: 'Optical Character Recognition (OCR) reads and extracts text from images using AI. Works on screenshots, documents, signs, receipts, and photos containing text.',
    steps: [
      'Upload an image containing text',
      'Select the language of the text in the image',
      'Click "Extract Text" — the AI engine will analyze your image',
      'Watch the progress bar as text is recognized',
      'Copy the extracted text or download as a .TXT file',
    ],
    tips: ['Higher resolution images give better results', 'Ensure the text is clearly visible and not blurry', 'High contrast text (black on white) is recognized most accurately', 'OCR works best on printed text; handwriting may have lower accuracy'],
    useCases: ['Digitizing documents', 'Extracting text from screenshots', 'Reading receipts/invoices', 'Searching text in images'],
  },
  {
    slug: 'watermark',
    name: 'Add Watermark',
    icon: 'BadgeCheck',
    color: '#8b5cf6',
    emoji: '💧',
    shortDesc: 'Protect your images with text watermarks',
    whatItDoes: 'Add text watermarks to protect your photos and art. Control font, size, color, opacity, position, and tiling.',
    steps: [
      'Upload your image',
      'Type your watermark text',
      'Choose font, size, and color',
      'Adjust opacity (30-50% is usually subtle but visible)',
      'Position the watermark or enable tile mode to repeat it across the image',
      'Download your watermarked image',
    ],
    tips: ['Use 30-40% opacity for a professional, non-intrusive watermark', 'Your name or website URL works great as a watermark', 'Tile mode is great for comprehensive copyright protection'],
    useCases: ['Protecting photography', 'Portfolio sharing', 'Draft document labeling', 'Copyright assertion'],
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
    slug: 'meme-generator',
    name: 'Meme Generator',
    icon: 'Smile',
    color: '#ea580c',
    emoji: '😂',
    shortDesc: 'Create memes with impact text',
    whatItDoes: 'Add classic impact-style top and bottom text to any image to create memes instantly. Choose font size, color, and shadow.',
    steps: [
      'Upload your meme image',
      'Type top text and bottom text',
      'Adjust font size and color',
      'Click "Create Meme" and download',
    ],
    tips: ['All caps works best for classic meme style', 'White text with black shadow is the traditional meme look', 'Keep text short and punchy for maximum impact'],
    useCases: ['Social media humor', 'Reaction images', 'Viral content creation'],
  },
];

export default function TutorialsPage() {
  const visibleTutorials = TUTORIALS.filter(t => TOOLS.some(tool => tool.slug === t.slug));

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
          {visibleTutorials.map(t => (
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
          {visibleTutorials.map((tut) => (
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
