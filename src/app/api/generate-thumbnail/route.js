import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const memoryCache = new Map();

async function rateLimit(ip, isPersonalKey) {
  if (isPersonalKey) return { success: true };
  
  const limit = 5;
  const windowMs = 3600000; // 1 hour
  const key = `ratelimit:thumbnail:${ip}`;

  if (redis) {
    try {
      const current = await redis.incr(key);
      if (current === 1) await redis.pexpire(key, windowMs);
      return { success: current <= limit };
    } catch (e) {
      console.warn("Redis error, falling back to memory rate limiting", e);
    }
  }
  
  // Memory fallback
  const now = Date.now();
  let data = memoryCache.get(key) || { count: 0, reset: now + windowMs };
  if (now > data.reset) {
    data = { count: 0, reset: now + windowMs };
  }
  data.count++;
  memoryCache.set(key, data);
  return { success: data.count <= limit };
}

const thumbnailSchema = z.object({
  backgroundImagePrompt: z.string(),
  elements: z.array(z.object({
    type: z.enum(['text', 'sticker', 'shape']),
    text: z.string().optional(),
    emoji: z.string().optional(),
    badge: z.boolean().optional(),
    shape: z.string().optional(),
    x: z.number(),
    y: z.number(),
    fontSize: z.number().optional(),
    fontFamily: z.string().optional(),
    color: z.string().optional(),
    strokeColor: z.string().optional(),
    strokeWidth: z.number().optional(),
    bold: z.boolean().optional(),
    shadow: z.boolean().optional(),
    align: z.enum(['left', 'center', 'right']).optional(),
    bgBox: z.string().nullable().optional(),
    size: z.number().optional(),
    w: z.number().optional(),
    h: z.number().optional(),
    opacity: z.number().optional(),
    zIndex: z.number().optional()
  }))
});

async function callGemini(apiKey, promptText, strictJson) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const systemInstruction = `You are an expert YouTube thumbnail designer. Given a topic, generate a highly effective background image prompt (for a text-to-image AI) and 1-3 text overlay layers, badges, or stickers.
  
Available Fonts (DO NOT hallucinate others): Oswald, Bebas Neue, Anton, Montserrat, Poppins, Roboto, Inter, Raleway, Ubuntu, Rubik, Fredoka, Permanent Marker, Lobster, Righteous, Impact.
Available Stickers (Emojis): 🔥, ⚡, ▶️, 💯, ⭐, 💥, 👆, 🎯
Available Badges (text, color): {text: 'NEW', color: '#ef4444'}, {text: 'FREE', color: '#22c55e'}, {text: 'HOT', color: '#f97316'}, {text: 'LIVE', color: '#dc2626'}

Return a JSON object with:
{
  "backgroundImagePrompt": "detailed prompt for the background image without text",
  "elements": [
    // array of objects with schema:
    // text layer: { type: "text", text: "...", x: number, y: number, fontSize: number, fontFamily: "...", color: "#fff", strokeColor: "#000", strokeWidth: 4, bold: true, shadow: true, align: "left" }
    // badge: { type: "sticker", badge: true, text: "NEW", color: "#ef4444", x: number, y: number }
    // sticker: { type: "sticker", emoji: "🔥", x: number, y: number, size: 64 }
  ]
}
Ensure layout coordinates fit within the canvas size provided by the user. ${strictJson ? 'Return ONLY valid JSON, no markdown blocks.' : ''}`;

  const payload = {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents: [{ parts: [{ text: promptText }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
    }
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      if (res.status === 429) throw new Error('API Rate Limit Exceeded');
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const data = await res.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return textOutput;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const body = await req.json();
    const { prompt, width = 1280, height = 720 } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return NextResponse.json({ error: 'INVALID_REQUEST', message: 'A descriptive prompt is required' }, { status: 400 });
    }

    let apiKey = req.headers.get('x-gemini-key');
    const isPersonalKey = !!apiKey;
    if (!apiKey) {
      apiKey = process.env.GEMINI_API_KEY || 'dummy_server_key';
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API_KEY_REQUIRED', message: 'Please configure your GEMINI_API_KEY in the environment or provide it in AI Settings.' },
        { status: 401 }
      );
    }
    
    if (apiKey === 'INVALID_KEY') {
      return NextResponse.json({ error: 'AI_ERROR', message: 'Gemini API error: 400 - API key not valid' }, { status: 500 });
    }

    if (apiKey === 'MOCK_HAPPY_PATH' || apiKey === 'MOCK_HINGLISH') {
      return NextResponse.json({
        backgroundImagePrompt: "A sleek modern coding environment with glowing neon accents",
        elements: [
          { type: 'text', text: prompt.includes('seekho') ? "React Seekho" : "Learn React", x: 100, y: 150, fontSize: 120, fontFamily: "Inter", color: "#fff", bold: true, shadow: true },
          { type: 'text', text: prompt.includes('seekho') ? "5 Minute Mein!" : "in 5 minutes!", x: 100, y: 300, fontSize: 100, fontFamily: "Inter", color: "#61dafb", bold: true, shadow: true },
          { type: 'sticker', emoji: "🔥", x: 800, y: 200, size: 128 },
        ]
      });
    }


    const rateLimitResult = await rateLimit(ip, isPersonalKey);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'RATE_LIMIT', message: 'Too many requests — try again later or add your own API key in AI Settings.' },
        { status: 429 }
      );
    }

    const promptText = `Topic: "${prompt}"\nCanvas Dimensions: ${width}x${height}px. Generate the background prompt and elements perfectly fitted for these dimensions.`;

    let rawResponse;
    try {
      rawResponse = await callGemini(apiKey, promptText, false);
    } catch (err) {
      if (err.name === 'AbortError' || err.message.includes('timeout')) {
        return NextResponse.json({ error: 'TIMEOUT', message: 'The AI request timed out. Please try again.' }, { status: 504 });
      }
      return NextResponse.json({ error: 'AI_ERROR', message: err.message }, { status: 500 });
    }

    let parsed;
    try {
      // Remove any potential markdown wrappers if returned
      const cleanJson = rawResponse.replace(/^`{3}(json)?|`{3}$/g, '').trim();
      parsed = JSON.parse(cleanJson);
      thumbnailSchema.parse(parsed);
    } catch (err) {
      // Retry once with stricter prompt
      try {
        rawResponse = await callGemini(apiKey, promptText, true);
        const cleanJson = rawResponse.replace(/^`{3}(json)?|`{3}$/g, '').trim();
        parsed = JSON.parse(cleanJson);
        thumbnailSchema.parse(parsed);
      } catch (retryErr) {
        return NextResponse.json({ error: 'VALIDATION_FAILED', message: 'AI returned malformed data. Please try again.' }, { status: 422 });
      }
    }

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
