import JSZip from 'jszip';
import { generateOutputFilename } from './utils';

/**
 * Download a single blob as a file using native anchor — reliable filename in all browsers
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 200);
}

/**
 * Download canvas as image file
 */
export async function downloadCanvas(canvas, filename, mimeType = 'image/png', quality = 0.92) {
  return new Promise((resolve, reject) => {
    const isPng = mimeType === 'image/png' || mimeType === 'image/bmp';
    const blobCallback = (blob) => {
      if (blob) {
        downloadBlob(blob, filename);
        resolve(blob);
      } else {
        reject(new Error('Failed to create blob from canvas'));
      }
    };
    if (isPng) {
      canvas.toBlob(blobCallback, mimeType);
    } else {
      canvas.toBlob(blobCallback, mimeType, quality);
    }
  });
}

/**
 * Download multiple blobs as a ZIP file
 */
export async function downloadAsZip(files, zipName = 'imageflow-output.zip') {
  const zip = new JSZip();

  files.forEach(({ blob, filename }) => {
    zip.file(filename, blob);
  });

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  downloadBlob(zipBlob, zipName);
  return zipBlob;
}

/**
 * Create download filename from original + tool suffix
 */
export function makeFilename(originalName, toolSlug, outputExt) {
  return generateOutputFilename(originalName, toolSlug, outputExt);
}
