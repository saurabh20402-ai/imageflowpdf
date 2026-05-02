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
