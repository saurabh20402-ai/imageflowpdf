/**
 * ImageFlow — Client-side Image Processing Library
 * All operations use the browser's Canvas API.
 * Security: No server calls, all processing is sandboxed in browser.
 */

/** Load an image file into an HTMLImageElement */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.crossOrigin = 'anonymous';
    img.src = url;
  });
}

/** Create a canvas and 2D context */
export function createCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, w);
  canvas.height = Math.max(1, h);
  const ctx = canvas.getContext('2d');
  return { canvas, ctx };
}

/** Draw image onto a canvas preserving transparency (CRITICAL: do NOT fill background) */
export function drawImageToCanvas(img) {
  const { canvas, ctx } = createCanvas(img.naturalWidth, img.naturalHeight);
  // IMPORTANT: clearRect preserves transparency for PNG output
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return { canvas, ctx };
}

/**
 * Convert canvas to Blob
 * CRITICAL FIX: PNG must NOT have background filled — call clearRect first.
 * For JPEG, canvas must have white background (JPEG has no alpha).
 */
export function canvasToBlob(canvas, mimeType = 'image/png', quality = 0.92) {
  return new Promise((resolve, reject) => {
    if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
      // JPEG has no transparency — create a white-bg canvas first
      const flat = document.createElement('canvas');
      flat.width = canvas.width;
      flat.height = canvas.height;
      const fctx = flat.getContext('2d');
      fctx.fillStyle = '#ffffff';
      fctx.fillRect(0, 0, flat.width, flat.height);
      fctx.drawImage(canvas, 0, 0);
      flat.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')),
        mimeType,
        quality
      );
    } else if (mimeType === 'image/png') {
      // PNG: preserve transparency — toBlob without quality param
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')),
        'image/png'
      );
    } else {
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')),
        mimeType,
        quality
      );
    }
  });
}

/** Resize image — preserves transparency for PNG */
export function resizeImage(img, targetW, targetH) {
  const { canvas, ctx } = createCanvas(targetW, targetH);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.clearRect(0, 0, targetW, targetH); // preserve alpha
  ctx.drawImage(img, 0, 0, targetW, targetH);
  return { canvas, ctx };
}

/** Compress image — for JPEG applies white background, for PNG preserves transparency */
export function compressImage(img, quality = 0.7, format = 'image/jpeg') {
  const { canvas, ctx } = createCanvas(img.naturalWidth, img.naturalHeight);
  if (format === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);
  return { canvas, ctx, format, quality };
}

/** Crop image — preserves transparency */
export function cropImage(img, x, y, w, h) {
  const { canvas, ctx } = createCanvas(w, h);
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  return { canvas, ctx };
}

/** Rotate image — preserves transparency */
export function rotateImage(img, degrees) {
  const rad = (degrees * Math.PI) / 180;
  const w = img.naturalWidth, h = img.naturalHeight;
  const is90 = degrees === 90 || degrees === 270 || degrees === -90;
  const cw = is90 ? h : w;
  const ch = is90 ? w : h;
  const { canvas, ctx } = createCanvas(cw, ch);
  ctx.clearRect(0, 0, cw, ch);
  ctx.translate(cw / 2, ch / 2);
  ctx.rotate(rad);
  ctx.drawImage(img, -w / 2, -h / 2);
  return { canvas, ctx };
}

/** Flip image — preserves transparency */
export function flipImage(img, horizontal = true) {
  const w = img.naturalWidth, h = img.naturalHeight;
  const { canvas, ctx } = createCanvas(w, h);
  ctx.clearRect(0, 0, w, h);
  if (horizontal) {
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(0, h);
    ctx.scale(1, -1);
  }
  ctx.drawImage(img, 0, 0);
  return { canvas, ctx };
}

/** Apply CSS filter to image — preserves transparency */
export function applyFilter(img, filterString) {
  const { canvas, ctx } = createCanvas(img.naturalWidth, img.naturalHeight);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = filterString;
  ctx.drawImage(img, 0, 0);
  ctx.filter = 'none';
  return { canvas, ctx };
}

/**
 * ENHANCED Sharpen using unsharp mask technique — more visible results
 * amount: 0.5–3.0 (1 = moderate, 2 = strong, 3 = ultra sharp)
 */
export function sharpenImage(img, amount = 1.5) {
  const { canvas, ctx } = drawImageToCanvas(img);
  const w = canvas.width, h = canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const copy = new Uint8ClampedArray(data);

  // Unsharp mask kernel — stronger than simple sharpen
  const strength = Math.max(0.5, Math.min(3, amount));
  const center = 1 + 4 * strength;
  const kernel = [0, -strength, 0, -strength, center, -strength, 0, -strength, 0];

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let val = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * w + (x + kx)) * 4 + c;
            val += copy[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
        }
        data[(y * w + x) * 4 + c] = Math.min(255, Math.max(0, val));
      }
      // Preserve alpha
      data[(y * w + x) * 4 + 3] = copy[(y * w + x) * 4 + 3];
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return { canvas, ctx };
}

/** Add border to image */
export function addBorder(img, borderWidth, color = '#fff') {
  const w = img.naturalWidth + borderWidth * 2;
  const h = img.naturalHeight + borderWidth * 2;
  const { canvas, ctx } = createCanvas(w, h);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, borderWidth, borderWidth);
  return { canvas, ctx };
}

