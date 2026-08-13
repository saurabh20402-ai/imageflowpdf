import { TOOLS } from '@/lib/tools-registry';
import ToolPageClient from '@/components/ToolPageClient';
import { TOOL_SEO_CONTENT } from '@/data/tool-seo-content';

const BASE_URL = 'https://imageflow.in/';

// Unique, keyword-rich meta descriptions per tool (120–320 chars)
const TOOL_META = {
  // PDF Tools
  'merge-pdf': {
    title: 'Merge PDF Online Free — Combine PDF Files in Seconds',
    description: 'Merge multiple PDF files into one document instantly. No signup, no upload to servers. Combine PDF files for job applications, reports, invoices, or assignments — all inside your browser with 100% privacy.',
    keywords: 'merge pdf online, combine pdf files free, join pdf online, merge pdf without upload, pdf merger free',
  },
  'split-pdf': {
    title: 'Split PDF Online Free — Extract PDF Pages Instantly',
    description: 'Split a PDF into separate pages or extract specific page ranges instantly. No signup required. Perfect for separating chapters, invoices, or contract pages — works entirely in your browser with zero data sent to any server.',
    keywords: 'split pdf online free, extract pdf pages, split pdf without upload, pdf splitter, separate pdf pages',
  },
  'compress-pdf': {
    title: 'Compress PDF Online Free — Reduce PDF File Size',
    description: 'Compress PDF files online and reduce file size without losing readable quality. Ideal for scanned PDFs, email attachments, and online form uploads. Free, instant, no signup. Your file never leaves your browser.',
    keywords: 'compress pdf online free, reduce pdf size, shrink pdf file, compress pdf for email, pdf compressor free',
  },
  'rotate-pdf': {
    title: 'Rotate PDF Online Free — Rotate PDF Pages Instantly',
    description: 'Rotate PDF pages by 90°, 180°, or 270° in one click. Fix upside-down or sideways scans instantly. Supports rotating all pages or individual pages. Free, no signup, fully browser-based with complete privacy.',
    keywords: 'rotate pdf online free, rotate pdf pages, fix pdf orientation, rotate pdf 90 degrees, pdf rotator free',
  },
  'crop-pdf': {
    title: 'Crop PDF Online Free — Remove Margins & Trim PDF Pages',
    description: 'Crop PDF pages and remove unwanted white margins using an interactive drag-and-select tool. Apply crop to all pages or a single page. Free online PDF cropping with no signup and no file uploads to any server.',
    keywords: 'crop pdf online free, remove pdf margins, trim pdf pages, auto crop pdf, crop pdf without losing quality',
  },
  'watermark-pdf': {
    title: 'Watermark PDF Online Free — Add Text Watermarks Instantly',
    description: 'Add custom text watermarks to your PDF documents directly in your browser. Control font size, opacity, position, and color. Protect your confidential documents or drafts for free with no account required.',
    keywords: 'watermark pdf online free, add watermark to pdf, text watermark pdf, stamp pdf free, draft watermark pdf',
  },
  'sign-pdf': {
    title: 'Sign PDF Online Free — Add Digital Signature to PDF',
    description: 'Draw or upload your signature and place it anywhere on a PDF document. Sign contracts, forms, and agreements instantly — no Adobe required. Free, secure, browser-based PDF signing with no data sent to servers.',
    keywords: 'sign pdf online free, digital signature pdf, esign pdf free, add signature to pdf, fill and sign pdf',
  },
  // Convert Tools
  'jpg-to-png': {
    title: 'JPG to PNG Converter — Free Online, No Signup',
    description: 'Convert JPG or JPEG images to PNG format instantly with full transparency support. No signup, no file uploads to any server. Great for web graphics, logos, and images that need transparent backgrounds.',
    keywords: 'jpg to png converter free, jpeg to png online, convert jpg to png, jpg png free no signup',
  },
  'png-to-jpg': {
    title: 'PNG to JPG Converter — Free Online Tool',
    description: 'Convert PNG images to JPG or JPEG format with custom quality control. Reduce file size significantly while keeping photos sharp. Free, instant, works fully in your browser — no signup or upload required.',
    keywords: 'png to jpg converter free, convert png to jpeg online, png to jpg no signup, reduce png size free',
  },
  'webp-converter': {
    title: 'WebP Converter — Convert to WebP Online Free',
    description: 'Convert JPEG and PNG images to the WebP format for up to 30% smaller file sizes without visible quality loss. Ideal for web developers and bloggers. Free, instant conversion — fully browser-based.',
    keywords: 'webp converter free, convert to webp online, jpg to webp, png to webp, webp image converter free',
  },
  'webp-to-png': {
    title: 'WebP to PNG Converter — Free Online, No Signup',
    description: 'Convert WebP images to PNG format for broader compatibility with apps, social media, and design software. Supports transparency. Completely free, instant, and processed entirely in your browser without any file uploads.',
    keywords: 'webp to png converter free, convert webp to png online, webp png no signup, webp to png browser',
  },
  'webp-to-jpg': {
    title: 'WebP to JPG Converter — Free Online Conversion',
    description: 'Convert WebP images to JPG or JPEG format with adjustable quality. Perfect when apps or clients do not support WebP files. Free, instant, browser-based conversion with no account, no watermark, no file uploads.',
    keywords: 'webp to jpg converter free, convert webp to jpeg, webp jpg online free, webp to jpg no upload',
  },
  'svg-to-png': {
    title: 'SVG to PNG Converter — Free Online Rasterizer',
    description: 'Rasterize SVG vector files to high-quality PNG images at any resolution. Ideal for exporting icons, logos, and illustrations for use in presentations, apps, or social media posts. Free, instant, no signup needed.',
    keywords: 'svg to png converter free, rasterize svg online, convert svg to png, svg png free no upload',
  },
  'heic-converter': {
    title: 'HEIC to JPG Converter — Convert iPhone Photos Free',
    description: 'Convert Apple HEIC and HEIF photos from your iPhone to JPG or PNG format without any software download. Works on Windows, Mac, and Android browsers. Free, instant, 100% private — no files sent to any server.',
    keywords: 'heic to jpg converter free, convert heic to jpg online, iphone heic converter, heif to jpg free',
  },
  'image-to-pdf': {
    title: 'Image to PDF Converter — Free Online Tool',
    description: 'Convert JPG, PNG, and WebP images into a single PDF document. Add multiple photos and combine them into one file in seconds. Free, no signup required, instant download — all processing done locally in your browser.',
    keywords: 'image to pdf converter free, jpg to pdf online, png to pdf, convert photos to pdf, image pdf free',
  },
  'convert-format': {
    title: 'Convert Image Format — JPEG, PNG, WebP, BMP Free',
    description: 'Convert images between JPEG, PNG, WebP, BMP, and GIF formats with one click. Supports quality control and batch-style processing. Free, instant, no signup. All format conversions happen directly in your browser.',
    keywords: 'convert image format free, change image format online, jpg png webp converter, image format changer free',
  },
  // Transform Tools
  'resize-image': {
    title: 'Resize Image Online Free — Change Image Dimensions',
    description: 'Resize images to exact pixel dimensions, a percentage of the original size, or popular social media presets like Instagram, Twitter, and YouTube. Free, instant, no signup. Browser-based with complete privacy.',
    keywords: 'resize image online free, change image size, image resizer free, resize photo to exact pixels, resize for social media',
  },
  'photo-editor': {
    title: 'Photo Editor Online Free — Edit Photos Without Download',
    description: 'Edit photos online with quick access to crop, resize, compress, rotate, add filters, remove background, and convert — all in one place. HD quality. No download, no signup, no watermark. 100% free browser tool.',
    keywords: 'photo editor online free, edit photos online, hd image editing no download, online photo editor free',
  },
  'crop-image': {
    title: 'Crop Image Online Free — Custom & Preset Aspect Ratios',
    description: 'Crop images online using an interactive drag-to-crop tool with custom dimensions or preset ratios like 1:1, 16:9, and 4:3. Perfect for social media profile pictures, thumbnails, and banners. Free, instant, no signup.',
    keywords: 'crop image online free, crop photo online, image cropper free, crop to 1:1 online, crop jpeg png free',
  },
  'rotate-image': {
    title: 'Rotate Image Online Free — Rotate Photos Any Angle',
    description: 'Rotate images by 90°, 180°, 270°, or any custom angle. Fix portrait or landscape orientation issues instantly. Supports JPEG, PNG, and WebP. Free, browser-based, no signup, no data uploaded to any server.',
    keywords: 'rotate image online free, rotate photo 90 degrees, flip image online, rotate jpeg png free, image rotation tool',
  },
  'remove-background': {
    title: 'Remove Background from Image — Free Online Tool',
    description: 'Remove solid-color backgrounds from images instantly using a smart color-picker tool. Ideal for product photos, portraits, and logo cutouts. Free, browser-based with no signup — your image is never uploaded anywhere.',
    keywords: 'remove background free, background remover online, remove white background, image background eraser free',
  },
  'image-upscaler': {
    title: 'Image Upscaler — Enlarge Images 2x or 4x Free Online',
    description: 'Upscale and enlarge images by 2x or 4x while maintaining clarity using browser-based interpolation. Great for printing, presentations, and recovering small thumbnails. Free, instant, no signup required.',
    keywords: 'image upscaler free, enlarge image online, increase image resolution, upscale photo 2x 4x free',
  },
  'passport-photo-maker': {
    title: 'Passport Photo Maker — Create ID Photos Free Online',
    description: 'Create standard passport-size photos with country-specific presets. Crop, resize, and save your photo meeting official requirements for visas, applications, and IDs. Free, no signup, browser-based with complete privacy.',
    keywords: 'passport photo maker free, id photo online, create passport photo, visa photo size online, passport size photo free',
  },
  'thumbnail-creator': {
    title: 'YouTube Thumbnail Maker — Design Free Thumbnails Online',
    description: 'Design eye-catching YouTube thumbnails with customizable templates, text overlays, cutouts, blur effects, and stickers — right in your browser. No design experience needed. Free, no signup, instant download.',
    keywords: 'youtube thumbnail maker free, thumbnail creator online, design youtube thumbnail, custom thumbnail free no watermark',
  },
  // Optimize Tools
  'compress-image': {
    title: 'Compress Image Online Free — Reduce File Size',
    description: 'Compress JPEG, PNG, and WebP images online without losing visible quality. Reduce file sizes by up to 80% for faster website loading, smaller email attachments, and easier sharing. Free, instant, 100% private.',
    keywords: 'compress image online free, reduce image size, compress jpeg png webp, image compressor free, shrink photo online',
  },
  'bulk-compress': {
    title: 'Bulk Image Compressor — Compress Multiple Images Free',
    description: 'Upload and compress dozens of images at once, then download them all as a single ZIP file. Ideal for batch-processing product photos, event pictures, or website assets. Free, instant, no signup required.',
    keywords: 'bulk image compressor free, compress multiple images, batch compress photos, compress images download zip',
  },
  'metadata-remover': {
    title: 'Remove Image Metadata — Strip EXIF Data Free Online',
    description: 'Remove EXIF metadata, GPS location, camera settings, copyright data, and timestamps from photos before sharing online. Protect your privacy in seconds. Free, browser-based, no signup — files never leave your device.',
    keywords: 'remove exif data free, strip image metadata online, remove gps from photo, exif remover free, privacy photo cleaner',
  },
  'batch-resize': {
    title: 'Batch Image Resizer — Resize Multiple Images Free',
    description: 'Resize multiple images to the same target dimensions in one go. Download all resized images as a ZIP file. Perfect for preparing product images, website galleries, or presentation assets. Free, instant, no signup.',
    keywords: 'batch resize images free, resize multiple photos online, bulk image resizer, batch resize download zip free',
  },
  // Create Tools
  'collage-maker': {
    title: 'Photo Collage Maker — Create Grid Collages Free Online',
    description: 'Arrange multiple photos into beautiful grid collages with various layout options. Customize spacing and borders, then download your finished collage instantly. Free, no signup, no watermark — works in any browser.',
    keywords: 'photo collage maker free, online collage creator, image grid collage, make photo collage free no watermark',
  },
  'bulk-format-convert': {
    title: 'Bulk Image Format Converter — Batch Convert Images Free',
    description: 'Convert multiple images to JPEG, PNG, or WebP format all at once and download them as a ZIP. Ideal for batch-processing large photo libraries or preparing images for a website. Free, instant, no signup required.',
    keywords: 'bulk image converter free, batch convert images online, convert multiple photos format, bulk format change zip download',
  },
  'merge-images': {
    title: 'Merge Images Online Free — Combine Photos Side by Side',
    description: 'Combine two or more images side by side or stacked vertically into a single picture. Ideal for before-and-after comparisons, product listings, and social media posts. Free, no signup, instant download.',
    keywords: 'merge images online free, combine photos side by side, join images online, merge pictures free no watermark',
  },
  // Remaining tools from old list
  'meme-generator': {
    title: 'Meme Generator — Create Memes Free Online',
    description: 'Create memes with classic impact-style top and bottom text on any image. Upload your own photo or use any image URL. No watermark, no signup, instant sharing-ready output. Free online meme maker.',
    keywords: 'meme generator free, create meme online, meme maker no watermark, make meme free, impact font meme',
  },
  'add-text': {
    title: 'Add Text to Image Online Free — 35+ Fonts',
    description: 'Add custom text to your photos with 35+ Google Fonts. Control font family, size, color, position, alignment, drop shadow, and outline. Perfect for adding captions or labels. Free, instant, no signup required.',
    keywords: 'add text to image free, text on photo online, add caption to image, font on photo free, image text editor',
  },
  'watermark': {
    title: 'Add Watermark to Image Free Online',
    description: 'Add text watermarks to protect your original photos and digital artwork. Customize opacity, font, size, rotation, and position. Watermark images before sharing online — free, no signup, no file uploads needed.',
    keywords: 'add watermark to image free, watermark photo online, text watermark free, protect image watermark, watermark tool',
  },
  'image-filters': {
    title: 'Image Filters Online Free — Grayscale, Sepia & More',
    description: 'Apply creative filters to your photos including grayscale, sepia, vintage, warm, cool, vivid, blur, and sharpen. Preview changes in real time and download the result instantly. Free, no signup, browser-based.',
    keywords: 'image filters online free, photo filter app, grayscale image free, sepia filter online, vintage photo effect',
  },
  'ocr-extract-text': {
    title: 'OCR — Extract Text from Image Free Online',
    description: 'Extract text from scanned images, screenshots, and photos using OCR technology. Supports 12+ languages including English, Hindi, and French. Free, instant, 100% private — no file uploads to any external server.',
    keywords: 'ocr online free, extract text from image, image to text converter, online ocr free, scan text from photo',
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
  const toolUrl = `${BASE_URL}tools/${slug}/`;

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
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = TOOLS.find(t => t.slug === slug);

  if (!tool) {
    return <ToolPageClient slug={slug} />;
  }

  const custom = TOOL_META[slug];
  const description = custom?.description || tool.description;
  const toolUrl = `${BASE_URL}tools/${slug}/`;

  // 1. WebApplication Schema
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

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://imageflow.in/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://imageflow.in/#all-tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: toolUrl,
      },
    ],
  };

  // 3. FAQPage Schema (if SEO content exists for this tool)
  const seoContent = TOOL_SEO_CONTENT[slug];
  const faqSchema = seoContent?.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seoContent.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ToolPageClient slug={slug} />
    </>
  );
}
