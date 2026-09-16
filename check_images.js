const http = require('http');
const https = require('https');

const checkUrl = (url) => {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => resolve({ url, status: 'ERROR', error: e.message }));
  });
};

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', async () => {
    // Basic regex for src="..."
    const imgMatches = data.match(/src="([^"]+)"/g) || [];
    const images = [...new Set(imgMatches.map(m => m.replace(/src="({?)([^"]+)("?)}?"/, '$2').replace(/src="|"/g, '')))];
    
    let hasError = false;
    for (const img of images) {
        // Skip base64
        if (img.startsWith('data:')) continue;
        
        let fullUrl = img;
        if (img.startsWith('/')) {
            // Next.js _next/image format
            fullUrl = 'http://localhost:3000' + img;
        }

        const result = await checkUrl(fullUrl);
        console.log(`${result.status} - ${result.url.substring(0, 80)}...`);
        if (result.status !== 200) {
            hasError = true;
        }
    }
    
    if (hasError) {
        console.log("FAIL: Found broken images!");
        process.exit(1);
    } else {
        console.log("PASS: All images loaded perfectly (200).");
    }
  });
});
