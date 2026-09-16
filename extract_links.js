const http = require('http');

http.get('http://localhost:3000/tempo-traveller', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/href="([^"]+)"/g) || [];
    const unique = [...new Set(matches.map(m => m.replace(/href="({?)([^"]+)("?)}?"/, '$2').replace(/href="|"/g, '')))];
    console.log(unique);
  });
});
