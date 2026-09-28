const fs = require('fs');

const filesToUpdate = [
  'src/app/contact/page.tsx',
  'src/components/ui/Footer.tsx',
  'src/data/tourPackages.ts',
  'prisma/schema.prisma'
];

filesToUpdate.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/majestcnortheasttour@gmail\.com/g, 'majesticnortheasttour@gmail.com');
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
});
