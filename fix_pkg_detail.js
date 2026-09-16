const fs = require('fs');
let content = fs.readFileSync('src/app/packages/[slug]/page.tsx', 'utf8');

content = content.replace(
  'images: true,',
  'images: { orderBy: { sortOrder: "asc" } },'
);

content = content.replace(
  'if (!pkg) {',
  'if (!pkg || !pkg.isActive) {'
);

fs.writeFileSync('src/app/packages/[slug]/page.tsx', content);
