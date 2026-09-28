const fs = require('fs');
let file = fs.readFileSync('src/data/tourPackages.ts', 'utf8');
file = file.replace(/price: '₹11,000\/-',\r?\n    priceLabel: 'per person',/g, "price: '₹32,000/-',\n    priceLabel: 'per person',\n    startingPoint: 'EX-GUWAHATI',");
file = file.replace(/price: '₹12,500\/-',\r?\n    priceLabel: 'for 2 persons',/g, "price: '₹19,000/-',\n    priceLabel: 'for 2 persons',\n    startingPoint: 'EX-GUWAHATI',");
fs.writeFileSync('src/data/tourPackages.ts', file);
console.log('Prices updated in tourPackages.ts');
