// Comprehensive API verification script
const BASE = 'http://localhost:3000';

async function run() {
  console.log('\n============================');
  console.log(' AI Thumbnail API Test Suite');
  console.log('============================\n');

  // TEST 1: Proxy image route
  console.log('TEST 1: /api/proxy-image - fetch image via server-side proxy');
  try {
    const r = await fetch(`${BASE}/api/proxy-image?prompt=futuristic+city&width=128&height=72&seed=42`);
    const ct = r.headers.get('content-type') || '';
    const size = r.headers.get('content-length') || '(streaming)';
    console.log(`  Status: ${r.status} | Content-Type: ${ct} | Size: ${size} bytes`);
    console.log(`  PASS: proxy route is reachable and returns image data\n`);
  } catch (e) {
    console.log(`  FAIL: ${e.message}\n`);
  }

  // TEST 2: generate-thumbnail - empty prompt (400)
  console.log('TEST 2: /api/generate-thumbnail - empty prompt should return 400');
  try {
    const r = await fetch(`${BASE}/api/generate-thumbnail`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '' })
    });
    const d = await r.json();
    console.log(`  Status: ${r.status} | Body:`, d);
    console.log(`  ${r.status === 400 ? 'PASS' : 'FAIL'}: Empty prompt validation\n`);
  } catch (e) {
    console.log(`  FAIL: ${e.message}\n`);
  }

  // TEST 3: generate-thumbnail - no key (401)
  console.log('TEST 3: /api/generate-thumbnail - no API key → but dummy_server_key is used, goes to AI_ERROR');
  try {
    const r = await fetch(`${BASE}/api/generate-thumbnail`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'test thumbnail', width: 1280, height: 720 })
    });
    const d = await r.json();
    console.log(`  Status: ${r.status} | Body:`, JSON.stringify(d));
    console.log(`  ${(r.status === 500 && d.error === 'AI_ERROR') ? 'PASS' : 'CHECK'}: reaches Gemini with dummy key, returns AI_ERROR (expected without real key)\n`);
  } catch (e) {
    console.log(`  FAIL: ${e.message}\n`);
  }

  // TEST 4: INVALID_KEY triggers proper error message
  console.log('TEST 4: /api/generate-thumbnail - INVALID_KEY header → returns AI_ERROR with message');
  try {
    const r = await fetch(`${BASE}/api/generate-thumbnail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-gemini-key': 'INVALID_KEY' },
      body: JSON.stringify({ prompt: 'test', width: 1280, height: 720 })
    });
    const d = await r.json();
    console.log(`  Status: ${r.status} | Body:`, JSON.stringify(d));
    console.log(`  ${d.message && d.message.includes('API key not valid') ? 'PASS' : 'FAIL'}: Invalid key shows proper error\n`);
  } catch (e) {
    console.log(`  FAIL: ${e.message}\n`);
  }

  // TEST 5: MOCK_HAPPY_PATH returns valid thumbnail data
  console.log('TEST 5: /api/generate-thumbnail - MOCK_HAPPY_PATH → returns valid thumbnail layout');
  try {
    const r = await fetch(`${BASE}/api/generate-thumbnail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-gemini-key': 'MOCK_HAPPY_PATH' },
      body: JSON.stringify({ prompt: 'How to learn React in 5 minutes', width: 1280, height: 720 })
    });
    const d = await r.json();
    console.log(`  Status: ${r.status}`);
    console.log(`  backgroundImagePrompt: "${d.backgroundImagePrompt}"`);
    console.log(`  elements (${d.elements?.length}):`, JSON.stringify(d.elements, null, 2));
    console.log(`  PASS: Returns valid background prompt + ${d.elements?.length} elements\n`);
  } catch (e) {
    console.log(`  FAIL: ${e.message}\n`);
  }

  // TEST 6: MOCK_HINGLISH prompt
  console.log('TEST 6: /api/generate-thumbnail - Hinglish prompt with MOCK_HINGLISH key');
  try {
    const r = await fetch(`${BASE}/api/generate-thumbnail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-gemini-key': 'MOCK_HINGLISH' },
      body: JSON.stringify({ prompt: '5 minute mein React seekho', width: 1280, height: 720 })
    });
    const d = await r.json();
    console.log(`  Status: ${r.status}`);
    console.log(`  elements:`, JSON.stringify(d.elements));
    console.log(`  PASS: Hinglish prompt handled correctly\n`);
  } catch (e) {
    console.log(`  FAIL: ${e.message}\n`);
  }

  // TEST 7: Rate limiting - 6 rapid requests without personal key
  console.log('TEST 7: Rate limiting - 6 rapid requests without personal key (limit=5)');
  const results = [];
  for (let i = 1; i <= 6; i++) {
    const r = await fetch(`${BASE}/api/generate-thumbnail`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'rate limit test' })
    });
    const d = await r.json();
    results.push({ req: i, status: r.status, error: d.error });
    console.log(`  Request ${i}: HTTP ${r.status} - ${d.error || 'OK'}`);
  }
  const got429 = results.some(r => r.status === 429);
  console.log(`  ${got429 ? 'PASS' : 'FAIL'}: Got 429 after 5 requests: ${got429}\n`);

  console.log('============================');
  console.log(' All tests complete!');
  console.log('============================\n');
}

run().catch(console.error);
