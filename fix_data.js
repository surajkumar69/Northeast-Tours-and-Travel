const fs = require('fs');
let data = fs.readFileSync('src/data/tourPackages.ts', 'utf8');
data = data.replace(/heroImage/g, 'coverImage');
fs.writeFileSync('src/data/tourPackages.ts', data);
