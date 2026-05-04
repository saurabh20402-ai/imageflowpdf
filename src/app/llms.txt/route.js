const BASE_URL = 'https://imageflow.in';

export async function GET() {
  const body = `# ImageFlow

ImageFlow is a free online PDF and image tools website.

## Core tools
- Merge PDF
- Split PDF
- Compress PDF
- Rotate PDF
- Crop PDF
- Watermark PDF
- Sign PDF
- JPG to PNG
- PNG to JPG
- WebP to PNG
- WebP to JPG
- Resize Image
- Compress Image
- Image to PDF
- Remove Background
- Image Upscaler

## Notes
- Processing is browser-first where possible.
- No signup is required for core tools.

## URLs
- Home: ${BASE_URL}/
- Tutorials: ${BASE_URL}/tutorials/
- Support: ${BASE_URL}/support/
- Privacy Policy: ${BASE_URL}/privacy-policy/
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
