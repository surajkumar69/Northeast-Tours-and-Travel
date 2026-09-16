const fs = require('fs');
let content = fs.readFileSync('src/app/packages/[slug]/page.tsx', 'utf8');

if (!content.includes('pkg.startingPoint')) {
  content = content.replace(
    '<div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-gold-400" /> {pkg.destination?.name || \'Northeast India\'}</div>',
    '<div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-gold-400" /> {pkg.destination?.name || \'Northeast India\'}</div>\n            {pkg.startingPoint && <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-gold-400" /> {pkg.startingPoint}</div>}'
  );
  fs.writeFileSync('src/app/packages/[slug]/page.tsx', content);
  console.log('Updated starting point display');
}
