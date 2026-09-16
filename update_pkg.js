const fs = require('fs');

let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.scripts.build = "prisma generate && next build";
if (!pkg.scripts.postinstall) {
  pkg.scripts.postinstall = "prisma generate";
}

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log("Updated package.json build script");
