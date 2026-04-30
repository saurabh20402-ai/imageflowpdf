// Shared utility functions

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Get file extension from name
 */
export function getFileExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

/**
 * Generate output filename
 */
export function generateOutputFilename(originalName, suffix, newExt) {
  const nameParts = originalName.split('.');
  nameParts.pop();
  const baseName = nameParts.join('.');
  return `${baseName}_${suffix}.${newExt}`;
}

/**
 * Debounce function
 */
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Clamp value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a unique ID
 */
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * Sleep for ms
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validate image file type
 */
export function isValidImageFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml', 'image/heic', 'image/heif'];
  return validTypes.includes(file.type) || file.name.match(/\.(jpg|jpeg|png|webp|gif|bmp|svg|heic|heif)$/i);
}

/**
 * Calculate compression percentage
 */
export function compressionPercent(original, compressed) {
  return Math.round((1 - compressed / original) * 100);
}
