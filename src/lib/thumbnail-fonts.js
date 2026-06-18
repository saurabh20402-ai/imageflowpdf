export const THUMBNAIL_FONTS = [
  'Oswald', 'Bebas Neue', 'Anton', 'Montserrat', 'Poppins', 'Roboto', 'Inter',
  'Raleway', 'Ubuntu', 'Rubik', 'Fredoka', 'Permanent Marker', 'Lobster',
  'Righteous', 'Impact',
];

export const FONT_STACK = {
  Oswald: 'Oswald, "Arial Narrow", sans-serif',
  'Bebas Neue': '"Bebas Neue", Impact, sans-serif',
  Anton: 'Anton, Impact, sans-serif',
  Montserrat: 'Montserrat, Arial, sans-serif',
  Poppins: 'Poppins, system-ui, sans-serif',
  Roboto: 'Roboto, Arial, sans-serif',
  Inter: 'Inter, system-ui, sans-serif',
  Raleway: 'Raleway, Arial, sans-serif',
  Ubuntu: 'Ubuntu, Arial, sans-serif',
  Rubik: 'Rubik, Arial, sans-serif',
  Fredoka: 'Fredoka, rounded, sans-serif',
  'Permanent Marker': '"Permanent Marker", cursive',
  Lobster: 'Lobster, cursive',
  Righteous: 'Righteous, cursive',
  Impact: 'Impact, "Arial Black", sans-serif',
};

export function loadGoogleFont(family) {
  if (typeof document === 'undefined') return Promise.resolve();
  const encoded = encodeURIComponent(family);
  const href = `https://fonts.googleapis.com/css2?family=${encoded}&display=swap`;
  if (document.querySelector(`link[href="${href}"]`)) return Promise.resolve();
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = resolve;
    document.head.appendChild(link);
  });
}

export function preloadThumbnailFonts() {
  return Promise.all(THUMBNAIL_FONTS.map(loadGoogleFont));
}

export function getFontStack(family) {
  return FONT_STACK[family] || `"${family}", sans-serif`;
}
