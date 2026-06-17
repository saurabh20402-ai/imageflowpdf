import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { SEED_REVIEWS } from '@/data/seed-reviews';

/** Single key for Upstash Redis and Vercel KV (same logical store). */
const STORE_KEY = 'imageflow:reviews:v1';

function mergeAndSort(remote, seeds) {
  const byId = new Map();
  for (const r of seeds) byId.set(String(r.id), r);
  for (const r of remote) byId.set(String(r.id), r);
  return [...byId.values()].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

/** Trim — Vercel paste sometimes adds accidental newline/space. */
function upstashUrl() {
  return process.env.UPSTASH_REDIS_REST_URL?.trim() || '';
}
function upstashToken() {
  return process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || '';
}
function kvUrl() {
  return '';
}
function kvToken() {
  return '';
}

function hasPersistentStore() {
  return Boolean(
    (upstashUrl() && upstashToken()),
  );
}

/** Explicit client — more reliable than Redis.fromEnv() on some hosts. */
function getRedis() {
  const url = upstashUrl();
  const token = upstashToken();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function storageDebugFlags() {
  return {
    upstashUrlSet: Boolean(upstashUrl()),
    upstashTokenSet: Boolean(upstashToken()),
    kvUrlSet: Boolean(kvUrl()),
    kvTokenSet: Boolean(kvToken()),
  };
}

async function readRemoteList() {
  const redis = getRedis();
  if (redis) {
    try {
      const v = await redis.get(STORE_KEY);
      if (Array.isArray(v)) return v;
      if (typeof v === 'string') {
        try {
          const p = JSON.parse(v);
          return Array.isArray(p) ? p : [];
        } catch {
          return [];
        }
      }
      return [];
    } catch {
      return [];
    }
  }
  return [];
}

async function writeRemoteList(list) {
  const redis = getRedis();
  if (redis) {
    await redis.set(STORE_KEY, list);
    return true;
  }
  return false;
}

export async function GET(request) {
  const remote = await readRemoteList();
  const list = mergeAndSort(remote, SEED_REVIEWS);
  const url = new URL(request.url);
  if (url.searchParams.get('meta') === '1') {
    const flags = storageDebugFlags();
    return NextResponse.json({
      reviews: list,
      persisted: hasPersistentStore(),
      /** Open this URL in browser to verify Vercel “sees” your env vars (no secrets exposed). */
      storageHints: flags,
    });
  }
  return NextResponse.json(list);
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

  if (!hasPersistentStore()) {
    return NextResponse.json(
      {
        ok: false,
        reason: 'no_storage',
        storageHints: storageDebugFlags(),
        hint: 'Add UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN on Vercel, then Redeploy. Open /api/reviews?meta=1 to verify storageHints.',
      },
      { status: 200 },
    );
  }

  const entry = {
    id: `u-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    text,
    rating,
    timestamp: Date.now(),
    source: 'community',
  };

  try {
    const cur = await readRemoteList();
    const list = Array.isArray(cur) ? cur : [];
    const next = [entry, ...list].slice(0, 200);
    const ok = await writeRemoteList(next);
    if (!ok) {
      return NextResponse.json({ ok: false, error: 'write_failed' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, entry });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: 'write_failed', message: String(e?.message || e) },
      { status: 500 },
    );
  }
}