/** Round corners of an image — preserves transparency */
export function roundCorners(img, radius) {
  const w = img.naturalWidth, h = img.naturalHeight;
  const { canvas, ctx } = createCanvas(w, h);
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(0, 0, w, h, radius);
  } else {
    // Fallback for browsers without roundRect
    ctx.moveTo(radius, 0);
    ctx.lineTo(w - radius, 0);
    ctx.arcTo(w, 0, w, radius, radius);
    ctx.lineTo(w, h - radius);
    ctx.arcTo(w, h, w - radius, h, radius);
    ctx.lineTo(radius, h);
    ctx.arcTo(0, h, 0, h - radius, radius);
    ctx.lineTo(0, radius);
    ctx.arcTo(0, 0, radius, 0, radius);
    ctx.closePath();
  }
  ctx.clip();
  ctx.drawImage(img, 0, 0);
  return { canvas, ctx };
}

/** Add text watermark */
export function addWatermark(img, text, options = {}) {
  const { fontSize = 48, color = 'rgba(255,255,255,0.5)', position = 'center', rotation = -30, tiled = false } = options;
  const { canvas, ctx } = drawImageToCanvas(img);
  const w = canvas.width, h = canvas.height;

  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (tiled) {
    const gap = fontSize * 3;
    ctx.save();
    ctx.rotate((rotation * Math.PI) / 180);
    for (let y = -h; y < h * 2; y += gap) {
      for (let x = -w; x < w * 2; x += gap) {
        ctx.fillText(text, x, y);
      }
    }
    ctx.restore();
  } else {
    let x = w / 2, y = h / 2;
    const pad = fontSize;
    ctx.textAlign = 'center';
    if (position === 'top-left') { x = pad; y = pad; ctx.textAlign = 'left'; }
    else if (position === 'top-right') { x = w - pad; y = pad; ctx.textAlign = 'right'; }
    else if (position === 'bottom-left') { x = pad; y = h - pad; ctx.textAlign = 'left'; }
    else if (position === 'bottom-right') { x = w - pad; y = h - pad; ctx.textAlign = 'right'; }

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  return { canvas, ctx };
}

/**
 * ENHANCED Meme text — supports 9 positions including corners and custom
 * positions: 'top-center', 'top-left', 'top-right',
 *            'middle-center', 'middle-left', 'middle-right',
 *            'bottom-center', 'bottom-left', 'bottom-right'
 */
export function addMemeText(img, texts = [], options = {}) {
  const { canvas, ctx } = drawImageToCanvas(img);
  const w = canvas.width, h = canvas.height;

  // Support legacy top/bottom strings as well as new array format
  const textList = Array.isArray(texts) ? texts : [];

  // Legacy support: if called with (img, topText, bottomText)
  if (typeof texts === 'string') {
    const topText = texts;
    const bottomText = options.bottomText || '';
    textList.length = 0;
    if (topText) textList.push({ text: topText, position: 'top-center', color: '#ffffff', strokeColor: '#000000', fontSize: null });
    if (bottomText) textList.push({ text: bottomText, position: 'bottom-center', color: '#ffffff', strokeColor: '#000000', fontSize: null });
  }

  textList.forEach(({ text, position = 'top-center', color = '#ffffff', strokeColor = '#000000', fontSize: customSize, bold = true, italic = false }) => {
    if (!text) return;
    const sz = customSize || Math.max(24, Math.floor(w / 12));
    const style = `${italic ? 'italic ' : ''}${bold ? 'bold ' : ''}${sz}px Impact, 'Arial Black', sans-serif`;
    ctx.font = style;
    ctx.lineWidth = Math.max(2, sz / 10);
    ctx.lineJoin = 'round';
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = color;

    const pad = sz * 0.6;
    let x = w / 2, y;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const [vert, horiz] = position.split('-');

    if (vert === 'top') y = pad;
    else if (vert === 'middle') y = h / 2;
    else y = h - pad; // bottom

    if (horiz === 'left') { x = pad; ctx.textAlign = 'left'; }
    else if (horiz === 'right') { x = w - pad; ctx.textAlign = 'right'; }
    else { x = w / 2; ctx.textAlign = 'center'; }

    const lines = text.toUpperCase().split('\n');
    const lineH = sz * 1.2;
    lines.forEach((line, i) => {
      const ly = vert === 'top'
        ? y + i * lineH
        : vert === 'bottom'
          ? y - (lines.length - 1 - i) * lineH
          : y + (i - (lines.length - 1) / 2) * lineH;
      ctx.strokeText(line, x, ly);
      ctx.fillText(line, x, ly);
    });
  });

  return { canvas, ctx };
}

/** Merge images side by side or stacked */
export function mergeImages(images, direction = 'horizontal', gap = 0, bgColor = 'transparent') {
  if (images.length === 0) return createCanvas(1, 1);

  let totalW = 0, totalH = 0, maxW = 0, maxH = 0;
  images.forEach(img => {
    maxW = Math.max(maxW, img.naturalWidth);
    maxH = Math.max(maxH, img.naturalHeight);
    if (direction === 'horizontal') {
      totalW += img.naturalWidth;
      totalH = Math.max(totalH, img.naturalHeight);
    } else {
      totalW = Math.max(totalW, img.naturalWidth);
      totalH += img.naturalHeight;
    }
  });

  const gapTotal = gap * (images.length - 1);
  const finalW = direction === 'horizontal' ? totalW + gapTotal : totalW;
  const finalH = direction === 'horizontal' ? totalH : totalH + gapTotal;

  const { canvas, ctx } = createCanvas(finalW, finalH);
  if (bgColor && bgColor !== 'transparent') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, finalW, finalH);
  } else {
    ctx.clearRect(0, 0, finalW, finalH);
  }

  let offset = 0;
  images.forEach(img => {
    if (direction === 'horizontal') {
      ctx.drawImage(img, offset, 0);
      offset += img.naturalWidth + gap;
    } else {
      ctx.drawImage(img, 0, offset);
      offset += img.naturalHeight + gap;
    }
  });

  return { canvas, ctx };
}
