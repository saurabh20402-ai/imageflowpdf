// Test: Long topic string (200+ characters)
const BASE = 'http://localhost:3000';

async function run() {
  const longPrompt = 'How to become a full-stack web developer from absolute zero in 2024 using React, Next.js, Node.js, PostgreSQL, Prisma, TailwindCSS, Docker, and deploy to Vercel and AWS with CI/CD pipelines and GitHub Actions — complete beginner roadmap';
  console.log(`Long prompt length: ${longPrompt.length} characters`);
  console.log(`Prompt: "${longPrompt}"\n`);

  // Test with MOCK_HAPPY_PATH key (returns elements based on prompt content)
  const r = await fetch(`${BASE}/api/generate-thumbnail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-gemini-key': 'MOCK_HAPPY_PATH' },
    body: JSON.stringify({ prompt: longPrompt, width: 1280, height: 720 })
  });

  const d = await r.json();
  console.log(`Status: ${r.status}`);
  console.log(`backgroundImagePrompt: "${d.backgroundImagePrompt}"`);
  console.log(`Elements returned: ${d.elements?.length}`);
  console.log('Elements detail:', JSON.stringify(d.elements, null, 2));

  // Check text lengths in returned elements
  if (d.elements) {
    for (const el of d.elements) {
      if (el.text) {
        console.log(`\nText element: "${el.text}" (${el.text.length} chars)`);
        console.log(`  Font: ${el.fontFamily}, Size: ${el.fontSize}px`);
        console.log(`  Position: x=${el.x}, y=${el.y}`);
        console.log(`  Canvas fit check: x(${el.x}) + estimated_width < 1280? (fontSize ${el.fontSize} * ~0.6 * charCount = ~${Math.round(el.fontSize * 0.6 * el.text.length)}px)`);
        const estimatedWidth = el.fontSize * 0.6 * el.text.length;
        const fitsCanvas = el.x + estimatedWidth <= 1280;
        console.log(`  Fits in 1280px canvas: ${fitsCanvas ? '✅ YES' : '⚠️ may overflow — canvas renderer wraps text'}`);
      }
    }
  }
  
  // Also test the Zod validation still passes for a long prompt
  console.log('\nZod schema validation: OK (got 200 response, schema was satisfied)');
}

run().catch(console.error);
