// Tool registry - single source of truth for all tools
// Each tool defines its metadata, category, and processing configuration

export const TOOL_CATEGORIES = [
  { id: 'convert', name: 'Convert', icon: 'ArrowLeftRight', color: '#ff385c' },
  { id: 'edit', name: 'Edit & Enhance', icon: 'Wand2', color: '#7c3aed' },
  { id: 'transform', name: 'Transform', icon: 'Move', color: '#0891b2' },
  { id: 'optimize', name: 'Optimize', icon: 'Zap', color: '#16a34a' },
  { id: 'create', name: 'Create', icon: 'Layers', color: '#ea580c' },
  { id: 'extract', name: 'Extract & Analyze', icon: 'Search', color: '#2563eb' },
];

export const TOOLS = [
  // === CONVERT ===
  {
    slug: 'jpg-to-png',
    name: 'JPG to PNG',
    description: 'Convert JPEG images to PNG format with transparency support.',
    category: 'convert',
    color: '#ff385c',
    icon: 'FileImage',
    component: 'FormatConverter',
    config: { fromLabel: 'JPG', toLabel: 'PNG', toMime: 'image/png', toExt: 'png', accept: { 'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'], 'image/pjpeg': ['.jpg'] } },
    popular: true,
  },
  {
    slug: 'png-to-jpg',
    name: 'PNG to JPG',
    description: 'Convert PNG images to JPEG format with quality control.',
    category: 'convert',
    color: '#e11d48',
    icon: 'FileImage',
    component: 'FormatConverter',
    config: { fromLabel: 'PNG', toLabel: 'JPG', toMime: 'image/jpeg', toExt: 'jpg', accept: { 'image/png': ['.png', '.PNG'] }, hasQuality: true, hasBgColor: true },
    popular: true,
  },
  {
    slug: 'webp-converter',
    name: 'WebP Converter',
    description: 'Convert images to or from WebP format for smaller file sizes.',
    category: 'convert',
    color: '#db2777',
    icon: 'RefreshCw',
    component: 'FormatConverter',
    config: { fromLabel: 'Image', toLabel: 'WebP', toMime: 'image/webp', toExt: 'webp', accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/bmp': ['.bmp'] }, hasQuality: true },
    popular: true,
  },
  {
    slug: 'svg-to-png',
    name: 'SVG to PNG',
    description: 'Rasterize SVG vector files to high-quality PNG images.',
    category: 'convert',
    color: '#c026d3',
    icon: 'Pencil',
    component: 'FormatConverter',
    config: { fromLabel: 'SVG', toLabel: 'PNG', toMime: 'image/png', toExt: 'png', accept: { 'image/svg+xml': ['.svg'] }, hasScale: true, isSvg: true },
  },
  {
    slug: 'heic-converter',
    name: 'HEIC Converter',
    description: 'Convert Apple HEIC/HEIF photos to JPG or PNG.',
    category: 'convert',
    color: '#a21caf',
    icon: 'Smartphone',
    component: 'HeicConverter',
    config: {},
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Combine one or more images into a single PDF document.',
    category: 'convert',
    color: '#9333ea',
    icon: 'FileText',
    component: 'ImageToPdf',
    config: {},
    popular: true,
  },
  {
    slug: 'convert-format',
    name: 'Convert Format',
    description: 'Convert between any supported image formats with one click.',
    category: 'convert',
    color: '#7c3aed',
    icon: 'ArrowLeftRight',
    component: 'FormatConverter',
    config: { fromLabel: 'Image', toLabel: 'Any', toMime: null, toExt: null, accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif'] }, hasFormatSelect: true, hasQuality: true },
  },

  // === TRANSFORM ===
  {
    slug: 'resize-image',
    name: 'Resize Image',
    description: 'Resize images by exact dimensions, percentage, or social media presets.',
    category: 'transform',
    color: '#0891b2',
    icon: 'Maximize2',
    component: 'ResizeTool',
    config: {},
    popular: true,
  },
  {
    slug: 'crop-image',
    name: 'Crop Image',
    description: 'Crop images with custom or preset aspect ratios interactively.',
    category: 'transform',
    color: '#0e7490',
    icon: 'Crop',
    component: 'CropTool',
    config: {},
    popular: true,
  },
  {
    slug: 'rotate-image',
    name: 'Rotate Image',
    description: 'Rotate images by 90°, 180°, 270°, or any custom angle.',
    category: 'transform',
    color: '#155e75',
    icon: 'RotateCw',
    component: 'TransformTool',
    config: { mode: 'rotate' },
  },
  {
    slug: 'flip-image',
    name: 'Flip Image',
    description: 'Flip images horizontally or vertically in one click.',
    category: 'transform',
    color: '#164e63',
    icon: 'FlipHorizontal2',
    component: 'TransformTool',
    config: { mode: 'flip' },
  },
  {
    slug: 'thumbnail-creator',
    name: 'Thumbnail Creator',
    description: 'Create perfectly sized thumbnails for YouTube, social media, and web.',
    category: 'transform',
    color: '#0284c7',
    icon: 'LayoutGrid',
    component: 'ResizeTool',
    config: { presetMode: true },
  },

  // === OPTIMIZE ===
  {
    slug: 'compress-image',
    name: 'Compress Image',
    description: 'Reduce image file size while preserving visual quality.',
    category: 'optimize',
    color: '#16a34a',
    icon: 'FileDown',
    component: 'CompressTool',
    config: { batch: false },
    popular: true,
  },
  {
    slug: 'bulk-compress',
    name: 'Bulk Compressor',
    description: 'Compress multiple images at once. Download as ZIP.',
    category: 'optimize',
    color: '#15803d',
    icon: 'Package',
    component: 'BulkCompressTool',
    config: {},
  },
  {
    slug: 'quality-optimizer',
    name: 'Quality Optimizer',
    description: 'Find the optimal quality-to-size ratio for your images.',
    category: 'optimize',
    color: '#166534',
    icon: 'Gauge',
    component: 'CompressTool',
    config: { batch: false, smartMode: true },
  },
  {
    slug: 'metadata-remover',
    name: 'Metadata Remover',
    description: 'Strip EXIF data, GPS location, and camera info from images.',
    category: 'optimize',
    color: '#047857',
    icon: 'ShieldOff',
    component: 'MetadataRemover',
    config: {},
  },
  {
    slug: 'batch-resize',
    name: 'Batch Resize',
    description: 'Resize multiple images to the same dimensions at once.',
    category: 'optimize',
    color: '#059669',
    icon: 'Layers',
    component: 'BatchResizeTool',
    config: {},
  },

  // === EDIT & ENHANCE ===
  {
    slug: 'image-filters',
    name: 'Image Filters',
    description: 'Apply beautiful filters: grayscale, sepia, vintage, warm, cool, and more.',
    category: 'edit',
    color: '#7c3aed',
    icon: 'Sparkles',
    component: 'FilterTool',
    config: { mode: 'presets' },
    popular: true,
  },
  {
    slug: 'adjust-colors',
    name: 'Adjust Colors',
    description: 'Fine-tune brightness, contrast, saturation, hue, and exposure.',
    category: 'edit',
    color: '#6d28d9',
    icon: 'SlidersHorizontal',
    component: 'FilterTool',
    config: { mode: 'sliders' },
  },
  {
    slug: 'blur-image',
    name: 'Blur Image',
    description: 'Apply gaussian blur to images with adjustable intensity.',
    category: 'edit',
    color: '#5b21b6',
    icon: 'Cloud',
    component: 'FilterTool',
    config: { mode: 'blur' },
  },
  {
    slug: 'sharpen-image',
    name: 'Sharpen Image',
    description: 'Enhance image clarity and sharpness with precision controls.',
    category: 'edit',
    color: '#4c1d95',
    icon: 'Crosshair',
    component: 'FilterTool',
    config: { mode: 'sharpen' },
  },
  {
    slug: 'grayscale',
    name: 'Grayscale',
    description: 'Convert color images to beautiful black and white.',
    category: 'edit',
    color: '#6b7280',
    icon: 'Contrast',
    component: 'FilterTool',
    config: { mode: 'grayscale' },
  },
  {
    slug: 'watermark',
    name: 'Add Watermark',
    description: 'Add text watermarks to protect your images. Control font, size, opacity, and position.',
    category: 'edit',
    color: '#8b5cf6',
    icon: 'BadgeCheck',
    component: 'WatermarkTool',
    config: {},
  },
  {
    slug: 'add-text',
    name: 'Add Text',
    description: 'Place custom text anywhere on your image with full styling control.',
    category: 'edit',
    color: '#a78bfa',
    icon: 'Type',
    component: 'TextTool',
    config: {},
  },
  {
    slug: 'add-border',
    name: 'Add Border',
    description: 'Add colored borders and frames to your images.',
    category: 'edit',
    color: '#c084fc',
    icon: 'Square',
    component: 'BorderTool',
    config: { mode: 'border' },
  },
  {
    slug: 'round-corners',
    name: 'Round Corners',
    description: 'Add rounded corners or create circular images.',
    category: 'edit',
    color: '#d8b4fe',
    icon: 'Circle',
    component: 'BorderTool',
    config: { mode: 'round' },
  },

  // === CREATE ===
  {
    slug: 'meme-generator',
    name: 'Meme Generator',
    description: 'Create memes with top and bottom impact text. Classic meme style.',
    category: 'create',
    color: '#ea580c',
    icon: 'Smile',
    component: 'MemeTool',
    config: {},
    popular: true,
  },
  {
    slug: 'collage-maker',
    name: 'Collage Maker',
    description: 'Arrange multiple photos into beautiful grid collages.',
    category: 'create',
    color: '#c2410c',
    icon: 'LayoutGrid',
    component: 'CollageTool',
    config: {},
  },
  {
    slug: 'merge-images',
    name: 'Merge Images',
    description: 'Combine multiple images side by side or stacked vertically.',
    category: 'create',
    color: '#9a3412',
    icon: 'GitMerge',
    component: 'MergeTool',
    config: {},
  },

  // === EXTRACT & ANALYZE ===
  {
    slug: 'ocr-extract-text',
    name: 'OCR - Extract Text',
    description: 'Extract text from images using optical character recognition.',
    category: 'extract',
    color: '#2563eb',
    icon: 'FileSearch',
    component: 'OcrTool',
    config: {},
    popular: true,
  },
];

export function getToolBySlug(slug) {
  return TOOLS.find(t => t.slug === slug) || null;
}

export function getToolsByCategory(categoryId) {
  return TOOLS.filter(t => t.category === categoryId);
}

export function getPopularTools() {
  return TOOLS.filter(t => t.popular);
}

export function searchTools(query) {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;
  return TOOLS.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
}
