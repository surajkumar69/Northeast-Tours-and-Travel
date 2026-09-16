const fs = require('fs');
let content = fs.readFileSync('prisma/schema.prisma', 'utf8');

if (!content.includes('startingPoint')) {
  content = content.replace(
    'priceLabel       String\n',
    'priceLabel       String\n  startingPoint    String?\n'
  );
  fs.writeFileSync('prisma/schema.prisma', content);
  console.log('Added startingPoint');
} else {
  console.log('already exists');
}
