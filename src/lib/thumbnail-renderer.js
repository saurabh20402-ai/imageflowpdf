import { createCanvas } from '@/lib/image-processor';
import { getFontStack } from '@/lib/thumbnail-fonts';

function drawBackground(ctx, w, h, bg) {
  if (bg.type === 'image' && bg.image) {
    const img = bg.image;
    const scale = bg.scale ?? 1;
    const iw = img.naturalWidth * scale;
    const ih = img.naturalHeight * scale;
    const cx = bg.x ?? 0;
    const cy = bg.y ?? 0;

    if (bg.brightness !== 100 || bg.contrast !== 100) {
      const filter = `brightness(${bg.brightness ?? 100}%) contrast(${bg.contrast ?? 100}%)`;
      ctx.filter = filter;
      ctx.drawImage(img, cx, cy, iw, ih);
      ctx.filter = 'none';
    } else {
      ctx.drawImage(img, cx, cy, iw, ih);
    }

    if (bg.overlay) {
      ctx.fillStyle = bg.overlay;
      ctx.fillRect(0, 0, w, h);
    }
    return;
  }

  if (bg.type === 'gradient' && bg.colors?.length >= 2) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    bg.colors.forEach((color, i) => {
      grad.addColorStop(i / (bg.colors.length - 1), color);
    });
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = bg.color || '#1a1a2e';
  }
  ctx.fillRect(0, 0, w, h);
}

