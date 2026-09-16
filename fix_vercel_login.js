const fs = require('fs');

let loginRoute = fs.readFileSync('src/app/api/auth/login/route.ts', 'utf8');

// Insert export const runtime = 'nodejs'; at the top, after imports
if (!loginRoute.includes("export const runtime")) {
  loginRoute = loginRoute.replace(
    "const SECRET_KEY",
    "export const runtime = 'nodejs';\nexport const dynamic = 'force-dynamic';\n\nconst SECRET_KEY"
  );
  fs.writeFileSync('src/app/api/auth/login/route.ts', loginRoute);
  console.log("Updated login route");
}
