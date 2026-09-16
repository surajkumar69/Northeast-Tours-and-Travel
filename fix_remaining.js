const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(/pkg\.heroImage/g, 'pkg.coverImage');
fs.writeFileSync('src/app/page.tsx', page);

let seed = fs.readFileSync('prisma/seed.ts', 'utf8');
seed = seed.replace(/heroImage/g, 'coverImage');
fs.writeFileSync('prisma/seed.ts', seed);

console.log('Fixed page and seed');
