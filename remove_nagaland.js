const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Change grid columns
code = code.replace('grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', 'grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6');

// Remove Nagaland block
const nagalandStart = code.indexOf('<Link href="/destinations/nagaland"');
const searchString = '</div>\n      </section>\n\n      {/* 3. FEATURED TOUR PACKAGES */}';
let sectionEnd = code.indexOf(searchString);
if (sectionEnd === -1) {
    sectionEnd = code.indexOf('</div>\r\n      </section>\r\n\r\n      {/* 3. FEATURED TOUR PACKAGES */}');
}

if (nagalandStart !== -1 && sectionEnd !== -1) {
    code = code.substring(0, nagalandStart) + code.substring(sectionEnd);
}

fs.writeFileSync('src/app/page.tsx', code);
