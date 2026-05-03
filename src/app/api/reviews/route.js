import { NextResponse } from 'next/server';
import { SEED_REVIEWS } from '@/data/seed-reviews';

const KV_KEY = 'imageflow:reviews:v1';

function mergeAndSort(remote, seeds) {
  const byId = new Map();
  for (const r of seeds) byId.set(String(r.id), r);
  for (const r of remote) byId.set(String(r.id), r);
  return [...byId.values()].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

export async function GET() {
  let remote = [];
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv');
      remote = (await kv.get(KV_KEY)) || [];
      if (!Array.isArray(remote)) remote = [];
    }
  } catch {
    remote = [];
  }
  return NextResponse.json(mergeAndSort(remote, SEED_REVIEWS));
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const name = String(body.name || '').trim().slice(0, 50);
  const text = String(body.text || '').trim().slice(0, 500);
  const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));

  if (!name || !text) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return NextResponse.json({ ok: false, reason: 'no_kv' }, { status: 200 });
  }

  const entry = {
    id: `u-${Date.now()}`,
    name,
    text,
    rating,
    timestamp: Date.now(),
    source: 'community',
  };

  try {
    const { kv } = await import('@vercel/kv');
    const cur = (await kv.get(KV_KEY)) || [];
    const list = Array.isArray(cur) ? cur : [];
    const next = [entry, ...list].slice(0, 200);
    await kv.set(KV_KEY, next);
    return NextResponse.json({ ok: true, entry });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'kv_write_failed' }, { status: 500 });
  }
}
