import { TOOLS } from '@/lib/tools-registry';
import ToolPageClient from '@/components/ToolPageClient';

const BASE_URL = 'https://imageflow.in';

// Unique, keyword-rich meta descriptions per tool
const TOOL_META = {
  'jpg-to-png': {
    title: 'JPG to PNG Converter — Free Online, No Signup',
    description: 'Convert JPG/JPEG images to PNG format instantly. Free, no signup, no uploads. Supports transparency. Works in your browser — 100% private.',
    keywords: 'jpg to png, jpeg to png converter, convert jpg to png free, online jpg png converter',
  },
  'png-to-jpg': {
    title: 'PNG to JPG Converter — Free Online Tool',
    description: 'Convert PNG images to JPG/JPEG format with custom quality control. Free, instant, no signup required. All processing in your browser.',
    keywords: 'png to jpg, png to jpeg converter, convert png to jpg free, online png jpg converter',
  },
  'webp-converter': {
    title: 'WebP Converter — Convert to WebP Online Free',
    description: 'Convert JPEG, PNG and other images to WebP format. WebP is 30% smaller than JPEG. Free, instant, no signup. Works in your browser.',
    keywords: 'webp converter, convert to webp, jpg to webp, png to webp, webp image converter free',
  },
  'compress-image': {
    title: 'Compress Image Online Free — Reduce File Size',
    description: 'Compress JPEG, PNG, and WebP images online without losing quality. Reduce file size up to 80%. Free, instant, no signup — 100% private.',
    keywords: 'compress image online, reduce image size, compress jpeg, compress png free, image compressor',
  },
  'resize-image': {
    title: 'Resize Image Online Free — Change Dimensions',
    description: 'Resize images to exact pixel dimensions, percentage, or social media presets. Free, instant, no signup. Works in your browser.',
    keywords: 'resize image online, change image size, image resizer free, resize photo online',
  },
  'crop-image': {
    title: 'Crop Image Online Free — Custom & Preset Ratios',
    description: 'Crop images online with custom or preset aspect ratios (1:1, 16:9, 4:3). Free, instant, no signup. Interactive drag-to-crop tool.',
    keywords: 'crop image online, image cropper free, crop photo online, crop jpeg png free',
  },
  'image-to-pdf': {
    title: 'Image to PDF Converter — Free Online Tool',
    description: 'Convert JPG, PNG, and WebP images to PDF online. Combine multiple images into one PDF. Free, no signup, instant download.',
    keywords: 'image to pdf, jpg to pdf, png to pdf, convert image to pdf free, photo to pdf online',
  },
  'ocr-extract-text': {
    title: 'OCR — Extract Text from Image Free Online',
    description: 'Extract text from images using OCR technology. Supports 12+ languages. Free, instant, 100% private — no uploads to servers.',
    keywords: 'ocr online free, extract text from image, image to text converter, ocr tool free',
  },
  'bulk-compress': {
    title: 'Bulk Image Compressor — Compress Multiple Images Free',
    description: 'Compress multiple images at once. Upload dozens of files, compress them all, and download as ZIP. Free, instant, no signup.',
    keywords: 'bulk image compressor, compress multiple images, batch compress images, bulk compress free',
  },
  'batch-resize': {
    title: 'Batch Image Resizer — Resize Multiple Images Free',
    description: 'Resize multiple images to the same dimensions at once. Download all as a ZIP file. Free, instant, no signup required.',
    keywords: 'batch resize images, resize multiple images, bulk image resizer, batch image resize free',
  },
  'meme-generator': {
    title: 'Meme Generator — Create Memes Free Online',
    description: 'Create memes with impact-style top and bottom text. Upload any image and add text instantly. Free, no watermark, no signup.',
    keywords: 'meme generator free, create meme online, meme maker, make meme free no watermark',
  },
  'add-text': {
    title: 'Add Text to Image Online Free — 35+ Fonts',
    description: 'Add custom text to images with 35+ Google Fonts. Control font, size, color, position, shadow, and outline. Free, instant, no signup.',
    keywords: 'add text to image, text on photo free, image text editor, add text to photo online',
  },
  'watermark': {
    title: 'Add Watermark to Image Free Online',
    description: 'Add text watermarks to protect your images and photos. Control opacity, font, size, and position. Free, no signup, instant download.',
    keywords: 'add watermark to image, watermark photo free, image watermark online, watermark tool',
  },
  'image-filters': {
    title: 'Image Filters Online Free — Grayscale, Sepia & More',
    description: 'Apply beautiful filters to images: grayscale, sepia, vintage, warm, cool, vivid, and more. Free, instant, no signup required.',
    keywords: 'image filters online, photo filters free, grayscale image, sepia filter, vintage photo effect',
  },
  'heic-converter': {
    title: 'HEIC to JPG Converter — Convert iPhone Photos Free',
    description: 'Convert Apple HEIC/HEIF photos to JPG or PNG. Convert iPhone photos easily. Free, instant, 100% private — no uploads.',
    keywords: 'heic to jpg, heic converter, convert heic to jpg free, iphone photo converter, heif to jpg',
  },
  'svg-to-png': {
    title: 'SVG to PNG Converter — Free Online Rasterizer',
    description: 'Convert SVG vector files to high-quality PNG images. Control output size and scale. Free, instant, no signup required.',
    keywords: 'svg to png, convert svg to png, svg rasterizer, svg png converter free online',
  },
  'convert-format': {
    title: 'Convert Image Format — JPEG, PNG, WebP, BMP Free',
    description: 'Convert images between JPEG, PNG, WebP, and BMP formats. Free, instant, no signup. All processing in your browser.',
    keywords: 'convert image format, image format converter, change image format free, jpg png webp converter',
  },
  'metadata-remover': {
    title: 'Remove Image Metadata — Strip EXIF Data Free',
    description: 'Remove EXIF data, GPS location, camera info, and metadata from images. Protect your privacy. Free, instant, no signup.',
    keywords: 'remove exif data, strip image metadata, remove gps from photo, exif remover free',
  },
  'collage-maker': {
    title: 'Photo Collage Maker — Create Grid Collages Free',
    description: 'Create beautiful photo grid collages online. Arrange multiple photos into stunning layouts. Free, no signup, instant download.',
    keywords: 'photo collage maker, collage creator free, image collage online, photo grid maker',
  },
  'merge-images': {
    title: 'Merge Images Online Free — Combine Photos',
    description: 'Combine multiple images side by side or stacked vertically. Merge photos easily. Free, instant, no signup required.',
    keywords: 'merge images online, combine photos free, join images, merge pictures online free',
  },
};

// Generate static paths for all tools
export function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

// Dynamic SEO metadata per tool
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = TOOLS.find(t => t.slug === slug);

  if (!tool) {
    return { title: 'Tool Not Found — ImageFlow' };
  }

  const custom = TOOL_META[slug];
  const title = custom?.title || `${tool.name} — Free Online Tool | ImageFlow`;
  const description = custom?.description || tool.description;
  const keywords = custom?.keywords || `${tool.name}, image tool, free online, ImageFlow`;
  const toolUrl = `${BASE_URL}/tools/${slug}/`;

  // JSON-LD for each tool page
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: toolUrl,
    description: description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: description,
    browserRequirements: 'Requires JavaScript. Works in all modern browsers.',
  };

  return {
    title,
    description,
    keywords,
    alternates: { canonical: toolUrl },
    openGraph: {
      title,
      description,
      url: toolUrl,
      type: 'website',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'script:ld+json': JSON.stringify(toolSchema),
    },
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  return <ToolPageClient slug={slug} />;
}
