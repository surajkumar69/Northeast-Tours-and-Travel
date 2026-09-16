const http = require('http');

const checkUrl = (url) => {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => resolve({ url, status: 'ERROR', error: e.message }));
  });
};

const urlsToTest = [
  'http://localhost:3000/',
  'http://localhost:3000/tempo-traveller',
  'http://localhost:3000/tempo-traveller/force-urbania-13-seater',
  'http://localhost:3000/tempo-traveller/force-urbania-16-seater',
  'http://localhost:3000/tempo-traveller/tempo-traveller-13-seater',
  'http://localhost:3000/tempo-traveller/tempo-traveller-17-seater',
  'http://localhost:3000/tempo-traveller/tempo-traveller-25-seater',
  'http://localhost:3000/journeys',
  'http://localhost:3000/contact',
  'http://localhost:3000/packages'
];

async function run() {
  let hasError = false;
  for (const u of urlsToTest) {
    const res = await checkUrl(u);
    console.log(`${res.status} - ${res.url}`);
    if (res.status !== 200) {
        hasError = true;
    }
  }
  if (hasError) process.exit(1);
}
run();
