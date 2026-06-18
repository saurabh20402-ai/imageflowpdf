import { createCanvas } from '@/lib/image-processor';

const STORAGE_KEY = 'imageflow-thumbnail-draft';

function imageToDataUrl(img, mime = 'image/png', quality = 0.92) {
  const { canvas, ctx } = createCanvas(img.naturalWidth, img.naturalHeight);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL(mime, quality);
}

export async function buildDraftPayload(state, elements, bgImage) {
  const serializedElements = elements.map((el) => {
    if (el.type !== 'image' || !el.image) return el;
    const dataUrl = imageToDataUrl(el.image);
    const { image, ...rest } = el;
    return { ...rest, imageDataUrl: dataUrl };
  });

  return {
    ...state,
    elements: serializedElements,
    bgImageDataUrl: bgImage ? imageToDataUrl(bgImage, 'image/jpeg', 0.85) : null,
    savedAt: Date.now(),
  };
}

export function saveDraft(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota errors */
  }
}

export function loadDraftRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearDraft() {
  localStorage.removeItem(STORAGE_KEY);
}
