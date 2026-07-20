async function run() {
  console.log('--- STARTING ENDPOINT TESTS ---');

  // Test 1: Happy Path with Mock Key
  console.log('\nTest 1: Happy Path with MOCK_HAPPY_PATH key');
  const res1 = await fetch('http://localhost:3000/api/generate-thumbnail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-gemini-key': 'MOCK_HAPPY_PATH'
    },
    body: JSON.stringify({ prompt: 'Learn React in 5 minutes', width: 1280, height: 720 })
  });
  console.log('Status:', res1.status);
  const data1 = await res1.json();
  console.log('Response:', JSON.stringify(data1, null, 2));

  // Test 2: Invalid Key mock error
  console.log('\nTest 2: Invalid Key response');
  const res2 = await fetch('http://localhost:3000/api/generate-thumbnail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-gemini-key': 'INVALID_KEY'
    },
    body: JSON.stringify({ prompt: 'Test', width: 1280, height: 720 })
  });
  console.log('Status:', res2.status);
  const data2 = await res2.json();
  console.log('Response:', JSON.stringify(data2, null, 2));

  // Test 3: Proxy image
  console.log('\nTest 3: Proxy Image endpoint');
  const res3 = await fetch('http://localhost:3000/api/proxy-image?prompt=futuristic+city&width=200&height=112&seed=999');
  console.log('Status:', res3.status);
  console.log('Content-Type:', res3.headers.get('content-type'));
  if (res3.ok) {
    const buf = await res3.arrayBuffer();
    console.log('Image size (bytes):', buf.byteLength);
  } else {
    console.log('Error:', await res3.text());
  }

  // Test 4: Rate Limiting (6 requests)
  console.log('\nTest 4: Rate Limiting (6 consecutive requests without key)');
  for (let i = 1; i <= 6; i++) {
    const res = await fetch('http://localhost:3000/api/generate-thumbnail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: `Rate limit test ${i}`, width: 1280, height: 720 })
    });
    console.log(`Request #${i} - Status: ${res.status}`);
    const body = await res.json();
    if (res.status === 429) {
      console.log('Rate Limit Blocked as expected on request #', i, body);
    }
  }

  console.log('\n--- END OF ENDPOINT TESTS ---');
}

run().catch(console.error);
