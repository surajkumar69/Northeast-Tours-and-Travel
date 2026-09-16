const fs = require('fs');
let code = fs.readFileSync('src/components/ui/Footer.tsx', 'utf8');

const target = '&copy; {new Date().getFullYear()} Northeast Tours & Travel. All rights reserved.';
const replacement = '&copy; {new Date().getFullYear()} Northeast Tours & Travel. All rights reserved. <span className="mx-2">|</span> <Link href="/admin/login" className="hover:text-gold-400 transition-colors">Admin Login</Link>';

code = code.replace(target, replacement);

fs.writeFileSync('src/components/ui/Footer.tsx', code);
