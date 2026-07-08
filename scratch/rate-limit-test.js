const http = require('http');

async function testRateLimit() {
  const url = 'http://localhost:3000/api/generate-thumbnail';
  
  console.log('Sending 6 rapid requests to test rate limiting...');
  for (let i = 1; i <= 6; i++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'test' })
    });
    
    const data = await res.json();
    console.log(`Request ${i}: Status ${res.status} -`, data);
  }
}

testRateLimit();
