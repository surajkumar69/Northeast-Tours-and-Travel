const fs = require('fs');
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (!pkg.scripts.postinstall) {
  pkg.scripts.postinstall = "prisma generate";
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  console.log("Added postinstall to package.json");
}
