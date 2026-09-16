const fs = require('fs');
const path = require('path');

const files = [
  'src/app/admin/(dashboard)/destinations/[id]/edit/page.tsx',
  'src/app/admin/(dashboard)/packages/[id]/edit/page.tsx',
  'src/app/admin/(dashboard)/taxis/[id]/edit/page.tsx',
  'src/app/admin/(dashboard)/tempos/[id]/edit/page.tsx',
  'src/app/admin/(dashboard)/experiences/[id]/edit/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /\{entity\.name \|\| entity\.title \|\| 'this item'\}/,
    "{((entity as any).name || (entity as any).title || 'this item')}"
  );
  fs.writeFileSync(file, content);
});
console.log('Fixed TS errors');
