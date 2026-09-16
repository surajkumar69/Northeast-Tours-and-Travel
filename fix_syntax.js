const fs = require('fs');

let page = fs.readFileSync('src/app/journeys/[slug]/page.tsx', 'utf-8');
page = page.replace('href={\\	el:\\\\}', 'href={	el:}');
fs.writeFileSync('src/app/journeys/[slug]/page.tsx', page);

let data = fs.readFileSync('src/data/tourPackages.ts', 'utf-8');
data = data.replace('Hello, I am interested in booking the  () package. Please provide more details.', '\Hello, I am interested in booking the  () package. Please provide more details.\');
fs.writeFileSync('src/data/tourPackages.ts', data);
