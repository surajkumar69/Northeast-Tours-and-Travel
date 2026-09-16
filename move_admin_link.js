const fs = require('fs');
let code = fs.readFileSync('src/components/ui/Footer.tsx', 'utf8');

// 1. Remove from copyright
const oldCopyright = '&copy; {new Date().getFullYear()} Northeast Tours & Travel. All rights reserved. <span className="mx-2">|</span> <Link href="/admin/login" className="hover:text-gold-400 transition-colors">Admin Login</Link>';
const newCopyright = '&copy; {new Date().getFullYear()} Northeast Tours & Travel. All rights reserved.';
code = code.replace(oldCopyright, newCopyright);

// 2. Add to Support section
const supportEnd = `<li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>`;
const supportNew = `<li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>\n            <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>`;
code = code.replace(supportEnd, supportNew);

fs.writeFileSync('src/components/ui/Footer.tsx', code);
