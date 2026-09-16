const fs = require('fs');
let content = fs.readFileSync('src/app/packages/page.tsx', 'utf8');
content = content.replace(
  'const packages = await prisma.tourPackage.findMany({',
  'const packages = await prisma.tourPackage.findMany({\n    where: { isActive: true },\n    orderBy: { sortOrder: "asc" },'
);
fs.writeFileSync('src/app/packages/page.tsx', content);
