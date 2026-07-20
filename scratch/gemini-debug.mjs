// Diagnostic script — gets exact error bodies from Gemini API
// Run: node scratch/gemini-debug.mjs YOUR_REAL_API_KEY

const apiKey = process.argv[2];
if (!apiKey) {
  console.error('Usage: node scratch/gemini-debug.mjs YOUR_GEMINI_API_KEY');
  process.exit(1);
}

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

async function testPayload(label, payload) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`TEST: ${label}`);
  console.log(`PAYLOAD SENT:\n${JSON.stringify(payload, null, 2)}`);
  const res = await fetch(`${BASE_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await res.text();
  console.log(`\nSTATUS: ${res.status}`);
  console.log(`RESPONSE BODY:\n${body}`);
  return { status: res.status, body };
}

async function run() {
  // Test 1: Current broken payload (no role on contents)
  await testPayload('CURRENT CODE - contents without role field', {
    systemInstruction: { parts: [{ text: 'You are a designer. Return JSON.' }] },
    contents: [{ parts: [{ text: 'Topic: "React tutorial"' }] }],
    generationConfig: { responseMimeType: 'application/json', temperature: 0.7 }
  });

  // Test 2: Fixed payload (role: user added)
  await testPayload('FIXED - contents WITH role: user', {
    systemInstruction: { parts: [{ text: 'You are a designer. Return JSON.' }] },
    contents: [{ role: 'user', parts: [{ text: 'Topic: "React tutorial"' }] }],
    generationConfig: { responseMimeType: 'application/json', temperature: 0.7 }
  });

  // Test 3: Proxy image endpoint
  console.log(`\n${'='.repeat(60)}`);
  console.log('TEST: Pollinations proxy endpoint (GET /api/proxy-image)');
  const r = await fetch('http://localhost:3000/api/proxy-image?prompt=futuristic+city&width=200&height=112&seed=999');
  console.log(`STATUS: ${r.status}, Content-Type: ${r.headers.get('content-type')}, Size: ${r.headers.get('content-length') || 'streaming'}`);
  if (!r.ok) {
    const errBody = await r.text();
    console.log(`ERROR BODY: ${errBody}`);
  } else {
    const buf = await r.arrayBuffer();
    console.log(`Image bytes received: ${buf.byteLength}`);
  }
}

run().catch(console.error);
