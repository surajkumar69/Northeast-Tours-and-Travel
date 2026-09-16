const fs = require('fs');

const file = 'src/components/home/AnimatedHomepage.tsx';
let content = fs.readFileSync(file, 'utf8');

// The block to extract
const startString = '      {/* 2. WHY CHOOSE US (Dark Green Accent Background) */}';
const endString = '      {/* 3. POPULAR DESTINATIONS */}';

const startIndex = content.indexOf(startString);
const endIndex = content.indexOf(endString);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find the block boundaries");
  process.exit(1);
}

// Extract the block
const block = content.substring(startIndex, endIndex);

// Remove the block from its original position
content = content.substring(0, startIndex) + content.substring(endIndex);

// Find where to insert it
const insertTarget = '      {/* 7. CALL TO ACTION */}';
const insertIndex = content.indexOf(insertTarget);

if (insertIndex === -1) {
  console.error("Could not find insert target");
  process.exit(1);
}

// Insert the block
content = content.substring(0, insertIndex) + block + content.substring(insertIndex);

// Update section numbers in comments just to be clean
content = content.replace('{/* 3. POPULAR DESTINATIONS */}', '{/* 2. POPULAR DESTINATIONS */}');
content = content.replace('{/* 4. FEATURED TOUR PACKAGES */}', '{/* 3. FEATURED TOUR PACKAGES */}');
content = content.replace('{/* 5. NORTHEAST CULTURE EXPERIENCE */}', '{/* 4. NORTHEAST CULTURE EXPERIENCE */}');
content = content.replace('{/* 6. OUR FLEET */}', '{/* 5. OUR FLEET */}');
content = content.replace('{/* 2. WHY CHOOSE US (Dark Green Accent Background) */}', '{/* 6. WHY CHOOSE US (Dark Green Accent Background) */}');

fs.writeFileSync(file, content);
console.log("Moved 'Why Choose Us' section successfully.");
