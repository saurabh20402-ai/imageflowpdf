import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get('prompt');
  const width = parseInt(searchParams.get('width') || '1280', 10);
  const height = parseInt(searchParams.get('height') || '720', 10);
  const seed = searchParams.get('seed') || Math.floor(Math.random() * 1000000).toString();

  if (!prompt) {
    return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
  }

  const encoded = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&nologo=true&seed=${seed}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return NextResponse.json({ error: `Image fetch failed: ${res.status}` }, { status: 502 });
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      return NextResponse.json({ error: 'Image generation timed out' }, { status: 504 });
    }
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
}
