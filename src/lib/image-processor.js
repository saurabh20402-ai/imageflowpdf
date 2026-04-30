/**
 * ImageFlow — Client-side Image Processing Library
 * All operations use the browser's Canvas API.
 */

/** Load an image file into an HTMLImageElement */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.src = url;
  });
}

/** Create a canvas and 2D context */
export function createCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  return { canvas, ctx };
}

/** Draw image onto a canvas (same dimensions) */
export function drawImageToCanvas(img) {
  const { canvas, ctx } = createCanvas(img.naturalWidth, img.naturalHeight);
  ctx.drawImage(img, 0, 0);
  return { canvas, ctx };
}

/** Convert canvas to Blob */
export function canvasToBlob(canvas, mimeType = 'image/png', quality = 0.92) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')),
      mimeType,
      quality
    );
  });
}

/** Resize image */
export function resizeImage(img, targetW, targetH) {
  const { canvas, ctx } = createCanvas(targetW, targetH);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, targetW, targetH);
  return { canvas, ctx };
}

/** Compress image by re-exporting at given quality */
export function compressImage(img, quality = 0.7, format = 'image/jpeg') {
  const { canvas, ctx } = drawImageToCanvas(img);
  return { canvas, ctx, format, quality };
}

/** Crop image */
export function cropImage(img, x, y, w, h) {
  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  return { canvas, ctx };
}

/** Rotate image */
export function rotateImage(img, degrees) {
  const rad = (degrees * Math.PI) / 180;
  const w = img.naturalWidth, h = img.naturalHeight;

  // For 90/270, swap dimensions
  const is90 = degrees === 90 || degrees === 270;
  const cw = is90 ? h : w;
  const ch = is90 ? w : h;

  const { canvas, ctx } = createCanvas(cw, ch);
  ctx.translate(cw / 2, ch / 2);
  ctx.rotate(rad);
  ctx.drawImage(img, -w / 2, -h / 2);
  return { canvas, ctx };
}

/** Flip image */
export function flipImage(img, horizontal = true) {
  const w = img.naturalWidth, h = img.naturalHeight;
  const { canvas, ctx } = createCanvas(w, h);
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

/** Apply CSS filter to image */
export function applyFilter(img, filterString) {
  const { canvas, ctx } = drawImageToCanvas(img);
  // Clear and redraw with filter
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = filterString;
  ctx.drawImage(img, 0, 0);
  ctx.filter = 'none';
  return { canvas, ctx };
}

/** Sharpen using convolution kernel */
export function sharpenImage(img, amount = 1) {
  const { canvas, ctx } = drawImageToCanvas(img);
  const w = canvas.width, h = canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const copy = new Uint8ClampedArray(data);

  const kernel = [0, -amount, 0, -amount, 1 + 4 * amount, -amount, 0, -amount, 0];

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

/** Round corners of an image */
export function roundCorners(img, radius) {
  const w = img.naturalWidth, h = img.naturalHeight;
  const { canvas, ctx } = createCanvas(w, h);
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, radius);
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

/** Add meme text (Impact font, white with black outline) */
export function addMemeText(img, topText, bottomText, options = {}) {
  const { canvas, ctx } = drawImageToCanvas(img);
  const w = canvas.width, h = canvas.height;
  const fontSize = options.fontSize || Math.max(24, Math.floor(w / 12));

  ctx.font = `bold ${fontSize}px Impact, 'Arial Black', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = Math.max(2, fontSize / 12);
  ctx.lineJoin = 'round';

  if (topText) {
    const text = topText.toUpperCase();
    ctx.textBaseline = 'top';
    ctx.strokeText(text, w / 2, fontSize * 0.3);
    ctx.fillText(text, w / 2, fontSize * 0.3);
  }

  if (bottomText) {
    const text = bottomText.toUpperCase();
    ctx.textBaseline = 'bottom';
    ctx.strokeText(text, w / 2, h - fontSize * 0.3);
    ctx.fillText(text, w / 2, h - fontSize * 0.3);
  }

  return { canvas, ctx };
}
