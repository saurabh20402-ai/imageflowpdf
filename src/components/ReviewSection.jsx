'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, Clock, Trash2 } from 'lucide-react';
import { SEED_REVIEWS } from '@/data/seed-reviews';

const LOCAL_KEY = 'imageflow_reviews_local';

function getLocalReviews() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveLocalReview(review) {
  const cur = getLocalReviews();
  const entry = {
    ...review,
    id: `local-${Date.now()}`,
    timestamp: Date.now(),
    source: 'local',
  };
  cur.unshift(entry);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(cur.slice(0, 80)));
  return entry;
}

function deleteLocalReview(id) {
  const cur = getLocalReviews().filter((r) => String(r.id) !== String(id));
  localStorage.setItem(LOCAL_KEY, JSON.stringify(cur));
}

function mergeById(lists) {
  const map = new Map();
  for (const list of lists) {
    for (const r of list) {
      if (!r || r.id == null) continue;
      map.set(String(r.id), r);
    }
  }
  return [...map.values()].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function StarRating({ value, onChange, readonly = false, size = 20 }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readonly}
          onMouseEnter={() => !readonly && setHover(i)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => !readonly && onChange?.(i)}
          style={{
            background: 'none',
            border: 'none',
            cursor: readonly ? 'default' : 'pointer',
            padding: 0,
            color: i <= (hover || value) ? '#f59e0b' : 'var(--hairline)',
            transition: 'color 150ms',
          }}>
          <Star size={size} fill={i <= (hover || value) ? '#f59e0b' : 'none'} />
        </button>
      ))}
    </div>
  );
}

export default function ReviewSection() {
  const [remoteReviews, setRemoteReviews] = useState([]);
  const [localReviews, setLocalReviews] = useState([]);
  const [persisted, setPersisted] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [storageNote, setStorageNote] = useState(false);

  const loadRemote = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews?meta=1', { cache: 'no-store' });
      if (!res.ok) throw new Error('bad');
      const data = await res.json();
      if (Array.isArray(data.reviews)) {
        setRemoteReviews(data.reviews);
        setPersisted(Boolean(data.persisted));
      } else if (Array.isArray(data)) {
        setRemoteReviews(data);
        setPersisted(false);
      } else {
        setRemoteReviews(SEED_REVIEWS);
        setPersisted(false);
      }
    } catch {
      setRemoteReviews(SEED_REVIEWS);
      setPersisted(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadRemote();
    setLocalReviews(getLocalReviews());
  }, [loadRemote]);

  /** Refetch so new reviews from other visitors appear without full reload. */
  useEffect(() => {
    if (!mounted) return;
    const tick = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        loadRemote();
      }
    };
    const id = setInterval(tick, 18000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [mounted, loadRemote]);

  const reviews = useMemo(() => {
    if (persisted) return remoteReviews;
    return mergeById([remoteReviews, localReviews]);
  }, [persisted, remoteReviews, localReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    setStorageNote(false);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          text: text.trim(),
          rating,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        await loadRemote();
        setName('');
        setText('');
        setRating(5);
      } else if (data.reason === 'no_storage' || data.reason === 'no_kv') {
        saveLocalReview({ name: name.trim(), text: text.trim(), rating });
        setLocalReviews(getLocalReviews());
        setStorageNote(true);
        setName('');
        setText('');
        setRating(5);
      }
    } catch {
      saveLocalReview({ name: name.trim(), text: text.trim(), rating });
      setLocalReviews(getLocalReviews());
      setStorageNote(true);
      setName('');
      setText('');
      setRating(5);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (r) => {
    if (r.source !== 'local') return;
    deleteLocalReview(r.id);
    setLocalReviews(getLocalReviews());
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : '0';

  if (!mounted) return null;

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--hairline-soft)' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--primary)',
              marginBottom: 8,
            }}>
            Community
          </p>
          <h2
            style={{
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 700,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              marginBottom: 8,
            }}>
            What users are saying
          </h2>
          {reviews.length > 0 && (
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>
              ⭐ {avgRating} average from {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="card" style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--ink)' }}>
            Leave a review
          </h3>
          {storageNote && (
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12, lineHeight: 1.55 }}>
              Abhi aapka review <strong>sirf is device</strong> par save ho raha hai.{' '}
              <strong>Sab users ko dikhane ke liye</strong> Vercel project par database lagao — sabse aasaan:{' '}
              <strong>Upstash Redis</strong> (free):{' '}
              <a href="https://upstash.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                upstash.com
              </a>{' '}
              → Redis database → REST URL + token copy karo → Vercel → Project → Settings → Environment Variables
              mein <code style={{ fontSize: 12 }}>UPSTASH_REDIS_REST_URL</code> aur{' '}
              <code style={{ fontSize: 12 }}>UPSTASH_REDIS_REST_TOKEN</code> add karo → redeploy. (Vercel KV
              bhi chalega agar pehle se use kar rahe ho.)
            </p>
          )}
          {!persisted && !storageNote && (
            <p style={{ fontSize: 13, color: 'var(--warning)', marginBottom: 12, lineHeight: 1.5 }}>
              Tip: Shared reviews abhi band hain — Upstash Redis ya Vercel KV env vars add karke redeploy karo taaki
              naye reviews <strong>har visitor</strong> ko dikhen.
            </p>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                style={{ flex: '1 1 200px' }}
                required
                maxLength={50}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>Rating:</span>
                <StarRating value={rating} onChange={setRating} />
              </div>
            </div>
            <textarea
              placeholder="Share your experience with ImageFlow..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input"
              style={{ minHeight: 80, resize: 'vertical' }}
              required
              maxLength={500}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--muted-soft)' }}>{text.length}/500</span>
              <button
                type="submit"
                className="btn-primary"
                disabled={submitting || !name.trim() || !text.trim()}>
                <Send size={14} />
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>

        {reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
            <p style={{ fontSize: 15 }}>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimatePresence>
              {reviews.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="card"
                  style={{ padding: 20 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 8,
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <User size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <StarRating value={r.rating} readonly size={12} />
                          <span style={{ fontSize: 11, color: 'var(--muted-soft)' }}>
                            <Clock
                              size={10}
                              style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }}
                            />
                            {timeAgo(r.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!persisted && r.source === 'local' && (
                      <button
                        type="button"
                        onClick={() => handleDelete(r)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 4,
                          color: 'var(--muted-soft)',
                          borderRadius: 4,
                        }}
                        aria-label="Remove your review from this device">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6 }}>{r.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
