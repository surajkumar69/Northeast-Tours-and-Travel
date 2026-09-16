const fs = require('fs');
let code = fs.readFileSync('src/proxy.ts', 'utf8');
code = code.replace('export async function middleware(', 'export async function proxy(');
fs.writeFileSync('src/proxy.ts', code);
