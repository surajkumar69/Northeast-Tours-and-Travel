const fs = require('fs');
let s = fs.readFileSync('src/data/tourPackages.ts', 'utf8');
s = s.replace(/'https:\/\/upload\.wikimedia\.org[^']+'/g, '"https://images.unsplash.com/photo-1626714486519-7d848773eb9d?q=80&w=2670&auto=format&fit=crop"');
s = s.replace(/,111,000\/-/g, '₹11,000/-');
s = s.replace(/,112,500\/-/g, '₹12,500/-');
fs.writeFileSync('src/data/tourPackages.ts', s);
