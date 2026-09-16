const fs = require('fs');
let content = fs.readFileSync('src/app/packages/page.tsx', 'utf8');
content = content.replace(/pkg\.heroImage/g, 'pkg.coverImage');
fs.writeFileSync('src/app/packages/page.tsx', content);
