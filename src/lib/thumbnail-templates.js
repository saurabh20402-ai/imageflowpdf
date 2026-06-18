export const PLATFORMS = [
  { id: 'youtube', label: 'YouTube', w: 1280, h: 720 },
  { id: 'shorts', label: 'YouTube Shorts', w: 1080, h: 1920 },
  { id: 'instagram', label: 'Instagram Post', w: 1080, h: 1080 },
  { id: 'story', label: 'Instagram Story', w: 1080, h: 1920 },
  { id: 'twitter', label: 'Twitter / X', w: 1200, h: 675 },
  { id: 'blog', label: 'Blog Featured', w: 1200, h: 630 },
];

export const BG_GRADIENTS = [
  { id: 'sunset', name: 'Sunset', colors: ['#ff512f', '#dd2476'] },
  { id: 'ocean', name: 'Ocean', colors: ['#2193b0', '#6dd5ed'] },
  { id: 'dark', name: 'Dark Pro', colors: ['#0f0c29', '#302b63', '#24243e'] },
  { id: 'fire', name: 'Fire', colors: ['#f12711', '#f5af19'] },
  { id: 'purple', name: 'Purple', colors: ['#667eea', '#764ba2'] },
  { id: 'green', name: 'Fresh', colors: ['#11998e', '#38ef7d'] },
  { id: 'minimal', name: 'Minimal', colors: ['#ece9e6', '#ffffff'] },
  { id: 'night', name: 'Night', colors: ['#141e30', '#243b55'] },
];

export const STICKERS = [
  { emoji: '🔥', label: 'Fire' },
  { emoji: '⚡', label: 'Bolt' },
  { emoji: '▶️', label: 'Play' },
  { emoji: '💯', label: '100' },
  { emoji: '⭐', label: 'Star' },
  { emoji: '💥', label: 'Boom' },
  { emoji: '👆', label: 'Point' },
  { emoji: '🎯', label: 'Target' },
];

export const BADGES = [
  { text: 'NEW', color: '#ef4444' },
  { text: 'FREE', color: '#22c55e' },
  { text: 'HOT', color: '#f97316' },
  { text: 'LIVE', color: '#dc2626' },
];

let _id = 0;
export function uid() {
  _id += 1;
  return `el-${Date.now()}-${_id}`;
}

export function createTextLayer(overrides = {}) {
  return {
    id: uid(),
    type: 'text',
    text: 'YOUR TITLE',
    x: 80,
    y: 280,
    fontSize: 72,
    fontFamily: 'Oswald',
    color: '#ffffff',
    strokeColor: '#000000',
    strokeWidth: 4,
    bold: true,
    shadow: true,
    align: 'left',
    bgBox: null,
    zIndex: 10,
    ...overrides,
  };
}

export function createSticker(emoji, x = 100, y = 100, size = 64) {
  return { id: uid(), type: 'sticker', emoji, x, y, size, zIndex: 20 };
}

export function createBadge(text, color, x = 100, y = 40) {
  return {
    id: uid(),
    type: 'sticker',
    badge: true,
    text,
    color,
    fontSize: 28,
    x,
    y,
    zIndex: 30,
  };
}

export function createShape(shape, overrides = {}) {
  return {
    id: uid(),
    type: 'shape',
    shape,
    x: 100,
    y: 100,
    w: 120,
    h: 80,
    color: '#6366f1',
    strokeColor: '#ffffff',
    strokeWidth: 0,
    opacity: 1,
    zIndex: 5,
    ...overrides,
  };
}

export function createImageLayer(image, overrides = {}) {
  return {
    id: uid(),
    type: 'image',
    image,
    x: 100,
    y: 100,
    scale: 0.5,
    zIndex: 15,
    ...overrides,
  };
}

