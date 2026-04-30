'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, Clock, Trash2 } from 'lucide-react';

const REVIEWS_KEY = 'imageflow_reviews';

function getReviews() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]'); }
  catch { return []; }
}

function saveReview(review) {
  const reviews = getReviews();
  reviews.unshift({ ...review, id: Date.now(), timestamp: Date.now() });
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews.slice(0, 100)));
}

function deleteReview(id) {
  const reviews = getReviews().filter(r => r.id !== id);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
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
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} type="button" disabled={readonly}
          onMouseEnter={() => !readonly && setHover(i)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => !readonly && onChange?.(i)}
          style={{
            background: 'none', border: 'none', cursor: readonly ? 'default' : 'pointer', padding: 0,
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
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReviews(getReviews());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      saveReview({ name: name.trim(), text: text.trim(), rating });
      setReviews(getReviews());
      setName(''); setText(''); setRating(5);
      setSubmitting(false);
    }, 300);
  };

  const handleDelete = (id) => {
    deleteReview(id);
    setReviews(getReviews());
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  if (!mounted) return null;

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--hairline-soft)' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: 8 }}>
            Community
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 8 }}>
            What users are saying
          </h2>
          {reviews.length > 0 && (
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>
              ⭐ {avgRating} average from {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Submit Form */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--ink)' }}>
            Leave a review
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <input
                type="text" placeholder="Your name" value={name}
                onChange={e => setName(e.target.value)}
                className="input" style={{ flex: '1 1 200px' }}
                required maxLength={50}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>Rating:</span>
                <StarRating value={rating} onChange={setRating} />
              </div>
            </div>
            <textarea
              placeholder="Share your experience with ImageFlow..."
              value={text} onChange={e => setText(e.target.value)}
              className="input" style={{ minHeight: 80, resize: 'vertical' }}
              required maxLength={500}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--muted-soft)' }}>{text.length}/500</span>
              <button type="submit" className="btn-primary" disabled={submitting || !name.trim() || !text.trim()}>
                <Send size={14} />
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
            <p style={{ fontSize: 15 }}>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimatePresence>
              {reviews.map(r => (
                <motion.div key={r.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'var(--primary-light)', color: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <User size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <StarRating value={r.rating} readonly size={12} />
                          <span style={{ fontSize: 11, color: 'var(--muted-soft)' }}>
                            <Clock size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                            {timeAgo(r.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(r.id)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                      color: 'var(--muted-soft)', borderRadius: 4,
                    }}>
                      <Trash2 size={14} />
                    </button>
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