function drawText(ctx, el) {
  const weight = el.bold ? 'bold' : 'normal';
  const stack = getFontStack(el.fontFamily || 'Oswald');
  ctx.font = `${weight} ${el.fontSize}px ${stack}`;
  ctx.textAlign = el.align || 'left';
  ctx.textBaseline = 'top';

  const lines = (el.text || '').split('\n');
  const lineHeight = el.fontSize * 1.15;
  let maxWidth = 0;
  lines.forEach((line) => {
    maxWidth = Math.max(maxWidth, ctx.measureText(line).width);
  });
  const totalHeight = lines.length * lineHeight;

  let drawX = el.x;
  if (el.align === 'center') drawX = el.x;
  else if (el.align === 'right') drawX = el.x;

  if (el.bgBox) {
    const pad = el.fontSize * 0.25;
    let boxX = el.x - pad;
    if (el.align === 'center') boxX = el.x - maxWidth / 2 - pad;
    if (el.align === 'right') boxX = el.x - maxWidth - pad;
    ctx.fillStyle = el.bgBox;
    ctx.fillRect(boxX, el.y - pad, maxWidth + pad * 2, totalHeight + pad * 2);
  }

  lines.forEach((line, i) => {
    const y = el.y + i * lineHeight;
    if (el.shadow) {
      ctx.shadowColor = 'rgba(0,0,0,0.75)';
      ctx.shadowBlur = Math.round(el.fontSize * 0.12);
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    if (el.strokeWidth > 0) {
      ctx.strokeStyle = el.strokeColor || '#000';
      ctx.lineWidth = el.strokeWidth;
      ctx.lineJoin = 'round';
      ctx.strokeText(line, drawX, y);
    }

    ctx.fillStyle = el.color || '#fff';
    ctx.fillText(line, drawX, y);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  });
}

function drawSticker(ctx, el) {
  if (el.badge) {
    const padX = el.fontSize * 0.5;
    const padY = el.fontSize * 0.25;
    ctx.font = `bold ${el.fontSize}px ${getFontStack('Oswald')}`;
    const tw = ctx.measureText(el.text).width;
    const bw = tw + padX * 2;
    const bh = el.fontSize + padY * 2;
    ctx.fillStyle = el.color || '#ef4444';
    ctx.beginPath();
    ctx.roundRect(el.x, el.y, bw, bh, 6);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(el.text, el.x + padX, el.y + padY);
    return;
  }

  ctx.font = `${el.size}px serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(el.emoji || '⭐', el.x, el.y);
}

function drawShape(ctx, el) {
  ctx.save();
  ctx.globalAlpha = el.opacity ?? 1;
  ctx.fillStyle = el.color || '#6366f1';
  ctx.strokeStyle = el.strokeColor || '#fff';
  ctx.lineWidth = el.strokeWidth || 0;

  if (el.shape === 'rect') {
    if (el.fill !== false) ctx.fillRect(el.x, el.y, el.w, el.h);
    if (el.strokeWidth > 0) ctx.strokeRect(el.x, el.y, el.w, el.h);
  } else if (el.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(el.x + el.w / 2, el.y + el.h / 2, Math.min(el.w, el.h) / 2, 0, Math.PI * 2);
    if (el.fill !== false) ctx.fill();
    if (el.strokeWidth > 0) ctx.stroke();
  } else if (el.shape === 'arrow') {
    const x = el.x;
    const y = el.y + el.h / 2;
    const len = el.w;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len * 0.7, y);
    ctx.lineTo(x + len * 0.55, y - el.h * 0.35);
    ctx.lineTo(x + len, y);
    ctx.lineTo(x + len * 0.55, y + el.h * 0.35);
    ctx.lineTo(x + len * 0.7, y);
    ctx.closePath();
    if (el.fill !== false) ctx.fill();
    if (el.strokeWidth > 0) ctx.stroke();
  }
  ctx.restore();
}

export function measureTextElement(ctx, el) {
  const weight = el.bold ? 'bold' : 'normal';
  const stack = getFontStack(el.fontFamily || 'Oswald');
  ctx.font = `${weight} ${el.fontSize}px ${stack}`;
  const lines = (el.text || '').split('\n');
  const lineHeight = el.fontSize * 1.15;
  let maxWidth = 0;
  lines.forEach((line) => {
    maxWidth = Math.max(maxWidth, ctx.measureText(line).width);
  });
  return { width: maxWidth, height: lines.length * lineHeight };
}

export function hitTestElement(ctx, el, x, y) {
  if (el.type === 'text') {
    const { width, height } = measureTextElement(ctx, el);
    let left = el.x;
    if (el.align === 'center') left = el.x - width / 2;
    if (el.align === 'right') left = el.x - width;
    return x >= left && x <= left + width && y >= el.y && y <= el.y + height;
  }
  if (el.type === 'sticker') {
    if (el.badge) {
      const padX = el.fontSize * 0.5;
      const padY = el.fontSize * 0.25;
      ctx.font = `bold ${el.fontSize}px ${getFontStack('Oswald')}`;
      const tw = ctx.measureText(el.text).width;
      return x >= el.x && x <= el.x + tw + padX * 2 && y >= el.y && y <= el.y + el.fontSize + padY * 2;
    }
    const size = el.size || 48;
    return x >= el.x && x <= el.x + size && y >= el.y && y <= el.y + size;
  }
  if (el.type === 'shape') {
    return x >= el.x && x <= el.x + el.w && y >= el.y && y <= el.y + el.h;
  }
  return false;
}

export function renderThumbnail({ width, height, background, elements }) {
  const { canvas, ctx } = createCanvas(width, height);
  drawBackground(ctx, width, height, background);

  const sorted = [...elements].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));
  sorted.forEach((el) => {
    if (el.type === 'text') drawText(ctx, el);
    else if (el.type === 'sticker') drawSticker(ctx, el);
    else if (el.type === 'shape') drawShape(ctx, el);
  });

  return canvas;
}

export function fitImageToCanvas(img, canvasW, canvasH, mode = 'cover') {
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = canvasW / canvasH;
  let scale;
  if (mode === 'cover') {
    scale = ir > cr ? canvasH / img.naturalHeight : canvasW / img.naturalWidth;
  } else {
    scale = ir > cr ? canvasW / img.naturalWidth : canvasH / img.naturalHeight;
  }
  const iw = img.naturalWidth * scale;
  const ih = img.naturalHeight * scale;
  return {
    scale,
    x: (canvasW - iw) / 2,
    y: (canvasH - ih) / 2,
  };
}