export const TEXT_PRESETS = [
  {
    id: 'youtube-title',
    name: 'YouTube Title',
    patch: {
      fontSize: 88,
      fontFamily: 'Oswald',
      strokeWidth: 5,
      color: '#ffffff',
      strokeColor: '#000000',
      bold: true,
      shadow: true,
      align: 'left',
    },
  },
  {
    id: 'subtitle',
    name: 'Subtitle',
    patch: {
      fontSize: 36,
      fontFamily: 'Roboto',
      strokeWidth: 0,
      color: '#ffffff',
      shadow: true,
      bold: false,
    },
  },
  {
    id: 'shock',
    name: 'Shock / Highlight',
    patch: {
      fontSize: 100,
      fontFamily: 'Anton',
      color: '#fbbf24',
      strokeColor: '#000000',
      strokeWidth: 6,
      bold: true,
      shadow: false,
    },
  },
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    patch: {
      fontSize: 64,
      fontFamily: 'Montserrat',
      color: '#0f172a',
      strokeWidth: 0,
      shadow: false,
      bold: true,
    },
  },
];

/** Templates are applied relative to 1280×720; positions scale with canvas */
export const TEMPLATES = [
  {
    id: 'youtube-bold',
    name: 'Bold YouTube',
    background: { type: 'gradient', colors: ['#0f0c29', '#302b63', '#24243e'] },
    elements: [
      createTextLayer({
        text: 'WATCH THIS\nNOW!',
        x: 80,
        y: 220,
        fontSize: 88,
        strokeWidth: 5,
      }),
      createBadge('NEW', '#ef4444', 80, 60),
      createSticker('🔥', 1050, 520, 72),
    ],
  },
  {
    id: 'gaming',
    name: 'Gaming',
    background: { type: 'gradient', colors: ['#141e30', '#243b55'] },
    elements: [
      createTextLayer({
        text: 'EPIC\nGAMEPLAY',
        x: 80,
        y: 200,
        fontSize: 96,
        color: '#fbbf24',
        strokeColor: '#000',
        strokeWidth: 6,
      }),
      createShape('arrow', { x: 900, y: 300, w: 180, h: 100, color: '#ef4444' }),
      createBadge('LIVE', '#dc2626', 80, 50),
    ],
  },
  {
    id: 'tutorial',
    name: 'Tutorial',
    background: { type: 'gradient', colors: ['#2193b0', '#6dd5ed'] },
    elements: [
      createTextLayer({
        text: 'HOW TO\nDO THIS',
        x: 80,
        y: 240,
        fontSize: 80,
        color: '#fff',
        strokeWidth: 3,
      }),
      createSticker('▶️', 1000, 560, 56),
      createShape('rect', { x: 60, y: 180, w: 8, h: 200, color: '#fbbf24', fill: true }),
    ],
  },
  {
    id: 'vlog',
    name: 'Vlog / Lifestyle',
    background: { type: 'gradient', colors: ['#ff9a9e', '#fecfef'] },
    elements: [
      createTextLayer({
        text: 'DAY IN MY LIFE',
        x: 640,
        y: 300,
        fontSize: 64,
        fontFamily: 'Poppins',
        align: 'center',
        strokeWidth: 2,
        color: '#1e293b',
        strokeColor: '#fff',
      }),
      createBadge('NEW', '#ec4899', 80, 60),
    ],
  },
  {
    id: 'news',
    name: 'News / Update',
    background: { type: 'gradient', colors: ['#1a1a2e', '#16213e'] },
    elements: [
      createTextLayer({
        text: 'BREAKING\nNEWS',
        x: 80,
        y: 200,
        fontSize: 90,
        color: '#fff',
        strokeWidth: 4,
        bgBox: 'rgba(220,38,38,0.9)',
      }),
      createTextLayer({
        text: 'What you need to know',
        x: 80,
        y: 420,
        fontSize: 36,
        fontFamily: 'Roboto',
        strokeWidth: 0,
        shadow: true,
        zIndex: 11,
      }),
    ],
  },
  {
    id: 'comparison',
    name: 'VS / Comparison',
    background: { type: 'gradient', colors: ['#667eea', '#764ba2'] },
    elements: [
      createTextLayer({
        text: 'VS',
        x: 640,
        y: 280,
        fontSize: 120,
        fontFamily: 'Anton',
        align: 'center',
        strokeWidth: 6,
        color: '#fbbf24',
        strokeColor: '#000',
      }),
      createTextLayer({
        text: 'OPTION A',
        x: 200,
        y: 500,
        fontSize: 42,
        align: 'center',
        zIndex: 11,
      }),
      createTextLayer({
        text: 'OPTION B',
        x: 880,
        y: 500,
        fontSize: 42,
        align: 'center',
        zIndex: 11,
      }),
    ],
  },
  {
    id: 'minimal',
    name: 'Clean Minimal',
    background: { type: 'gradient', colors: ['#ece9e6', '#ffffff'] },
    elements: [
      createTextLayer({
        text: 'Simple Title',
        x: 80,
        y: 280,
        fontSize: 72,
        fontFamily: 'Montserrat',
        color: '#0f172a',
        strokeWidth: 0,
        shadow: false,
        bold: true,
      }),
      createShape('rect', { x: 80, y: 380, w: 200, h: 6, color: '#6366f1' }),
    ],
  },
  {
    id: 'podcast',
    name: 'Podcast',
    background: { type: 'gradient', colors: ['#0f0c29', '#302b63'] },
    elements: [
      createTextLayer({
        text: 'PODCAST\nEPISODE #12',
        x: 80,
        y: 200,
        fontSize: 68,
        fontFamily: 'Bebas Neue',
        strokeWidth: 3,
      }),
      createSticker('🎙️', 1050, 80, 56),
      createBadge('NEW', '#8b5cf6', 80, 50),
    ],
  },
  {
    id: 'tech-review',
    name: 'Tech Review',
    background: { type: 'gradient', colors: ['#0f2027', '#203a43', '#2c5364'] },
    elements: [
      createTextLayer({
        text: 'HONEST\nREVIEW',
        x: 80,
        y: 200,
        fontSize: 82,
        fontFamily: 'Bebas Neue',
        strokeWidth: 3,
      }),
      createBadge('NEW', '#3b82f6', 80, 50),
      createShape('rect', { x: 80, y: 400, w: 280, h: 4, color: '#3b82f6' }),
    ],
  },
  {
    id: 'fitness',
    name: 'Fitness / Workout',
    background: { type: 'gradient', colors: ['#11998e', '#38ef7d'] },
    elements: [
      createTextLayer({
        text: '30 DAY\nCHALLENGE',
        x: 80,
        y: 220,
        fontSize: 78,
        color: '#fff',
        strokeWidth: 4,
      }),
      createSticker('💪', 1000, 500, 64),
      createBadge('FREE', '#22c55e', 80, 50),
    ],
  },
  {
    id: 'reaction',
    name: 'Reaction Face',
    background: { type: 'gradient', colors: ['#f12711', '#f5af19'] },
    elements: [
      createTextLayer({
        text: 'YOU WON\'T\nBELIEVE THIS',
        x: 80,
        y: 180,
        fontSize: 72,
        strokeWidth: 5,
      }),
      createSticker('😱', 980, 480, 72),
      createShape('arrow', { x: 750, y: 350, w: 160, h: 90, color: '#fff' }),
    ],
  },
  {
    id: 'food',
    name: 'Food / Recipe',
    background: { type: 'gradient', colors: ['#ff6a00', '#ee0979'] },
    elements: [
      createTextLayer({
        text: 'EASY RECIPE',
        x: 80,
        y: 260,
        fontSize: 76,
        fontFamily: 'Lobster',
        strokeWidth: 2,
        color: '#fff',
      }),
      createSticker('🍕', 1020, 60, 52),
      createBadge('HOT', '#f97316', 80, 50),
    ],
  },
];

export function scaleTemplateElements(elements, fromW, fromH, toW, toH) {
  const sx = toW / fromW;
  const sy = toH / fromH;
  return elements.map((el) => {
    const scaled = {
      ...el,
      id: uid(),
      x: Math.round(el.x * sx),
      y: Math.round(el.y * sy),
    };
    if (el.type === 'text') {
      scaled.fontSize = Math.round(el.fontSize * Math.min(sx, sy));
      scaled.strokeWidth = Math.max(1, Math.round((el.strokeWidth || 0) * Math.min(sx, sy)));
    }
    if (el.type === 'sticker' && el.size) scaled.size = Math.round(el.size * Math.min(sx, sy));
    if (el.type === 'sticker' && el.fontSize) scaled.fontSize = Math.round(el.fontSize * Math.min(sx, sy));
    if (el.type === 'shape') {
      scaled.w = Math.round(el.w * sx);
      scaled.h = Math.round(el.h * sy);
    }
    if (el.type === 'image') {
      scaled.scale = (el.scale ?? 1) * Math.min(sx, sy);
    }
    return scaled;
  });
}
