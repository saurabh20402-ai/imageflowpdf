/** Featured reviews — everyone sees these. Real users add via API when Redis/KV is configured. */
export const SEED_REVIEWS = [
  {
    id: 'seed-sarah',
    name: 'Sarah Chen',
    text: 'ImageFlow replaced five different tools I used to juggle. The compression quality is incredible — I saved 70% file size with zero visible difference.',
    rating: 5,
    timestamp: Date.UTC(2026, 3, 8, 12, 0, 0),
    source: 'seed',
  },
  {
    id: 'seed-marcus',
    name: 'Marcus Rivera',
    text: 'Everything runs in the browser — I batch resize hundreds of images without worrying about privacy or upload limits.',
    rating: 5,
    timestamp: Date.UTC(2026, 3, 18, 12, 0, 0),
    source: 'seed',
  },
  {
    id: 'seed-aisha',
    name: 'Aisha Patel',
    text: 'The collage and format tools are so polished. I use them daily for social content. Better than paid alternatives honestly.',
    rating: 5,
    timestamp: Date.UTC(2026, 4, 1, 12, 0, 0),
    source: 'seed',
  },
];
